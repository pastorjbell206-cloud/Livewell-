import type { Plugin } from "vite";

/**
 * Paint first, then load the app.
 *
 * The built index.html carries a static first screen (masthead, and on the
 * front page the hero) that needs only the CSS and three preloaded fonts.
 * Vite also puts the entry module and its React preload in <head>, so on a
 * slow connection 140 KB of JavaScript downloads alongside the 19 KB of CSS
 * and 107 KB of fonts the first screen is actually waiting on, and the
 * headline paints later than it needs to. This plugin removes those two tags
 * and injects them from a small inline script once the stylesheet has loaded
 * and the first frame has painted: the reader sees the page, then the app
 * arrives and takes over.
 *
 * Guards: a hidden tab has no frames, so it loads at once; a stylesheet that
 * fails still loads the app; a 2.5 s timer covers any browser that never
 * yields a frame. The tags are re-created as Vite emitted them (module,
 * crossorigin), so nothing else about the app changes. Rendered pages are
 * produced by scripts/prerender-heads.mjs from this same template, so every
 * route gets the same loader.
 */
export function paintFirstLoader(scripts: string[], preloads: string[]): string {
  return (
    `<script>(function(){var d=false;function go(){if(d)return;d=true;` +
    `${JSON.stringify(preloads)}.forEach(function(h){var l=document.createElement("link");l.rel="modulepreload";l.crossOrigin="";l.href=h;document.head.appendChild(l)});` +
    `${JSON.stringify(scripts)}.forEach(function(s){var e=document.createElement("script");e.type="module";e.crossOrigin="";e.src=s;document.head.appendChild(e)})}` +
    // Once the first contentful paint has been presented (the paint-timing
    // entry arrives after the frame is on screen), wait for the main thread
    // to go idle (or 500 ms, whichever first), then load. Browsers without
    // paint timing fall back to the frame after the next one.
    `function idle(){if(typeof requestIdleCallback==="function"){requestIdleCallback(go,{timeout:500})}else{setTimeout(go,50)}}` +
    `function afterPaint(){if(typeof PerformanceObserver==="function"){try{var po=new PerformanceObserver(function(list){var es=list.getEntries();for(var i=0;i<es.length;i++){if(es[i].name==="first-contentful-paint"){po.disconnect();idle();return}}});po.observe({type:"paint",buffered:true});return}catch(e){}}` +
    `requestAnimationFrame(function(){requestAnimationFrame(idle)})}` +
    `if(document.hidden||typeof requestAnimationFrame!=="function"){go()}else{afterPaint();setTimeout(go,2500)}` +
    `})();</script>`
  );
}

export function paintFirstHtml(html: string): string {
  const scripts: string[] = [];
  const preloads: string[] = [];
  html = html.replace(/\s*<script type="module" crossorigin src="([^"]+)"><\/script>/g, (_m, src: string) => {
    scripts.push(src);
    return "";
  });
  html = html.replace(/\s*<link rel="modulepreload" crossorigin href="([^"]+)">/g, (_m, href: string) => {
    preloads.push(href);
    return "";
  });
  if (scripts.length === 0) return html;
  // At the end of <body>, so the whole static first screen has been parsed
  // by the time the loader runs; in <head> it could fire before the body
  // existed and the first frame would paint nothing.
  return html.replace("</body>", `    ${paintFirstLoader(scripts, preloads)}\n  </body>`);
}

export function paintFirstPlugin(): Plugin {
  return {
    name: "livewell:paint-first",
    apply: "build",
    enforce: "post",
    transformIndexHtml: paintFirstHtml,
  };
}

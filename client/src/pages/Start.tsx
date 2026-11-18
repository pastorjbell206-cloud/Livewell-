/**
 * /start: one road for someone new to the faith, or coming back to it.
 *
 * Nothing here is new content. The page sets six things the site already has
 * in an order a beginner can walk: a Gospel to read (John, in the Study
 * Bible), a way to begin praying, a church, the eight-week plan for a new
 * Christian, the catechism, and a study to go through with someone. Each step
 * is one sentence and one link. "What next" lists where the road goes on, and
 * the last line keeps the path to help in view, because new faith often
 * arrives in the middle of a hard season.
 *
 * Every fact in the copy is the linked page's own: John's twenty-one
 * chapters, the plans' and the study's own descriptions, the catechism's 76
 * questions (client/public/family-catechism.json). The steps live in
 * lib/startRoad.json so the prerender script can list them; start.test.tsx checks that
 * each link is a registered route and that the counts still match the data.
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import road from "@/lib/startRoad.json";

export interface StartStep {
  title: string;
  line: string;
  link: string;
  href: string;
}

/** The road, in order. One sentence and one link a step (lib/startRoad.json). */
export const START_STEPS: StartStep[] = road.steps;

export interface StartNext {
  lead: string;
  link: string;
  href: string;
}

/** Where the road goes on. */
export const START_NEXT: StartNext[] = road.next;

const gutter = "clamp(16px, 4vw, var(--s-4))";

export default function Start() {
  return (
    <Layout>
      <SEOMeta
        title="New to Faith, or Coming Back: Where to Start"
        description="One road for a new Christian or someone coming back to church: read the Gospel of John, learn to pray, find a church, and take the first eight weeks."
        url="https://www.livewellbyjamesbell.co/start"
      />

      <PageHead
        eyebrow="Start here"
        title="New to faith, or coming back"
        lede="Six steps, in order, and every one of them is a page that's already here. Take them at your own pace."
        width="var(--w-content)"
      />

      <section aria-labelledby="start-road-title" style={{ background: "var(--bone)", padding: `var(--s-4) ${gutter} var(--s-6)` }}>
        <div className="start-wrap">
          <h2 id="start-road-title" className="sr-only">
            The road
          </h2>
          <ol className="start-road">
            {START_STEPS.map((step, i) => (
              <li key={step.href} className="start-step">
                <span className="start-step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="start-step__title">{step.title}</h3>
                  <p className="start-step__line">{step.line}</p>
                  <Link href={step.href} className="start-link">
                    {step.link}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
          <p className="start-back">
            If you're coming back after years away, the road is the same one. If a church is the reason you left, read{" "}
            <Link href="/help/church-hurt" className="start-link start-link--inline">
              the page for people hurt by a church
            </Link>{" "}
            before step three.
          </p>
        </div>
      </section>

      <section aria-labelledby="start-next-title" style={{ background: "var(--bone-warm)", padding: `var(--s-6) ${gutter}` }}>
        <div className="start-wrap">
          <h2 id="start-next-title" className="start-next__title">
            What next
          </h2>
          <ul className="start-next">
            {START_NEXT.map((n) => (
              <li key={n.href}>
                {n.lead}{" "}
                <Link href={n.href} className="start-link start-link--inline">
                  {n.link}
                </Link>
                .
              </li>
            ))}
          </ul>
          <p className="start-help">
            {road.quiz.lead}{" "}
            <Link href={road.quiz.href} className="start-link start-link--inline">
              {road.quiz.link}
            </Link>{" "}
            {road.quiz.after}
          </p>
          <p className="start-help start-help--last">
            In a hard season right now?{" "}
            <Link href="/help" className="start-link start-link--inline">
              Find help for what you are facing
            </Link>
            .
          </p>
        </div>
      </section>

      <style>{START_CSS}</style>
    </Layout>
  );
}

const START_CSS = `
.start-wrap{max-width:var(--w-content);margin:0 auto}
.start-road{list-style:none;margin:0;padding:0}
.start-step{display:grid;grid-template-columns:clamp(44px,8vw,96px) minmax(0,1fr);column-gap:var(--s-3);align-items:baseline;padding:var(--s-4) 0;border-bottom:1px solid var(--border)}
.start-step__n{font-family:var(--F);font-weight:400;font-size:clamp(40px,6vw,72px);line-height:0.9;letter-spacing:-0.02em;color:var(--ink-muted)}
.start-step__title{font-family:var(--F);font-weight:400;font-size:clamp(28px,3.4vw,38px);line-height:1.1;letter-spacing:-0.015em;color:var(--ink);margin:0 0 10px}
.start-step__line{font-family:var(--B);font-size:17px;line-height:1.7;color:var(--ink);max-width:62ch;margin:0 0 6px}
.start-link{display:inline-flex;align-items:center;min-height:44px;font-family:var(--U);font-size:16px;font-weight:500;color:var(--ink);text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:0.22em}
.start-link:hover{text-decoration-thickness:2px}
.start-link--inline{display:inline;min-height:0;font-family:inherit;font-size:inherit;padding:12px 0}
.start-back{font-family:var(--B);font-size:17px;line-height:1.7;color:var(--ink-muted);max-width:62ch;margin:var(--s-4) 0 0}
.start-next__title{font-family:var(--F);font-weight:400;font-size:clamp(28px,3.6vw,38px);line-height:1.1;letter-spacing:-0.015em;color:var(--ink);margin:0 0 var(--s-3)}
.start-next{list-style:none;margin:0;padding:0;font-family:var(--B);font-size:17px;line-height:1.6;color:var(--ink)}
.start-next li{padding:14px 0;border-top:1px solid var(--borderdk)}
.start-next li:last-child{border-bottom:1px solid var(--borderdk)}
.start-help{font-family:var(--B);font-size:16px;line-height:1.6;color:var(--ink-muted);margin:var(--s-4) 0 0}
.start-help--last{margin-top:var(--s-1)}
`;

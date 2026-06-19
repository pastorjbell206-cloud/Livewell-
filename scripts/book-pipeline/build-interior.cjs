const PDFDocument=require("pdfkit"), fs=require("fs");
const CFG=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
const path=require("path"); const FD=path.join(__dirname,"fonts");
const PT=72, W=6*PT, H=9*PT;
// generous, KDP-safe margins (inner gutter comfortable for 150-300pp)
const ML=0.88*PT, MR=0.78*PT, MT=0.85*PT, MB=0.8*PT, CW=W-ML-MR;
const CREAM="#F6F1E7", INK="#1A1A1A", MUT="#6B6456", MUST="#C8961A", QINK="#3A352B";
const RW=CFG.rwdir||"/tmp/rw", SECTIONS=CFG.sections;
const doc=new PDFDocument({size:[W,H],margins:{top:MT,bottom:MB,left:ML,right:MR},bufferPages:true,autoFirstPage:false});
const ws=fs.createWriteStream(CFG.out); doc.pipe(ws);
doc.registerFont("body",`${FD}/IBMPlexSerif-Regular.ttf`);
doc.registerFont("bold",`${FD}/IBMPlexSerif-Bold.ttf`);
doc.registerFont("disp",`${FD}/YoungSerif-Regular.ttf`);
doc.registerFont("ital",`${FD}/InstrumentSerif-Italic.ttf`);
doc.registerFont("bodyI",`${FD}/IBMPlexSerif-Italic.ttf`);
let curPage=-1;
doc.on("pageAdded",()=>{curPage++; doc.save(); doc.rect(0,0,W,H).fill(CREAM); doc.restore();});
function addPage(){doc.addPage();}
const ctr=(t,f,s,c,o={})=>doc.font(f).fontSize(s).fillColor(c).text(t,ML,o.y!=null?o.y:doc.y,{width:CW,align:"center",...o});
function rule(y,half,w){doc.save(); doc.lineWidth(w||2).strokeColor(MUST); doc.moveTo(W/2-half,y).lineTo(W/2+half,y).stroke(); doc.restore();}
function readEls(f){return JSON.parse(fs.readFileSync(`${RW}/${CFG.prefix}-${f}.json`,"utf8"));}
function parseQ(s){const m=String(s).match(/^([\s\S]*?)\s+—\s*([^—]+)$/); return m?[m[1],m[2].trim()]:[String(s),""];}

// ===== FRONT MATTER =====
addPage(); // title (half-title style)
doc.y=2.7*PT; ctr(CFG.title,"disp",CFG.titleSize||30,INK);
if(CFG.subtitle){doc.moveDown(0.6); ctr(CFG.subtitle,"ital",14.5,QINK);}
doc.y=H-2.5*PT; rule(doc.y,30,1.5); doc.moveDown(0.7); ctr((CFG.author||"James Bell").toUpperCase(),"bold",12.5,INK,{characterSpacing:2.5});
addPage(); // copyright
doc.y=H-3.9*PT; doc.font("body").fontSize(9).fillColor(MUT).text(`${CFG.title}\n\nCopyright © 2026 by ${CFG.author||"James Bell"}. All rights reserved. No part of this book may be reproduced in any form without written permission, except for brief quotations in reviews.\n\nPublished by LiveWell by James Bell.  livewellbyjamesbell.co\n\nUnless otherwise noted, Scripture quotations are from the English Standard Version (ESV).\n\nISBN: ____________________`,ML,doc.y,{width:CW,align:"left",lineGap:2.5});

// ===== CONTENTS (entries now; page numbers filled after body) =====
addPage();
doc.y=2.3*PT; ctr("Contents","disp",26,INK); doc.moveDown(0.4); rule(doc.y,26,1.5); doc.moveDown(1.4);
const tocRefs=[]; // {page,y,ci}
let ci=-1;
for(const s of SECTIONS){
  if(doc.y>H-MB-0.5*PT){addPage(); doc.y=MT+0.3*PT;}
  if(s.t==="part"){
    doc.moveDown(0.55);
    doc.font("bold").fontSize(9.5).fillColor(MUST).text(`${s.label} · ${s.name}`.toUpperCase(),ML,doc.y,{width:CW,characterSpacing:2});
    doc.moveDown(0.5);
  }else{
    ci++;
    const els=readEls(s.f), title=(els.find(e=>e[0]==="title")||[,""])[1];
    const eye=(els.find(e=>e[0]==="eyebrow")||[,""])[1];
    const y=doc.y;
    doc.font("body").fontSize(10.5).fillColor(INK).text(eye?`${eye}`:title,ML,y,{width:CW*0.62,lineBreak:false});
    doc.font("body").fontSize(10.5).fillColor(QINK).text(title,ML+0.16*PT,doc.y,{width:CW-0.16*PT});
    tocRefs.push({page:curPage,y,ci});
    doc.moveDown(0.45);
  }
}
const fmPages=curPage+1; // body starts next

// ===== BODY =====
const chapStart=[]; // {page,title} per chapter index
function leadIn(text){
  const words=text.split(" "); const n=Math.min(4,words.length);
  const lead=words.slice(0,n).join(" "), rest=words.slice(n).join(" ");
  const x=ML, y=doc.y;
  doc.font("bold").fontSize(10.7).fillColor(INK).text(lead.toUpperCase()+" ",x,y,{continued:true,characterSpacing:0.3});
  doc.font("body").fontSize(10.7).fillColor(INK).text(rest,{align:"justify",lineGap:2.6});
  doc.moveDown(0.18);
}
function renderEls(els,cidx){
  let firstPara=true;
  for(const e of els){const t=e[0];
    if(t==="eyebrow"){doc.font("bold").fontSize(10).fillColor(MUST).text(e[1].toUpperCase(),ML,doc.y,{width:CW,align:"center",characterSpacing:3.5}); doc.moveDown(0.5);}
    else if(t==="title"){doc.font("disp").fontSize(25).fillColor(INK).text(e[1],ML,doc.y,{width:CW,align:"center",lineGap:1}); doc.moveDown(0.4); chapStart[cidx].title=e[1];}
    else if(t==="subtitle"){doc.font("ital").fontSize(13).fillColor(QINK).text(e[1],ML+0.4*PT,doc.y,{width:CW-0.8*PT,align:"center",lineGap:1.5}); doc.moveDown(0.55);}
    else if(t==="rule"){rule(doc.y,22,1.5); doc.moveDown(1.35);}
    else if(t==="h2"){doc.moveDown(1.05); doc.font("bold").fontSize(10.5).fillColor(MUST).text(e[1].toUpperCase(),ML,doc.y,{width:CW,characterSpacing:2.2,lineGap:1.5}); doc.moveDown(0.55); firstPara=true;}
    else if(t==="pull"){doc.moveDown(0.7); rule(doc.y,26,1.5); doc.moveDown(0.55); doc.font("ital").fontSize(17.5).fillColor(INK).text(e[1],ML+0.5*PT,doc.y,{width:CW-1.0*PT,align:"center",lineGap:2.5}); doc.moveDown(0.55); rule(doc.y,26,1.5); doc.moveDown(0.95); firstPara=true;}
    else if(t==="q"){doc.moveDown(0.6); const [body,ref]=parseQ(e[1]); const qx=ML+0.5*PT,qw=CW-1.0*PT,sy=doc.y;
      doc.font("ital").fontSize(11.8).fillColor(QINK); const h=doc.heightOfString(body,{width:qw,lineGap:2.2});
      doc.save(); doc.lineWidth(2.5).strokeColor(MUST); doc.moveTo(ML+0.26*PT,sy+1).lineTo(ML+0.26*PT,sy+h-1).stroke(); doc.restore();
      doc.text(body,qx,sy,{width:qw,lineGap:2.2}); doc.moveDown(0.18);
      if(ref){doc.font("bold").fontSize(8).fillColor(MUT).text(ref.toUpperCase(),qx,doc.y,{width:qw,characterSpacing:1.4});}
      doc.moveDown(0.85); firstPara=true;}
    else if(t==="pf"){doc.font("body").fontSize(10.7).fillColor(INK).text(e[1],ML,doc.y,{width:CW,align:"justify",lineGap:2.6}); doc.moveDown(0.14); firstPara=false;}
    else if(t==="p"){
      if(firstPara){leadIn(e[1]); firstPara=false;}
      else{doc.font("body").fontSize(10.7).fillColor(INK).text(e[1],ML,doc.y,{width:CW,align:"justify",lineGap:2.6,indent:15}); doc.moveDown(0.14);}
    }
  }
}
let cidx=-1;
for(const s of SECTIONS){
  addPage();
  if(s.t==="part"){doc.y=3.1*PT; ctr(s.label.toUpperCase(),"bold",12,MUST,{characterSpacing:4}); doc.moveDown(0.7); ctr(s.name,"disp",30,INK); doc.moveDown(0.55); rule(doc.y,26,2); if(s.q){doc.moveDown(0.85); ctr(s.q,"ital",15.5,QINK);} chapStart.push({page:curPage,title:null,part:true});}
  else{cidx++; chapStart.push({page:curPage,title:null}); doc.y=MT+1.4*PT; renderEls(readEls(s.f),chapStart.length-1);}
}
const lastPage=curPage;

// ===== POST: running heads, folios, TOC page numbers =====
const startPages=new Set(chapStart.map(c=>c.page));
// map each body page -> nearest preceding chapter title
function titleForPage(p){let t=CFG.title; for(const c of chapStart){if(c.page<=p && !c.part) t=c.title||t;} return t;}
for(let p=fmPages;p<=lastPage;p++){
  doc.switchToPage(p);
  doc.page.margins={top:0,bottom:0,left:ML,right:MR};
  const folio=p-fmPages+1;
  // folio centered at bottom
  doc.font("body").fontSize(9).fillColor(MUT).text(String(folio),ML,H-MB+10,{width:CW,align:"center",lineBreak:false});
  if(!startPages.has(p)){ // running head (skip chapter/part openers)
    const verso=(folio%2===0);
    const txt=verso?CFG.title.toUpperCase():titleForPage(p).toUpperCase();
    doc.font("bold").fontSize(7.5).fillColor(MUT).text(txt,ML,MT-22,{width:CW,align:verso?"left":"right",characterSpacing:2,lineBreak:false});
  }
}
// TOC page numbers + dot leaders
// chapter index ci in tocRefs corresponds to the (ci-th) non-part chapter; find its chapStart page
const chapPages=chapStart.filter(c=>!c.part).map(c=>c.page);
for(const r of tocRefs){
  const folio=chapPages[r.ci]-fmPages+1;
  doc.switchToPage(r.page);
  doc.page.margins={top:0,bottom:0,left:ML,right:MR};
  const numX=W-MR-0.3*PT;
  doc.font("body").fontSize(10.5).fillColor(MUT).text(String(folio),W-MR-0.4*PT,r.y,{width:0.4*PT,align:"right",lineBreak:false});
  // dot leaders
  doc.save(); doc.fillColor("#C9C0AD");
  const dotsStart=ML+CW*0.66, dotsEnd=numX-0.18*PT;
  for(let x=dotsStart;x<dotsEnd;x+=5){doc.circle(x,r.y+7,0.6).fill();}
  doc.restore();
}
const r=doc.bufferedPageRange();
ws.on("finish",()=>console.log(`${CFG.title}: ${r.count} pages, ${(fs.statSync(CFG.out).size/1024|0)}KB`));
doc.end();

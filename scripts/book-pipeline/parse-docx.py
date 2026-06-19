#!/usr/bin/env python3
"""
parse-docx.py — turn a .docx manuscript into house-schema section JSON.

Usage:
  python3 parse-docx.py BOOK.docx OUT_DIR PREFIX [--chap-size N] [--sub-size N] [--md]

Output:
  OUT_DIR/PREFIX-ch00.json, -ch01.json, ...   (house-schema section files)
  OUT_DIR/PREFIX-manifest.json                 ({prefix,title,subtitle,sections:[...]})

Heading detection is automatic (by font size, or by markdown #/## markers if the
doc uses them). If the chapter split looks wrong, re-run with --chap-size /
--sub-size (point values: Word "size" is 2x the visible pt, e.g. 36 = 18pt) or
--md to force markdown mode. ALWAYS skim PREFIX-manifest.json to confirm the
chapter titles look right before building.

House schema = a JSON array of [type, text] pairs per section:
  ["eyebrow", ...] (optional), ["title", ...], ["subtitle", ...] (optional),
  ["rule", ""], ["h2", ...], ["p", ...], ["pull", ...], ["q", "<verse> —<Ref>"]
"""
import sys, re, json, os, zipfile, argparse
from collections import Counter

ENT = [('&amp;','&'),('&apos;',"'"),('&quot;','"'),('&lt;','<'),('&gt;','>'),
       ('&#8217;','’'),('&#8216;','‘'),('&#8220;','“'),('&#8221;','”'),
       ('&#8212;','—'),('&#8211;','–'),('&#8230;','…')]
def clean(t):
    for a,b in ENT: t=t.replace(a,b)
    return t.strip()
def rows(path):
    z=zipfile.ZipFile(path); xml=z.read('word/document.xml').decode('utf-8','ignore')
    out=[]
    for p in re.split(r'</w:p>', xml):
        sz=re.search(r'<w:sz w:val="(\d+)"', p)
        t=clean("".join(re.findall(r'<w:t[^>]*>(.*?)</w:t>', p, re.S)))
        if t and not t.startswith('<w:'): out.append((int(sz.group(1)) if sz else 0, t))
    return out

QREF = re.compile(r'\(([1-3]?\s?[A-Z][a-z]+\.?\s?\d+[:.]\d+[-–\d]*)\)\s*$')

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("docx"); ap.add_argument("outdir"); ap.add_argument("prefix")
    ap.add_argument("--chap-size", type=int, default=0)
    ap.add_argument("--sub-size", type=int, default=0)
    ap.add_argument("--md", action="store_true")
    a=ap.parse_args()
    rs=rows(a.docx); os.makedirs(a.outdir, exist_ok=True)
    use_md = a.md or sum(1 for s,t in rs if re.match(r'#{1,3}\s', t)) >= 5

    # ---- title / subtitle (largest lines near the top) ----
    big = max((s for s,t in rs), default=0)
    title_parts=[]; ti=None
    for i,(s,t) in enumerate(rs[:25]):
        if not use_md and s>=max(big-2, 37) and len(t.split())<12:
            if ti is None: ti=i
            title_parts.append(t)
        elif ti is not None: break
    title = " ".join(title_parts) if title_parts else (rs[0][1] if rs else a.prefix)
    subtitle=""
    for s,t in rs[(ti or 0)+len(title_parts):(ti or 0)+len(title_parts)+5]:
        if 22<=s<=31 and not re.search(r'connection network|\.com|hard issues|^book ', t.lower()):
            subtitle=t; break

    sections=[]
    if use_md:
        cur=None
        for s,t in rs:
            h1=re.match(r'#\s+(.+)', t); h2=re.match(r'##\s+(.+)', t)
            if h2 and cur is not None: cur.append(["h2", h2.group(1).strip()])
            elif h1:
                if cur: sections.append(cur)
                head=h1.group(1).strip()
                cur=[["title", head],["rule",""]]
            elif cur is not None:
                cur.append(["q" if (QREF.search(t) and len(t.split())<60) else "p", t])
        if cur: sections.append(cur)
    else:
        body_sz = Counter(s for s,t in rs if len(t.split())>8).most_common(1)[0][0]
        cand = sorted({s for s,t in rs if s>body_sz})
        def headcount(c): return sum(1 for s,t in rs if s==c and len(t.split())<20)
        # Two heading levels usually sit above body text. Chapters = the LARGEST size
        # that still recurs (>=3), which skips the 1-2x title; subheads = next size down.
        ranked = sorted((c for c in cand if headcount(c) >= 3), reverse=True)
        chap_sz = a.chap_size or (ranked[0] if ranked else big)
        sub_sz  = a.sub_size  or (ranked[1] if len(ranked) > 1 else -1)
        cur=None
        for s,t in rs:
            if s==chap_sz:
                if cur: sections.append(cur)
                cur=[["title", t],["rule",""]]
            elif cur is None: continue
            elif sub_sz!=-1 and s==sub_sz: cur.append(["h2", t])
            elif body_sz < s < chap_sz and sub_sz==-1: cur.append(["h2", t])
            else:
                cur.append(["q" if (QREF.search(t) and len(t.split())<60) else "p", t])
        if cur: sections.append(cur)

    for i,els in enumerate(sections):
        json.dump(els, open(f"{a.outdir}/{a.prefix}-ch{i:02d}.json","w"), ensure_ascii=False)
    man={"prefix":a.prefix, "title":title, "subtitle":subtitle,
         "sections":[{"t":"ch","f":f"ch{i:02d}"} for i in range(len(sections))]}
    json.dump(man, open(f"{a.outdir}/{a.prefix}-manifest.json","w"), ensure_ascii=False, indent=1)
    wc=sum(len(e[1].split()) for els in sections for e in els if e[0] in ("p","q","pull"))
    print(f"{a.prefix}: {len(sections)} sections, ~{wc} words")
    print(f"  title:    {title}")
    print(f"  subtitle: {subtitle}")
    print(f"  -> {a.outdir}/{a.prefix}-manifest.json  (skim it to confirm the chapter split)")

if __name__=="__main__":
    main()

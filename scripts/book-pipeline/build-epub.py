import json, zipfile, html, os, sys
CFG=json.load(open(sys.argv[1]))
def esc(s): return html.escape(s or "",quote=True)
RW=CFG.get("rwdir","/tmp/rw"); PREFIX=CFG["prefix"]
CSS="""body{font-family:Georgia,'Times New Roman',serif;line-height:1.6;margin:5%;color:#14110c}
h1{font-family:Georgia,serif;font-size:1.7em;font-weight:600;text-align:center;line-height:1.2;margin:.3em 0 .2em}
.eyebrow{text-align:center;letter-spacing:.2em;font-size:.7em;text-transform:uppercase;color:#9c7a10;font-family:Arial,sans-serif;margin:0}
p.subtitle{text-align:center;font-style:italic;font-size:1.02em;color:#5a5448;margin:.1em 1em .2em;line-height:1.4}
hr.rule{width:56px;border:0;border-top:2px solid #d4a017;margin:1em auto 1.5em}
h2{font-size:.92em;text-transform:uppercase;letter-spacing:.13em;color:#9c7a10;font-family:Arial,sans-serif;margin:1.9em 0 .6em;font-weight:700}
p{margin:0;text-indent:1.3em;text-align:justify}
p.first{text-indent:0}
blockquote{margin:1.1em 0 1.1em .6em;padding-left:1em;border-left:3px solid #d4a017;font-style:italic;color:#333}
blockquote p{text-indent:0;text-align:left;margin:0}
blockquote cite{display:block;font-style:normal;font-size:.72em;letter-spacing:.1em;text-transform:uppercase;color:#7a6a55;margin-top:.4em;font-family:Arial,sans-serif}
p.pull{font-size:1.3em;font-style:italic;text-align:center;color:#1a1a1a;margin:1.5em 1.2em;text-indent:0;line-height:1.35}
.partlabel{text-align:center;letter-spacing:.25em;font-size:.8em;text-transform:uppercase;color:#9c7a10;font-family:Arial,sans-serif;margin-top:30%}
h1.partname{font-size:2.1em;text-align:center;font-weight:600;margin:.3em 0}
.parttag{text-align:center;font-style:italic;font-size:1.15em;color:#444}
.cover{text-align:center;margin:0}.cover img{max-width:100%;height:auto}"""
def page(t,b): return f'<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" lang="en"><head><meta charset="utf-8"/><title>{esc(t)}</title><link rel="stylesheet" href="style.css"/></head><body>{b}</body></html>'
def render(els):
    out=[]
    for e in els:
        k=e[0]
        if k=="eyebrow": out.append(f'<p class="eyebrow">{esc(e[1])}</p>')
        elif k=="title": out.append(f'<h1>{esc(e[1])}</h1>')
        elif k=="subtitle": out.append(f'<p class="subtitle">{esc(e[1])}</p>')
        elif k=="rule": out.append('<hr class="rule"/>')
        elif k=="h2": out.append(f'<h2>{esc(e[1])}</h2>')
        elif k=="pf": out.append(f'<p class="first">{esc(e[1])}</p>')
        elif k=="p": out.append(f'<p>{esc(e[1])}</p>')
        elif k=="pull": out.append(f'<p class="pull">{esc(e[1])}</p>')
        elif k=="q":
            m=str(e[1]).rsplit(" —",1); body=m[0]; ref=(m[1] if len(m)>1 else (e[2] if len(e)>2 else ""))
            out.append(f'<blockquote><p>{esc(body)}</p>'+(f'<cite>{esc(ref)}</cite>' if ref else '')+'</blockquote>')
    return "\n".join(out)
COVER=CFG["cover"]
files={"OEBPS/style.css":CSS,"OEBPS/cover.jpg":open(COVER,"rb").read()}
files["OEBPS/cover.xhtml"]=page("Cover",'<div class="cover"><img src="cover.jpg" alt="Cover"/></div>')
files["OEBPS/title.xhtml"]=page("Title",f'<div style="text-align:center;margin-top:18%"><h1 style="font-size:1.7em">{esc(CFG["title"])}</h1><p style="font-style:italic;font-size:1.05em;color:#444">{esc(CFG.get("subtitle",""))}</p><p style="margin-top:2.5em;letter-spacing:.1em;font-family:sans-serif">{esc((CFG.get("author","James Bell")).upper())}</p></div>')
files["OEBPS/copyright.xhtml"]=page("Copyright",f'<p class="first" style="font-size:.85em">{esc(CFG["title"])}</p><p class="first" style="font-size:.85em;margin-top:1em">Copyright © 2026 by {esc(CFG.get("author","James Bell"))}. All rights reserved.</p><p class="first" style="font-size:.85em;margin-top:1em">Published by LiveWell by James Bell. Unless otherwise noted, Scripture quotations are from the English Standard Version (ESV).</p>')
pages=["cover.xhtml","title.xhtml","copyright.xhtml","nav.xhtml"]
nav=[]; secfiles=[]; i=0
for sec in CFG["sections"]:
    i+=1; fn=f"sec{i:02d}.xhtml"
    if sec["t"]=="part":
        body=f'<p class="partlabel">{esc(sec["label"])}</p><h1 class="partname">{esc(sec["name"])}</h1><hr class="rule"/>'+(f'<p class="parttag">{esc(sec.get("q",""))}</p>' if sec.get("q") else '')
        files["OEBPS/"+fn]=page(sec["name"],body); nav.append((fn,f'{sec["label"]} · {sec["name"]}'))
    else:
        els=json.load(open(f"{RW}/{PREFIX}-{sec['f']}.json"))
        title=next((e[1] for e in els if e[0]=="title"),sec['f'])
        eye=next((e[1] for e in els if e[0]=="eyebrow"),"")
        files["OEBPS/"+fn]=page(title,render(els))
        nav.append((fn,f"{eye}. {title}" if eye else title))
    pages.append(fn); secfiles.append(fn)
navlis="".join(f'<li><a href="{fn}">{esc(t)}</a></li>' for fn,t in nav)
files["OEBPS/nav.xhtml"]=page("Contents",f'<nav epub:type="toc" id="toc" xmlns:epub="http://www.idpf.org/2007/ops"><h1>Contents</h1><ol>{navlis}</ol></nav>')
man=['<item id="css" href="style.css" media-type="text/css"/>','<item id="ci" href="cover.jpg" media-type="image/jpeg" properties="cover-image"/>']
idmap={"cover.xhtml":"cover","title.xhtml":"title","copyright.xhtml":"copyright","nav.xhtml":"nav"}
for p in pages:
    if p in idmap:
        prop=' properties="nav"' if p=="nav.xhtml" else ""
        man.append(f'<item id="{idmap[p]}" href="{p}" media-type="application/xhtml+xml"{prop}/>')
    else:
        man.append(f'<item id="s{secfiles.index(p)+1}" href="{p}" media-type="application/xhtml+xml"/>')
spine_ids=[idmap[p] if p in idmap else "s"+str(secfiles.index(p)+1) for p in pages]
spine="".join(f'<itemref idref="{x}"/>' for x in spine_ids)
files["OEBPS/content.opf"]=f'''<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bid">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="bid">urn:livewell:{CFG["uid"]}</dc:identifier>
<dc:title>{esc(CFG["title"])}</dc:title><dc:creator>{esc(CFG.get("author","James Bell"))}</dc:creator><dc:language>en</dc:language>
<meta property="dcterms:modified">2026-06-16T00:00:00Z</meta></metadata>
<manifest>{"".join(man)}</manifest><spine>{spine}</spine></package>'''
files["META-INF/container.xml"]='<?xml version="1.0"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>'
out=CFG["epubout"]
with zipfile.ZipFile(out,"w") as z:
    z.writestr("mimetype","application/epub+zip",compress_type=zipfile.ZIP_STORED)
    for n,d in files.items(): z.writestr(n,d,compress_type=zipfile.ZIP_DEFLATED)
print(f"{os.path.basename(out)}: {os.path.getsize(out)//1024}KB, {len(secfiles)} sections")

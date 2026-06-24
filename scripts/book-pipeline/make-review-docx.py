import json, zipfile, os, html

def esc(s):
    return html.escape(s or "", quote=False)

def run(text, sz=22, b=False, i=False, scaps=False, color=None):
    rpr = "<w:rPr>"
    rpr += '<w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/>'
    if b: rpr += "<w:b/>"
    if i: rpr += "<w:i/>"
    if scaps: rpr += "<w:smallCaps/>"
    if color: rpr += f'<w:color w:val="{color}"/>'
    rpr += f'<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/></w:rPr>'
    return f'<w:r>{rpr}<w:t xml:space="preserve">{esc(text)}</w:t></w:r>'

def para(runs, jc=None, ind_first=None, ind_left=None, before=120, after=120, line=None, keepnext=False, pagebreak_before=False):
    ppr = "<w:pPr>"
    if pagebreak_before: ppr += "<w:pageBreakBefore/>"
    if keepnext: ppr += "<w:keepNext/>"
    spacing = f'<w:spacing w:before="{before}" w:after="{after}"'
    if line: spacing += f' w:line="{line}" w:lineRule="auto"'
    spacing += "/>"
    ppr += spacing
    ind = ""
    if ind_first is not None: ind += f' w:firstLine="{ind_first}"'
    if ind_left is not None: ind += f' w:left="{ind_left}"'
    if ind: ppr += f"<w:ind{ind}/>"
    if jc: ppr += f'<w:jc w:val="{jc}"/>'
    ppr += "</w:pPr>"
    return f"<w:p>{ppr}{''.join(runs)}</w:p>"

MUST = "9C7A10"  # mustard-ish for headings
INK = "14110C"
MUT = "5A5448"

def build(book_title, subtitle, sections, outpath):
    body = []
    # --- Title page ---
    body.append(para([run(book_title, sz=64, b=True, color=INK)], jc="center", before=2400, after=200))
    if subtitle:
        body.append(para([run(subtitle, sz=28, i=True, color=MUT)], jc="center", before=120, after=200))
    body.append(para([run("JAMES BELL", sz=26, color=INK)], jc="center", before=600, after=200))
    body.append(para([run("LiveWell by James Bell", sz=18, color=MUT)], jc="center", before=2400, after=120))
    body.append(para([run("Copyright © 2026 by James Bell. All rights reserved.", sz=18, color=MUT)], jc="center"))
    body.append(para([run("Unless otherwise noted, Scripture quotations are from the English Standard Version (ESV).", sz=18, color=MUT)], jc="center"))

    first_section = True
    for els in sections:
        first_para_after_h = True
        section_started = False
        for idx, e in enumerate(els):
            k = e[0]; t = e[1] if len(e) > 1 else ""
            if k == "eyebrow":
                body.append(para([run(t.upper(), sz=18, b=True, scaps=True, color=MUST)],
                                 jc="center", before=0, after=80, keepnext=True,
                                 pagebreak_before=(not first_section)))
                first_section = False
                section_started = True
            elif k == "title":
                body.append(para([run(t, sz=40, b=True, color=INK)], jc="center", before=80, after=80, keepnext=True))
            elif k == "subtitle":
                body.append(para([run(t, sz=24, i=True, color=MUT)], jc="center", before=0, after=120, keepnext=True))
            elif k == "rule":
                body.append(para([run("• • •", sz=22, color=MUST)], jc="center", before=80, after=200))
                first_para_after_h = True
            elif k == "h2":
                body.append(para([run(t, sz=26, b=True, color=INK)], before=320, after=120, keepnext=True))
                first_para_after_h = True
            elif k in ("p", "pf"):
                ind = None if first_para_after_h else 360
                body.append(para([run(t, sz=22, color=INK)], jc="both", ind_first=ind, line=276))
                first_para_after_h = False
            elif k == "pull":
                body.append(para([run(t, sz=30, i=True, color=INK)], jc="center", before=240, after=240, ind_left=720))
                first_para_after_h = True
            elif k == "q":
                ref = e[2] if len(e) > 2 else ""
                body.append(para([run(t, sz=22, i=True, color="333333")], ind_left=720, before=160, after=(40 if ref else 160)))
                if ref:
                    body.append(para([run("— " + ref, sz=18, scaps=True, color=MUT)], ind_left=720, before=0, after=160))
                first_para_after_h = True

    document = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        '<w:body>' + "".join(body) +
        '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/>'
        '<w:pgMar w:top="1440" w:bottom="1440" w:left="1800" w:right="1800" w:header="720" w:footer="720" w:gutter="0"/>'
        '</w:sectPr></w:body></w:document>'
    )
    ctypes = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
              '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
              '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
              '<Default Extension="xml" ContentType="application/xml"/>'
              '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
              '</Types>')
    rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
            '</Relationships>')
    with zipfile.ZipFile(outpath, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", ctypes)
        z.writestr("_rels/.rels", rels)
        z.writestr("word/document.xml", document)
    return outpath

def load(slugs, prefix):
    return [json.load(open(f"/tmp/rw/{prefix}-{s}.json")) for s in slugs]

os.makedirs("/tmp/review", exist_ok=True)

BOOKS = {
 "When-God-Bless-America": ("When God Bless America Replaces Thy Kingdom Come",
    "How Patriotism Became Our Practical Savior", "wgba",
    ["intro"] + [f"ch{n:02d}" for n in range(1, 11)]),
 "Raising-Believers": ("Raising Believers",
    "Christian Parenting and the Costly Work of Forming Faith in a Post-Christian World", "rb",
    ["intro"] + [f"ch{n:02d}" for n in range(1, 14)] + ["concl"]),
 "Believe": ("Believe", "", "believe",
    ["intro"] + [f"ch{n:02d}" for n in range(1, 13)] + ["appA", "appB"]),
 "The-Deconstruction-of-Faith": ("The Deconstruction of Faith",
    "Why People Are Leaving the Church — and What Comes After", "decon",
    ["intro"] + [f"ch{n:02d}" for n in range(1, 19)] + ["concl"]),
 "The-Monster-in-the-Mirror": ("The Monster in the Mirror",
    "Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It",
    "monster", [f"ch{n:02d}" for n in range(0, 15)]),
 "The-Reliability-of-Scripture": ("The Reliability of Scripture",
    "Why We Can Trust the Bible We Have", "reliability", [f"ch{n:02d}" for n in range(0, 47)]),
 "Bible-and-Homosexuality": ("What Does the Bible Really Say About Homosexuality?",
    "Scripture, Same-Sex Relationships, and the Church's Christ-Centered Response", "hb1",
    [f"ch{n:02d}" for n in range(0, 14)]),
 "Bible-and-Transgender-Identity": ("What Does the Bible Say About Transgender Identity?",
    "Gender, the Body, and the Church's Christ-Centered Response", "hb2",
    [f"ch{n:02d}" for n in range(0, 14)]),
 "Is-Critical-Race-Theory-Biblical": ("Is Critical Race Theory Biblical?",
    "Race, Justice, and What the Church Actually Owes the World", "hb3",
    [f"ch{n:02d}" for n in range(0, 20)]),
}

for fname, (title, sub, prefix, slugs) in BOOKS.items():
    secs = load(slugs, prefix)
    out = f"/tmp/review/{fname}.docx"
    build(title, sub, secs, out)
    words = sum(len(e[1].split()) for s in secs for e in s if e[0] in ("p","pf","pull","q"))
    print(f"{fname}.docx  — {len(secs)} sections, ~{words} words, {os.path.getsize(out)//1024} KB")

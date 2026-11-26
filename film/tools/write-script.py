"""Writes film/<slug>/script.json and narration.txt from a plain Python description, and checks every
Scripture quotation against the site's Berean text (client/public/bible/text/<book>/<chapter>.json).
A quotation must be found word for word inside its verse(s); a spoken one must also appear in the lines
(a capital first letter is allowed when a clause opens a sentence). Used by the batch files in film/batches/.
Run from the repo root: python3 film/batches/<batch>.py"""
import json, os, re

BOOKS = {"Psalm": "psalms"}
def verse_text(ref):
    m = re.match(r"^((?:\d )?[A-Za-z ]+?) (\d+):(\d+)(?:-(\d+))?$", ref); assert m, ref
    book, ch, a, b = m.group(1), int(m.group(2)), int(m.group(3)), int(m.group(4) or m.group(3))
    slug = BOOKS.get(book, book.lower().replace(" ", "-"))
    d = json.load(open(f"client/public/bible/text/{slug}/{ch}.json"))
    return " ".join(v["t"] for v in d["verses"] if a <= v["v"] <= b)

BANNED = ["delve", "journey", "transformational", "unpack", "navigate", "leverage", "tapestry", "robust", "nuanced", "—", "–"]
def write(slug, title, page, chapters, note):
    flat = [l for c in chapters for l in c["lines"]]
    for c in chapters:
        s = c.get("scripture")
        if s:
            src = verse_text(s["reference"]); assert s["text"] in src, f"{slug}: not in BSB {s['reference']}: {s['text']!r}\n   verse: {src!r}"
            s["translation"] = "Berean Standard Bible"
            if s["spoken"]:
                body = s["text"].rstrip(".")
                assert any(body in l or (body[0].upper() + body[1:]) in l for l in c["lines"]), f"{slug}: spoken verse not in lines: {s['text']}"
    for l in flat:
        for w in BANNED: assert w not in l.lower(), f"{slug}: banned {w!r} in {l!r}"
        if "!" in l: assert any(c.get("scripture") and "!" in c["scripture"]["text"] and l in c["lines"] for c in chapters), f"{slug}: exclamation outside Scripture: {l!r}"
    os.makedirs(f"film/{slug}", exist_ok=True)
    json.dump({"title": title, "note": note, "page": page, "translation": "Berean Standard Bible", "gap": 1.0, "chapters": chapters}, open(f"film/{slug}/script.json", "w"), indent=2, ensure_ascii=False)
    open(f"film/{slug}/narration.txt", "w").write("\n\n".join(flat) + "\n")
    words = sum(len(l.split()) for l in flat)
    print(f"{slug}: {len(chapters)} chapters, {len(flat)} lines, {words} words, {len(chr(10).join(flat)) + len(flat) - 1} characters, about {words / 3.1 + len(chapters) + 9:.0f} s")

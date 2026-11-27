"""YouTube title and description for the whole-site films (batches 12 on, and the Gather session's
apologetics, doctrine and history films), from each film's own words, as build-descriptions.py does.
Run from the repo root: python3 film/youtube/build-descriptions-2.py [slug ...]
Writes film/youtube/metadata-2.json (keeps any videoId already there). Nothing is invented: the
narration, chapter names, times and verses all come from the film's script.json and timeline.json."""
import json, re, sys, os
titles = json.load(open("film/youtube/titles-2.json"))
site = {f["slug"]: f for f in json.load(open("client/src/data/narrated-films.json"))["films"]}
idx = json.load(open("client/public/explorer/index.json"))
items = idx if isinstance(idx, list) else idx.get("films") or idx.get("items")
kind = {(i.get("slug") or i.get("id")): (i.get("kind") or i.get("group")) for i in items}
OUT = "film/youtube/metadata-2.json"
old = json.load(open(OUT)) if os.path.exists(OUT) else {}

def group(s):
    if s.startswith("apol-"): return "apol"
    if s.startswith("doc-"): return "belief"
    if s.startswith("hist-"): return "history"
    return {"questions": "question", "ideas": "idea", "verses": "verse", "stories": "story", "beliefs": "belief"}[kind[s]]

PLAYLIST = {
    "question": "Honest Answers to Hard Questions | LiveWell",
    "idea": "Big Ideas of the Bible | Bible Themes Explained",
    "verse": "Bible Verses in Context | LiveWell",
    "story": "The Story of the Bible | Bible Overview",
    "belief": "What Christians Believe | Christian Beliefs Explained",
    "apol": "Is the Bible Reliable? | LiveWell",
    "history": "Church History | LiveWell",
}
HOOK = {
    "question": "An honest answer to one of the hardest questions people ask about faith: the objection at its strongest, the evidence, and what remains unresolved. Where Christians differ, the film names the views and takes no side.",
    "idea": "One big idea traced through the whole Bible, from Genesis to Revelation, in an animated film.",
    "verse": "A well-known Bible verse read in its own chapter: what it says, what it promises, and what it doesn't.",
    "story": "A well-known Bible story, told and explained in an animated film.",
    "belief": "A clear film on what Christians believe, read straight from the Bible. Where faithful Christians differ, the film names the views and takes no side.",
    "apol": "Can the Bible be trusted? The objection at its strongest, what the evidence shows, and what it doesn't prove.",
    "history": "The story of the church, told in an animated film: what happened, why it mattered, and where Christians read it differently.",
}
BASE = ["#Bible", "#BibleStudy", "#Jesus", "#Christian", "#Faith", "#Scripture", "#God", "#Gospel", "#Christianity", "#ChristianTeaching"]
EXTRA = {
    "question": ["#Apologetics", "#HardQuestions", "#BibleExplained"],
    "idea": ["#BibleThemes", "#BibleExplained", "#BiblicalTheology"],
    "verse": ["#BibleVerse", "#BibleExplained"],
    "story": ["#BibleStory", "#BibleExplained", "#OldTestament"],
    "belief": ["#Theology", "#ChristianBeliefs", "#BibleExplained"],
    "apol": ["#Apologetics", "#BibleReliability", "#BibleExplained"],
    "history": ["#ChurchHistory", "#EarlyChurch", "#ChristianHistory"],
}
def mmss(x):
    x = int(round(x)); return f"{x//60}:{x%60:02d}"

want = sys.argv[1:] or list(titles)
out = dict(old)
for s in want:
    g = group(s)
    sc = json.load(open(f"film/{s}/script.json")); tl = json.load(open(f"film/{s}/timeline.json"))
    name = site.get(s, {}).get("title") or sc["title"]
    page = "https://www.livewellbyjamesbell.co" + (site.get(s, {}).get("page") or sc["page"])
    narration = "\n\n".join(" ".join(c["lines"]) for c in sc["chapters"])
    marks = [("0:00", name)]; last = 0
    for c in tl["chapters"]:
        k = next((x.get("kicker") for x in sc["chapters"] if x["id"] == c["id"]), "") or ""
        st = c.get("start", c["lines"][0]["start"] if c.get("lines") else 0)
        if not k or st - last < 10: continue
        marks.append((mmss(st), k)); last = st
    chapters = "\n".join(f"{a} {b}" for a, b in marks) if len(marks) >= 3 else ""
    verses = [f'{c["scripture"]["reference"]}: "{c["scripture"]["text"].strip()}"' for c in sc["chapters"] if c.get("scripture")]
    tags = BASE[:2] + EXTRA[g] + BASE[2:]
    seen = []; [seen.append(x) for x in tags if x not in seen]; tags = seen[:15]
    parts = [HOOK[g], f"Watch, read every word, and study further: {page}"]
    if chapters: parts.append("CHAPTERS\n" + chapters)
    if verses: parts.append("SCRIPTURE IN THIS FILM\n" + "\n".join(verses) + "\nAll Scripture is quoted from the Berean Standard Bible (BSB).")
    parts.append("FULL NARRATION\n" + narration)
    parts.append("ABOUT LIVEWELL\nLiveWell by James Bell: connecting the depth of theology to the weight of everyday life. More films, Bible study tools and honest answers to hard questions at https://www.livewellbyjamesbell.co\n\nRead aloud by a computer-made voice, not a person.")
    parts.append(" ".join(tags))
    desc = "\n\n".join(parts).replace("<", "").replace(">", "").replace("—", ", ")
    if len(desc) > 4900:
        cut = len(desc) - 4880
        desc = desc.replace("FULL NARRATION\n" + narration, "FULL NARRATION\n" + narration[: len(narration) - cut].rsplit(" ", 1)[0] + "...")
    rec = {"title": titles[s], "description": desc, "playlist": PLAYLIST[g], "thumbnail": f"film/out/thumbs/{s}.jpg", "tags": tags}
    if old.get(s, {}).get("videoId"): rec["videoId"] = old[s]["videoId"]
    out[s] = rec
json.dump(out, open(OUT, "w"), indent=1, ensure_ascii=False)
L = [len(out[s]["description"]) for s in want]
print(len(want), "films; description length", min(L), "to", max(L))
bad = [s for s in want if "!" in out[s]["title"] or len(out[s]["title"]) > 100 or "<" in out[s]["description"]]
print("titles to check:", bad)

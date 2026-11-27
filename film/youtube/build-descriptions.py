"""Builds a YouTube title and description for every narrated film, from the film's own words.
Run from the repo root: python3 film/youtube/build-descriptions.py
Writes film/youtube/metadata.json. Nothing here is invented: the summary is the film's narration,
the chapters are its own chapter names and times, the verses are the ones it shows."""
import json, re
films = json.load(open("client/src/data/narrated-films.json"))["films"]
titles = json.load(open("film/youtube/titles.json"))
idx = json.load(open("client/public/explorer/index.json"))
items = idx if isinstance(idx, list) else idx.get("films") or idx.get("items")
kind = {(i.get("slug") or i.get("id")): (i.get("kind") or i.get("group")) for i in items}
SHORT = {"trust-the-bible","whose-kingdom","you-are-that-man","one-story","the-verse-next-door","mark-in-a-minute","the-oldest-report","how-long"}
def group(s):
    if s in SHORT: return "short"
    return {"books":"book","beliefs":"belief","story":"story"}.get(kind.get(s), "short")
PLAYLIST = {"book":"Books of the Bible Explained","belief":"What Christians Believe","story":"The Story of the Bible","short":"Short Bible Films"}
BASE = ["#Bible", "#BibleStudy", "#Jesus", "#Christian", "#Faith", "#Scripture", "#God", "#Gospel", "#Christianity", "#ChristianTeaching"]
EXTRA = {"book": ["#BibleSummary", "#BibleBooks", "#BibleExplained"], "belief": ["#Theology", "#ChristianBeliefs", "#BibleExplained"],
         "story": ["#BibleSummary", "#BibleOverview", "#OldTestament", "#NewTestament"], "short": ["#BibleExplained", "#BibleVerse"]}
def mmss(x):
    x = int(round(x)); return f"{x//60}:{x%60:02d}"
def tag(word):
    return "#" + re.sub(r"[^A-Za-z0-9]", "", word.title().replace("'S", "s"))
out = {}
for f in films:
    s = f["slug"]; g = group(s)
    sc = json.load(open(f"film/{s}/script.json")); tl = json.load(open(f"film/{s}/timeline.json"))
    head = f["title"].split(": ")[0]
    # Hook: one plain sentence for the kind of film, then the film's own opening.
    if g == "book":
        name = ("the Gospel of " + head) if head in ("Matthew","Mark","Luke","John") else (head if head[0].isdigit() else "the book of " + head)
        hook = f"What is {name} about? A short, clear overview of {name}: how it is laid out, what to watch for, and where to start reading."
    elif g == "belief":
        hook = "A short, clear film on what Christians believe, read straight from the Bible. Where faithful Christians differ, the film names the views and takes no side."
    elif g == "story":
        hook = "The big story of the whole Bible, from Genesis to Revelation, in a short animated film."
    else:
        hook = "A short animated Bible film from LiveWell by James Bell."
    narration = "\n\n".join(" ".join(c["lines"]) for c in sc["chapters"])
    # Chapters: YouTube needs the first at 0:00, at least three, each at least 10 seconds long.
    marks = [("0:00", f["title"])]; last = 0
    for c in tl["chapters"]:
        k = next((x.get("kicker") for x in sc["chapters"] if x["id"] == c["id"]), "") or ""
        if not k or c["start"] - last < 10: continue
        marks.append((mmss(c["start"]), k)); last = c["start"]
    chapters = "\n".join(f"{a} {b}" for a, b in marks) if len(marks) >= 3 else ""
    verses = [f'{c["scripture"]["reference"]}: "{c["scripture"]["text"].strip()}"' for c in sc["chapters"] if c.get("scripture")]
    page = "https://www.livewellbyjamesbell.co" + f["page"]
    own = [tag(head)] if g == "book" else []
    tags = own + BASE[:2] + EXTRA[g] + BASE[2:]
    seen = []; [seen.append(x) for x in tags if x not in seen]; tags = seen[:15]
    parts = [hook, f"Watch, read every word, and study further: {page}"]
    if chapters: parts.append("CHAPTERS\n" + chapters)
    if verses: parts.append("SCRIPTURE IN THIS FILM\n" + "\n".join(verses) + "\nAll Scripture is quoted from the Berean Standard Bible (BSB).")
    parts.append("FULL NARRATION\n" + narration)
    parts.append("ABOUT LIVEWELL\nLiveWell by James Bell: connecting the depth of theology to the weight of everyday life. More films, Bible study tools and honest answers to hard questions at https://www.livewellbyjamesbell.co\n\nRead aloud by a computer-made voice, not a person.")
    parts.append(" ".join(tags))
    desc = "\n\n".join(parts).replace("<", "").replace(">", "").replace("—", ", ")
    if len(desc) > 4900:
        desc = desc.replace("FULL NARRATION\n" + narration, "FULL NARRATION\n" + narration[: len(narration) - (len(desc) - 4880)].rsplit(" ", 1)[0] + "...")
    out[s] = {"title": titles[s], "description": desc, "playlist": PLAYLIST[g], "thumbnail": f"film/out/thumbs/{s}.jpg", "tags": tags}
json.dump(out, open("film/youtube/metadata.json", "w"), indent=1, ensure_ascii=False)
L = [len(v["description"]) for v in out.values()]
print(len(out), "films; description length", min(L), "to", max(L), "characters; longest title", max(len(v["title"]) for v in out.values()))
bad = [s for s, v in out.items() if "!" in v["title"] or len(v["title"]) > 100]
print("titles to check:", bad)

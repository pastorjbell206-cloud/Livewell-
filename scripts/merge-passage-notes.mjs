import fs from "fs";

const titleMap = {
  soteriology: "How Are We Saved?", christology: "Who Is Jesus?", "last-things": "How Does It End?",
  church: "What Is the Church?", "holy-spirit": "The Holy Spirit and His Gifts", "god-and-trinity": "Who Is God? The Trinity",
  sin: "Sin and the Fall", anthropology: "What Is a Human Being?", "covenant-frameworks": "How the Whole Story Fits",
  scripture: "What Is the Bible, and Can We Trust It?", creation: "Creation and Providence",
};
const noteMap = {
  soteriology: "How grace, election, and the human will fit together is read across this passage. The doctrine page lays out the views fairly.",
  christology: "This passage feeds how the church confesses who Jesus is. The doctrine page gives the orthodox view and the alternatives it set aside.",
  "last-things": "This passage shapes how Christians picture the end. The doctrine page holds the shared hope apart from the contested timing.",
  church: "This passage touches what the church is and how its signs work. The doctrine page lays out the traditions fairly.",
  "holy-spirit": "This passage feeds the discussion of the Spirit and his gifts. The doctrine page lays out the views fairly.",
  "god-and-trinity": "This passage stands behind how the church came to confess one God in three persons. The doctrine page works it through.",
  sin: "This passage feeds how Christians understand the fall and original sin. The doctrine page lays out the views fairly.",
  anthropology: "This passage touches what a human being is, body and soul. The doctrine page lays out the views fairly.",
  "covenant-frameworks": "How the covenants and the place of Israel fit together is read across this passage. The doctrine page compares the frameworks.",
  scripture: "This passage feeds how Christians understand the nature and power of the word of God. The doctrine page works it through.",
  creation: "This passage feeds how Christians understand creation and providence. The doctrine page lays out the views fairly.",
};

function normSpectrum(sp) {
  let slug, note;
  if (typeof sp === "string") { slug = sp; note = noteMap[slug]; }
  else if (sp && typeof sp === "object") { slug = sp.doctrine || sp.slug; note = sp.note || noteMap[slug]; }
  else return null;
  if (!titleMap[slug]) return null;
  return { note: note || noteMap[slug], doctrine: slug, doctrineTitle: titleMap[slug] };
}

const dir = "client/public/theology";
const notes = JSON.parse(fs.readFileSync(`${dir}/passage-notes.json`, "utf8"));
let added = 0, fixed = 0;
for (let i = 1; i <= 8; i++) {
  const extra = JSON.parse(fs.readFileSync(`${dir}/px-${i}.json`, "utf8"));
  for (const [k, v] of Object.entries(extra)) {
    if (v.spectrum) {
      const wasString = typeof v.spectrum === "string";
      const ns = normSpectrum(v.spectrum);
      if (ns) { v.spectrum = ns; if (wasString) fixed++; } else delete v.spectrum;
    }
    notes[k] = notes[k] ? { ...notes[k], ...v } : v;
    added++;
  }
}
const sorted = {};
for (const k of Object.keys(notes).sort()) sorted[k] = notes[k];
fs.writeFileSync(`${dir}/passage-notes.json`, JSON.stringify(sorted, null, 2) + "\n");
console.log(`merged entries: ${added} | spectrum strings fixed: ${fixed} | total notes now: ${Object.keys(sorted).length}`);

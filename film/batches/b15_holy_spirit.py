"""Batch 15 film: "The Holy Spirit through the Bible" (slug holy-spirit). Sources, and nothing else: the old Bible
Explorer film client/public/explorer/films/holy-spirit.json (older captions, its differ note) with its rows in
docs/work/elite/explorer-ledger.md ("The Holy Spirit" / "Holy Spirit" rows); the doctrine page
client/public/bible/doctrines/spirit.json; the Study Bible notes client/public/bible/notes/genesis/1.json,
ezekiel/37.json, joel/2.json and acts/2.json; and the Honest Answer "how-can-god-be-three-and-one" in
client/src/data/answers.ts. A "big idea" film: one theme from Genesis to Revelation. The sibling film
spirit-in-a-believer covers fruit, gifts and adoption, so this one does not. Where Christians differ (Genesis 1:2,
Ezekiel 37, Pentecost as pattern, the gifts today) the views are named and no side is taken. The Spirit is never
drawn or described as an object or a force. The old film has no care lines.
Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film holy-spirit (with its explorer-ledger rows), the doctrine page client/public/bible/doctrines/spirit.json, the Study Bible notes on Genesis 1, Ezekiel 37, Joel 2 and Acts 2, and the Honest Answer how-can-god-be-three-and-one in client/src/data/answers.ts."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("holy-spirit", "The Holy Spirit through the Bible", "/study/explorer/watch/holy-spirit", [
  {"id": "waters", "kicker": "Over the dark waters", "level": 0.2, "lines": [
    "Before light, land or life, the Bible's second verse already names him.",
    "And the Spirit of God was hovering over the surface of the waters.",
    "The Hebrew word is ruach. It can mean wind, breath, or spirit, and context decides which.",
    "Some Bibles read “a wind from God.” But this verb for hovering is used elsewhere only of an eagle over its young: which favors a living presence over a gust."],
   "scripture": S("Genesis 1:2", "And the Spirit of God was hovering over the surface of the waters.", True)},
  {"id": "breath", "kicker": "The breath of life", "level": 0.3, "lines": [
    "That one word ties the Spirit to life itself. Job says,",
    "The Spirit of God has made me, and the breath of the Almighty gives me life.",
    "Pause here and ask yourself: whose breath are you breathing right now?"],
   "scripture": S("Job 33:4", "The Spirit of God has made me, and the breath of the Almighty gives me life.", True)},
  {"id": "few", "kicker": "On a few, for a task", "level": 0.4, "lines": [
    "Then the Spirit comes on particular people for particular work: Bezalel the craftsman, Gideon the judge. And when Samuel anoints David,",
    "the Spirit of the LORD rushed upon David from that day forward.",
    "The prophets spoke as they were carried along by the Holy Spirit. But it was a few, for a season."],
   "scripture": S("1 Samuel 16:13", "the Spirit of the LORD rushed upon David from that day forward.", True)},
  {"id": "promise", "kicker": "A wish becomes a promise", "level": 0.45, "lines": [
    "Moses said, “I wish that all the LORD’s people were prophets.” The prophets turn that wish into God's promise. Through Ezekiel God says,",
    "I will remove your heart of stone and give you a heart of flesh.",
    "And, “I will put My Spirit within you.” Not on a few leaders, but within a people."],
   "scripture": S("Ezekiel 36:26", "I will remove your heart of stone and give you a heart of flesh.", True)},
  {"id": "bones", "kicker": "Can these bones live?", "level": 0.5, "lines": [
    "After Jerusalem fell, in 587 or 586 BC, the exiles said, our bones are dried up, and our hope has perished.",
    "God sets Ezekiel in a valley of very dry bones and asks, “Son of man, can these bones come to life?” What would you say?",
    "Ezekiel answers, “only You know.” The bones come together, but there's no breath in them. Then he prophesies to the breath, and they stand up alive. It's Genesis 2 again: first a body, then breath.",
    "Most scholars read it as the nation's return from exile. Many Christians also hear the resurrection in it. Both agree only God's word and Spirit give life to the dead."],
   "scripture": S("Ezekiel 37:3", "Son of man, can these bones come to life?", True)},
  {"id": "all", "kicker": "On all people", "level": 0.55, "lines": [
    "Joel widens the promise past every line Israel drew.",
    "I will pour out My Spirit on all people. Your sons and daughters will prophesy.",
    "Servants too, without regard to age, sex, or social standing."],
   "scripture": S("Joel 2:28", "I will pour out My Spirit on all people. Your sons and daughters will prophesy", True)},
  {"id": "jordan", "kicker": "At the Jordan", "level": 0.6, "lines": [
    "As Jesus comes up out of the Jordan, the heavens break open, the Spirit descends like a dove, and a voice says,",
    "You are My beloved Son; in You I am well pleased.",
    "Father, Son and Spirit, in one scene. Christians confess one God in three persons: one what, three whos. That's a mystery, something we can't see to the bottom of. It isn't a contradiction."],
   "scripture": S("Mark 1:11", "You are My beloved Son; in You I am well pleased.", True)},
  {"id": "advocate", "kicker": "Someone, not something", "level": 0.6, "lines": [
    "The night before he died, Jesus promised “another Advocate to be with you forever,” one called alongside to help.",
    "A fair question: is the Spirit someone, or something? Jesus says “Him.” The Spirit teaches, can be grieved, and intercedes.",
    "Lying to the Holy Spirit, Peter said, is lying to God. The Spirit isn't a force. He is God, as much a person as the Father and the Son."],
   "scripture": S("John 14:16", "another Advocate to be with you forever", True)},
  {"id": "pentecost", "kicker": "The promise kept", "level": 0.75, "lines": [
    "Fifty days after Passover, at Pentecost, Jerusalem is full of pilgrims. Suddenly a sound like a mighty rushing wind came from heaven and filled the whole house.",
    "Tongues like flames of fire rest on each of them, and the crowd hears the wonders of God in its own languages.",
    "Peter says, “this is what was spoken by the prophet Joel.” Then the gift crosses boundaries, to Samaritans, then to Gentiles."],
   "scripture": S("Acts 2:2", "Suddenly a sound like a mighty rushing wind came from heaven and filled the whole house", True)},
  {"id": "differ", "kicker": "Where churches differ", "level": 0.5, "lines": [
    "Is Pentecost a pattern for every believer, or a once-for-all event?",
    "Pentecostal and many charismatic Christians see a baptism in the Spirit that may follow conversion. Many evangelicals say every believer receives the Spirit at conversion. Some hold that the miraculous gifts continue, others that they ceased with the apostles. This film doesn't choose.",
    "All confess that the Spirit lives in everyone who belongs to Christ. Together they are God's temple."],
   "scripture": S("1 Corinthians 3:16", "Do you not know that you yourselves are God’s temple, and that God’s Spirit dwells in you?")},
  {"id": "come", "kicker": "The last invitation", "level": 0.8, "lines": [
    "On the Bible's last page the Spirit is still speaking, with the bride, all God's people.",
    "The Spirit and the bride say, “Come!”",
    "The Spirit who hovered over the first waters now offers the water of life, freely, to anyone who is thirsty."],
   "scripture": S("Revelation 22:17", "The Spirit and the bride say, “Come!”", True),
   "titleCard": ["From the first page to the last, the Spirit gives life.", END]},
], NOTE)

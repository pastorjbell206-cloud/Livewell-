"""Batch 16 film: "Promises that build: the covenants" (slug covenant). Sources, and nothing else: the old Bible
Explorer film client/public/explorer/films/covenant.json (older captions, its think question and differ note) with
its rows in docs/work/elite/explorer-ledger.md ("covenant 1" to "covenant, left out"); the doctrine page
client/public/bible/doctrines/covenant.json; and the Study Bible notes client/public/bible/notes/genesis/15.json,
jeremiah/31.json and hebrews/intro.json (its teaching part "The old covenant and the Jewish people").
A "big idea" film: one theme from Noah to the Bible's last page. Where Christians differ (covenant theology, Baptist
covenant theology, dispensationalism, progressive covenantalism, new covenant theology; how Israel and the church
relate) the views are named and no side is taken. Nothing blames the Jewish people or treats Israel's covenant with
contempt; the Hebrews chapter carries the Study Bible's own rejection of that misuse. The old film's care line
(Jesus' death) stays on the page, word for word, and is not in the narration. No date is given for any covenant,
no position on the flood's extent, and no modern nation or land claim.
Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film covenant (with its explorer-ledger rows), the doctrine page client/public/bible/doctrines/covenant.json, and the Study Bible notes on Genesis 15, Jeremiah 31 and the Hebrews introduction."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("covenant", "Promises that build: the covenants", "/study/explorer/watch/covenant", [
  {"id": "what", "kicker": "What a covenant is", "level": 0.2, "lines": [
    "Follow one word through the Bible and the whole story opens: covenant.",
    "A covenant is a binding relationship, sealed by an oath, often with a sign or a sacrifice. Ancient people made them between kings and peoples, neighbors, husband and wife.",
    "The Bible's astonishing claim is that God binds himself this way to human beings."]},
  {"id": "treaty", "kicker": "A great king's treaty", "level": 0.25, "lines": [
    "Since George Mendenhall in 1954, scholars have compared Sinai and Deuteronomy with Hittite treaties: a king's history of what he'd done, then terms, witnesses, blessings and curses.",
    "They debate which parallels fit. But Israel understood its bond with God in a familiar shape: a great king's covenant with his people."]},
  {"id": "noah", "kicker": "The bow in the clouds", "level": 0.3, "lines": [
    "The word first appears with Noah. After the flood, God covenants with Noah and every living creature: never again a flood to destroy the earth.",
    "I have set My rainbow in the clouds, and it will be a sign of the covenant between Me and the earth.",
    "It rests on God's promise alone."],
   "scripture": S("Genesis 9:13", "I have set My rainbow in the clouds, and it will be a sign of the covenant between Me and the earth.", True)},
  {"id": "stars", "kicker": "Count the stars", "level": 0.4, "lines": [
    "Abram is promised land, a family, and blessing for all the families of the earth. Years pass with no son. God takes him outside at night.",
    "“Now look to the heavens and count the stars, if you are able. So shall your offspring be.” And Abram believed the LORD."],
   "scripture": S("Genesis 15:5", "Now look to the heavens and count the stars, if you are able.", True)},
  {"id": "pieces", "kicker": "Between the pieces", "level": 0.5, "lines": [
    "God seals it in an ancient form. Animals are cut in two. Whoever walked between the pieces was saying, may this happen to me if I break my word. Usually that was the weaker party.",
    "Pause here and ask yourself: who should walk that path?",
    "Abram sleeps. After dark, a smoking firepot and a flaming torch appeared and passed between the halves. God alone passes through, binding himself.",
    "Many Christians see the cross here. That's a reading of the pattern, not a link the New Testament draws."],
   "scripture": S("Genesis 15:17", "a smoking firepot and a flaming torch appeared and passed between the halves", True)},
  {"id": "sinai", "kicker": "Rescue, then the law", "level": 0.55, "lines": [
    "At Sinai, God starts with rescue: I carried you on eagles’ wings and brought you to Myself.",
    "Only then the covenant, and even the commandments open with grace: “I am the LORD your God, who brought you out of the land of Egypt.”",
    "Moses sprinkles the people and says, “This is the blood of the covenant.” Remember those words."],
   "scripture": S("Exodus 19:4", "I carried you on eagles’ wings and brought you to Myself.", True)},
  {"id": "david", "kicker": "A house for David", "level": 0.55, "lines": [
    "David wants to build God a house. Instead God promises David a house, a family line.",
    "Your house and kingdom will endure forever before Me, and your throne will be established forever.",
    "Every later hope of a king from David's line grows here."],
   "scripture": S("2 Samuel 7:16", "Your house and kingdom will endure forever before Me, and your throne will be established forever.", True)},
  {"id": "new", "kicker": "Written on hearts", "level": 0.6, "lines": [
    "But Israel broke the covenant, and exile came, as the covenant had warned. In that dark, Jeremiah announces “a new covenant with the house of Israel and with the house of Judah.”",
    "I will put My law in their minds and inscribe it on their hearts.",
    "A fair question: what's new? Not the goal. I will be their God, and they will be My people. What's new is that God changes the people, and remembers their sins no more."],
   "scripture": S("Jeremiah 31:33", "I will put My law in their minds and inscribe it on their hearts.", True)},
  {"id": "cup", "kicker": "The cup at the supper", "level": 0.7, "lines": [
    "The night before he died, at the Passover meal, Jesus takes the cup.",
    "This cup is the new covenant in My blood, which is poured out for you.",
    "Hear Moses' blood of the covenant and Jeremiah's forgiveness. Jesus read his own death as the sacrifice that sets up the covenant the prophets promised."],
   "scripture": S("Luke 22:20", "This cup is the new covenant in My blood, which is poured out for you.", True)},
  {"id": "hebrews", "kicker": "Obsolete, not rejected", "level": 0.55, "lines": [
    "Hebrews quotes Jeremiah in full and says, “By speaking of a new covenant, He has made the first one obsolete.”",
    "Some Christians long used those words to teach contempt for Jews. That reading is false. A Jewish writer honors the old covenant as God's gift, and finds fault with the people, not God's law.",
    "Paul asks, did God reject His people? Certainly not!"],
   "scripture": S("Romans 11:1", "did God reject His people? Certainly not!", True)},
  {"id": "yes", "kicker": "Every promise, Yes", "level": 0.8, "lines": [
    "How do the covenants, Israel and the church fit together? Covenant theology, dispensationalism, progressive covenantalism and others answer differently. This film doesn't choose.",
    "All agree the whole Bible leads to Christ, and none teaches that God has abandoned the Jewish people.",
    "Look back: the rainbow, the stars, the rescue, the throne, the cup. Each time God gives before he asks. Why might that matter?",
    "The Bible's last vision gathers it into one sentence: They will be His people, and God Himself will be with them as their God."],
   "scripture": S("Revelation 21:3", "They will be His people, and God Himself will be with them as their God.", True),
   "titleCard": ["God binds himself by his word, and every covenant rests on it.", END]},
], NOTE)

"""Batch 2 of the rebuilt Bible Explorer films: Leviticus, Numbers, Deuteronomy, Joshua, Judges.
Every claim comes from the old film's own captions and its "differ" note (client/public/explorer/films/book-<slug>.json).
On the wars and the hard chapters the old films' own sentences are kept almost word for word, and no side is taken."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Where Christians differ the old film's own sentences are kept nearly word for word. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/book-{b}"

write("book-leviticus", "Leviticus: living near a holy God", P("leviticus"), [
  {"id": "near", "kicker": "The question it answers", "level": 0.2, "lines": [
    "Leviticus begins where Exodus ends. The tent is built, and God's glory fills it, so that even Moses can't go in.",
    "So here's the question. How can a holy God live among people who aren't holy, and the people live? This book is God's own answer.",
    "I will walk among you and be your God, and you will be My people."],
   "scripture": S("Leviticus 26:12", "I will walk among you and be your God, and you will be My people.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It has six parts. The offerings. The priests. Clean and unclean. The Day of Atonement, right at the center. Holiness in all of life. And vows.",
    "The first half is about how to come near to God. The second is about how to live near him."],
   "scripture": S("Leviticus 19:2", "Be holy because I, the LORD your God, am holy.")},
  {"id": "gifts", "kicker": "Watch for: gifts brought near", "level": 0.5, "lines": [
    "The Hebrew word for an offering means something brought near. There were five kinds, from the burnt offering given whole to the peace offering shared at a family meal.",
    "God himself gives the means of atonement. And the poor could bring two birds, or flour."],
   "scripture": S("Leviticus 4:31", "the priest will make atonement for him, and he will be forgiven.")},
  {"id": "clean", "kicker": "Watch for: holy and clean", "level": 0.6, "lines": [
    "Clean and unclean are about being fit to come near the holy place. Unclean doesn't mean sinful. A new mother or a mourner had done nothing wrong, and it ended with time and washing.",
    "No one should use this book to call another person dirty."],
   "scripture": S("Leviticus 10:10", "You must distinguish between the holy and the common")},
  {"id": "atonement", "kicker": "Watch for: the Day of Atonement", "level": 0.8, "lines": [
    "Once a year the high priest, in plain linen, went behind the curtain into the Most Holy Place. And a goat carried the people's confessed sins away into the wilderness.",
    "Jews still keep the day as Yom Kippur. Christians read it in the light of Jesus, as the book of Hebrews does."],
   "scripture": S("Leviticus 16:30", "because on this day atonement will be made for you to cleanse you")},
  {"id": "neighbor", "kicker": "Watch for: love your neighbor", "level": 0.9, "lines": [
    "Then holiness leaves the tent for the field, the court, and the shop. Leave the edges of your field for the poor. Pay wages the same day. Judge fairly. Love the foreigner, because you were foreigners in Egypt.",
    "And at the center of it all:",
    "Love your neighbor as yourself. I am the LORD."],
   "scripture": S("Leviticus 19:18", "love your neighbor as yourself. I am the LORD.", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "All Christians read Leviticus as God's word, and none of them offer its sacrifices, because Christ offered one sacrifice for sins for all time. They differ on how its laws apply now.",
    "On any reading, nothing here gives anyone a reason for contempt toward any person."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapters sixteen and nineteen. Then the key chapters: one, ten, eleven, seventeen, twenty-five, and twenty-six.",
    "Read it as the working rules of a sacred house."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "It asks what it would mean for a whole life to belong to God."],
   "titleCard": ["A whole life that belongs to God.", "LiveWell by James Bell"]},
], NOTE)

write("book-numbers", "Numbers: forty years in the wilderness", P("numbers"), [
  {"id": "wilderness", "kicker": "In the wilderness", "level": 0.2, "lines": [
    "Numbers carries Israel from Sinai to the edge of the promised land. And it tells why a trip of a few weeks took about forty years.",
    "It's honest about what can happen after a rescue. And it's just as honest about God, who stays with people who keep failing."],
   "scripture": S("Numbers 9:23", "They camped at the LORD’s command, and they set out at the LORD’s command")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Two counts frame the book. First the generation that left Egypt, counted at Sinai. Then their children, counted on the plains of Moab.",
    "In between come the march, the complaints, the refusal at Kadesh, Balaam, and Peor."],
   "scripture": S("Numbers 14:31", "But I will bring your children")},
  {"id": "camp", "kicker": "Watch for: God at the center", "level": 0.5, "lines": [
    "The camp is arranged around God. The tribes on four sides, the Levites nearest, and God's tent at the center.",
    "Then comes one of the oldest blessings in the Bible. It's God's own gift. The priests only speak it.",
    "May the LORD bless you and keep you."],
   "scripture": S("Numbers 6:24", "May the LORD bless you and keep you", True)},
  {"id": "kadesh", "kicker": "Watch for: the refusal", "level": 0.7, "lines": [
    "Twelve scouts go into the land. All twelve agree it's good. Ten say it can't be taken.",
    "The people hadn't miscounted the enemy. They had decided God couldn't be trusted. Moses pleads, God pardons, and still the refusal shapes the rest of their lives."],
   "scripture": S("Numbers 14:11", "How long will they refuse to believe in Me")},
  {"id": "balaam", "kicker": "Watch for: a curse turned to blessing", "level": 0.8, "lines": [
    "Balak of Moab hires a seer named Balaam to curse Israel. Four times he opens his mouth, and four times he can only bless.",
    "His last oracle sees a star coming out of Jacob. Jewish readers before Jesus took it as a coming king, and Christians read it of Christ. Israel, down below, knows nothing about any of it."],
   "scripture": S("Numbers 24:17", "A star will come forth from Jacob")},
  {"id": "new", "kicker": "Watch for: the new generation", "level": 0.85, "lines": [
    "The second count shows the promise outliving the people who refused it. Five daughters ask for their father's share, and God says they speak correctly."],
   "scripture": S("Numbers 27:7", "The daughters of Zelophehad speak correctly.")},
  {"id": "differ", "kicker": "The hard pages", "level": 0.55, "lines": [
    "The wars are hard pages, and Christians who receive this book as God's word read them in more than one way. On every reading, the commands were tied to one land and one time.",
    "No one may use any page of this book as a reason for violence against anyone."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapters thirteen and fourteen. Then the key chapters: six, sixteen, twenty, twenty-one, twenty-four, and twenty-six.",
    "Read the stories and the laws together, and watch Moses pray."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "The book asks whether God can be trusted with what lies ahead."],
   "titleCard": ["Can God be trusted with what lies ahead?", "LiveWell by James Bell"]},
], NOTE)

write("book-deuteronomy", "Deuteronomy: love the LORD with all your heart", P("deuteronomy"), [
  {"id": "farewell", "kicker": "Moses says goodbye", "level": 0.2, "lines": [
    "Deuteronomy is almost all speech. Moses is at the end of his life, on the plains of Moab, preaching to the children of the generation that left Egypt.",
    "He tells the story again, gives the law again, and pleads with them to hold on to God when he's gone."],
   "scripture": S("Deuteronomy 1:1", "These are the words that Moses spoke to all Israel")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It has three addresses and a farewell. Moses looks back on the road. At the center he repeats the Ten Commandments and sets out the laws for the land. He renews the covenant. And he blesses the tribes.",
    "One small word holds it all together. Today."],
   "scripture": S("Deuteronomy 5:3", "with all of us who are alive here today.")},
  {"id": "shema", "kicker": "Watch for: the Shema", "level": 0.55, "lines": [
    "At the center stand two verses called the Shema. One God, loved with heart, soul, and strength.",
    "And you shall love the LORD your God with all your heart.",
    "Love here is a settled loyalty, shown in listening and obeying, and the words are meant to fill ordinary life. Jews have said them morning and evening for more than two thousand years."],
   "scripture": S("Deuteronomy 6:5", "And you shall love the LORD your God with all your heart", True)},
  {"id": "chosen", "kicker": "Watch for: chosen in love", "level": 0.65, "lines": [
    "God chose Israel not for its size or its goodness, but because he loved them.",
    "Being chosen is a task. It's never a license to look down on anyone, and God loves the foreigner. So the great duty of the book is to remember."],
   "scripture": S("Deuteronomy 7:8", "But because the LORD loved you")},
  {"id": "laws", "kicker": "Watch for: whose side the laws take", "level": 0.75, "lines": [
    "The laws take the side of the powerless: the widow, the orphan, the foreigner, the debtor, the worker."],
   "scripture": S("Deuteronomy 24:15", "You are to pay his wages each day before sunset")},
  {"id": "differ", "kicker": "The hardest page", "level": 0.6, "lines": [
    "The command about the peoples of Canaan is the hardest page, and Christians read it in more than one way. On every reading, it was tied to one land and one time.",
    "No one may use these chapters to justify violence against any person or people."]},
  {"id": "choose", "kicker": "Watch for: choose life", "level": 0.9, "lines": [
    "The blessings and curses of chapter twenty-eight speak to a nation about a land. They're never God's verdict on one person's illness or loss.",
    "Then comes the promise that God will change the heart itself, and the plea to choose life.",
    "I have set before you life and death, blessing and cursing.",
    "And Moses sees the land he will not enter."],
   "scripture": S("Deuteronomy 30:19", "I have set before you life and death, blessing and cursing.", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapters six and thirty. Then the key chapters: one, four, eight, twelve, eighteen, and thirty-four. Read it as preaching, out loud."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "And keep the order straight. God's love comes first, and obedience answers it."],
   "titleCard": ["God's love comes first. Obedience answers it.", "LiveWell by James Bell"]},
], NOTE)

write("book-joshua", "Joshua: a promise kept", P("joshua"), [
  {"id": "promise", "kicker": "The promised land", "level": 0.2, "lines": [
    "Joshua opens where Deuteronomy ends. Moses is dead, and Israel is camped east of the Jordan.",
    "Joshua's name means the LORD saves. In Greek, it's the same word as the name Jesus."],
   "scripture": S("Joshua 1:2", "cross over the Jordan into the land that I am giving to the children of Israel.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The book has four movements: entering, taking, dividing, and serving.",
    "The long lists of towns and borders in the third part were title deeds. They say that God's promises land on the ground."],
   "scripture": S("Joshua 21:45", "Not one of all the LORD’s good promises to the house of Israel had failed")},
  {"id": "river", "kicker": "Watch for: the river", "level": 0.5, "lines": [
    "Watch the crossing. When the priests carrying the ark step into the flooded Jordan, the river stops.",
    "It's the Red Sea again, for a generation that never saw the first one. And twelve stones are set up so that children will ask."],
   "scripture": S("Joshua 4:24", "so that all the peoples of the earth may know that the hand of the LORD is mighty")},
  {"id": "hard", "kicker": "Watch for: the hardest chapters", "level": 0.6, "lines": [
    "At Jericho and after, the book says whole cities were devoted to destruction at God's command, the young with the old.",
    "Christians read this in more than one way, and none of them makes it easy. On every reading, it was tied to one land and one moment, and it was never renewed.",
    "No one may use these chapters to justify violence against any person or people."]},
  {"id": "belong", "kicker": "Watch for: who belongs", "level": 0.75, "lines": [
    "Watch who belongs. Rahab, a Canaanite, confesses Israel's God and is taken in with her family. Achan, an Israelite, steals from what was devoted to God and falls under the ban himself.",
    "The line runs through faith, not birth."],
   "scripture": S("Joshua 2:11", "the LORD your God is God in the heavens above and on the earth below.")},
  {"id": "choose", "kicker": "Watch for: rest, and a choice", "level": 0.9, "lines": [
    "In the end God gives rest on every side. At Shechem, old Joshua retells the whole story, from Abraham's family serving other gods to the gift of the land.",
    "Only then comes the call.",
    "Choose for yourselves this day whom you will serve.",
    "The kindness comes first."],
   "scripture": S("Joshua 24:15", "choose for yourselves this day whom you will serve", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start at chapter one. Then the key chapters: two, three, six, seven, twenty-one, and twenty-four. Read the whole book, not only the battles.",
    "Don't skip the hard chapters. And don't read them alone."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Joshua is the story of a promise kept.",
    "For the LORD your God is with you wherever you go."],
   "scripture": S("Joshua 1:9", "for the LORD your God is with you wherever you go.", True),
   "titleCard": ["A promise kept.", "LiveWell by James Bell"]},
], NOTE)

write("book-judges", "Judges: a people coming apart", P("judges"), [
  {"id": "dark", "kicker": "The dark years", "level": 0.2, "lines": [
    "Judges covers the years after Joshua and before the kings.",
    "A generation grows up not knowing the LORD. And the book becomes an honest account of a people coming apart, and of a God who wouldn't give them up."],
   "scripture": S("Judges 2:10", "another generation rose up who did not know the LORD or the works that He had done for Israel.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "An opening shows the land half taken and sets out a pattern. Then come the judges: from Othniel to Gideon, from Abimelech to Jephthah, and Samson.",
    "The last five chapters have no judge at all. The beginning and the end answer each other."],
   "scripture": S("Judges 2:16", "Then the LORD raised up judges")},
  {"id": "wheel", "kicker": "Watch for: the wheel", "level": 0.5, "lines": [
    "Chapter two sets out a wheel. Israel serves other gods. Raiders come. The people cry out. And God raises up a judge. Then it starts again.",
    "Mercy holds the wheel up, but it runs downhill. It's a spiral, not a circle."],
   "scripture": S("Judges 2:18", "for the LORD was moved to pity by their groaning")},
  {"id": "deliverers", "kicker": "Watch for: unlikely deliverers", "level": 0.65, "lines": [
    "Look who God uses. A left-handed man. A woman. A farmer threshing in a winepress. The son of a prostitute. And a man who breaks nearly every vow.",
    "The deliverance is God's, carried out through very human hands."]},
  {"id": "flaws", "kicker": "Watch for: gifts are not goodness", "level": 0.75, "lines": [
    "The Spirit of the LORD comes on Gideon, Jephthah, and Samson. But power isn't character. Gideon makes an object all Israel worships. Jephthah's rash vow costs his daughter.",
    "Judges never treats God's gift as approval."],
   "scripture": S("Judges 8:27", "it became a snare to Gideon and his household.")},
  {"id": "no-king", "kicker": "Watch for: no king in Israel", "level": 0.9, "lines": [
    "The last chapters tell of a stolen idol, an outrage at Gibeah, and a civil war. The book presents them as the depths, never as a pattern.",
    "In those days there was no king in Israel; everyone did what was right in his own eyes."],
   "scripture": S("Judges 21:25", "In those days there was no king in Israel; everyone did what was right in his own eyes.", True)},
  {"id": "differ", "kicker": "Where readers differ", "level": 0.55, "lines": [
    "Readers weigh several of these stories in more than one way, and they differ on what that last line is asking for: a king, the LORD's own rule, or both.",
    "On every reading, the book gives no nation, no church, and no person a warrant for violence against anyone."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter two, slowly. Then the key chapters: four, six, nine, eleven, sixteen, and twenty-one.",
    "Watch the refrains. Don't take the judges as models. And don't read the hard chapters alone."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Judges doesn't end with a solution. It ends with a need."],
   "titleCard": ["It ends with a need.", "LiveWell by James Bell"]},
], NOTE)

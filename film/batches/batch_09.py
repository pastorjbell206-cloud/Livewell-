"""Batch 9 of the rebuilt Bible Explorer films: the first five beliefs (who God is, the image of God, what sin is,
who Jesus is, why Jesus died). Every claim comes from the old film's own captions and its "differ" note.
God is never drawn and the Trinity gets no picture from inside the world. The cross: the ways of explaining it are
named and none is chosen. Blaming the Jewish people for Jesus' death is named as a lie, in the old film's words."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("who-god-is", "Who God is: Father, Son and Holy Spirit", P("who-god-is"), [
  {"id": "one", "kicker": "One God", "level": 0.2, "lines": [
    "The Bible begins where Israel began, with Israel's daily confession.",
    "Hear, O Israel: The LORD our God, the LORD is One.",
    "Jesus called it the most important commandment. The first Christians were Jews who prayed these words, and they never stopped. There is one God and no other."],
   "scripture": S("Deuteronomy 6:4", "Hear, O Israel: The LORD our God, the LORD is One.", True)},
  {"id": "father", "kicker": "The Father", "level": 0.35, "lines": [
    "Paul takes Israel's own confession and speaks of one God, the Father, from whom all things came and for whom we exist. The Father is God.",
    "The Bible gives no picture of him, and this film doesn't draw one. Jesus taught his followers to pray to our Father in heaven."],
   "scripture": S("1 Corinthians 8:6", "yet for us there is but one God, the Father, from whom all things came and for whom we exist.")},
  {"id": "son", "kicker": "The Son", "level": 0.5, "lines": [
    "John opens his Gospel this way.",
    "In the beginning was the Word, and the Word was with God, and the Word was God.",
    "With God, and God. When Thomas meets the risen Jesus behind locked doors, he calls him my Lord and my God. The Son is fully God, and in Jesus he also became fully man."],
   "scripture": S("John 1:1", "In the beginning was the Word, and the Word was with God, and the Word was God.", True)},
  {"id": "spirit", "kicker": "The Holy Spirit", "level": 0.6, "lines": [
    "The Spirit is not a force God uses. The Bible speaks of him as God. When Ananias lied to the Holy Spirit, Peter told him he had not lied to men, but to God.",
    "And the Spirit is everywhere, as only God is.",
    "Where can I go to escape Your Spirit? Where can I flee from Your presence?"],
   "scripture": S("Psalm 139:7", "Where can I go to escape Your Spirit? Where can I flee from Your presence?", True)},
  {"id": "jordan", "kicker": "Three, seen together", "level": 0.75, "lines": [
    "At the Jordan the three are seen together, and none of them is the other. The Son comes up out of the water. The Spirit descends on him like a dove. And the Father speaks from heaven.",
    "You are My beloved Son; in You I am well pleased.",
    "The Father is not the Son, and the Son is not the Spirit."],
   "scripture": S("Mark 1:11", "You are My beloved Son; in You I am well pleased.", True)},
  {"id": "name", "kicker": "One name", "level": 0.85, "lines": [
    "The risen Jesus sends his followers out, baptizing in the name of the Father, and of the Son, and of the Holy Spirit. One name.",
    "Christians say God is one in being and three in persons, each fully God, and one God. Or more simply: one what, three whos.",
    "Not three gods. Not one person in three masks. Not three parts."],
   "scripture": S("Matthew 28:19", "baptizing them in the name of the Father, and of the Son, and of the Holy Spirit")},
  {"id": "pictures", "kicker": "Why every picture breaks", "level": 0.6, "lines": [
    "Every picture from inside the world breaks, and each teaches an old mistake. Water as ice, liquid, and steam is one thing in three forms. That's one person in three masks.",
    "A clover makes each person a third of God, when each is wholly God. Three people sharing one nature would be three gods. The church weighed these long ago and set them aside.",
    "To whom will you liken God? To what image will you compare Him?"],
   "scripture": S("Isaiah 40:18", "To whom will you liken God? To what image will you compare Him?", True)},
  {"id": "creed", "kicker": "Words, not a picture", "level": 0.7, "lines": [
    "So instead of a picture, Christians keep the Bible's words and the creed's. The Nicene Creed calls the Son God of God, Light of Light, very God of very God.",
    "The family catechism calls this not a riddle to solve but a wonder to receive. God has always been love."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with all of you."],
   "scripture": S("2 Corinthians 13:14", "The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with all of you.", True),
   "titleCard": ["One God: Father, Son and Holy Spirit.", END]},
], NOTE)

write("image-of-god", "Creation and the image of God", P("image-of-god"), [
  {"id": "beginning", "kicker": "In the beginning", "level": 0.2, "lines": [
    "In the beginning God created the heavens and the earth.",
    "Genesis opens with God already there. Nothing comes before him, and nothing helps him.",
    "Christians confess that God made all things, seen and unseen, out of nothing, by the word of his power."],
   "scripture": S("Genesis 1:1", "In the beginning God created the heavens and the earth.", True)},
  {"id": "good", "kicker": "Very good", "level": 0.4, "lines": [
    "Day by day the empty world is given shape and then filled. Six times God calls what he made good. The seventh time, very good.",
    "The world is not a mistake or a prison. It's a gift."],
   "scripture": S("Genesis 1:31", "And God looked upon all that He had made, and indeed, it was very good.")},
  {"id": "image", "kicker": "In his image", "level": 0.6, "lines": [
    "People come last, and they are different. In the ancient world a king could be called the image of a god. Genesis gives that dignity to every person, male and female, not only to kings.",
    "So God created man in His own image; in the image of God He created him; male and female He created them."],
   "scripture": S("Genesis 1:27", "So God created man in His own image; in the image of God He created him; male and female He created them.", True)},
  {"id": "for", "kicker": "Made for God", "level": 0.7, "lines": [
    "Being made in God's image means we were made to know him, to reflect his character, and to rule over and care for his world as those who answer to him.",
    "We were made for God himself."],
   "scripture": S("Isaiah 43:7", "everyone called by My name and created for My glory, whom I have indeed formed and made.")},
  {"id": "work", "kicker": "Image and work", "level": 0.6, "lines": [
    "Image and work arrive together. God blesses the man and the woman and gives them the earth to rule and to care for on his behalf.",
    "To tend it and keep it, not to spoil it for themselves."],
   "scripture": S("Genesis 2:15", "Then the LORD God took the man and placed him in the Garden of Eden to cultivate and keep it.")},
  {"id": "worth", "kicker": "Given, not earned", "level": 0.8, "lines": [
    "The image is given, not earned. A newborn, a man with advanced dementia, and the most gifted adult in the room have the same worth, because their worth was never a ranking of what they can do.",
    "Many who don't believe in God hold the same belief, and live it well."],
   "scripture": S("Psalm 8:5", "You crowned him with glory and honor.")},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "That God created, that he created from nothing, and that humanity bears his image are what all Christians confess.",
    "The age of the earth and the way God created are open questions, and faithful Christians who love the same Bible have landed in different places. This film takes no side on the age of the earth or on evolution."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "We were made for God himself."],
   "titleCard": ["Made in the image of God.", END]},
], NOTE)

write("what-sin-is", "What sin is", P("what-sin-is"), [
  {"id": "love", "kicker": "Made for love", "level": 0.2, "lines": [
    "Jesus summed up what God asks in two commands. Love the Lord your God with all your heart, soul, mind, and strength. And love your neighbor as yourself.",
    "Made for that love, people were joined to God, to each other, to themselves, and to the world he gave them."],
   "scripture": S("Mark 12:30", "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.")},
  {"id": "root", "kicker": "The root", "level": 0.45, "lines": [
    "In Genesis three, the serpent doesn't start with the fruit. He starts by making God sound mean. Then he makes a promise: you will be like God.",
    "At its root, sin is not trusting that God is good, and wanting to be our own god, deciding good and evil for ourselves."],
   "scripture": S("Genesis 3:5", "you will be like God", True)},
  {"id": "damage", "kicker": "The damage", "level": 0.65, "lines": [
    "The damage runs in every direction at once. They hide from God. They cover their shame. They blame each other. And the ground grows thorns.",
    "Isaiah says it plainly. Your iniquities have built barriers between you and your God."],
   "scripture": S("Isaiah 59:2", "your iniquities have built barriers between you and your God", True)},
  {"id": "define", "kicker": "What it is", "level": 0.55, "lines": [
    "The family catechism defines it. Sin is any failure to love God and others as we should, whether by doing what God forbids or by failing to do what he commands.",
    "It's more than a list of wrong things done. It's love turned in on ourselves."]},
  {"id": "all", "kicker": "All of us", "level": 0.7, "lines": [
    "Paul says it without exception.",
    "For all have sinned and fall short of the glory of God.",
    "No one is outside it and no one is above it, the people who wrote the Bible included. But the same sentence goes straight on to grace."],
   "scripture": S("Romans 3:23", "for all have sinned and fall short of the glory of God", True)},
  {"id": "seek", "kicker": "God comes looking", "level": 0.85, "lines": [
    "Judgment is never the only word. God comes looking and calls: where are you? Jesus said he came to seek and to save the lost. At the cross God himself mends what sin broke.",
    "And the way home stays open.",
    "If we confess our sins, He is faithful and just to forgive us our sins."],
   "scripture": S("1 John 1:9", "If we confess our sins, He is faithful and just to forgive us our sins", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "All Christians confess that every person has sinned and needs God's grace, and that God himself comes to save.",
    "How the first sin reaches everyone after it is debated, and churches word it differently. This film doesn't choose between them."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "The way home stays open."],
   "titleCard": ["The way home stays open.", END]},
], NOTE)

write("who-jesus-is", "Who Jesus is", P("who-jesus-is"), [
  {"id": "word", "kicker": "Before the beginning", "level": 0.2, "lines": [
    "John begins before the beginning.",
    "In the beginning was the Word, and the Word was with God, and the Word was God.",
    "The Son did not begin at Bethlehem. Through him all things were made."],
   "scripture": S("John 1:1", "In the beginning was the Word, and the Word was with God, and the Word was God.", True)},
  {"id": "flesh", "kicker": "The Word became flesh", "level": 0.4, "lines": [
    "The Word became flesh and made His dwelling among us.",
    "He didn't stop being God when he became man, and he didn't only seem to be a man. He took a real human nature. He was born, he grew, he learned."],
   "scripture": S("John 1:14", "The Word became flesh and made His dwelling among us.", True)},
  {"id": "human", "kicker": "Truly human", "level": 0.55, "lines": [
    "The Gospels don't hide his humanity. Weary from walking, he sits down by a well. At his friend's tomb, Jesus wept.",
    "Hebrews says he was tempted in every way that we are, yet without sin."],
   "scripture": S("Hebrews 4:15", "we have one who was tempted in every way that we are, yet was without sin.")},
  {"id": "god", "kicker": "Truly God", "level": 0.7, "lines": [
    "In Mark he tells a paralyzed man that his sins are forgiven, and the scribes object: who can forgive sins but God alone?",
    "He rebukes the wind and the sea, and his friends ask the question.",
    "Who is this, that even the wind and the sea obey Him?"],
   "scripture": S("Mark 4:41", "Who is this, that even the wind and the sea obey Him?", True)},
  {"id": "person", "kicker": "One person", "level": 0.8, "lines": [
    "Not half God and half man. Not a man who became God. Not God dressed up as a man.",
    "The church confessed it at the Council of Chalcedon in the year four fifty-one: one person who is truly God and truly man. Fully God and fully man, in one person, forever."],
   "scripture": S("Colossians 2:9", "For in Christ all the fullness of the Deity dwells in bodily form.")},
  {"id": "why", "kicker": "Why it matters", "level": 0.7, "lines": [
    "Only someone who is both could bring God and people back together.",
    "As man he could stand in our place. As God he could carry what no one else could."],
   "scripture": S("Hebrews 2:17", "He had to be made like His brothers in every way")},
  {"id": "question", "kicker": "The question", "level": 0.6, "lines": [
    "Near Caesarea Philippi, after hearing what others said, Jesus asked: who do you say I am? Peter answered.",
    "You are the Christ, the Son of the living God.",
    "Some say he was only a good teacher. The Honest Answer on that question weighs it."],
   "scripture": S("Matthew 16:16", "You are the Christ, the Son of the living God.", True)},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "One person, truly God and truly man."],
   "titleCard": ["Truly God and truly man.", END]},
], NOTE)

write("why-jesus-died", "Why did Jesus die?", P("why-jesus-died"), [
  {"id": "who", "kicker": "For us", "level": 0.2, "lines": [
    "The creed says he was crucified also for us under Pontius Pilate. The chief priests and their council handed him over. Pilate, the Roman governor, condemned him. Roman soldiers crucified him.",
    "Jesus himself, his disciples, and the first church were Jews, and blaming the Jewish people for his death is a lie that Christians must reject plainly. The New Testament places all of us inside the guilt."],
   "scripture": S("1 Corinthians 15:3", "that Christ died for our sins according to the Scriptures")},
  {"id": "lamb", "kicker": "One picture: the Passover lamb", "level": 0.4, "lines": [
    "At the first Passover a lamb died in the place of the firstborn, and Israel went free. Jesus died at Passover, and Paul says it.",
    "For Christ, our Passover lamb, has been sacrificed."],
   "scripture": S("1 Corinthians 5:7", "For Christ, our Passover lamb, has been sacrificed.", True)},
  {"id": "ransom", "kicker": "One picture: a ransom", "level": 0.5, "lines": [
    "A ransom was the price paid to set a slave or a prisoner free.",
    "For even the Son of Man did not come to be served, but to serve, and to give His life as a ransom for many.",
    "Peter says the price was not silver or gold but Christ himself. He paid it with his own life, freely given."],
   "scripture": S("Mark 10:45", "For even the Son of Man did not come to be served, but to serve, and to give His life as a ransom for many.", True)},
  {"id": "bearing", "kicker": "One picture: in our place", "level": 0.65, "lines": [
    "Isaiah saw a servant who suffered for others.",
    "The punishment that brought us peace was upon Him.",
    "This is not an angry Father against an unwilling Son. Jesus said he lays his life down of his own accord. The one who bears it is God himself in the Son."],
   "scripture": S("Isaiah 53:5", "the punishment that brought us peace was upon Him", True)},
  {"id": "victory", "kicker": "One picture: a victory", "level": 0.8, "lines": [
    "Many early Christian writers loved this picture. By his death Jesus broke the power of the one who holds the power of death, and set free those held in slavery by their fear of death.",
    "He disarmed the powers, triumphing over them by the cross."],
   "scripture": S("Colossians 2:15", "triumphing over them by the cross")},
  {"id": "love", "kicker": "One picture: love shown", "level": 0.7, "lines": [
    "But God proves His love for us in this: While we were still sinners, Christ died for us.",
    "The cross does not change God's heart toward us. It shows it. Some Christians put this picture at the center: the love seen at the cross changes those who see it."],
   "scripture": S("Romans 5:8", "But God proves His love for us in this: While we were still sinners, Christ died for us.", True)},
  {"id": "peace", "kicker": "One picture: peace made", "level": 0.6, "lines": [
    "Reconciled was the word for making peace between people at war.",
    "Here the one who was wronged, God, makes peace and pays the cost himself."],
   "scripture": S("2 Corinthians 5:19", "God was reconciling the world to Himself in Christ")},
  {"id": "together", "kicker": "Held together", "level": 0.55, "lines": [
    "No one picture says it all. Christians hold them together, and some traditions put one at the center. The creed doesn't choose a theory. It says he came for us men and for our salvation.",
    "Christians read Isaiah's servant as Jesus, and many Jewish readers read him as the people of Israel. This film doesn't choose between the ways of explaining the cross."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "And the cross is not the end of the story. On the third day the tomb was empty."],
   "scripture": S("1 Corinthians 15:4", "that He was raised on the third day according to the Scriptures"),
   "titleCard": ["Christ died for our sins.", END]},
], NOTE)

"""Batch 11 of the rebuilt Bible Explorer films: five more beliefs (the Holy Spirit in a believer, what the church is,
baptism and the Lord's Supper, how we got the Bible, prayer). Every claim comes from the old film's own captions and
its "differ" note. Baptism and the Supper: each church's view is given in the old film's own words and none is chosen.
Care lines stay on the page; none is rewritten here."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("spirit-in-a-believer", "The Holy Spirit in a believer", P("spirit-in-a-believer"), [
  {"id": "who", "kicker": "God, living in his people", "level": 0.2, "lines": [
    "The Holy Spirit is the third person of the Trinity, fully God, who dwells in believers and gives them life with God.",
    "He is not a force or a feeling. He is God himself, living in his people."],
   "scripture": S("Romans 8:9", "And if anyone does not have the Spirit of Christ, he does not belong to Christ.")},
  {"id": "vine", "kicker": "Joined to Christ", "level": 0.4, "lines": [
    "The Spirit unites believers to Christ. Jesus' own picture is a vine and its branches. The branch lives because it is joined to the vine.",
    "I am the vine and you are the branches.",
    "Apart from him they can do nothing."],
   "scripture": S("John 15:5", "I am the vine and you are the branches.", True)},
  {"id": "adopted", "kicker": "Adopted", "level": 0.55, "lines": [
    "To be adopted means God makes people his own children, with a sure place in his family.",
    "Paul says God sent the Spirit of his Son into their hearts, calling out to God as Father. Abba is the Aramaic word for father."],
   "scripture": S("Galatians 4:6", "God sent the Spirit of His Son into our hearts")},
  {"id": "fruit", "kicker": "Fruit", "level": 0.7, "lines": [
    "This is the lifelong work of the Spirit, by which believers grow to be more like Jesus. Paul names nine kinds of fruit.",
    "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.",
    "Fruit grows slowly, and it grows because the branch is joined to the vine."],
   "scripture": S("Galatians 5:22-23", "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.", True)},
  {"id": "gifts", "kicker": "Gifts", "level": 0.7, "lines": [
    "The Spirit gives gifts to each believer, and they are given for the good of all: teaching, serving, encouraging, giving, leading, showing mercy.",
    "Paul's picture is the body, where every part is needed."],
   "scripture": S("1 Corinthians 12:7", "Now to each one the manifestation of the Spirit is given for the common good.")},
  {"id": "differ", "kicker": "Where churches differ", "level": 0.55, "lines": [
    "Christians agree that the Holy Spirit is God, gives new life, lives in every believer, and gives gifts to build up the church.",
    "Churches differ on whether some gifts, such as tongues, prophecy, and healing, continue as they did in Acts, and on whether the baptism of the Spirit is a distinct experience after a person first believes. This film doesn't choose between them."]},
  {"id": "weak", "kicker": "Help for the weak", "level": 0.8, "lines": [
    "Even prayer is not left to believers alone. When they don't know how to pray, the Spirit himself intercedes for them.",
    "The Spirit helps us in our weakness.",
    "The Spirit is not a reward for the strong. He is help for the weak."],
   "scripture": S("Romans 8:26", "the Spirit helps us in our weakness.", True)},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "He is God himself, living in his people."],
   "titleCard": ["Help for the weak.", END]},
], NOTE)

write("the-church", "What the church is", P("the-church"), [
  {"id": "what", "kicker": "A people, not a building", "level": 0.2, "lines": [
    "The church is the whole company of God's people, gathered by the Spirit around Christ, called to worship God, love one another, and make him known to the world.",
    "A building is only where some of them meet."]},
  {"id": "body", "kicker": "A body", "level": 0.4, "lines": [
    "Paul's picture is a body: many parts, different gifts, one life.",
    "No part can say it doesn't need the others, and none is a spare."],
   "scripture": S("1 Corinthians 12:12", "The body is a unit, though it is composed of many parts.")},
  {"id": "house", "kicker": "A house of living stones", "level": 0.55, "lines": [
    "Peter's picture is a house of living stones. God is building his people into a dwelling for himself, and the stone the whole house rests on is Christ."],
   "scripture": S("1 Peter 2:5", "you also, like living stones, are being built into a spiritual house")},
  {"id": "family", "kicker": "A family", "level": 0.6, "lines": [
    "God saves us into a family, not alone.",
    "Strangers become members of one household, brothers and sisters who help one another follow Jesus all the way home."]},
  {"id": "gather", "kicker": "Gathered", "level": 0.7, "lines": [
    "They devoted themselves to the apostles’ teaching and to the fellowship, to the breaking of bread and to prayer.",
    "That was the first church in Jerusalem. Christians still gather to worship God, hear his Word, share the Lord's Supper, and help one another."],
   "scripture": S("Acts 2:42", "They devoted themselves to the apostles’ teaching and to the fellowship, to the breaking of bread and to prayer.", True)},
  {"id": "sent", "kicker": "Sent", "level": 0.85, "lines": [
    "The church is gathered to be sent. Jesus' last command was to make disciples of all nations, and his last promise was his own presence to the end of the age.",
    "And surely I am with you always, even to the end of the age."],
   "scripture": S("Matthew 28:20", "And surely I am with you always, even to the end of the age.", True)},
  {"id": "differ", "kicker": "Where churches differ", "level": 0.55, "lines": [
    "Churches share the confession of one Lord and the command to baptize in the name of the Father, the Son, and the Holy Spirit.",
    "They differ on who should be baptized and how, and on how churches are led: by bishops, by elders, or by the congregation deciding together. Faithful churches differ on these while confessing one Lord, and this film doesn't choose between them."],
   "scripture": S("Ephesians 4:5", "one Lord, one faith, one baptism")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "The church is a people, gathered to be sent."],
   "titleCard": ["Gathered to be sent.", END]},
], NOTE)

write("baptism-and-supper", "Baptism and the Lord's Supper", P("baptism-and-supper"), [
  {"id": "baptism", "kicker": "Baptism", "level": 0.2, "lines": [
    "Jesus' last command to his disciples included baptism: make disciples of all nations, baptizing them in the name of the Father, the Son, and the Holy Spirit.",
    "From the church's first day, those who received the message were baptized."],
   "scripture": S("Matthew 28:19", "Therefore go and make disciples of all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Spirit")},
  {"id": "supper", "kicker": "The Lord's Supper", "level": 0.4, "lines": [
    "Paul passes on what he received. On the night he was betrayed, the Lord Jesus took bread, gave thanks, broke it, and said it was his body, given for them: do this in remembrance of me. The cup, he said, is the new covenant in his blood.",
    "For as often as you eat this bread and drink this cup, you proclaim the Lord’s death until He comes."],
   "scripture": S("1 Corinthians 11:26", "For as often as you eat this bread and drink this cup, you proclaim the Lord’s death until He comes.", True)},
  {"id": "same", "kicker": "What both point to", "level": 0.55, "lines": [
    "Both point to the same thing: Jesus' death and resurrection. Paul says believers were buried with Christ through baptism so that they may walk in newness of life.",
    "Churches agree that repentance, faith, and baptism belong together in the New Testament, and that the Supper is received with self-examination and love."],
   "scripture": S("Romans 6:4", "we too may walk in newness of life.")},
  {"id": "who", "kicker": "Who is baptized", "level": 0.55, "lines": [
    "Some churches baptize the children of believers, pointing to Peter's promise to you and your children.",
    "Others, Baptists and many evangelicals among them, baptize only those who confess faith for themselves, noting that in Acts those who received the message were baptized. Both read the same chapters carefully."],
   "scripture": S("Acts 2:39", "This promise belongs to you and your children and to all who are far off")},
  {"id": "how", "kicker": "How, and what it does", "level": 0.55, "lines": [
    "Some churches pour or sprinkle water. Others immerse, taking the person under the water and up again, a picture of burial and rising.",
    "Churches also differ on what baptism does. Catholic, Orthodox, and Lutheran Christians hold it to be a sacrament through which God grants forgiveness and the Spirit.",
    "Reformed and Presbyterian churches call it a sign and seal of the covenant of grace. Baptists and many evangelicals call it an ordinance, the commanded public sign that follows faith."]},
  {"id": "table", "kicker": "What happens in the Supper", "level": 0.55, "lines": [
    "Roman Catholic teaching holds that the bread and wine become Christ's body and blood. Lutherans confess Christ's true body and blood present in, with, and under the bread and wine.",
    "Reformed churches teach a real spiritual feeding on Christ by faith. Many Baptist and free churches stress a memorial meal of remembrance and proclamation.",
    "All agree that the meal proclaims the Lord's death until he comes."]},
  {"id": "one", "kicker": "One Lord", "level": 0.7, "lines": [
    "Paul writes of one Lord, one faith, one baptism. Faithful churches differ on these questions while confessing that one Lord, and this film doesn't choose between them.",
    "How your own church practices baptism and the Supper, and why, is a good question to bring to a parent or a pastor."],
   "scripture": S("Ephesians 4:5", "one Lord, one faith, one baptism", True)},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Both point to Jesus' death and resurrection."],
   "titleCard": ["One Lord, one faith, one baptism.", END]},
], NOTE)

write("the-bible", "The Bible: how we got it", P("the-bible"), [
  {"id": "many", "kicker": "Many hands, many centuries", "level": 0.2, "lines": [
    "The Bible's books were written over many centuries, in palaces and in exile, in prison cells and on the road.",
    "Their writers include kings, priests, prophets, court officials, a tax collector, a physician, fishermen, and a former Pharisee. Many books name no author at all. Christians believe God was at work in the whole of it."],
   "scripture": S("Hebrews 1:1", "On many past occasions and in many different ways, God spoke to our fathers through the prophets.")},
  {"id": "scribes", "kicker": "Speakers and writers", "level": 0.4, "lines": [
    "Prophets spoke and helpers wrote. Baruch wrote on a scroll all the words Jeremiah dictated, and when the king burned that scroll, Jeremiah dictated it again.",
    "Paul usually dictated his letters to a secretary and added a greeting in his own hand. One of those secretaries signs his own name in Romans.",
    "I, Tertius, who wrote down this letter, greet you in the Lord."],
   "scripture": S("Romans 16:22", "I, Tertius, who wrote down this letter, greet you in the Lord.", True)},
  {"id": "materials", "kicker": "Scroll, ink and language", "level": 0.5, "lines": [
    "Books were written on scrolls of papyrus or of prepared animal skin, in ink, with a reed pen.",
    "The Old Testament is in Hebrew, with a small part in Aramaic, a related language. The New Testament is in Greek. Paul once asked a friend to bring him his scrolls, especially the parchments."],
   "scripture": S("2 Timothy 4:13", "my scrolls, especially the parchments.")},
  {"id": "copies", "kicker": "Copies", "level": 0.6, "lines": [
    "Copies were made almost at once. Paul asked one church to pass its letter on to another, and to read the one sent there.",
    "Every copy was made by hand until printing came, and every hand-made copy differs from every other in small ways. That's why scholars compare the copies."],
   "scripture": S("Colossians 4:16", "After this letter has been read among you, make sure that it is also read in the church of the Laodiceans")},
  {"id": "codex", "kicker": "From scroll to book", "level": 0.65, "lines": [
    "From very early on, Christians preferred the codex, a book of folded sheets stitched at the spine, to the scroll.",
    "It was cheaper, since it used both sides of the sheet. It was easier to carry and to search. And it could hold all four Gospels, or all of Paul's letters, in one volume. Nearly all early Christian copies are books of this kind."]},
  {"id": "received", "kicker": "Which books", "level": 0.6, "lines": [
    "The churches received as Scripture the books that came from the apostles and their circle, taught the faith handed on in all the churches, and were read in worship across the Christian world.",
    "Behind those tests was the conviction that the church was recognizing books that had already proved themselves.",
    "Christians of different traditions account for this differently, and Catholic and Orthodox Bibles include further books in the Old Testament. This film doesn't choose between them."]},
  {"id": "translate", "kicker": "Translation", "level": 0.7, "lines": [
    "Translation is part of the Bible's own story. The New Testament itself puts some of Jesus' Aramaic words into Greek.",
    "Jews made the Greek translation of the Hebrew Scriptures that the first churches outside Judea read, and the New Testament was in Latin, Syriac, and Coptic by the third century.",
    "Every translation is a set of decisions, which is why it helps to read more than one."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "All Scripture is God-breathed and is useful for instruction, for conviction, for correction, and for training in righteousness."],
   "scripture": S("2 Timothy 3:16", "All Scripture is God-breathed and is useful for instruction, for conviction, for correction, and for training in righteousness", True),
   "titleCard": ["How we got the Bible.", END]},
], NOTE)

write("prayer", "Prayer", P("prayer"), [
  {"id": "what", "kicker": "Talking with God", "level": 0.2, "lines": [
    "Prayer is talking with God, who is our Father: bringing him worship, thanks, confession, and requests, and trusting that he hears because of Jesus.",
    "It's not a way of getting things out of God. It's a child speaking to a father."]},
  {"id": "pattern", "kicker": "The pattern Jesus gave", "level": 0.4, "lines": [
    "When his disciples asked him to teach them to pray, Jesus gave them a pattern, the Lord's Prayer. God's name honored. His kingdom and his will first. Then daily bread, forgiveness as we forgive, and protection from evil.",
    "Your kingdom come, Your will be done, on earth as it is in heaven.",
    "Christians all over the world still pray it."],
   "scripture": S("Matthew 6:10", "Your kingdom come, Your will be done, on earth as it is in heaven.", True)},
  {"id": "praise", "kicker": "Praise and thanks", "level": 0.55, "lines": [
    "Praise tells God who he is. Thanks tells him what he has done.",
    "The psalms, the Bible's own book of prayers and songs, are full of both."],
   "scripture": S("Psalm 100:4", "Enter His gates with thanksgiving and His courts with praise")},
  {"id": "ask", "kicker": "Asking", "level": 0.65, "lines": [
    "Paul tells worried people not to swallow their worry but to turn it into prayer, with thanks.",
    "Be anxious for nothing, but in everything, by prayer and petition, with thanksgiving, present your requests to God.",
    "Asking is not bothering God. It's what children do with a father who loves them."],
   "scripture": S("Philippians 4:6", "Be anxious for nothing, but in everything, by prayer and petition, with thanksgiving, present your requests to God.", True)},
  {"id": "confess", "kicker": "Confessing", "level": 0.6, "lines": [
    "Confession is neither groveling nor hiding. When we sin we confess it to God, who is faithful and just to forgive us because of Jesus, and we turn from it.",
    "There is no sin too big for the cross."],
   "scripture": S("1 John 1:9", "If we confess our sins, He is faithful and just to forgive us our sins")},
  {"id": "notyet", "kicker": "When the answer is not what we asked", "level": 0.75, "lines": [
    "Prayer is not a promise that we will get what we ask. Jesus himself asked his Father in the garden to take the cup of suffering away, and added these words.",
    "Yet not My will, but Yours be done.",
    "Some prayers, even for someone to get better, are not answered the way we longed for, and that hurts. The Bible doesn't hide it. Many of its prayers ask God: how long, O LORD?"],
   "scripture": S("Luke 22:42", "Yet not My will, but Yours be done.", True)},
  {"id": "spirit", "kicker": "When there are no words", "level": 0.7, "lines": [
    "Paul says that when we don't know how we ought to pray, the Spirit himself prays for us, with groans too deep for words.",
    "Prayer doesn't depend on finding the right words. It rests on God, who wants to hear."],
   "scripture": S("Romans 8:26", "the Spirit Himself intercedes for us with groans too deep for words.")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "It's a child speaking to a father."],
   "titleCard": ["A child speaking to a father.", END]},
], NOTE)

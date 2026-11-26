"""Batch 5 of the rebuilt Bible Explorer films: Jonah, Matthew, Mark, Luke, John.
Every claim comes from the old film's own captions and its "differ" note. Jonah as history or teaching story: both
readings are named and no side is taken. The Gospels' words about "the Jews" and the Pharisees keep the old films' cautions."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/book-{b}"

write("book-jonah", "Jonah: the prophet who ran from mercy", P("jonah"), [
  {"id": "ran", "kicker": "A prophet who ran", "level": 0.2, "lines": [
    "Jonah is unlike the other prophets. It's almost all story, with one short sentence of prophecy.",
    "God sends Jonah to Nineveh, a great city of Assyria, Israel's enemy. Jonah boards a ship for Tarshish, at the far end of the known world."],
   "scripture": S("Jonah 1:3", "Jonah, however, got up to flee to Tarshish, away from the presence of the LORD.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It has four chapters. Jonah runs, and the sailors fear the LORD. His prayer from the depths. Nineveh turns. Then Jonah's anger, and God's question.",
    "The last chapter is the real climax, and the book ends on a question Jonah never answers."]},
  {"id": "obey", "kicker": "Watch for: all of it obeys", "level": 0.5, "lines": [
    "Jonah confesses the LORD as the God who made the sea and the dry land, and the book shows it. God appoints a storm, a fish, a plant, a worm, and an east wind.",
    "Everything in the book obeys God except his prophet."],
   "scripture": S("Jonah 1:17", "Now the LORD had appointed a great fish to swallow Jonah")},
  {"id": "down", "kicker": "Watch for: down, and up again", "level": 0.65, "lines": [
    "Jonah goes down to the port, down into the ship, down to the roots of the mountains. From the fish he prays a psalm of thanks, and God brings him up.",
    "But You raised my life from the pit, O LORD my God!",
    "Jesus took this as the sign of Jonah, a picture of his own death, burial, and resurrection."],
   "scripture": S("Jonah 2:6", "But You raised my life from the pit, O LORD my God!", True)},
  {"id": "turn", "kicker": "Watch for: the city that turned", "level": 0.8, "lines": [
    "The sailors, a king, and a whole city respond to God more readily than his prophet does. Jonah's warning offers no mercy, yet Nineveh turns, and God relents.",
    "His warnings of judgment are meant to lead people to turn."],
   "scripture": S("Jonah 3:10", "He relented from the disaster He had threatened to bring upon them.")},
  {"id": "question", "kicker": "Watch for: the question at the end", "level": 0.9, "lines": [
    "Jonah is furious, and he explains why he ran.",
    "I knew that You are a gracious and compassionate God, slow to anger.",
    "God gives him a plant, then takes it away, and ends the book with a question."],
   "scripture": S("Jonah 4:2", "I knew that You are a gracious and compassionate God, slow to anger", True)},
  {"id": "differ", "kicker": "Where readers differ", "level": 0.55, "lines": [
    "Many readers, Jewish and Christian, take Jonah as history. Many others read it as a teaching story. Some hold both.",
    "Whatever a reader decides, the book's message is the same."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one and read all four. Watch three words: great, down, and appointed.",
    "The worst misreading argues about the fish and misses the question about mercy."],
   "scripture": S("Jonah 4:11", "So should I not care about the great city of Nineveh")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Jonah never answers that question. It's asked of the reader too."],
   "titleCard": ["The question is asked of you too.", "LiveWell by James Bell"]},
], NOTE)

write("book-matthew", "Matthew: God with us", P("matthew"), [
  {"id": "immanuel", "kicker": "God with us", "level": 0.2, "lines": [
    "Matthew tells the story of Jesus with Israel's Scriptures always in view. It opens with a genealogy that traces him through King David to Abraham.",
    "Its Jesus is the promised Messiah, the teacher greater than Moses, and Immanuel, which means God with us."],
   "scripture": S("Matthew 1:23", "they will call Him Immanuel” (which means, “God with us”).")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Matthew alternates story and speech. Five long discourses, beginning with the Sermon on the Mount, each close with the same formula.",
    "They make this the fullest collection of Jesus' words among the Gospels."],
   "scripture": S("Matthew 7:28", "When Jesus had finished saying these things")},
  {"id": "fulfill", "kicker": "Watch for: promises kept", "level": 0.5, "lines": [
    "Matthew sees Jesus as the goal of Israel's Scriptures. The fulfillment formulas, the genealogy, and the patterns that echo Moses and the exodus present his story as the completion of Israel's story.",
    "I have not come to abolish them, but to fulfill them."],
   "scripture": S("Matthew 5:17", "I have not come to abolish them, but to fulfill them.", True)},
  {"id": "kingdom", "kicker": "Watch for: the kingdom of heaven", "level": 0.65, "lines": [
    "The kingdom of heaven means God's reign, arriving in Jesus' own person and work.",
    "It's present in his healings and teaching. It's hidden and growing, like a mustard seed. And it's still to come in fullness."],
   "scripture": S("Matthew 4:17", "Repent, for the kingdom of heaven is near.")},
  {"id": "who", "kicker": "Watch for: who he is", "level": 0.8, "lines": [
    "In the middle of the book, Peter confesses who Jesus is.",
    "You are the Christ, the Son of the living God.",
    "From that time, Jesus begins to show his disciples that he must suffer, be killed, and on the third day be raised. The story turns toward Jerusalem and the cross."],
   "scripture": S("Matthew 16:16", "You are the Christ, the Son of the living God.", True)},
  {"id": "nations", "kicker": "Watch for: Israel and all nations", "level": 0.85, "lines": [
    "Matthew is a deeply Jewish book. Its sharp words against scribes and Pharisees belong to an argument among Jews about Israel's Scriptures. They are no verdict on the Jewish people.",
    "Jesus is sent first to Israel, and the Gospel ends with all nations."],
   "scripture": S("Matthew 28:19", "Therefore go and make disciples of all nations")},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one. The key chapters are one, five, six, thirteen, sixteen, twenty-six, and twenty-eight."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "The Gospel opens with the name Immanuel, and it closes with the risen Jesus keeping it.",
    "And surely I am with you always, even to the end of the age."],
   "scripture": S("Matthew 28:20", "And surely I am with you always, even to the end of the age.", True),
   "titleCard": ["God with us.", "LiveWell by James Bell"]},
], NOTE)

write("book-mark", "Mark: the story at a run", P("mark"), [
  {"id": "fast", "kicker": "The story at a run", "level": 0.2, "lines": [
    "Mark is the shortest of the four Gospels, and it moves at speed. There's no birth story and no long sermon. The word translated immediately appears more than forty times.",
    "Its first line works as a title.",
    "This is the beginning of the gospel of Jesus Christ, the Son of God."],
   "scripture": S("Mark 1:1", "This is the beginning of the gospel of Jesus Christ, the Son of God.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The first half is set in Galilee, full of authority and questions. Its hinge is Peter's confession.",
    "From there the story walks the road to Jerusalem, tells the passion by the hour, and ends at an empty tomb."]},
  {"id": "who", "kicker": "Watch for: who is this man?", "level": 0.5, "lines": [
    "The question of who Jesus is runs through the whole book. You know the answer from the first line.",
    "The drama is in watching the characters struggle toward it, often getting the words right and the meaning wrong."],
   "scripture": S("Mark 4:41", "Who is this, that even the wind and the sea obey Him?")},
  {"id": "way", "kicker": "Watch for: the way of the cross", "level": 0.7, "lines": [
    "On the road to Jerusalem, Jesus predicts his death and resurrection three times. And each time he teaches what following him means: deny yourself, and be the servant of all.",
    "For even the Son of Man did not come to be served, but to serve, and to give His life as a ransom for many."],
   "scripture": S("Mark 10:45", "For even the Son of Man did not come to be served, but to serve, and to give His life as a ransom for many.", True)},
  {"id": "grace", "kicker": "Watch for: friends who fail", "level": 0.8, "lines": [
    "Mark doesn't flatter the disciples. They misunderstand. They fall asleep in Gethsemane. They flee. And Peter denies Jesus three times.",
    "Yet the message at the tomb names Peter in particular."],
   "scripture": S("Mark 16:7", "But go, tell His disciples and Peter")},
  {"id": "centurion", "kicker": "Watch for: who sees it first", "level": 0.9, "lines": [
    "The first human being in Mark to call Jesus the Son of God is a Roman centurion at the foot of the cross, at the moment of his death.",
    "Truly this man was the Son of God!",
    "The Son of God is recognized fully only at the cross."],
   "scripture": S("Mark 15:39", "Truly this man was the Son of God!", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read Mark in one sitting if you can. Its force comes from its pace. The key chapters are one, four, eight, ten, thirteen, fifteen, and sixteen.",
    "The oldest complete copies end with the women at the tomb."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Mark holds authority and suffering together."],
   "titleCard": ["Authority and suffering, held together.", "LiveWell by James Bell"]},
], NOTE)

write("book-luke", "Luke: good news for the lost", P("luke"), [
  {"id": "account", "kicker": "An orderly account", "level": 0.2, "lines": [
    "Luke opens with a formal preface. Many have written accounts. The material was handed down by eyewitnesses. And he has investigated everything carefully.",
    "It's the first of two books by the same author, and it presents Jesus as Savior.",
    "Today in the city of David a Savior has been born to you."],
   "scripture": S("Luke 2:11", "Today in the city of David a Savior has been born to you.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "After the births of John and Jesus comes the ministry in Galilee. Then the turning point is marked in the text, and the long central section is framed as the road to Jerusalem.",
    "The book ends where it began, in the temple."],
   "scripture": S("Luke 9:51", "Jesus resolutely set out for Jerusalem.")},
  {"id": "poor", "kicker": "Watch for: people others passed over", "level": 0.5, "lines": [
    "Luke gives more attention to wealth and poverty than any other Gospel, and women are prominent throughout. Samaritans, tax collectors, and sinners are welcomed.",
    "In his first sermon, Jesus reads from Isaiah and says it's fulfilled that day."],
   "scripture": S("Luke 4:18", "He has anointed Me to preach good news to the poor.")},
  {"id": "lost", "kicker": "Watch for: the lost, found", "level": 0.7, "lines": [
    "The parables of the lost sheep, the lost coin, and the lost son show God's joy in finding the lost. They also expose the resentment of those who think they were never lost.",
    "Jesus sums up the whole book in one line.",
    "For the Son of Man came to seek and to save the lost."],
   "scripture": S("Luke 19:10", "For the Son of Man came to seek and to save the lost.", True)},
  {"id": "prayer", "kicker": "Watch for: prayer", "level": 0.75, "lines": [
    "Luke shows Jesus praying at the turning points of his life: at his baptism, before choosing the Twelve, at the transfiguration, in Gethsemane, and on the cross.",
    "Prayer in Luke is the ordinary posture of those who wait on God."],
   "scripture": S("Luke 11:1", "Lord, teach us to pray")},
  {"id": "today", "kicker": "Watch for: today, and joy", "level": 0.9, "lines": [
    "The word today carries weight in Luke. Salvation is present, not only future, and it brings joy.",
    "On the Emmaus road, the risen Jesus opens the Scriptures to two disciples who had been hoping, and had given up."],
   "scripture": S("Luke 24:32", "Were not our hearts burning within us as He spoke with us on the road")},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one. The key chapters are one, two, four, fifteen, nineteen, and twenty-four. Watch the meals, the prayers, and the word today."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "And read on. The same author's second book is Acts."],
   "titleCard": ["Good news for the lost.", "LiveWell by James Bell"]},
], NOTE)

write("book-john", "John: the Word made flesh", P("john"), [
  {"id": "word", "kicker": "The Word made flesh", "level": 0.2, "lines": [
    "John is the fourth of the four Gospels. It tells the same story as Matthew, Mark, and Luke from a different height.",
    "It begins before the world was made. And soon comes the sentence the whole book hangs on.",
    "The Word became flesh and made His dwelling among us."],
   "scripture": S("John 1:14", "The Word became flesh and made His dwelling among us.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "John is built with care. An opening poem. A first half built around signs. And a second half that slows almost to a stop: five chapters are given to one evening.",
    "Then come the cross, the resurrection, and a closing scene by the lake."],
   "scripture": S("John 13:1", "Jesus knew that His hour had come")},
  {"id": "signs", "kicker": "Watch for: the signs", "level": 0.5, "lines": [
    "John calls Jesus' miracles signs, because each one points beyond itself to who he is. The first half is built around seven of them.",
    "Signs can start faith. But faith that only wants miracles is thin."],
   "scripture": S("John 2:11", "Jesus performed this, the first of His signs, at Cana in Galilee.")},
  {"id": "i-am", "kicker": "Watch for: I am", "level": 0.65, "lines": [
    "Seven times Jesus says I am, and adds a picture. Bread. Light. A gate. A shepherd. Resurrection and life. The way. The true vine.",
    "I am the bread of life.",
    "Each one takes something people can't live without and says: this is what I am for you."],
   "scripture": S("John 6:35", "I am the bread of life.", True)},
  {"id": "believe", "kicker": "Watch for: believing", "level": 0.8, "lines": [
    "The verb believe comes ninety-eight times in John, and the noun faith never does. Believing is something you do: coming to Jesus, trusting him, staying with him.",
    "And eternal life, in John, is life with God that begins now."],
   "scripture": S("John 1:12", "to those who believed in His name, He gave the right to become children of God")},
  {"id": "hour", "kicker": "Watch for: the last evening", "level": 0.9, "lines": [
    "The second half opens when Jesus knows his hour has come. He washes his disciples' feet and gives them a new command.",
    "A new commandment I give you: Love one another.",
    "In John, the glory of God is seen most clearly at the cross. Then come the empty tomb and the risen Jesus."],
   "scripture": S("John 13:34", "A new commandment I give you: Love one another.", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start at chapter one and read slowly. The key chapters are one, three, six, eleven, thirteen, seventeen, and twenty.",
    "One caution. When John speaks of the Jews, he usually means the Jerusalem authorities. Jesus and nearly everyone in the story are Jews."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "John tells you plainly why he wrote.",
    "These are written so that you may believe that Jesus is the Christ, the Son of God."],
   "scripture": S("John 20:31", "these are written so that you may believe that Jesus is the Christ, the Son of God", True),
   "titleCard": ["The Word made flesh.", "LiveWell by James Bell"]},
], NOTE)

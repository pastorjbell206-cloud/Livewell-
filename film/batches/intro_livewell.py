"""A one-minute introduction to the LiveWell website (James, 2026-11-27: "a 1-minute intro video ... explain the website,
explain the Bible, the academy, the devotions, the books, the articles ... from someone that maybe wants to investigate
Christianity to someone that wants to go deeper ... from teenagers to homeschool to people that just want to learn about
the Bible"). Every page named is live and listed in client/src/lib/siteCatalog.ts; the film count is
client/src/data/narrated-films.json (108 on 2026-11-27); the tagline is the one in CLAUDE.md. The Academy is /academy
(client/public/academy/programs.json: ten programs, "Exploring Christianity" to "Faith for Teenagers"); its
certificates are unaccredited (UNACCREDITED in client/src/lib/academy.ts), so the picture shows that word."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the site catalogue (client/src/lib/siteCatalog.ts), the list of live films and the site's tagline; no Scripture is quoted."
END = "LiveWell by James Bell"

write("livewell-intro", "Welcome to LiveWell", "/", [
  {"id": "welcome", "kicker": "Welcome", "level": 0.25, "lines": [
    "Maybe you're not sure Christianity is true. Maybe you've believed for years and want to go deeper. LiveWell is for both."]},
  {"id": "bible", "kicker": "The Bible", "level": 0.35, "lines": [
    "Start with the Bible. Read any chapter with notes beside it, or watch one of more than a hundred short films."]},
  {"id": "questions", "kicker": "Hard questions", "level": 0.45, "lines": [
    "Bring your hardest questions. Does God exist? Can I trust the Bible? Each answer gives the objection at its strongest, the evidence, and what's still open."]},
  {"id": "history", "kicker": "Church history", "level": 0.45, "lines": [
    "Walk through the church's story in fourteen lessons, from the apostles to today."]},
  {"id": "family", "kicker": "Families", "level": 0.5, "lines": [
    "For families and homeschoolers: a devotion for every week of the year, a catechism for kids, and an illustrated Bible map for ages seven to sixteen."]},
  {"id": "academy", "kicker": "The Academy", "level": 0.55, "lines": [
    "Want a path? The LiveWell Academy takes you step by step through ten programs, from exploring Christianity to faith for teenagers, with a certificate for your own study."]},
  {"id": "writing", "kicker": "Essays and books", "level": 0.55, "lines": [
    "And James Bell's essays and books carry the hardest questions of faith and culture further."]},
  {"id": "close", "kicker": "", "level": 0.35, "lines": [
    "Connecting the depth of theology to the weight of everyday life. Start wherever you are."],
   "titleCard": ["Start wherever you are.", END]},
], NOTE)

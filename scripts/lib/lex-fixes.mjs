/**
 * Corrections to STEP's brief Greek lexicon (TBESG), applied by
 * scripts/build-bible.mjs when it writes client/public/bible/lex/.
 *
 * Six TBESG entries carry another word's definition. Checked on 2026-11-25
 * against STEPBible-Data on GitHub (master of 2026-11-02, which still has all
 * six) and against G. Abbott-Smith, A Manual Greek Lexicon of the New
 * Testament (1922), in its public-domain TEI edition and its scanned print
 * (github.com/translatable-exegetical-tools/Abbott-Smith). The TEI edition
 * tags the wrong entry with these words' numbers, and STEP attached it:
 *
 * - G0062 ἀγράμματος ("unschooled", Acts 4:13) had ἀγραυλέω, "to live in the
 *   fields".
 * - G4776 συγκαθίζω ("sit down with", Luke 22:55, Ephesians 2:6) had
 *   περικαθίζω, "to invest, besiege".
 * - G4821 συμβασιλεύω ("reign with", 1 Corinthians 4:8, 2 Timothy 2:12) had
 *   συμβουλεύω, "to advise, counsel".
 * - G4844 συμπίνω ("drink with", Acts 10:41) had συμπόσιον, "a drinking party".
 *   These four take Abbott-Smith's own entry for the word (he spells the
 *   compounds συν-, as the critical texts do), in the form TBESG gives his
 *   other entries: abbreviations written out as TBESG writes them ("c. dat.
 *   pers." as "with dative of person(s)", "metaph." as "metaphorically") and
 *   references in its book names.
 * - G3426 μόδιος (the basket of Matthew 5:15, Mark 4:21 and Luke 11:33) had
 *   μοιχαλίς, "an adulteress".
 * - G2600 κατάβασις ("descent", Luke 19:37) had καταβαρύνω, "to weigh down".
 *   Abbott-Smith has no entry for either word (his print runs μόγις,
 *   μοιχαλίς, and καταβαρύνω, καταβιβάζω), so these two take LSJ's entry as
 *   STEP's own TFLSJ file gives it (CC BY 4.0), its senses without its
 *   references to classical authors and the examples and clauses that rest
 *   on them.
 *
 * A fix applies only while TBESG still has the wrong text (`wrong`, the start
 * of the cleaned definition), so a corrected TBESG wins on the next build.
 * Accents are written as TBESG writes them (oxia, not tonos), and compared
 * after normalizing, so the two spellings of one letter never decide it.
 */
export const LEX_FIXES = {
  G0062: {
    wrong: "<b>ἀγραυλέω</b>",
    d: "<b>ἀγράμματος</b>, -ον <br> (γράφω), <br><b>without learning</b> (γράμματα), <b>un-lettered</b> (in π. freq. in formula used by one who signs for an illiterate; MM, <i>VGT</i>, see word): Act.4:13 (but cf. Thayer, see word).†<br> (AS)",
  },
  G3426: {
    wrong: "<b>μοιχαλίς</b>",
    d: "<b>μόδιος</b>, ὁ, <br> = Latin <i>modius</i>, a dry measure, = 1/6 μέδιμνος.<br> 2. <b>vessel of this capacity</b>: Mat.5:15.<br> II. a measure of length, = 200 ὀργυιαί.<br> (LSJ)",
  },
  G2600: {
    wrong: "<b>κατα-βαρύνω",
    d: "<b>κατά-βᾰσις</b>, εως, ἡ, <br> opposed to ἀνάβασις, <b>way down, descent</b>.<br> 2. <b>descent from</b> central Asia.<br> 3. <i>metaphorically</i>, <b>descent</b> of an idea into the mind.<br> 4. <b>steep ground, declivity</b>.<br> 5. ἔργον καταβάσεως <b>hanging</b> work.<br> (LSJ)",
  },
  G4776: {
    wrong: "<b>περι-καθ-ίζω",
    d: "<b>συν-καθίζω</b> (Rec. συγκ-), <br> [in LXX for ישׁב, רבץ ;] <br>1. trans., <b>to make to sit together</b>: with accusative of person(s), before ἐν, Eph.2:6. <br> 2. Intrans. = mid., <b>to sit together</b>: Luk.22:55.†<br> (AS)",
  },
  G4821: {
    wrong: "<b>συμ-βουλεύω",
    d: "<b>συν-βασιλεύω</b> (Rec. συμ-), <br> [in LXX: 1Es.8:26 A * ;] <br><b>to reign together</b> or <b>with</b>: metaphorically, of sharing the glories of the Kingdom of God, 1Co.4:8, 2Ti.2:12.†<br> (AS)",
  },
  G4844: {
    wrong: "<b>συμπόσιον</b>",
    d: "<b>συν-πίνω</b> (Rec. συμπ-), <br> [in LXX: Est.7:1 (עִם שָׁתָה) ;] <br><b>to drink with</b> with dative of person(s), Act.10:41.†<br> (AS)",
  },
};

/** The definition to keep for an entry: the fix while TBESG still has the wrong text, else TBESG's own. */
export function fixedDefinition(key, d) {
  const fix = LEX_FIXES[key];
  return fix && d.normalize("NFC").startsWith(fix.wrong.normalize("NFC")) ? fix.d : d;
}

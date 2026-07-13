import { SEOMeta } from "@/components/SEOMeta";
import PillarLanding from "@/components/PillarLanding";
import { PILLAR_BY_ID } from "@/lib/taxonomy";

const PILLAR = PILLAR_BY_ID.get(3)!; // Reading Scripture Past Our Politics

export default function ReadingScripturePastOurPolitics() {
  return (
    <>
      <SEOMeta
        title="Reading Scripture Past Our Politics"
        description="Tribe, translation, and tradition edit the Bible before you open it. A pillar on catching the edit and hearing Scripture on its own terms again."
        url="https://www.livewellbyjamesbell.co/reading-scripture-past-our-politics"
      />
      <PillarLanding
        pillar={PILLAR}
        pathSlug="reading-scripture-past-our-politics"
        statement="Scripture does not need rescuing. Our reading does."
        toolsIntro="The essays teach the discipline; these do the daily work of it — context before conclusions, the whole canon before the favorite shelf."
        tools={[
          { href: "/tools/deep-bible", label: "Deep Bible Companion", blurb: "Work through a passage slowly — context, structure, and the questions worth asking." },
          { href: "/theology/passage", label: "Passage Context", blurb: "What surrounds the verse you're quoting — author, audience, and the argument it sits inside." },
          { href: "/tools/bible-on", label: "Bible on a Topic", blurb: "Everything Scripture says on a subject, not just the verses your side highlights." },
          { href: "/tools/verse-finder", label: "Verse Finder", blurb: "Find the passage you half-remember, with its reference and its neighborhood." },
          { href: "/theology/explorer", label: "The Doctrine Explorer", blurb: "Every contested doctrine sorted by how much it binds — so you can tell a conviction worth dividing over from a preference that isn't." },
        ]}
      >
        <p>
          No one reads the Bible alone. You bring a tribe with you — a translation someone chose, a tradition someone built, a set of verses your side highlights and a longer set it has learned not to see. The right reads Romans 13 and skips Amos. The left reads Amos and skips Romans 1. Both call it just reading the text. Neither is lying. That is what makes it dangerous.
        </p>
        <p>
          This pillar is about getting the Book back. Not by pretending we can read from nowhere — no one can — but by learning to catch the edit as it happens: the promise pulled from a prison letter to decorate an ambition, the prophet quoted against their sins and never ours, whole shelves of the canon — lament, jubilee, judgment — that our politics have quietly made unreadable. I have preached the edited version. Most of us were discipled by it, and the men who discipled us were discipled by it too.
        </p>
        <p>
          The essays here are a course in reading again: genre, context, the arc that runs from Eden to the New Jerusalem, and the harder discipline of letting the text say the thing your side wishes it didn't. Start the path in order. It builds.
        </p>
      </PillarLanding>
    </>
  );
}

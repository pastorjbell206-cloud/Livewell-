import { SEOMeta } from "@/components/SEOMeta";
import PillarLanding from "@/components/PillarLanding";
import { PILLAR_BY_ID } from "@/lib/taxonomy";

const PILLAR = PILLAR_BY_ID.get(4)!; // After Christendom

export default function AfterChristendomPillar() {
  return (
    <>
      <SEOMeta
        title="After Christendom"
        description="Cultural Christianity is dead, and the panic is misplaced. What the church loses with Christendom, what it never needed, and what comes after the end."
        url="https://www.livewellbyjamesbell.co/after-christendom"
      />
      <PillarLanding
        pillar={PILLAR}
        pathSlug="the-church-after-christendom"
        statement="What we lost was scaffolding. What remains is the building."
        toolsIntro="This pillar's argument is historical before it is anything else. These carry the receipts."
        tools={[
          { href: "/theology/history", label: "The Long Arc", blurb: "Two thousand years in one walkable timeline — Pentecost to the global south, through 313, 1517, 1648, 1789, and 1979. The church has ended before. It hasn't." },
          { href: "/resources/creeds", label: "The Creeds & Confessions", blurb: "The documents the church wrote down when everything else was collapsing — what survived every previous ending." },
        ]}
      >
        <p>
          The arrangement is over. For seventeen centuries — since an emperor saw a cross in the sky and decided it would look good on a shield — the church in the West has lived with cultural power as a given: the assumed faith, the default holiday, the pew as civic furniture. That world is not dying. It is dead, and most of what passes for crisis in the American church is grief that has not said the word aloud.
        </p>
        <p>
          This pillar asks the question underneath the panic: what if the funeral is not ours? Christendom and Christianity were never the same thing. One is an arrangement with power; the other is a kingdom that arrived through a defeat. The church has been small before, strange before, unofficial before — and it was in those centuries, with no office and no army, that it out-lived, out-loved, and finally out-lasted an empire.
        </p>
        <p>
          I am not neutral here. I pastor a church that remembers when the culture did half its work, and I feel the loss in the empty rows on the Sundays no one else counts. But the essays in this path keep arriving at the same place: the scaffolding came down, and the building is still standing. Read it in order — it starts with the grief, and it does not stay there.
        </p>
      </PillarLanding>
    </>
  );
}

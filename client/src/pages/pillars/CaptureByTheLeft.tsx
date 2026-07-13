import { SEOMeta } from "@/components/SEOMeta";
import PillarLanding from "@/components/PillarLanding";
import { PILLAR_BY_ID } from "@/lib/taxonomy";

const PILLAR = PILLAR_BY_ID.get(2)!; // The Capture by the Left

export default function CaptureByTheLeft() {
  return (
    <>
      <SEOMeta
        title="The Capture by the Left"
        description="The faith dissolved into a cause: progressive capture, the sins we stopped naming, and the same instrument the right receives — turned the other way."
        url="https://www.livewellbyjamesbell.co/capture-by-the-left"
      />
      <PillarLanding
        pillar={PILLAR}
        pathSlug="capture-by-the-left"
        statement="A faith dissolved into a cause dies the same death as a faith conscripted by a flag. It just dies quoting different verses."
      >
        <p>
          The other capture is harder for some of us to see, because its vocabulary sounds like the Sermon on the Mount. Compassion. Justice. The stranger welcomed, the wounded believed. Those are not the enemy's words — they are ours, and half the reason the progressive capture works is that the church handed them over unused. But a faith dissolved into a cause ends the same way as a faith conscripted by a flag. The lord changes. The lordship does not.
        </p>
        <p>
          This pillar names what the dissolution costs. When the creed becomes negotiable and the platform becomes non-negotiable, the church has not become kind; it has changed masters. There are sins we stopped naming because they flattered our side, doctrines we quietly retired because they embarrassed us at dinner, and a generation that learned Christianity was a delivery system for a politics it could get cheaper elsewhere. I write that as a man who has flinched — who has softened a hard word because the room would have gone cold.
        </p>
        <p>
          These essays are not the right's rebuttal to the left. They are the same instrument the previous pillar uses, turned the other way, held with the same grief. Read the path in order. The mirror comes around.
        </p>
      </PillarLanding>
    </>
  );
}

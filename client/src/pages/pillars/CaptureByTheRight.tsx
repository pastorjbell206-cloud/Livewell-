import { SEOMeta } from "@/components/SEOMeta";
import PillarLanding from "@/components/PillarLanding";
import { PILLAR_BY_ID } from "@/lib/taxonomy";

const PILLAR = PILLAR_BY_ID.get(1)!; // The Capture by the Right

export default function CaptureByTheRight() {
  return (
    <>
      <SEOMeta
        title="The Capture by the Right"
        description="Christian nationalism named from inside the church: how the cross got traded for a flag, the history of the fusion, and the ordered path out of it."
        url="https://www.livewellbyjamesbell.co/capture-by-the-right"
      />
      <PillarLanding
        pillar={PILLAR}
        pathSlug="capture-by-the-right"
        statement="When the church baptizes a party, it does not gain power. It loses the authority to say the one thing power most needs to hear."
      >
        <p>
          There is a version of this country's faith that learned to salute before it learned to kneel. It did not begin as betrayal. It began as gratitude — for a nation where the gospel could be preached without a permit, for grandfathers who bled on real beaches, for a culture that once made room for Sunday. Gratitude is not the sin. The sin is what we did with it: we let the flag migrate from the lawn to the sanctuary, from the sanctuary to the altar, until the kingdom of God and the American project became one cause with two budgets.
        </p>
        <p>
          This pillar names that fusion. Not from across the room — from inside it. I have preached to people wearing the uniform of both kingdoms, and for years I did not ask which one they would obey first, because I was not sure of my own answer. It is easy to condemn a capture you were never invited into. This one invited us, and we went.
        </p>
        <p>
          The essays here trace the arc the fusion actually followed — Constantine's bargain in 313, the civil religion of the 1950s, the fear that learned to sell itself as courage — and they end where an honest diagnosis has to end: not with a party to leave but a Lord to return to. Start with the path. It was built to be read in order.
        </p>
      </PillarLanding>
    </>
  );
}

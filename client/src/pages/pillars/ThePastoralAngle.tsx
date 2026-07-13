import { SEOMeta } from "@/components/SEOMeta";
import PillarLanding from "@/components/PillarLanding";
import { PILLAR_BY_ID } from "@/lib/taxonomy";

const PILLAR = PILLAR_BY_ID.get(5)!; // The Pastoral Angle

export default function ThePastoralAngle() {
  return (
    <>
      <SEOMeta
        title="The Pastoral Angle"
        description="Every argument on this site walks through a hospital door. Doubt, burnout, grief, and the weight of ministry — the pillar written from inside the room."
        url="https://www.livewellbyjamesbell.co/the-pastoral-angle"
      />
      <PillarLanding
        pillar={PILLAR}
        pathSlug="the-pastoral-angle"
        statement="No stagecraft survives this close to the ground."
        toolsIntro="Instruments for the people carrying the weight — honest ones, scored in your browser, seen by no one but you."
        tools={[
          { href: "/tools/pastor-burnout", label: "Pastor Burnout Assessment", blurb: "Name where you actually are before the congregation finds out the hard way." },
          { href: "/tools/emotional-health", label: "Emotional Health Check", blurb: "The interior audit most of us postpone until something breaks." },
          { href: "/tools/sermon-outline", label: "Sermon Outline Builder", blurb: "Structure for the week the well is dry and Sunday is still coming." },
        ]}
      >
        <p>
          Every argument on this site eventually walks through a hospital door. That is the test of a theology — not whether it survives a debate, but whether it survives a Tuesday: the marriage in the third pew, the diagnosis that came back wrong, the pastor who preached resurrection on Sunday and could not get out of bed on Monday. The other four pillars diagnose what captured the church. This one asks what it is like to live there.
        </p>
        <p>
          It is written from inside. I have been on both sides of the counseling appointment. I carry things people have told me that I can never repeat, and I have come apart quietly on Saturday nights and stood up anyway on Sunday mornings — and I know exactly how much of that was faithfulness and how much was the fear of being found out. Pastors are some of the least cared-for people in the church. So are the people they are too tired to care for while pretending to be fine.
        </p>
        <p>
          The essays here are the weight-bearing tests: doubt, burnout, grief, the sermon you preach to yourself when no one is listening. Read the path in order. It was built by someone still walking it.
        </p>
      </PillarLanding>
    </>
  );
}

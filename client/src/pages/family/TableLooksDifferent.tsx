/**
 * "If your table looks different" (MASTER-PLAN 5.3, U21): a short panel on
 * /family for the parent on their own, the home the children split their week
 * between, and the believer married to someone who does not believe. Each
 * note condenses what the family-devotions care page already says
 * (client/public/needs/family-devotions.json, its questions), and the panel
 * hands on to that page, and to the help lines on /help (#help-now, which that
 * page scrolls to on arrival) for anyone afraid at home.
 */
import { Link } from "wouter";

const NOTES = [
  {
    title: "On your own",
    body: "Do what any family does, only smaller. Choose the easiest moment you have, often bedtime or the drive to school, and keep it to a few minutes. Then widen the circle: ask a grandparent, a friend, or a family from church to pray with your children now and then.",
  },
  {
    title: "Between two homes",
    body: "Keep the practice on your days, and pick up where you left off when the children come back. Never use it to criticize the other house.",
  },
  {
    title: "Beside a spouse who does not believe",
    body: "Do it in the open. Talk first about what you can agree on, such as bedtime prayers or a Bible story, and invite rather than force. Never use a devotion to criticize the other parent.",
  },
] as const;

export default function TableLooksDifferent() {
  return (
    <section className="tb-different" aria-labelledby="tb-different">
      <h2 id="tb-different" className="tb-section__title">
        If your table looks different
      </h2>
      <div className="tb-different__notes">
        {NOTES.map((n) => (
          <div key={n.title}>
            <h3 className="tb-different__title">{n.title}</h3>
            <p className="tb-different__body">{n.body}</p>
          </div>
        ))}
      </div>
      <p className="tb-different__more">
        If you are afraid of someone at home, your safety comes first, and{" "}
        <Link href="/help#help-now" className="tb-different__link">
          the help lines are here
        </Link>
        . More for every kind of home:{" "}
        <Link href="/help/family-devotions" className="tb-different__link">
          How do we do family devotions?
        </Link>
      </p>
    </section>
  );
}

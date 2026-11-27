/**
 * /explore/living: the Christian living discipline page (pages/explore/DisciplinePage.tsx).
 * Its own file so the prerendered head carries this page's own title.
 */
import { SEOMeta } from "@/components/SEOMeta";
import DisciplinePage from "./DisciplinePage";

export default function ExploreLiving() {
  return (
    <DisciplinePage
      id="living"
      head={
        <SEOMeta
          title="Christian Living: Marriage, Work, Money and Prayer"
          description="Marriage, work, money, grief, anxiety and prayer: what the Bible says by subject, step-by-step guides, and essays on the questions of ordinary life."
          url="https://www.livewellbyjamesbell.co/explore/living"
        />
      }
    />
  );
}

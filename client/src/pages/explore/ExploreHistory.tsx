/**
 * /explore/history: the Church history discipline page (pages/explore/DisciplinePage.tsx).
 * Its own file so the prerendered head carries this page's own title.
 */
import { SEOMeta } from "@/components/SEOMeta";
import DisciplinePage from "./DisciplinePage";

export default function ExploreHistory() {
  return (
    <DisciplinePage
      id="history"
      head={
        <SEOMeta
          title="Church History: Two Thousand Years in Order"
          description="Church history told in order: a course from the apostles to today, the people, the councils, the Christian traditions and a timeline of two thousand years."
          url="https://www.livewellbyjamesbell.co/explore/history"
        />
      }
    />
  );
}

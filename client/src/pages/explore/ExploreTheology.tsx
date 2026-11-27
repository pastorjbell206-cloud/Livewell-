/**
 * /explore/theology: the Theology discipline page (pages/explore/DisciplinePage.tsx).
 * Its own file so the prerendered head carries this page's own title.
 */
import { SEOMeta } from "@/components/SEOMeta";
import DisciplinePage from "./DisciplinePage";

export default function ExploreTheology() {
  return (
    <DisciplinePage
      id="theology"
      head={
        <SEOMeta
          title="Theology: What Christians Believe and Where They Differ"
          description="What Christians confess, where faithful churches differ on baptism, the Supper and more, the glossary of the faith, and the creeds in full."
          url="https://www.livewellbyjamesbell.co/explore/theology"
        />
      }
    />
  );
}

/**
 * /explore/church: the Church and leadership discipline page (pages/explore/DisciplinePage.tsx).
 * Its own file so the prerendered head carries this page's own title.
 */
import { SEOMeta } from "@/components/SEOMeta";
import DisciplinePage from "./DisciplinePage";

export default function ExploreChurch() {
  return (
    <DisciplinePage
      id="church"
      head={
        <SEOMeta
          title="Church and Leadership: Group Studies and Leader Guides"
          description="Bible studies for small groups with leader guides, booklets on elders and church government, and reading plans for a church to walk together."
          url="https://www.livewellbyjamesbell.co/explore/church"
        />
      }
    />
  );
}

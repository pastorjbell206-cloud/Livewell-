/**
 * /explore/culture: the Christianity and culture discipline page (pages/explore/DisciplinePage.tsx).
 * Its own file so the prerendered head carries this page's own title.
 */
import { SEOMeta } from "@/components/SEOMeta";
import DisciplinePage from "./DisciplinePage";

export default function ExploreCulture() {
  return (
    <DisciplinePage
      id="culture"
      head={
        <SEOMeta
          title="Christianity and Culture: Faith, Nation and History"
          description="How every age and place has read the Bible, Christ and the nation, and the wrongs done inside the church and out, faced honestly."
          url="https://www.livewellbyjamesbell.co/explore/culture"
        />
      }
    />
  );
}

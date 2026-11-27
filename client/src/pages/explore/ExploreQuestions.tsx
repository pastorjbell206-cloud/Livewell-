/**
 * /explore/questions: the Difficult questions discipline page (pages/explore/DisciplinePage.tsx).
 * Its own file so the prerendered head carries this page's own title.
 */
import { SEOMeta } from "@/components/SEOMeta";
import DisciplinePage from "./DisciplinePage";

export default function ExploreQuestions() {
  return (
    <DisciplinePage
      id="questions"
      head={
        <SEOMeta
          title="Difficult Questions About God, Suffering and Faith"
          description="Honest answers to the hardest questions: suffering, hell, doubt, the silence of God, and what happens after death, answered without hurry."
          url="https://www.livewellbyjamesbell.co/explore/questions"
        />
      }
    />
  );
}

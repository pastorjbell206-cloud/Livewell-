/**
 * /explore/apologetics: the Apologetics discipline page (pages/explore/DisciplinePage.tsx).
 * Its own file so the prerendered head carries this page's own title.
 */
import { SEOMeta } from "@/components/SEOMeta";
import DisciplinePage from "./DisciplinePage";

export default function ExploreApologetics() {
  return (
    <DisciplinePage
      id="apologetics"
      head={
        <SEOMeta
          title="Apologetics: The Case for the Christian Faith"
          description="The case for the Christian faith weighed fairly: the resurrection, the reliability of the Bible, science and God, with the objections stated at full strength."
          url="https://www.livewellbyjamesbell.co/explore/apologetics"
        />
      }
    />
  );
}

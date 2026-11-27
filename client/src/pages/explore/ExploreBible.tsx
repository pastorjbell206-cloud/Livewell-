/**
 * /explore/bible: the Bible discipline page (pages/explore/DisciplinePage.tsx).
 * Its own file so the prerendered head carries this page's own title.
 */
import { SEOMeta } from "@/components/SEOMeta";
import DisciplinePage from "./DisciplinePage";

export default function ExploreBible() {
  return (
    <DisciplinePage
      id="bible"
      head={
        <SEOMeta
          title="Study the Bible: The Study Bible, Films, Atlas and Guides"
          description="Read every book of the Bible with notes beside the text, watch the Bible films, explore the atlas and background guides, and learn how to study a passage."
          url="https://www.livewellbyjamesbell.co/explore/bible"
        />
      }
    />
  );
}

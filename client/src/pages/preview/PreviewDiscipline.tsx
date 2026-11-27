/**
 * /preview/explore/<discipline>: the discipline page as it was reviewed, with
 * the preview bar and noindex. The live pages are /explore/<discipline>
 * (pages/explore/).
 */
import { useParams } from "wouter";
import DisciplinePage from "../explore/DisciplinePage";

export default function PreviewDiscipline() {
  const { discipline } = useParams<{ discipline: string }>();
  return <DisciplinePage id={discipline} live={false} />;
}

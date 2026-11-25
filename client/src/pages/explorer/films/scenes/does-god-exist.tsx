/**
 * "Does God exist?": the argument from contingency as the site's Honest
 * Answer "Does God actually exist?" states it, drawn with the picture of
 * "Who made God?" (the same argument told for younger children): the row of
 * things that each came from something, traced back; the whole row framed
 * small, since all of it could have not been; the light from beyond the
 * picture's edge that the frame rests in. Two marks are added, in ink only:
 * a balance, for what the argument does and does not show, and an open book,
 * for where the full case and the strongest objections can be read.
 *
 *   0  A fair question                    who-made-god poster (the row, and a ring with a question mark)
 *   1  Something rather than nothing      who-made-god 1 (the row runs back off the page)
 *   2  More than more chain               who-made-god 2 (the whole row framed small)
 *   3  What Christians mean by God        who-made-god 3 (the light from beyond the edge)
 *   4  What this shows, and does not      the light, and a balance
 *   5  Weigh it yourself                  the light, the balance, and an open book
 */
import { Shape } from "../../art";
import { Fade, type FilmDrawing } from "../motion";
import base from "./who-made-god";

const FROM = [-1, 1, 2, 3, 3, 3];

const film: FilmDrawing = {
  w: base.w,
  h: base.h,
  draw: (h, frame) => (
    <>
      {base.draw(h, frame < 0 ? -1 : FROM[frame])}
      {/* A balance, level: the reasons weighed, nothing forced. */}
      <Fade frame={frame} on={4} from="up">
        <path className="pl-l" d="M372,478H428M400,478V372M318,384H482" />
        <path className="pl-l" d="M330,384L312,436M330,384L348,436" />
        <path className="pl-l" d="M470,384L452,436M470,384L488,436" />
        <Shape d="M304,436H356C352,452 308,452 304,436Z" tone="b" off={1.5} />
        <Shape d="M444,436H496C492,452 448,452 444,436Z" tone="b" off={1.5} />
        <Shape d="M392,372a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z" tone="c" off={1} />
      </Fade>
      {/* An open book: where the whole case, and the case against, is set out. */}
      <Fade frame={frame} on={5} from="up" delay={200}>
        <Shape
          d="M570,476V426C590,418 612,420 630,430C648,420 670,418 690,426V476C670,468 648,470 630,480C612,470 590,468 570,476Z"
          tone="c"
        />
        <path className="pl-l" d="M630,430V480" />
        <path
          className="pl-f"
          d="M582,438C596,434 608,436 618,440M582,450C596,446 608,448 618,452M582,462C596,458 608,460 618,464M642,440C652,436 664,434 678,438M642,452C652,448 664,446 678,450M642,464C652,460 664,458 678,462"
        />
      </Fade>
    </>
  ),
};

export default film;

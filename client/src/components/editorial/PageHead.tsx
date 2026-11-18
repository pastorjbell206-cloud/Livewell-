/**
 * PageHead, under its first name. The one page top is now the art kit's
 * (components/art/PageHead.tsx, two sizes, with a plate); this keeps the
 * older props (eyebrow, lede, actions) working for the pages that already
 * use it, and draws the inner size with no picture. New pages import the
 * kit's PageHead directly.
 */
import type { ReactNode, Ref } from "react";
import KitPageHead from "@/components/art/PageHead";

export function PageHead({
  eyebrow,
  title,
  lede,
  actions,
  titleId,
  titleRef,
  width,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** One line, a sentence at most. */
  lede?: ReactNode;
  actions?: ReactNode;
  titleId?: string;
  titleRef?: Ref<HTMLHeadingElement>;
  /** Width of the head's column, to match the page below (default var(--w-default)). */
  width?: string;
}) {
  return <KitPageHead door={eyebrow} title={title} line={lede} action={actions} titleId={titleId} titleRef={titleRef} width={width} />;
}

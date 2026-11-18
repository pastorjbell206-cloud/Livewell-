/**
 * The old address of an ebook that is held back (James, 2026-11-18): every
 * ebook is free except the seven whose files name the Pastors Connection
 * Network, which wait for his corrected files. The page says so plainly and
 * sends the reader on to the free ebooks. Not in the sitemap; noindex.
 *
 * A past buyer's own download still works at /<slug>/thank-you (the paid
 * check in api/index.ts reads content/held-downloads/).
 */
import { Link, useLocation } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { HELD_EBOOKS } from "@/data/ebooks";

export default function HeldEbook() {
  const [path] = useLocation();
  const slug = path.replace(/^\/+|\/+$/g, "");
  const title = HELD_EBOOKS.find((b) => b.slug === slug)?.title;

  return (
    <Layout>
      <SEOMeta
        title="This ebook is being revised"
        description="This ebook is off the shelf while it is revised. Every other ebook on LiveWell is free to download."
        noindex
      />
      <PageHead
        door="Downloads"
        doorHref="/downloads"
        title="This ebook is being revised"
        line={title ? <><em>{title}</em> is off the shelf for now. It comes back when the new edition is ready.</> : "It comes back when the new edition is ready."}
        plate="books"
        action={
          <>
            <Link href="/downloads" className="btn">See the free ebooks</Link>
            <Link href="/writing" className="btn btn--quiet">Read the essays</Link>
          </>
        }
      >
        <p className="pg-head__lede">
          Every other ebook on the site is free to download, with no email and no checkout.
          If you bought this one before, your download page still works.
        </p>
      </PageHead>
    </Layout>
  );
}

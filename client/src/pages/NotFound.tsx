import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/**
 * 404: the one page a lost reader lands on. It keeps the room: the site's own
 * header and footer, cream, Cormorant, quiet. No alarm icons; a wrong turn is
 * not an emergency. Three real ways on, the first an ink button (.nf-* and
 * .pg-action in index.css). Search engines are told not to keep it (noindex).
 */
export default function NotFound() {
  return (
    <Layout>
      <SEOMeta title="Page Not Found" description="There is no page at this address. The writing, the Study Bible and the tools are still where they were." noindex />
      <section className="nf" aria-labelledby="nf-title">
        <div className="nf__inner">
          <p className="eyebrow nf__eyebrow">Page not found</p>
          <h1 id="nf-title" className="nf__title">
            There is no page here.
          </h1>
          <p className="nf__text">
            The address may have changed, or the link was wrong. The writing, the Study Bible and the tools are all still where they were.
          </p>
          <div className="nf__actions">
            <Link href="/" className="pg-action">
              Back to the front page
            </Link>
            <Link href="/search" className="pg-action pg-action--quiet">
              Search the site
            </Link>
            <Link href="/writing" className="pg-action pg-action--quiet">
              The essays
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

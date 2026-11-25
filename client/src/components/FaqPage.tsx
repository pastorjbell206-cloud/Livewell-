/**
 * FaqPage: the one template for the /faq/* pages. Each page keeps its own
 * questions and answers, word for word, and its SEOMeta; this draws them in
 * the kit's look: the inner page top with the Questions door's lantern, the
 * questions as an open-and-close list (one open at a time, as before), one
 * "go deeper" link, and the related questions.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpenText, MessageCircleQuestion, Plus } from "lucide-react";
import InnerHead from "@/components/art/InnerHead";
import SectionHead from "@/components/art/SectionHead";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqMore {
  title: string;
  text: string;
  href: string;
  label: string;
}

export default function FaqPage({
  path,
  title,
  line,
  items,
  more,
  related,
}: {
  path: string;
  title: string;
  line: string;
  items: FaqItem[];
  /** The one place to go deeper, or null when it is not public. */
  more: FaqMore | null;
  related: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const slug = path.split("/").pop();
  return (
    <>
      <InnerHead path={path} title={title} line={line} plate="lantern" />

      <section className="home-sec lw-faq-sec" aria-labelledby={`${slug}-qs`}>
        <div className="lw-faq-wrap">
          <SectionHead icon={MessageCircleQuestion} label={`${items.length} questions answered`} title="Open a question." id={`${slug}-qs`} />
          <ul className="lw-faq">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.question} className="lw-faq__item">
                  <h3 className="lw-faq__q">
                    <button type="button" aria-expanded={isOpen} aria-controls={`${slug}-a${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                      <span>{item.question}</span>
                      <Plus aria-hidden="true" size={20} strokeWidth={1.75} className="lw-faq__mark" />
                    </button>
                  </h3>
                  <div id={`${slug}-a${i}`} hidden={!isOpen} className="lw-faq__a">
                    <p>{item.answer}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {more && (
        <section className="home-sec home-sec--dark" aria-labelledby={`${slug}-more`}>
          <div className="lw-faq-wrap">
            <SectionHead dark icon={BookOpenText} label="Go deeper" title={more.title} id={`${slug}-more`} />
            <p className="lw-faq__more">{more.text}</p>
            <Link href={more.href} className="btn btn--on-dark">
              {more.label}
            </Link>
          </div>
        </section>
      )}

      <section className="home-sec home-sec--warm" aria-labelledby={`${slug}-related`}>
        <div className="lw-faq-wrap">
          <SectionHead label="Related questions" title="Ask the next one." id={`${slug}-related`} link={{ href: "/answers", label: "All Honest Answers" }} />
          <ul className="lw-faq-related">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href}>
                  <span>{r.label}</span>
                  <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

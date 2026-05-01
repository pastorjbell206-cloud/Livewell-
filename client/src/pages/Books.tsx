import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const BOOKS = [
  { id: 1, title: "The Unfinished Church", subtitle: "Calling, Vision, and the Future God Is Building", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6105(1)_c43867fd.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+unfinished+church" },
  { id: 2, title: "Common Grace", subtitle: "What Pastors Learn When They Listen to the World", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6104(1)_d3e28653.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+common+grace" },
  { id: 3, title: "Faithful in Exile", subtitle: "Pastoral Leadership and the Church's Witness in a Post-Christian Age", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6103(1)_c6081150.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+faithful+exile" },
  { id: 4, title: "To the Ends of the Earth", subtitle: "Global Mission, National Partnership, and the Sent Church", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6102(1)_5d27f987.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+ends+earth" },
  { id: 5, title: "Sent Into the City", subtitle: "The Church's Calling to Its Neighborhood and World", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6101(1)_826f5a0f.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+sent+city" },
  { id: 6, title: "Necessary Words", subtitle: "A Pastoral Theology of Courage and Difficult Conversations", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6100(1)_2e31f72f.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+necessary+words" },
  { id: 7, title: "One Body, Many Churches", subtitle: "A Theology of Unity for a Fractured Church", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6099(1)_26ff2b07.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+one+body" },
  { id: 8, title: "The Pruning", subtitle: "Church Decline, Faithful Endurance, and the Promise of Renewal", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6098(1)_d320cdd1.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+pruning" },
  { id: 9, title: "The Undershepherd", subtitle: "Pastoral Leadership, Authority, and the Care of God's People", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6097(1)_49657a50.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+undershepherd" },
  { id: 10, title: "Preach the Word", subtitle: "A Theology and Practice of Gospel Proclamation", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6096(1)_ee39cea8.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+preach+word" },
  { id: 11, title: "Earthen Vessels", subtitle: "Mental Health, Human Weakness, and the Grace That Sustains", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6095(1)_9b633d06.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+earthen+vessels" },
  { id: 12, title: "The First Flock", subtitle: "A Pastor's Theology of Marriage, Family, and Home", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6094(1)_cf6b80e2.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+first+flock" },
  { id: 13, title: "The Hidden Life", subtitle: "Spiritual Formation for the Pastor No One Sees", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6093(1)_43043b66.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+hidden+life" },
  { id: 14, title: "Dangerous Calling", subtitle: "Why Pastors Burn Out, Walk Away, and How to Stay", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6092(1)_aed4b669.jpeg", amazonUrl: "https://www.amazon.com/s?k=james+bell+dangerous+calling" },
];

const PATHS = [
  {
    title: "If you are a pastor on the edge of burnout",
    desc: "Start here. These three books were written inside the crisis, not about it. Dangerous Calling names what you are afraid to say out loud. The Hidden Life names what you have stopped tending. Earthen Vessels names the weakness you have been taught to hide.",
    bookIds: [14, 13, 11],
  },
  {
    title: "If you are leading a church and the numbers are not working",
    desc: "The church growth playbook failed. These books name why, and what faithful leadership looks like when the metrics stop cooperating.",
    bookIds: [8, 1, 9],
  },
  {
    title: "If your family is paying the price for your ministry",
    desc: "The pastor's home is often the last place the pastor pastors. The First Flock is where that reckoning begins.",
    bookIds: [12, 14, 11],
  },
  {
    title: "If you need to say something hard and you do not know how",
    desc: "Courage in the pulpit and in the elder meeting. Necessary Words is the book for the conversation you have been avoiding.",
    bookIds: [6, 10, 2],
  },
  {
    title: "If you believe the church is called to more than survival",
    desc: "Mission, unity, and the post-Christian witness. These books ask what the church is for — and whether we have forgotten.",
    bookIds: [5, 4, 7, 3],
  },
];

export default function Books() {
  return (
    <Layout>
      <SEOMeta
        title="Books — James Bell"
        description="25 books on pastoral ministry, theology, marriage, and the weight of faithful leadership. Read them as paths, not a list."
        type="webpage"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Books by James Bell",
          description: "25 books on pastoral ministry, theology, and the Christian life.",
          url: "https://www.livewellbyjamesbell.co/books",
        }}
      />

      {/* HEADER */}
      <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)", fontFamily: "var(--U)", marginBottom: "1.5rem" }}>The Books</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1.5rem" }}>
            Twenty-five books written across fifteen years of ministry
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.65, maxWidth: "600px" }}>
            Every book asks the same question from a different angle: what does it look like to follow Jesus when the answers are harder than the songs we sing on Sunday? Read them as paths, not a list.
          </p>
        </div>
      </section>

      {/* READING PATHS */}
      <section style={{ background: "var(--bone)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "1rem" }}>Reading Paths</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: "var(--ink)", marginBottom: "3rem" }}>Start where you are</h2>

          {PATHS.map((path, i) => {
            const books = path.bookIds.map(id => BOOKS.find(b => b.id === id)!).filter(Boolean);
            return (
              <div key={i} style={{ marginBottom: "3rem", paddingBottom: "3rem", borderBottom: i < PATHS.length - 1 ? "1px solid var(--bone-muted)" : "none" }}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", fontWeight: 400, fontStyle: "italic", color: "var(--ink)", marginBottom: "0.75rem", lineHeight: 1.35 }}>{path.title}</h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "1.5rem", maxWidth: "600px" }}>{path.desc}</p>
                <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
                  {books.map((book) => (
                    <a key={book.id} href={book.amazonUrl} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, textDecoration: "none" }}>
                      <img src={book.cover} alt={book.title} loading="lazy" style={{ width: "120px", height: "180px", objectFit: "cover", borderRadius: "2px", border: "1px solid var(--bone-muted)", transition: "all 240ms cubic-bezier(0.22,1,0.36,1)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                      <div style={{ fontSize: "0.7rem", color: "var(--ink-muted)", marginTop: "0.5rem", maxWidth: "120px", lineHeight: 1.3, fontFamily: "var(--U)" }}>{book.title}</div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULL CATALOG */}
      <section style={{ background: "var(--bone-warm)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "1rem" }}>Full Catalog</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: "var(--ink)", marginBottom: "3rem" }}>All {BOOKS.length} books</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2rem" }}>
            {BOOKS.map((book) => (
              <a key={book.id} href={book.amazonUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ transition: "all 240ms cubic-bezier(0.22,1,0.36,1)", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
                >
                  <img src={book.cover} alt={book.title} loading="lazy" style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", borderRadius: "2px", border: "1px solid var(--bone-muted)", marginBottom: "0.75rem" }} />
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.3, marginBottom: "0.25rem" }}>{book.title}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.4, fontFamily: "var(--U)" }}>{book.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CROSS-LINK: WRITING */}
      <section style={{ background: "var(--charcoal)", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", fontStyle: "italic", lineHeight: 1.55, color: "var(--bone)", marginBottom: "1.5rem" }}>
            The books are the architecture. The essays are the application. Read both.
          </p>
          <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
            Read the essays <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

import { ExternalLink, BookOpen, ArrowRight, X, Star } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";

const AUTHORED_BOOKS = [
  { id: 1, title: "The Unfinished Church", subtitle: "Calling, Vision, and the Future God Is Building", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6105(1)_c43867fd.jpeg", description: "A compelling exploration of how God calls His church to vision and purpose in an ever-changing world.", amazonUrl: "https://www.amazon.com/s?k=james+bell+unfinished+church", featured: true },
  { id: 2, title: "Common Grace", subtitle: "What Pastors Learn When They Listen to the World", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6104(1)_d3e28653.jpeg", description: "Learn how pastors can engage with culture and the world around them with theological depth and prophetic witness.", amazonUrl: "https://www.amazon.com/s?k=james+bell+common+grace" },
  { id: 3, title: "Faithful in Exile", subtitle: "Pastoral Leadership and the Church's Witness in a Post-Christian Age", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6103(1)_c6081150.jpeg", description: "Navigate pastoral leadership in a rapidly secularizing culture with biblical wisdom and practical guidance.", amazonUrl: "https://www.amazon.com/s?k=james+bell+faithful+exile" },
  { id: 4, title: "To the Ends of the Earth", subtitle: "Global Mission, National Partnership, and the Sent Church", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6102(1)_5d27f987.jpeg", description: "Discover how local churches participate in God's global mission and partner with other believers worldwide.", amazonUrl: "https://www.amazon.com/s?k=james+bell+ends+earth" },
  { id: 5, title: "Sent Into the City", subtitle: "The Church's Calling to Its Neighborhood and World", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6101(1)_826f5a0f.jpeg", description: "Understand how the church is called to engage its community with the gospel and prophetic witness.", amazonUrl: "https://www.amazon.com/s?k=james+bell+sent+city" },
  { id: 6, title: "Necessary Words", subtitle: "A Pastoral Theology of Courage and Difficult Conversations", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6100(1)_2e31f72f.jpeg", description: "Learn how to speak truth with love and courage in difficult conversations that matter.", amazonUrl: "https://www.amazon.com/s?k=james+bell+necessary+words" },
  { id: 7, title: "One Body, Many Churches", subtitle: "A Theology of Unity for a Fractured Church", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6099(1)_26ff2b07.jpeg", description: "Explore biblical theology of church unity and how local churches can work together for kingdom purposes.", amazonUrl: "https://www.amazon.com/s?k=james+bell+one+body" },
  { id: 8, title: "The Pruning", subtitle: "Church Decline, Faithful Endurance, and the Promise of Renewal", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6098(1)_d320cdd1.jpeg", description: "Find hope and guidance for churches facing decline, with biblical perspective on renewal and restoration.", amazonUrl: "https://www.amazon.com/s?k=james+bell+pruning" },
  { id: 9, title: "The Undershepherd", subtitle: "Pastoral Leadership, Authority, and the Care of God's People", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6097(1)_49657a50.jpeg", description: "Understand biblical pastoral leadership and how to shepherd God's flock with wisdom and compassion.", amazonUrl: "https://www.amazon.com/s?k=james+bell+undershepherd" },
  { id: 10, title: "Preach the Word", subtitle: "A Theology and Practice of Gospel Proclamation", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6096(1)_ee39cea8.jpeg", description: "Develop a theology of preaching that transforms lives and proclaims the gospel with power.", amazonUrl: "https://www.amazon.com/s?k=james+bell+preach+word" },
  { id: 11, title: "Earthen Vessels", subtitle: "Mental Health, Human Weakness, and the Grace That Sustains", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6095(1)_9b633d06.jpeg", description: "Explore mental health, human weakness, and the sustaining grace of God in pastoral ministry.", amazonUrl: "https://www.amazon.com/s?k=james+bell+earthen+vessels" },
  { id: 12, title: "The First Flock", subtitle: "A Pastor's Theology of Marriage, Family, and Home", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6094(1)_cf6b80e2.jpeg", description: "Develop a biblical theology of marriage and family as the pastor's first ministry responsibility.", amazonUrl: "https://www.amazon.com/s?k=james+bell+first+flock" },
  { id: 13, title: "The Hidden Life", subtitle: "Spiritual Formation for the Pastor No One Sees", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6093(1)_43043b66.jpeg", description: "Cultivate spiritual depth and formation in the hidden life that sustains public ministry.", amazonUrl: "https://www.amazon.com/s?k=james+bell+hidden+life" },
  { id: 14, title: "Dangerous Calling", subtitle: "Why Pastors Burn Out, Walk Away, and How to Stay", cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_6092(1)_aed4b669.jpeg", description: "Understand pastor burnout and discover biblical pathways to sustainable, faithful ministry.", amazonUrl: "https://www.amazon.com/s?k=james+bell+dangerous+calling", featured: true },
];

export default function Books() {
  const [, navigate] = useLocation();
  const booksQuery = trpc.books.listPublished.useQuery();
  const [selectedBook, setSelectedBook] = useState<typeof AUTHORED_BOOKS[0] | null>(null);

  const recommendedBooks = booksQuery.data?.filter((b: any) => b.bookType === "recommended") || [];
  const featuredBook = AUTHORED_BOOKS.find((b) => b.featured);

  return (
    <Layout>
      <SEOMeta
        title="Books"
        description="Published works by James Bell and curated reading list. Explore books on theology, faith, leadership, and Christian thought."
        keywords="books, theology, faith, Christian leadership, reading list"
      />
      <div>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero__inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <div className="kicker">
                <div className="kicker-line"></div>
                <div className="kicker-txt">PUBLISHED WORKS</div>
              </div>
              <h1 className="hero-h">
                Explore <strong>Books</strong> by James Bell
              </h1>
              <p className="hero-sub">
                Published titles, books in development, and the reading list that shaped everything I think and teach.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED BOOK SECTION */}
        {featuredBook && (
          <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px" }}>
            <div className="wrap" style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                <div>
                  <img 
                    src={featuredBook.cover} 
                    alt={featuredBook.title}
                    style={{ width: "100%", borderRadius: "8px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <Star size={20} fill="#B8963E" color="#B8963E" />
                    <span style={{ fontSize: "14px", fontWeight: "bold", color: "#B8963E", textTransform: "uppercase", letterSpacing: "0.1em" }}>Featured Book</span>
                  </div>
                  <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px", lineHeight: "1.2" }}>
                    {featuredBook.title}
                  </h2>
                  <p style={{ fontSize: "18px", color: "#D1C9BB", marginBottom: "24px", fontStyle: "italic" }}>
                    {featuredBook.subtitle}
                  </p>
                  <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "32px" }}>
                    {featuredBook.description}
                  </p>
                  <a 
                    href={featuredBook.amazonUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#B8963E",
                      color: "#1A1A1A",
                      padding: "12px 24px",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "14px",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#D4A574"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#B8963E"}
                  >
                    Buy on Amazon
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* START HERE SECTION */}
        <section style={{ background: "#F7F5F0", padding: "60px 20px" }}>
          <div className="wrap" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ marginBottom: "48px" }}>
              <div className="kicker" style={{ marginBottom: "12px" }}>
                <div className="kicker-line"></div>
                <div className="kicker-txt">NEW TO JAMES BELL?</div>
              </div>
              <h2 className="section-title">Start Here</h2>
              <p className="section-sub">Recommended reading order for first-time readers</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
              {[
                { order: "1st", title: "The Unfinished Church", reason: "Foundation for understanding James's vision" },
                { order: "2nd", title: "Dangerous Calling", reason: "Practical wisdom for pastoral ministry" },
                { order: "3rd", title: "The Hidden Life", reason: "Spiritual formation and personal growth" },
              ].map((item) => (
                <div key={item.order} style={{
                  background: "white",
                  padding: "32px",
                  borderRadius: "8px",
                  border: "1px solid #E5DDD0",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "48px", fontWeight: "bold", color: "#B8963E", marginBottom: "12px" }}>
                    {item.order}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "8px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6B7280" }}>
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AUTHORED BOOKS SECTION */}
        <section className="section">
          <div className="wrap">
            <div style={{ marginBottom: "48px" }}>
              <div className="kicker" style={{ marginBottom: "12px" }}>
                <div className="kicker-line"></div>
                <div className="kicker-txt">BY JAMES BELL</div>
              </div>
              <h2 className="section-title">All Authored Books</h2>
              <p className="section-sub">14 books on pastoral leadership, theology, and spiritual formation</p>
            </div>

            <div className="grid grid-4">
              {AUTHORED_BOOKS.map((book) => (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "0",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{
                    marginBottom: "16px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    aspectRatio: "3/4"
                  }}>
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "4px", lineHeight: "1.3" }}>
                    {book.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.4" }}>
                    {book.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* RECOMMENDED BOOKS SECTION */}
        {recommendedBooks.length > 0 && (
          <section style={{ background: "#F7F5F0", padding: "60px 20px" }}>
            <div className="wrap">
              <div style={{ marginBottom: "48px" }}>
                <div className="kicker" style={{ marginBottom: "12px" }}>
                  <div className="kicker-line"></div>
                  <div className="kicker-txt">RECOMMENDED READING</div>
                </div>
                <h2 className="section-title">Books That Shaped My Thinking</h2>
                <p className="section-sub">Curated list of essential reads on theology, leadership, and faith</p>
              </div>

              <div className="grid grid-3">
                {recommendedBooks.slice(0, 9).map((book: any) => (
                  <div key={book.id} style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "8px",
                    border: "1px solid #E5DDD0"
                  }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "4px" }}>
                      {book.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "12px" }}>
                      by {book.author}
                    </p>
                    <p style={{ fontSize: "13px", color: "#2C3E50", lineHeight: "1.5" }}>
                      {book.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BOOK DETAIL MODAL */}
        {selectedBook && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }} onClick={() => setSelectedBook(null)}>
            <div style={{
              background: "white",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              padding: "40px",
              position: "relative",
              maxHeight: "90vh",
              overflow: "auto"
            }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedBook(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  color: "#6B7280"
                }}
              >
                <X size={24} />
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }}>
                <div>
                  <img 
                    src={selectedBook.cover} 
                    alt={selectedBook.title}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "8px", lineHeight: "1.3" }}>
                    {selectedBook.title}
                  </h2>
                  <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "24px", fontStyle: "italic" }}>
                    {selectedBook.subtitle}
                  </p>
                  <p style={{ fontSize: "15px", color: "#2C3E50", lineHeight: "1.6", marginBottom: "24px" }}>
                    {selectedBook.description}
                  </p>
                  <a 
                    href={selectedBook.amazonUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#B8963E",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "14px",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#A0824F"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#B8963E"}
                  >
                    Buy on Amazon
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

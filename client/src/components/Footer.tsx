import { Link } from "wouter";

export default function Footer() {
  return (
    <footer style={{
      background: "#1A1A1A",
      color: "#F7F5F0",
      padding: "60px 20px 20px",
      marginTop: "60px",
      borderTop: "4px solid #B8963E"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "40px",
        marginBottom: "40px"
      }}>
        {/* Column 1 - Brand */}
        <div>
          <div style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#B8963E",
            marginBottom: "8px"
          }}>
            LiveWell
          </div>
          <p style={{
            fontSize: "12px",
            color: "#D1C9BB",
            lineHeight: "1.6",
            marginBottom: "16px"
          }}>
            Connecting the depth of theology to the weight of everyday life.
          </p>
        </div>

        {/* Column 2 - Topics */}
        <div>
          <h3 style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#F7F5F0"
          }}>
            Topics
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link href="/writing" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Theological Depth</Link>
            <Link href="/writing" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Justice</Link>
            <Link href="/writing" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Pastoral Ministry</Link>
            <Link href="/writing" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Marriage</Link>
            <Link href="/writing" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Parenting</Link>
            <Link href="/writing" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Finances</Link>
            <Link href="/writing" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Devotionals</Link>
          </div>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h3 style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#F7F5F0"
          }}>
            Resources
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link href="/books" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Books</Link>
            <Link href="/reading-paths" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Reading Paths</Link>
            <Link href="/resources" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Sermon Series</Link>
            <Link href="/resources" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>PDF Downloads</Link>
            <Link href="/reading-paths" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>The 5 Pillars</Link>
          </div>
        </div>

        {/* Column 4 - Connect */}
        <div>
          <h3 style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#F7F5F0"
          }}>
            Connect
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link href="/about" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>About James Bell</Link>
            <Link href="/membership" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "12px" }}>Membership</Link>
            <a href="https://pastorsconnectionnetwork.com" target="_blank" rel="noopener noreferrer" style={{
              color: "#D1C9BB",
              textDecoration: "none",
              fontSize: "12px"
            }}>
              Pastors Network
            </a>
            <a href="https://open.substack.com/pub/jamesbell333289" target="_blank" rel="noopener noreferrer" style={{
              color: "#D1C9BB",
              textDecoration: "none",
              fontSize: "12px"
            }}>
              Substack
            </a>
            <a href="mailto:contact@livewell.com" style={{
              color: "#D1C9BB",
              textDecoration: "none",
              fontSize: "12px"
            }}>
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid #2D4A3E",
        paddingTop: "20px",
        textAlign: "center",
        fontSize: "12px",
        color: "#D1C9BB"
      }}>
        Â© 2026 LiveWell by James Bell. All rights reserved. Â· 
        <a href="#" style={{ color: "#D1C9BB", textDecoration: "none", marginLeft: "8px" }}>Privacy Policy</a> Â· 
        <a href="#" style={{ color: "#D1C9BB", textDecoration: "none", marginLeft: "8px" }}>Terms of Service</a>
      </div>
    </footer>
  );
}

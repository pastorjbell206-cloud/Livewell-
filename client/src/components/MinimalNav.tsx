import { Link } from "wouter";

export default function MinimalNav() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#1A1A1A',
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #2D4A3E',
      width: '100%'
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#B8963E', cursor: 'pointer' }}>LiveWell</div>
      </Link>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#F7F5F0', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Home</Link>
        <Link href="/writing" style={{ color: '#F7F5F0', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Writing</Link>
        <Link href="/books" style={{ color: '#F7F5F0', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Books</Link>
        <Link href="/resources" style={{ color: '#F7F5F0', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Resources</Link>
        <Link href="/membership" style={{ color: '#F7F5F0', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Membership</Link>
        <Link href="/about" style={{ color: '#F7F5F0', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>About</Link>
      </div>
    </nav>
  );
}

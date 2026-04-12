import { ReactNode } from "react";
import MinimalNav from "./MinimalNav";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MinimalNav />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

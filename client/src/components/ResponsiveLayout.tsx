import { useState } from "react";
import { Menu, X } from "lucide-react";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  navItems: Array<{ label: string; href: string }>;
}

export function ResponsiveLayout({ children, navItems }: ResponsiveLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile menu button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 rounded-full shadow-lg transition-all hover:shadow-xl"
          style={{ backgroundColor: "#B8963E", color: "#F7F5F0" }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="fixed bottom-20 right-6 bg-white rounded-lg shadow-lg z-30 md:hidden p-4 min-w-max">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                  style={{ color: "#1A1A1A" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "wouter";

interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

interface MobileNavigationProps {
  items: NavItem[];
}

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleSubmenu = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="md:hidden">
      {/* Menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-colors"
        style={{ color: "#1A1A1A" }}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg"
          style={{ borderColor: "#D1C9BB" }}
        >
          <nav className="p-4 space-y-2">
            {items.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="flex-1 px-4 py-2 rounded text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: "#1A1A1A" }}
                    onClick={() => !item.submenu && setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="px-2 py-2"
                      style={{ color: "#B8963E" }}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          expandedItems.has(item.label) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && expandedItems.has(item.label) && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-4 py-2 rounded text-sm transition-colors hover:bg-gray-100"
                        style={{ color: "#6B7280" }}
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

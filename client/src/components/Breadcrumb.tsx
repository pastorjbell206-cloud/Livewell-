import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Link href="/">
        <a className="flex items-center gap-1 hover:text-foreground transition-colors">
          <Home size={16} />
          <span>Home</span>
        </a>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-border" />
          {item.href ? (
            <Link href={item.href}>
              <a className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

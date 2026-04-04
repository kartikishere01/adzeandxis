"use client";

import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Newsroom", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100]"
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity 0.35s ease",
        background: "rgba(20, 17, 14, 0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="w-full relative"
        style={{
          padding: "0 40px",
          height: "85px",
          display: "flex",
          gap: "50px",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {NAV_ITEMS.map((item, idx) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          return <NavItem key={idx} {...item} isActive={isActive} onClick={() => setIsOpen(false)} />;
        })}
      </div>
    </nav>
  );
}

function NavItem({ label, href, isActive, onClick }: { label: string; href: string, isActive?: boolean, onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group flex items-center text-[var(--foreground)] cursor-pointer outline-none uppercase transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
      style={{ textDecoration: 'none', whiteSpace: 'nowrap', minHeight: '44px', minWidth: '44px', fontFamily: 'var(--font-condensed), sans-serif', fontSize: '14px', letterSpacing: '0.25em' }}
    >
      <span className={`inline-block ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>[ </span>
      <span className="inline-block tracking-[0.2em] px-2 pt-[1px]">{label}</span>
      <span className={`inline-block ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}> ]</span>
    </a>
  );
}

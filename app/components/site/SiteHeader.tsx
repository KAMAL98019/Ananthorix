"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Button from "../ui/Button";
import Container from "../layout/Container";
import { cx } from "../ui/cx";
import { headerCtas, primaryNav, type NavItem } from "./navigation";

// Glass is used by the header after scroll and by open disclosure panels.
// Together with the hero and agent panels, keep this to three or fewer visible at once.

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Which disclosure panel is open: a nav label, or null. Only one can be open.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const disclosureButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes whichever menu is open and returns focus to its toggle.
  useEffect(() => {
    if (openMenu === null && !mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openMenu !== null) {
        const label = openMenu;
        setOpenMenu(null);
        disclosureButtons.current[label]?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu, mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const renderDesktopItem = (item: NavItem) => {
    if (!item.children) {
      return (
        <li key={item.label}>
          <Link
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cx(
              "inline-flex min-h-11 items-center rounded-button px-3 text-small font-medium hover:text-indigo",
              isActive(item.href) ? "text-deep-blue underline underline-offset-8" : "text-fg-secondary",
            )}
          >
            {item.label}
          </Link>
        </li>
      );
    }

    const isOpen = openMenu === item.label;
    const panelId = `${item.label.replace(/\s+/g, "-").toLowerCase()}-menu`;
    return (
      <li
        key={item.label}
        className="relative"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setOpenMenu((current) => (current === item.label ? null : current));
          }
        }}
      >
        <button
          ref={(el) => {
            disclosureButtons.current[item.label] = el;
          }}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenMenu(isOpen ? null : item.label)}
          className={cx(
            "inline-flex min-h-11 items-center gap-1 rounded-button px-3 text-small font-medium hover:text-indigo",
            isActive(item.href) ? "text-deep-blue" : "text-fg-secondary",
          )}
        >
          {item.label}
          <ChevronDown aria-hidden="true" className={cx("size-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        <div
          id={panelId}
          hidden={!isOpen}
          className="glass absolute top-full left-0 mt-3 w-[min(92vw,640px)] rounded-panel p-6"
        >
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={closeMenus}
                  aria-current={isActive(child.href) ? "page" : undefined}
                  className="flex min-h-11 items-center rounded-button px-3 text-small font-medium text-fg-primary hover:bg-surface-1 hover:text-indigo"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={item.href}
            onClick={closeMenus}
            className="mt-4 inline-flex min-h-11 items-center px-3 font-semibold text-deep-blue underline underline-offset-4"
          >
            {item.allLabel ?? `All ${item.label.toLowerCase()}`}
          </Link>
        </div>
      </li>
    );
  };

  return (
    <header
      className={cx(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled ? "glass" : "bg-canvas",
      )}
    >
      <Container
        className={cx(
          "flex items-center justify-between gap-6 transition-[padding] duration-300",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <Link
          href="/"
          aria-label="Anantorix Technologies, home"
          onClick={closeMenus}
          className="inline-flex shrink-0 rounded-tag"
        >
          <Image
            src="/images/companylogo.png"
            alt=""
            width={209}
            height={43}
            priority
            className={cx("h-auto w-[150px] transition-transform duration-300 lg:w-[180px]", scrolled && "origin-left scale-95")}
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">{primaryNav.map(renderDesktopItem)}</ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="secondary" href={headerCtas.secondary.href} onClick={closeMenus}>
              {headerCtas.secondary.label}
            </Button>
            <Button variant="primary" href={headerCtas.primary.href} onClick={closeMenus}>
              {headerCtas.primary.label}
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={menuButton}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center rounded-button text-deep-blue hover:bg-surface-2 lg:hidden"
          >
            {mobileOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel: a plain, fully expanded list. No hover, no nested disclosure. */}
      <div id={mobileId} hidden={!mobileOpen} className="max-h-[80vh] overflow-y-auto border-t border-line bg-canvas lg:hidden">
        <Container className="py-6">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.label} className="border-b border-line py-1">
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "flex min-h-11 items-center py-2 text-base font-semibold",
                      isActive(item.href) ? "text-deep-blue" : "text-fg-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-3 ml-1 flex flex-col border-l border-line pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMenus}
                            aria-current={isActive(child.href) ? "page" : undefined}
                            className="flex min-h-11 items-center text-small font-medium text-fg-secondary hover:text-indigo"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Button variant="primary" href={headerCtas.primary.href} onClick={closeMenus} className="w-full">
              {headerCtas.primary.label}
            </Button>
            <Button variant="secondary" href={headerCtas.secondary.href} onClick={() => setMobileOpen(false)} className="w-full">
              {headerCtas.secondary.label}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, PenTool, Code, Smartphone, Bot, Zap, Monitor } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const servicesList = [
  { icon: PenTool, href: "/services/ui-ux-design", label: "UI/UX Design", description: "Crafting intuitive and engaging user experiences." },
  { icon: Code, href: "/services/custom-software", label: "Custom Software", description: "Tailor-made software solutions for your enterprise." },
  { icon: Smartphone, href: "/services/mobile-apps", label: "Mobile Apps", description: "High-performance mobile applications." },
  { icon: Bot, href: "/services/generative-ai", label: "Generative AI Development", description: "Cutting-edge AI integration and model training." },
  { icon: Zap, href: "/services/mvp-development", label: "MVP development", description: "Rapid prototyping to validate your product." },
  { icon: Monitor, href: "/services/desktop-application", label: "Desktop application", description: "Robust cross-platform desktop software." }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#07152D]/90 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between px-6 sm:px-10 py-4 sm:py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/companylogo.png"
            alt="Logo"
            width={140}
            height={140}
            loading="eager"
            fetchPriority="high"
            className="h-auto sm:w-[180px]"
          />
        </Link>
        
        {/* Hide links on mobile, show on md and up */}
        <ul className="text-16 hidden md:flex items-center space-x-8 font-bold text-[#C1C6D5]">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            if (link.label === "Services") {
              return (
                <li key={link.href} className="group relative">
                  <button className={`flex items-center gap-1.5 transition py-2 ${isActive ? "text-[#A6C8FF]" : "text-[#C1C6D5] hover:text-[#A6C8FF]"}`}>
                    {link.label}
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  {/* Desktop Mega Menu Dropdown */}
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-max z-50">
                    <div className="bg-[#0b1a30] border border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-4 w-[600px] relative">
                      {/* Arrow pointer */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0b1a30] border-t border-l border-white/10 rotate-45"></div>
                      
                      {servicesList.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link href={service.href} key={service.label} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group/item">
                            <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-lg bg-[#187BDD]/10 text-[#187BDD] group-hover/item:bg-[#187BDD] group-hover/item:text-white transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white font-semibold text-base mb-1">{service.label}</span>
                              <span className="text-slate-400 text-xs font-normal leading-relaxed">{service.description}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition py-2 ${
                    isActive
                      ? "underline-offset-10 text-[#A6C8FF] underline"
                      : "text-[#C1C6D5] hover:text-[#A6C8FF]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contact" className="hidden sm:inline-block cursor-pointer rounded-md bg-[#187BDD] px-4 py-2 text-sm font-semibold text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#A6C8FF] focus:ring-offset-2 hover:bg-[#156bbb] transition-colors">
            Book Consultation
        </Link>
        
        {/* Mobile menu icon */}
        <button 
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#07152D] px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <ul className="flex flex-col space-y-4 text-base font-bold text-[#C1C6D5]">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.label === "Services" ? (
                  <div className="flex flex-col">
                    <span className="block text-white mb-3">{link.label}</span>
                    <ul className="flex flex-col space-y-3 pl-4 border-l border-white/10 ml-2">
                      {servicesList.map((service) => (
                        <li key={service.label}>
                          <Link 
                            href={service.href} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="block text-sm font-medium text-slate-400 hover:text-[#A6C8FF]"
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block hover:text-[#A6C8FF]"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center block cursor-pointer rounded-md bg-[#187BDD] px-4 py-3 text-sm font-semibold text-[#FFFFFF] mt-6 hover:bg-[#156bbb] transition-colors">
              Book Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Globe, Share2, AtSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050b14] pt-20 pb-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/companylogo.png"
              alt="ANANTORIX Logo"
              width={140}
              height={140}
              className="h-auto w-[140px] sm:w-[160px] mb-6"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Infinite engineering for the modern enterprise. Pioneering the next frontier of intelligent digital solutions.
            </p>
          </div>

          {/* Services Column */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/services/ui-ux-design" className="text-slate-400 hover:text-white transition-colors text-sm">UI/UX Design</Link></li>
              <li><Link href="/services/custom-software" className="text-slate-400 hover:text-white transition-colors text-sm">Custom Software</Link></li>
              <li><Link href="/services/mobile-apps" className="text-slate-400 hover:text-white transition-colors text-sm">Mobile Apps</Link></li>
              <li><Link href="/services/generative-ai" className="text-slate-400 hover:text-white transition-colors text-sm">Generative AI Development</Link></li>
              <li><Link href="/services/mvp-development" className="text-slate-400 hover:text-white transition-colors text-sm">MVP development</Link></li>
              <li><Link href="/services/desktop-application" className="text-slate-400 hover:text-white transition-colors text-sm">Desktop application</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          {/* <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-6">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Visit our website" className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 text-slate-400 hover:bg-white hover:text-[#050b14] transition-all">
                <Globe className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Share on social media" className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 text-slate-400 hover:bg-white hover:text-[#050b14] transition-all">
                <Share2 className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Send us an email" className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 text-slate-400 hover:bg-white hover:text-[#050b14] transition-all">
                <AtSign className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-800/80">
          <p className="text-slate-500 text-xs mb-4 sm:mb-0">
            © 2026 ANANTORIX TECHNOLOGIES. ENGINEERED FOR THE INFINITE.
          </p>
          <Link href="/terms" className="text-slate-500 hover:text-white transition-colors text-xs">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-[80vh] bg-[#07152D] text-white px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#187BDD] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-[120px] sm:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 drop-shadow-2xl">
          404
        </h1>
        
        <span className="text-[#A6C8FF] text-lg sm:text-xl font-bold tracking-[0.2em] uppercase mt-4 mb-6">
          Lost in the Multiverse
        </span>
        
        <p className="max-w-md text-[#C1C6D5] text-base sm:text-lg leading-relaxed mb-10">
          The page you are looking for has drifted into an uncharted dimension. 
          Let's get you back to familiar territory.
        </p>

        <Link 
          href="/"
          className="group inline-flex items-center gap-3 rounded-full bg-[#187BDD] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#156bbb] hover:scale-105 shadow-[0_0_20px_rgba(24,123,221,0.4)]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Return to Base
        </Link>
      </div>
    </main>
  );
}

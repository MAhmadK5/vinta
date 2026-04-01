"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;
    setStatus("loading");
    const { error } = await supabase.from("early_access").insert([{ email }]);

    if (error) {
      setMessage(error.code === '23505' ? "ALREADY ENROLLED." : "ERROR. TRY AGAIN.");
      setStatus("error");
    } else {
      setMessage("WELCOME TO THE SYSTEM.");
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <footer className="relative z-10 w-full bg-black text-white pt-24 pb-12 px-8 flex flex-col items-center mt-auto">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start gap-16">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-6 w-full md:w-2/5">
          <h2 className="text-5xl font-black tracking-widest text-[#E2FF31]">VINTA</h2>
          <p className="text-white/60 text-sm font-medium leading-relaxed max-w-sm">
            Premium graphite bags engineered for the modern aesthetic. Built to move. Made in Pakistan.
          </p>
          
          <div className="flex flex-col w-full mt-4">
            <div className={`flex w-full border-b transition-colors pb-2 ${status === 'error' ? 'border-red-500' : 'border-white/30 focus-within:border-[#E2FF31]'}`}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                placeholder="JOIN THE INNER CIRCLE" 
                className="bg-transparent text-white text-sm outline-none w-full uppercase placeholder:text-white/30 font-bold tracking-wider" 
                disabled={status === "loading" || status === "success"}
              />
              <button 
                type="button" 
                onClick={handleSubscribe}
                disabled={status === "loading" || status === "success"}
                className="text-[#E2FF31] font-black text-sm ml-4 hover:scale-105 transition-transform tracking-widest disabled:opacity-50"
              >
                {status === "loading" ? "..." : status === "success" ? "DONE" : "JOIN"}
              </button>
            </div>
            {status !== "idle" && <p className={`text-xs font-bold tracking-widest mt-3 ${status === 'success' ? 'text-[#E2FF31]' : 'text-red-500'}`}>{message}</p>}
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-12 md:gap-20 w-full md:w-auto">
          {/* Shop Column */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black text-white/40 tracking-[0.2em] uppercase mb-2">Explore</h3>
            <Link href="/collection" className="text-sm font-bold text-white/80 hover:text-[#E2FF31] transition-all">All Products</Link>
            <Link href="/about" className="text-sm font-bold text-white/80 hover:text-[#E2FF31] transition-all">Manifesto</Link>
          </div>
          
          {/* Legal/Support Column */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black text-white/40 tracking-[0.2em] uppercase mb-2">Policies</h3>
            <Link href="/policies#shipping" className="text-sm font-bold text-white/80 hover:text-[#E2FF31] transition-all flex items-center gap-2">
              Shipping <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-white/40">2-4 DAYS</span>
            </Link>
            <Link href="/policies#returns" className="text-sm font-bold text-white/80 hover:text-[#E2FF31] transition-all flex items-center gap-2">
              Returns <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-white/40">7-DAY REPLACEMENT</span>
            </Link>
            <Link href="/faq" className="text-sm font-bold text-white/80 hover:text-[#E2FF31] transition-all">FAQs</Link>
          </div>

          {/* Contact & Social Column */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black text-white/40 tracking-[0.2em] uppercase mb-2">Connect</h3>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">WhatsApp Support</span>
              <a href="https://wa.me/923254850380" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-[#E2FF31] hover:text-white transition-all tracking-wider">
                +92 325 4850380
              </a>
            </div>
            <div className="flex gap-6 items-center mt-2">
              <a href="https://www.instagram.com/vintabagss/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#E2FF31] transition-all hover:scale-110">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#E2FF31] transition-all hover:scale-110">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1Qojbn2ef7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#E2FF31] transition-all hover:scale-110">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mt-24 pt-8 border-t border-white/10 text-xs font-bold tracking-widest text-white/30 uppercase text-center md:text-left">
        <p>© {new Date().getFullYear()} VINTA SYSTEM SOLUTIONS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <span className="hover:text-white transition-colors cursor-default">Privacy</span>
          <span className="hover:text-white transition-colors cursor-default">Terms</span>
        </div>
      </div>
    </footer>
  );
}
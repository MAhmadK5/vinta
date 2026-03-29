"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Keep the signature grid background effect consistent
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center pt-32 bg-white selection:bg-[#E2FF31] selection:text-black">
      
      <Header />

      <div
        className="fixed inset-[-100px] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Hero Section */}
      <div className="relative z-10 w-full max-w-5xl px-8 mt-16 md:mt-24 mb-20 flex flex-col items-center text-center">
        <div className="bg-black text-[#E2FF31] text-xs md:text-sm font-black tracking-[0.3em] px-4 py-1 mb-8 rounded-full uppercase">
          VINTA System 01
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-8 leading-[0.85]">
          The <br/> Manifesto.
        </h1>
        <p className="text-xl md:text-3xl font-medium text-black/50 max-w-3xl leading-relaxed tracking-tight">
          We don't make bags. We engineer something capable for the envoirment of Pakistan.
        </p>
      </div>

      {/* The Core Pillars */}
      <div className="relative z-10 w-full max-w-6xl px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        
        <div className="bg-zinc-100 p-10 md:p-12 rounded-[2rem] hover:bg-black hover:text-[#E2FF31] transition-colors duration-500 group">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 group-hover:text-white">01. Form</h3>
          <p className="text-black/60 font-medium leading-relaxed group-hover:text-white/70">
            Aesthetics are not an afterthought. Graphite black. Matte hardware. Clean lines. Your gear should look as sharp in a boardroom as it does on the tarmac. Zero visual compromise.
          </p>
        </div>

        <div className="bg-zinc-100 p-10 md:p-12 rounded-[2rem] hover:bg-black hover:text-[#E2FF31] transition-colors duration-500 group">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 group-hover:text-white">02. Function</h3>
          <p className="text-black/60 font-medium leading-relaxed group-hover:text-white/70">
            Built with 1680D ballistic nylon and aerospace-grade zippers. Every pocket is calculated. Every strap distributes weight dynamically. It is a tool, not an accessory.
          </p>
        </div>

        <div className="bg-zinc-100 p-10 md:p-12 rounded-[2rem] hover:bg-black hover:text-[#E2FF31] transition-colors duration-500 group">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 group-hover:text-white">03. Friction</h3>
          <p className="text-black/60 font-medium leading-relaxed group-hover:text-white/70">
            The city is hostile. Weather, crowds, commutes. VINTA is designed to absorb the impact of your environment so you can move through it completely unbothered.
          </p>
        </div>

      </div>

      {/* Full-Width Image Break */}
      <div className="relative z-10 w-full h-[50vh] md:h-[70vh] mb-32">
        <img 
          src="https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80" 
          alt="Vinta Ethos" 
          className="w-full h-full object-cover grayscale opacity-90"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h2 className="text-white text-4xl md:text-7xl font-black tracking-widest uppercase text-center px-4">
            Built to Move.
          </h2>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 w-full flex flex-col items-center mb-40 px-4 text-center">
        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">
          Equip Yourself.
        </h3>
        <Link href="/collection" className="bg-[#E2FF31] text-black font-black uppercase tracking-widest px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl text-lg">
          Shop The Collection
        </Link>
      </div>

      {/* Footer */}
 <Footer/>
    </main>
  );
}
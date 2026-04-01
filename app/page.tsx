"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase"; 
import Footer from "../components/Footer";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();
  
  // Database States
  const [latestDrops, setLatestDrops] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mouse effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch Banners and Latest Drops from Supabase
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Products
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false }) 
        .limit(5);
      
      if (!productError) setLatestDrops(productData || []);

      // Fetch Banners
      const { data: bannerData, error: bannerError } = await supabase
        .from("banners")
        .select("*")
        .order("id", { ascending: true });

      if (!bannerError) setBanners(bannerData || []);
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Auto-Swiper Timer (Changes every 5 seconds)
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

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

      {/* Dynamic Auto-Swiping Hero Banners */}
      <div className="relative z-10 w-[90%] max-w-7xl h-[65vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 mt-4 group">
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <div 
              key={banner.id} 
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                index === currentBanner ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
              }`}
            >
              <img 
                src={banner.image_url} 
                alt={banner.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10000ms] ease-out" 
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-700" />
              
              <div className="relative z-30 text-center flex flex-col items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                {banner.badge && (
                  <div className="bg-[#E2FF31] text-black text-xs md:text-sm font-black tracking-widest px-4 py-1 mb-6 rounded-full shadow-[0_0_15px_rgba(226,255,49,0.3)]">
                    {banner.badge}
                  </div>
                )}
                <h2 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4 drop-shadow-lg px-4 text-center">
                  {banner.title}
                </h2>
                <p className="text-white/90 font-bold tracking-[0.3em] text-xs md:text-sm drop-shadow-md mb-8 px-4 text-center uppercase">
                  {banner.subtitle}
                </p>
                <Link href={banner.link_url} className="bg-white text-black font-black uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#E2FF31] transition-colors duration-300 shadow-xl hover:scale-105">
                  Shop Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
             <div className="w-12 h-12 border-4 border-black/10 border-t-[#E2FF31] rounded-full animate-spin" />
          </div>
        )}

        {/* Banner Navigation Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentBanner ? "bg-[#E2FF31] w-16 shadow-[0_0_10px_rgba(226,255,49,0.5)]" : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Infinite Marquee */}
      <div className="relative z-10 w-full mt-24 bg-[#E2FF31] border-y-2 border-black/10 overflow-hidden py-5 flex">
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 20s linear infinite; display: flex; width: max-content; }
        `}</style>
        <div className="animate-marquee hover:[animation-play-state:paused] cursor-default">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center whitespace-nowrap">
              <span className="text-black text-4xl md:text-6xl font-black tracking-tighter uppercase mx-6">//  BORN IN LAHORE </span>
              <span className="text-black text-4xl md:text-6xl font-black tracking-tighter uppercase mx-6">//  50+ Cities Covered </span>
              <span className="text-black text-4xl md:text-6xl font-black tracking-tighter uppercase mx-6">//  MADE IN PAKISTAN </span>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Bento Box Gallery */}
      <div className="relative z-10 w-full max-w-6xl px-8 mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        <Link href="/product/4" className="md:col-span-2 md:row-span-2 bg-zinc-100 rounded-[2rem] overflow-hidden group relative cursor-pointer shadow-lg block">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
          <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80" alt="Duffle Bag" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-8 left-8 z-20">
            <h3 className="text-white text-4xl font-black uppercase tracking-widest drop-shadow-md">The Weekender</h3>
            <p className="text-white font-bold tracking-[0.2em] text-sm mt-2 flex items-center gap-2">
              SHOP DUFFLES <span className="group-hover:translate-x-2 transition-transform">→</span>
            </p>
          </div>
        </Link>
        <Link href="/product/2" className="md:col-span-1 md:row-span-1 bg-zinc-100 rounded-[2rem] overflow-hidden group relative cursor-pointer shadow-lg block">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
          <img src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80" alt="Backpack" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-6 left-6 z-20">
            <h3 className="text-white text-2xl font-black uppercase tracking-widest drop-shadow-md">Daypacks</h3>
          </div>
        </Link>
        <Link href="/collection" className="md:col-span-1 md:row-span-1 bg-[#E2FF31] rounded-[2rem] overflow-hidden group relative cursor-pointer flex flex-col items-center justify-center p-8 text-center hover:bg-black hover:text-[#E2FF31] transition-colors duration-500 shadow-lg block">
          <h3 className="text-4xl font-black uppercase tracking-tighter mt-12">Small<br/>Goods</h3>
          <p className="font-bold tracking-[0.2em] text-xs mt-4">WALLETS & CASES</p>
        </Link>
      </div>

      {/* 2. Side-Scrolling Product Carousel */}
      <div className="relative z-10 w-full mt-40 pl-8 md:pl-[10%]">
        <div className="flex items-end justify-between pr-8 md:pr-[10%] mb-12">
          <h2 className="text-5xl font-black tracking-tighter uppercase">Latest Drops</h2>
          <Link href="/collection" className="hidden md:block font-bold tracking-widest text-sm border-b-2 border-black hover:text-[#E2FF31] hover:border-[#E2FF31] transition-colors pb-1">
            VIEW ALL
          </Link>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center py-20 pr-8 md:pr-[10%]">
             <div className="w-12 h-12 border-4 border-black/10 border-t-[#E2FF31] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory pr-8 md:pr-[10%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {latestDrops.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="w-[75vw] sm:w-[280px] md:w-[400px] flex-shrink-0 snap-center group cursor-pointer flex flex-col">
                <div className="w-full h-[350px] md:h-[450px] bg-zinc-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative mb-4 md:mb-5 shadow-sm hover:shadow-xl transition-shadow duration-500">

                  {product.original_price && product.original_price > product.price && (
                    <div className="absolute top-6 right-6 bg-[#E2FF31] text-black text-xs font-black tracking-widest px-4 py-2 rounded-full z-20 shadow-lg">
                      SALE
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 bg-zinc-200" />
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault(); 
                      addToCart(product);
                    }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-[#E2FF31] text-black font-black uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:scale-105"
                  >
                    Quick Add +
                  </button>
                </div>

                <div className="flex justify-between items-start px-2">
                  <div>
                    <h4 className="font-black uppercase tracking-wider text-xl">{product.name}</h4>
                    <p className="text-black/50 font-bold text-sm mt-1 uppercase tracking-widest">{product.category}</p>
                  </div>
                  
                  {/* FULLY UPDATED PRICING BLOCK WITH PERCENTAGE */}
                  <div className="flex flex-col items-end">
                    {product.original_price && product.original_price > product.price && (
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-md tracking-wider">
                          -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                        </span>
                        <span className="text-black/40 line-through text-sm font-bold">
                          Rs. {product.original_price}
                        </span>
                      </div>
                    )}
                    <span className={`font-black text-xl ${product.original_price && product.original_price > product.price ? "text-red-600" : "text-black"}`}>
                      Rs. {product.price}
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 3. Split-Screen Brand Ethos Story */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-40 px-8 flex flex-col md:flex-row gap-16 items-start pb-20">
        <div className="w-full md:w-1/2 md:sticky top-32 h-[60vh] md:h-[75vh] bg-zinc-100 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80" alt="Brand Ethos" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="text-[#E2FF31]/80 animate-[spin_12s_linear_infinite]">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-32 pt-10 md:pt-20 pb-20">
          <div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">Engineered <br/> for the <br/> extremes.</h3>
            <p className="text-lg font-medium text-black/60 leading-relaxed">
              We don't just design bags. We engineer mobile storage solutions. Using aerospace-grade hardware and military-spec ballistic nylon, every VINTA piece is tested to withstand the friction of the modern city.
            </p>
          </div>
          <div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">Zero <br/> aesthetic <br/> compromise.</h3>
            <p className="text-lg font-medium text-black/60 leading-relaxed">
              Functionality means nothing if the form doesn't command attention. Our graphite black finish ensures your gear seamlessly transitions from the studio to the tarmac.
            </p>
          </div>
          <div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">Built to <br/> move.</h3>
            <p className="text-lg font-medium text-black/60 leading-relaxed mb-8">
              Ergonomic strap systems that distribute weight dynamically. YKK Aquaguard zippers that lock out the elements. This is your mobile armory.
            </p>
           <Link href="/about" className="inline-block text-center bg-black text-[#E2FF31] font-black uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#E2FF31] hover:text-black transition-colors duration-300 shadow-xl">
              Read the Manifesto
            </Link>
          </div>
        </div>
      </div>

      {/* Solid Black Premium Footer */}
   <Footer/>
    </main>
  );
}
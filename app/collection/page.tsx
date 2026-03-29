"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { useCart } from "../../context/CartContext";
import { supabase } from "../../lib/supabase";
import Footer from "../../components/Footer";
const categories = ["All", "Duffles", "Backpacks", "Accessories"];

export default function Collection() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*").order("id");
      
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(product => product.category === activeFilter);

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

      <div className="relative z-10 w-full max-w-7xl px-8 mt-12 mb-16 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-10 drop-shadow-sm">
          The Collection
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
                activeFilter === category 
                  ? "bg-black text-[#E2FF31] shadow-lg scale-105" 
                  : "bg-zinc-100 text-black/60 hover:bg-zinc-200 hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="relative z-10 w-full flex justify-center py-32 mb-32">
          <div className="w-12 h-12 border-4 border-black/10 border-t-[#E2FF31] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mb-32">
          {filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer flex flex-col">
              <div className="w-full h-[500px] bg-zinc-100 rounded-[2rem] overflow-hidden relative mb-6 shadow-sm hover:shadow-2xl transition-all duration-500">
                
                {/* SALE BADGE */}
                {product.original_price && product.original_price > product.price && (
                  <div className="absolute top-6 right-6 bg-[#E2FF31] text-black text-xs font-black tracking-widest px-4 py-2 rounded-full z-20 shadow-lg">
                    SALE
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
                
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 bg-zinc-200" 
                />
                
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
                  <h4 className="font-black uppercase tracking-wider text-2xl">{product.name}</h4>
                  <p className="text-black/50 font-bold text-sm mt-1 uppercase tracking-widest">{product.category}</p>
                </div>
                
                {/* PRICING AND DISCOUNT MATH */}
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
                  <span className={`font-black text-2xl ${product.original_price && product.original_price > product.price ? "text-red-600" : "text-black"}`}>
                    Rs. {product.price}
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
{/* Universal Black Premium Footer */}
     <Footer/>
    </main>
  );
}
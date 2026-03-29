"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import { useCart } from "../../../context/CartContext";
import { supabase } from "../../../lib/supabase";

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("specs");
  
  // Database states
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const productId = Number(params.id);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      
      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <main className="relative w-full min-h-screen bg-white flex flex-col items-center pt-32">
        <Header />
        <div className="flex-grow flex items-center justify-center pb-32">
          <div className="w-12 h-12 border-4 border-black/10 border-t-[#E2FF31] rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <h1 className="text-4xl font-black uppercase tracking-widest text-black/30">Product Not Found</h1>
      </main>
    );
  }

  return (
    <main className="relative w-full min-h-screen bg-white selection:bg-[#E2FF31] selection:text-black pb-32 overflow-x-hidden">
      <Header />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-32 md:pt-40 flex flex-col md:flex-row gap-10 md:gap-16">
        
        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2">
          <div className="md:sticky top-32 w-full h-[50vh] md:h-[80vh] bg-zinc-100 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl relative">
            
            {/* NEW: Sale Badge on Main Image */}
            {product.original_price && product.original_price > product.price && (
              <div className="absolute top-8 right-8 bg-[#E2FF31] text-black text-sm font-black tracking-widest px-6 py-2 rounded-full z-20 shadow-lg">
                SALE
              </div>
            )}

            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 bg-zinc-200"
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 flex flex-col pt-2 md:pt-10">
          
          <div className="text-[10px] md:text-xs font-black tracking-[0.2em] text-black/40 uppercase mb-4">
            Shop / {product.category} / {product.name}
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            {product.name}
          </h1>
          
          {/* NEW: Advanced Pricing Block with Discount Math */}
          {product.original_price && product.original_price > product.price ? (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-black text-red-600 bg-red-100 px-3 py-1 rounded-md tracking-wider">
                  -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                </span>
                <span className="text-black/40 line-through text-xl font-bold">
                  Rs. {product.original_price}
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-black text-red-600">
                Rs. {product.price}
              </div>
            </div>
          ) : (
            <div className="text-4xl md:text-5xl font-black mb-8">
              Rs. {product.price}
            </div>
          )}

          <p className="text-base md:text-lg font-medium text-black/60 leading-relaxed mb-10">
            {product.desc}
          </p>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-black text-[#E2FF31] font-black uppercase tracking-widest py-5 rounded-full hover:bg-[#E2FF31] hover:text-black transition-colors duration-300 shadow-2xl mb-12 hover:scale-[1.02]"
          >
            Add to Cart
          </button>

          {/* Specs Accordion */}
          <div className="border-t border-black/10 pt-8">
            <div className="flex gap-8 mb-6 border-b border-black/10 pb-4">
              <button onClick={() => setActiveTab("specs")} className={`text-sm font-black uppercase tracking-widest transition-colors ${activeTab === "specs" ? "text-black" : "text-black/30 hover:text-black/60"}`}>
                Specs
              </button>
              <button onClick={() => setActiveTab("shipping")} className={`text-sm font-black uppercase tracking-widest transition-colors ${activeTab === "shipping" ? "text-black" : "text-black/30 hover:text-black/60"}`}>
                Shipping
              </button>
            </div>

            <div className="text-sm font-medium text-black/70 leading-relaxed min-h-[150px]">
              {activeTab === "specs" && (
                <ul className="list-disc pl-4 space-y-2">
                  <li>Exterior: 1680D Ballistic Nylon</li>
                  <li>Hardware: Matte Black YKK Aquaguard Zippers</li>
                  <li>Weight dynamically distributed</li>
                  <li>Designed in the city, built for the extremes.</li>
                </ul>
              )}
              {activeTab === "shipping" && (
                <p>Free standard shipping on all orders over Rs. 15,000. Expedited 2-day shipping available at checkout. Returns accepted within 30 days of delivery.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
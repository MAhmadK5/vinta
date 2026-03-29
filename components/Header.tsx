"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const { cartItems, removeFromCart, cartTotal } = useCart();

  // Calculate total items
  const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [lastCount, setLastCount] = useState(totalItemCount);

  // Trigger Toast Notification when an item is added
  useEffect(() => {
    if (totalItemCount > lastCount) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000); // Hides after 3 seconds
      return () => clearTimeout(timer);
    }
    setLastCount(totalItemCount);
  }, [totalItemCount, lastCount]);

  // Lock body scroll when cart OR mobile menu is open
  useEffect(() => {
    if (isCartOpen || isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isCartOpen, isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[95%] md:w-[90%] max-w-3xl bg-[#E2FF31] rounded-full px-6 md:px-8 py-4 flex items-center justify-between shadow-xl border border-black/5">
        
        {/* Mobile Hamburger Menu Icon (Linter Fixed) */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          aria-label="Open mobile menu"
          title="Open mobile menu"
          className="md:hidden text-black p-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
        </button>

        <Link href="/" className="flex items-center gap-3">
          <div className="group cursor-pointer flex items-center">
            {["V", "I", "N", "T", "A"].map((letter, i) => (
              <span key={i} className="text-black font-black tracking-widest text-lg md:text-xl inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1" style={{ transitionDelay: `${i * 50}ms` }}>{letter}</span>
            ))}
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-sm font-bold text-black/80">
          <Link href="/collection" className="hover:text-black transition-all">Shop</Link>
          <Link href="/collection" className="hover:text-black transition-all">Collections</Link>
        </nav>

        <button onClick={() => setIsCartOpen(true)} className="text-sm font-bold text-black bg-white px-5 py-2 rounded-full shadow-sm hover:scale-105 hover:shadow-md transition-all whitespace-nowrap">
          Cart ({totalItemCount})
        </button>
      </header>

      {/* Full-Screen Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-50 flex flex-col p-8 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex justify-between items-center mb-16">
          <span className="font-black tracking-widest text-xl">VINTA</span>
          {/* Close Mobile Menu Button (Linter Fixed) */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            aria-label="Close mobile menu"
            title="Close mobile menu"
            className="p-2"
          >
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <nav className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tighter">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#E2FF31] transition-colors">Home</Link>
          <Link href="/collection" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#E2FF31] transition-colors">Shop All</Link>
          <Link href="/collection" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#E2FF31] transition-colors">Collections</Link>
        </nav>
      </div>

      {/* Cart Overlay & Drawer */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsCartOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-8 border-b border-black/10">
          <h2 className="text-2xl font-black uppercase tracking-widest">Your Cart</h2>
          {/* Close Cart Button (Linter Fixed) */}
          <button 
            onClick={() => setIsCartOpen(false)} 
            aria-label="Close cart"
            title="Close cart"
            className="text-black hover:rotate-90 transition-transform duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="flex-grow flex flex-col overflow-y-auto p-8">
          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-black/30"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-2">Your cart is empty</h3>
              <p className="text-sm font-medium text-black/50 mb-8">Looks like you haven't added any gear yet.</p>
              <button onClick={() => setIsCartOpen(false)} className="w-full bg-[#E2FF31] text-black font-black uppercase tracking-widest py-4 rounded-full hover:scale-105 transition-transform shadow-lg">Start Shopping</button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.img} alt={item.name} className="w-20 h-24 object-cover bg-zinc-100 rounded-xl" />
                  <div className="flex-grow">
                    <h4 className="font-black uppercase tracking-wider text-sm">{item.name}</h4>
                    <p className="text-black/50 font-bold text-xs uppercase tracking-widest">{item.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-sm">Qty: {item.quantity}</span>
                     <span className="font-black">Rs. {item.price * item.quantity}</span>
                    </div>
                  </div>
                  {/* Remove Item Button (Linter Fixed) */}
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    aria-label={`Remove ${item.name} from cart`}
                    title="Remove item"
                    className="text-black/30 hover:text-black transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-8 border-t border-black/10 bg-zinc-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold uppercase tracking-widest text-sm">Subtotal</span>
            <span className="text-2xl font-black">Rs. {cartTotal}</span>
            </div>
            <button className="w-full bg-black text-[#E2FF31] font-black uppercase tracking-widest py-4 rounded-full hover:scale-105 transition-transform shadow-lg">Checkout Fast →</button>
          </div>
        )}
      </div>

      {/* Sleek Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 z-50 bg-black text-white px-6 py-4 rounded-full shadow-2xl border border-[#E2FF31]/20 flex items-center gap-3 transition-all duration-500 ease-out ${showToast ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"}`}>
        <div className="w-3 h-3 bg-[#E2FF31] rounded-full animate-pulse" />
        <span className="font-bold tracking-wider uppercase text-sm">Item added to cart</span>
      </div>
    </>
  );
}
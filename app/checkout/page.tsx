"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { toPng } from "html-to-image";

export default function Checkout() {
  const { cartItems: cart } = useCart(); 
  const [mounted, setMounted] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeCart = cart || [];
  const subtotal = safeCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 250; 
  const total = subtotal > 0 ? subtotal + shipping : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (safeCart.length === 0) {
      alert("Your cart is empty.");
      setIsProcessing(false);
      return;
    }

    const generatedOrderId = "VIN-" + Math.floor(100000 + Math.random() * 900000);

    setOrderData({
      id: generatedOrderId,
      items: [...safeCart],
      subtotal,
      shipping,
      total,
      customer: formData
    });

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 500);
  };

  const downloadReceiptAsImage = async () => {
    if (!receiptRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(receiptRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `VINTA_Receipt_${orderData?.id}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to generate receipt image", error);
      alert("Something went wrong generating the image. Please screenshot this page!");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!mounted) return null;

  // ==========================================
  // VIEW 2: THE DIGITAL RECEIPT (SUCCESS PAGE)
  // ==========================================
  if (isSuccess && orderData) {
    const orderDetails = orderData.items
      .map((item: any) => `- ${item.quantity}x ${item.name} (Rs. ${item.price * item.quantity})`)
      .join("\n");

    const message = `
*🚨 NEW VINTA ORDER 🚨*
*Order ID:* ${orderData.id}

*Customer Details:*
👤 Name: ${orderData.customer.name}
📱 Phone: ${orderData.customer.phone}
📍 Address: ${orderData.customer.address}, ${orderData.customer.city}

*Order Summary:*
${orderDetails}

*Subtotal:* Rs. ${orderData.subtotal}
*Shipping (COD):* Rs. ${orderData.shipping}
*Total Due:* Rs. ${orderData.total}

Please confirm my order.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923254850380?text=${encodedMessage}`;

    return (
      <main className="relative w-full min-h-screen bg-zinc-50 flex flex-col items-center pt-32 pb-24 selection:bg-[#E2FF31] selection:text-black">
        <Header />
        <div className="w-full max-w-2xl px-8 mt-8">
          
          <div ref={receiptRef} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-black/10 relative overflow-hidden">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 shadow-xl">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E2FF31" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Receipt Generated.</h1>
              <p className="text-black/50 font-bold tracking-widest text-xs uppercase">Review your details below and click Send to confirm.</p>
            </div>

            <div className="border-t-2 border-dashed border-black/10 pt-8 mb-8 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-1">Order Number</p>
                <p className="text-xl font-black tracking-wider">{orderData.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-1">Date</p>
                <p className="text-sm font-bold tracking-widest">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 mb-8">
              <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Item Breakdown</p>
              {orderData.items.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0 border border-black/5">
                    <img src={item.img} alt={item.name} crossOrigin="anonymous" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <span className="font-black uppercase tracking-wider text-sm">{item.name}</span>
                    <span className="text-black/40 text-[10px] font-bold tracking-[0.2em] mt-1">QTY: {item.quantity}</span>
                  </div>
                  <span className="font-black text-sm">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-black/10 pt-6 flex flex-col gap-4 text-xs font-bold tracking-[0.1em] uppercase bg-zinc-50 -mx-8 px-8 pb-8 pt-8 mt-8">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span>Rs. {orderData.subtotal}</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Shipping (COD)</span>
                <span>Rs. {orderData.shipping}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-black mt-2 pt-4 border-t border-black/10">
                <span>Total Due</span>
                <span>Rs. {orderData.total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-[#20bd5a] hover:scale-[1.02] transition-all flex justify-center items-center gap-3 text-sm shadow-[0_10px_30px_rgba(37,211,102,0.3)]"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.112.551 4.168 1.599 5.986L.001 24l6.152-1.613c1.765.955 3.753 1.458 5.877 1.458 6.646 0 12.031-5.385 12.031-12.031C24.062 5.386 18.678 0 12.031 0zm.001 21.84c-1.789 0-3.539-.481-5.074-1.39l-.364-.216-3.77.989.999-3.676-.237-.377a9.92 9.92 0 0 1-1.526-5.331c0-5.5 4.477-9.975 9.975-9.975 5.5 0 9.976 4.475 9.976 9.975 0 5.5-4.476 9.975-9.976 9.975zm5.474-7.481c-.301-.15-1.776-.877-2.053-.977-.275-.101-.476-.15-.676.15-.201.301-.776.977-.951 1.178-.175.201-.35.226-.651.076-1.353-.679-2.394-1.282-3.328-2.585-.24-.336.241-.318.826-1.487.075-.15.038-.276-.038-.426-.075-.15-.676-1.626-.926-2.227-.243-.584-.489-.505-.676-.514-.175-.01-.376-.01-.576-.01-.2 0-.526.076-.801.376-.275.301-1.051 1.026-1.051 2.502 0 1.477 1.076 2.903 1.226 3.103.15.201 2.115 3.228 5.122 4.526 1.488.643 2.181.71 2.977.625.92-.098 2.802-1.144 3.197-2.25.396-1.106.396-2.052.276-2.252-.12-.201-.421-.301-.722-.451z"/>
              </svg>
              Send Order via WhatsApp
            </a>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={downloadReceiptAsImage}
                disabled={isDownloading}
                className="flex-1 bg-zinc-200 text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-zinc-300 transition-colors flex justify-center items-center gap-2 text-sm disabled:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                {isDownloading ? "Saving..." : "Save Image"}
              </button>
              <Link 
                href="/"
                className="flex-1 bg-black text-[#E2FF31] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-zinc-800 transition-colors flex justify-center items-center text-sm shadow-lg"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // ==========================================
  // VIEW 1: THE CHECKOUT FORM (DEFAULT)
  // ==========================================
  return (
    <main className="relative w-full min-h-screen bg-zinc-50 flex flex-col items-center pt-32 selection:bg-[#E2FF31] selection:text-black">
      <Header />

      <div className="w-full max-w-6xl px-8 flex flex-col lg:flex-row gap-16 mb-24 mt-8">
        
        {/* Left Side: Shipping Form */}
        <div className="w-full lg:w-3/5">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">Checkout</h1>
          
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-black/5">
            <h2 className="text-xl font-black uppercase tracking-widest mb-8 border-b border-black/5 pb-4">Shipping Information</h2>
            
            <form onSubmit={handleCheckout} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="bg-transparent border-b-2 border-black/10 pb-3 outline-none focus:border-black transition-colors font-bold text-lg" placeholder="Ahmad Khalid" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="bg-transparent border-b-2 border-black/10 pb-3 outline-none focus:border-black transition-colors font-bold text-lg" placeholder="03XX XXXXXXX" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Street Address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="bg-transparent border-b-2 border-black/10 pb-3 outline-none focus:border-black transition-colors font-bold text-lg" placeholder="House 123, Street 4, Phase 5" />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="bg-transparent border-b-2 border-black/10 pb-3 outline-none focus:border-black transition-colors font-bold text-lg" placeholder="Lahore" />
              </div>

              <div className="mt-10 pt-8 border-t border-black/5">
                <h2 className="text-xl font-black uppercase tracking-widest mb-6">Payment Method</h2>
                
                {/* 1. ACTIVE: Cash on Delivery */}
                <div className="relative overflow-hidden border-2 border-black rounded-2xl p-5 flex items-center justify-between cursor-default bg-zinc-50 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#E2FF31]" />
                  <div className="flex items-center gap-4 pl-3">
                    <div className="w-6 h-6 rounded-full border-[6px] border-[#E2FF31] bg-black shadow-sm flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-black uppercase tracking-widest text-sm text-black">Cash on Delivery</span>
                      <span className="text-[10px] font-bold text-black/40 tracking-widest uppercase mt-0.5">Pay upon receiving</span>
                    </div>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                {/* 2. DISABLED: Visa / Mastercard (Coming Soon) */}
                <div className="relative overflow-hidden border-2 border-black/10 rounded-2xl p-5 flex items-center justify-between bg-zinc-100/50 opacity-60 cursor-not-allowed mt-4 select-none">
                  <div className="flex items-center gap-4 pl-3">
                    <div className="w-6 h-6 rounded-full border-[2px] border-black/20 bg-transparent flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-black uppercase tracking-widest text-sm text-black">Credit / Debit Card</span>
                      <div className="flex gap-2 items-center mt-1">
                        {/* Visa/Mastercard simple visual cues */}
                        <div className="flex -space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500/80 mix-blend-multiply"></div>
                          <div className="w-3 h-3 rounded-full bg-orange-400/80 mix-blend-multiply"></div>
                        </div>
                        <span className="text-[10px] font-bold text-black/40 tracking-widest uppercase">Online Gateway</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black text-[#E2FF31] text-[9px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase shadow-sm">
                    Coming Soon
                  </div>
                </div>

              </div>

              <button 
                type="submit" 
                disabled={isProcessing || safeCart.length === 0}
                className="w-full mt-10 bg-black text-[#E2FF31] font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-[#E2FF31] hover:text-black transition-colors duration-300 disabled:opacity-50 shadow-xl"
              >
                {isProcessing ? "Processing..." : "Generate Receipt ➔"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-black text-white p-8 md:p-10 rounded-[2rem] shadow-2xl lg:sticky lg:top-32 border border-white/10">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-8 text-[#E2FF31] flex items-center justify-between">
              Order Summary
              <span className="text-sm text-white/50 bg-white/10 px-3 py-1 rounded-full">{safeCart.length} Items</span>
            </h2>
            
            {safeCart.length === 0 ? (
              <div className="text-white/50 text-sm font-bold tracking-widest mb-8 text-center py-10">Your cart is empty.</div>
            ) : (
              <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {safeCart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="w-20 h-20 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0 border border-white/5 group-hover:border-[#E2FF31]/50 transition-colors">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="font-black uppercase tracking-wider text-sm">{item.name}</span>
                      <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] mt-1">QTY: {item.quantity}</span>
                    </div>
                    <span className="font-black text-sm">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-white/10 pt-6 flex flex-col gap-4 text-xs font-bold tracking-[0.1em] uppercase">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span>Rs. {shipping}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-[#E2FF31] mt-4 pt-6 border-t border-white/10">
                <span>Total Due</span>
                <span>Rs. {total}</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
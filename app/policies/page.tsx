"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Policies() {
  return (
    <main className="relative w-full min-h-screen bg-white flex flex-col items-center pt-32 selection:bg-[#E2FF31] selection:text-black">
      <Header />

      <div className="w-full max-w-4xl px-8 mb-24">
        {/* Page Header */}
        <div className="border-b-4 border-black pb-8 mb-16">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Protocol <br/> <span className="text-black/20">& Policies</span>
          </h1>
        </div>

        <div className="flex flex-col gap-24">
          
          {/* Section 1: Shipping */}
          <section id="shipping" className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-[#E2FF31] flex items-center justify-center rounded-full text-xs">01</span>
                Shipping
              </h2>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-6 text-lg font-medium text-black/70 leading-relaxed">
              <p>
                Every VINTA order is dispatched from our hub in <span className="text-black font-bold">Lahore</span>. We prioritize speed and security to ensure your gear reaches you in pristine condition.
              </p>
              <ul className="flex flex-col gap-4 border-l-2 border-black/10 pl-6 py-2">
                <li><span className="text-black font-black uppercase text-sm tracking-widest block mb-1">Timeline:</span> Orders are processed within 24 hours. Delivery takes 2-4 working days across Pakistan.</li>
                <li><span className="text-black font-black uppercase text-sm tracking-widest block mb-1">Cost:</span> A flat rate of Rs. 250 applies to all orders nationwide.</li>
                <li><span className="text-black font-black uppercase text-sm tracking-widest block mb-1">Tracking:</span> Once your order is scanned by our courier partner (Trax/Leopards), you will receive a tracking ID via SMS.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Returns & Exchanges */}
          <section id="returns" className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-[#E2FF31] flex items-center justify-center rounded-full text-xs">02</span>
                Returns
              </h2>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-6 text-lg font-medium text-black/70 leading-relaxed">
              <p>
                We stand by our engineering. If your product arrives with a defect or isn't what you ordered, we offer a <span className="text-black font-bold">7-Day Replacement Guarantee</span>.
              </p>
              <ul className="flex flex-col gap-4 border-l-2 border-black/10 pl-6 py-2">
                <li><span className="text-black font-black uppercase text-sm tracking-widest block mb-1">Checking Warranty:</span> You have 7 days from the date of delivery to report any manufacturing defects.</li>
                <li><span className="text-black font-black uppercase text-sm tracking-widest block mb-1">Condition:</span> The bag must be unused, with all original tags and packaging intact.</li>
                <li><span className="text-black font-black uppercase text-sm tracking-widest block mb-1">Process:</span> Contact us on WhatsApp (+92 325 4850380) with your Order ID and a photo of the defect. We will arrange a swap.</li>
              </ul>
              <div className="mt-4 p-6 bg-zinc-100 rounded-2xl">
                <p className="text-sm font-bold uppercase tracking-widest text-black/40 mb-2">Note:</p>
                <p className="text-sm">Change of mind returns are not currently supported. Please review all dimensions and specs on the product page before ordering.</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
"use client";
import { useState } from "react";
import Header from "../../components/Header";

const faqs = [
  {
    question: "How long does shipping take within Pakistan?",
    answer: "Standard shipping takes 3-5 business days depending on your city. Orders placed before 2 PM are dispatched the same day. Expedited overnight shipping is available at checkout for major cities."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day friction-free return policy. If your gear doesn't meet your standards, return it unused in its original packaging for a full refund. Return shipping costs are covered by the customer."
  },
  {
    question: "Are VINTA bags waterproof?",
    answer: "Our bags are highly weather-resistant. We use military-grade 1680D ballistic nylon and YKK Aquaguard zippers that will easily handle heavy rain and spills, though they are not designed to be fully submerged underwater."
  },
  {
    question: "Do you offer a warranty?",
    answer: "Yes. Every VINTA product comes with a lifetime warranty against manufacturing defects in materials and workmanship. If a zipper breaks or a seam fails under normal use, we will repair or replace it."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  return (
    <main className="relative w-full min-h-screen bg-white selection:bg-[#E2FF31] selection:text-black flex flex-col items-center pt-32 overflow-x-hidden">
      <Header />

      {/* Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl px-6 md:px-8 mt-12 md:mt-24 mb-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 drop-shadow-sm">
            Intel / FAQ
          </h1>
          <p className="text-lg font-medium text-black/50">
            Everything you need to know about our gear, shipping, and policies.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-black/10 rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? "bg-zinc-50" : "bg-white hover:bg-zinc-50"}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-6 flex justify-between items-center focus:outline-none"
              >
                <span className="font-black uppercase tracking-wide text-lg pr-8">{faq.question}</span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? "rotate-45 text-[#E2FF31] stroke-black" : "text-black/30"}`}>
                  +
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-black/60 font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-black/10 pt-10">
          <p className="text-black/50 font-medium mb-4">Still have questions?</p>
          <a href="mailto:support@vinta.com" className="inline-block bg-black text-[#E2FF31] font-black uppercase tracking-widest px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
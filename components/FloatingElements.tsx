"use client";
import { useRouter, usePathname } from "next/navigation";

export default function FloatingElements() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Smart Back Button: Hides on the homepage */}
      {pathname !== "/" && (
        <button
          onClick={() => router.back()}
          className="fixed top-28 left-4 md:left-8 z-40 bg-white/80 backdrop-blur-md text-black p-3 md:p-4 rounded-full shadow-lg hover:bg-black hover:text-[#E2FF31] transition-all duration-300 hover:scale-105 border border-black/10"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923254850380"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center group"
      >
        <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.112.551 4.168 1.599 5.986L.001 24l6.152-1.613c1.765.955 3.753 1.458 5.877 1.458 6.646 0 12.031-5.385 12.031-12.031C24.062 5.386 18.678 0 12.031 0zm.001 21.84c-1.789 0-3.539-.481-5.074-1.39l-.364-.216-3.77.989.999-3.676-.237-.377a9.92 9.92 0 0 1-1.526-5.331c0-5.5 4.477-9.975 9.975-9.975 5.5 0 9.976 4.475 9.976 9.975 0 5.5-4.476 9.975-9.976 9.975zm5.474-7.481c-.301-.15-1.776-.877-2.053-.977-.275-.101-.476-.15-.676.15-.201.301-.776.977-.951 1.178-.175.201-.35.226-.651.076-1.353-.679-2.394-1.282-3.328-2.585-.24-.336.241-.318.826-1.487.075-.15.038-.276-.038-.426-.075-.15-.676-1.626-.926-2.227-.243-.584-.489-.505-.676-.514-.175-.01-.376-.01-.576-.01-.2 0-.526.076-.801.376-.275.301-1.051 1.026-1.051 2.502 0 1.477 1.076 2.903 1.226 3.103.15.201 2.115 3.228 5.122 4.526 1.488.643 2.181.71 2.977.625.92-.098 2.802-1.144 3.197-2.25.396-1.106.396-2.052.276-2.252-.12-.201-.421-.301-.722-.451z"/>
        </svg>
      </a>
    </>
  );
}
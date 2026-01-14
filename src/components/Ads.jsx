import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

export const DIRECT_LINK_URL = "https://www.effectivegatecpm.com/ngcsfne2u?key=9f228a0a2cfce41c11cc05938801348e";

export const PopUnderScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//pl28478275.effectivegatecpm.com/21/bc/df/21bcdfad5bb51f801601f0c7fca710a6.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);
  return null;
};

export const SidebarBanner = () => {
  const iframeRef = useRef(null);
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentWindow.document;
    const adContent = `
      <html>
        <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background-color:#f8fafc;">
          <script type="text/javascript">
            atOptions = { 'key' : '52695e8db694c76f0b9c4326f40f1398', 'format' : 'iframe', 'height' : 300, 'width' : 160, 'params' : {} };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/52695e8db694c76f0b9c4326f40f1398/invoke.js"></script>
        </body>
      </html>
    `;
    doc.open(); doc.write(adContent); doc.close();
  }, []);

  return (
    <div className="text-center mt-6">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Sponsored</p>
      <div className="flex justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm relative group">
        <span className="absolute top-0 right-0 bg-slate-200 text-[9px] px-1 text-slate-500 font-bold z-10">AD</span>
        <iframe ref={iframeRef} title="Adsterra Banner" width="170" height="310" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" />
      </div>
    </div>
  );
};

export const BottomAdButton = () => (
  <a href="https://dramaid-eta.vercel.app" target="_blank" rel="noopener noreferrer" className="block mt-4 group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 hover:shadow-md transition-all p-4 text-center cursor-pointer">
    <div className="flex items-center justify-center gap-2 text-amber-800 font-bold">
      <ExternalLink size={16} /> <span>Rekomendasi: Web drama cina terbaik bisa download video klik disini</span>
    </div>
    <p className="text-xs text-amber-600 mt-1">Sponsor Resmi</p>
  </a>
);

import React, { useState } from 'react';
import { useGeminiGenerator } from '../hooks/useGeminiGenerator';
import { Header, Modal } from '../components/Layout';
import { PopUnderScript, SidebarBanner, BottomAdButton, DIRECT_LINK_URL } from '../components/Ads';
import { UploadZone, ControlPanel, ResultDisplay } from '../components/PromptTools';
import { Sparkles, History, Trash2, Info, ExternalLink } from 'lucide-react';

const HomePage = () => {
  const {
    image, loading, promptResult, setPromptResult, error, copySuccess,
    mode, setMode, language, setLanguage, history,
    processFile, generatePrompt, clearHistory, copyToClipboard
  } = useGeminiGenerator();

  const [activeModal, setActiveModal] = useState(null);
  const [isAdOpen, setIsAdOpen] = useState(false);

  // Logic klik tombol generate dengan iklan pop-under manual (Direct Link)
  const handleGenerateClick = () => {
    if (!image) return;
    
    // Jika iklan belum pernah dibuka, buka iklan dulu di tab baru
    if (!isAdOpen) {
      window.open(DIRECT_LINK_URL, '_blank');
      setIsAdOpen(true);
      return;
    }
    
    // Jika sudah, jalankan fungsi generate
    generatePrompt();
  };

  const handleFileSelect = (file) => {
    processFile(file);
    setIsAdOpen(false); // Reset status iklan agar muncul lagi pada gambar baru
  };

  const loadFromHistory = (item) => {
    setPromptResult(item.result);
    // Tutup modal setelah memilih history
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Script Iklan Pop-Under Otomatis */}
      <PopUnderScript />
      
      {/* Header Aplikasi */}
      <Header onOpenModal={setActiveModal} />

      <main className="max-w-5xl mx-auto px-4 py-8 relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI: Input & Kontrol */}
          <div className="lg:col-span-5 space-y-6">
            <UploadZone image={image} onFileSelect={handleFileSelect} />
            
            <ControlPanel 
              mode={mode} setMode={setMode} 
              language={language} setLanguage={setLanguage}
              loading={loading} image={image} error={error}
              onGenerate={handleGenerateClick}
            />
            
            {/* Iklan Banner Sidebar */}
            <SidebarBanner />
          </div>

          {/* KOLOM KANAN: Hasil & Tips */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ResultDisplay 
              promptResult={promptResult} loading={loading} language={language}
              copySuccess={copySuccess} onCopy={() => copyToClipboard(promptResult)}
              onClear={() => setPromptResult('')}
            />
            
            {/* Iklan Tombol Bawah */}
            <BottomAdButton />
            
            {/* --- KUCING GIF ANIMATION (Pengganti Tips Singkat) --- */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 relative group h-64 bg-slate-100">
               {/* Gambar GIF Kucing */}
               <img 
                 src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" 
                 alt="Cat Typing" 
                 className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
               />
               
               {/* Overlay Text */}
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/90 to-transparent p-6 pt-12">
                 <div className="flex items-center gap-2 text-white font-bold text-lg mb-1">
                    <Sparkles size={20} className="text-yellow-400 animate-pulse"/> 
                    <span>Menunggu Perintah...</span>
                 </div>
                 <p className="text-indigo-100 text-sm">
                   Kucing AI siap mengetik prompt ajaib untukmu! 😺
                 </p>
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- MODAL HISTORY --- */}
      {activeModal === 'history' && (
        <Modal title="Riwayat Prompt (10 Terakhir)" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <History size={48} className="mx-auto mb-2 opacity-50" />
                <p>Belum ada riwayat.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <button onClick={clearHistory} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                    <Trash2 size={12}/> Hapus Semua
                  </button>
                </div>
                <div className="space-y-3">
                  {history.map((item) => (
                    <div key={item.id} onClick={() => loadFromHistory(item)} className="flex gap-3 p-3 border rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                      <div className="w-16 h-16 shrink-0 bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                        {item.preview && <img src={item.preview} alt="Thumb" className="w-full h-full object-cover" />}
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded uppercase">{item.mode}</span>
                          <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{item.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Modal>
      )}

      {/* --- MODAL PANDUAN --- */}
      {activeModal === 'help' && (
        <Modal title="Panduan Penggunaan" onClose={() => setActiveModal(null)}>
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Sparkles size={16}/> Cara Kerja
              </h4>
              <p className="text-sm text-indigo-700">
                Aplikasi ini menggunakan teknologi AI Vision canggih (Google Gemini) untuk menganalisis elemen visual gambar Anda dan mengubahnya menjadi teks prompt yang sangat detail.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 border-b pb-2">Langkah-Langkah:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                <li><span className="font-semibold text-slate-800">Upload Gambar:</span> Klik kotak upload atau drag & drop file gambar (JPG/PNG).</li>
                <li><span className="font-semibold text-slate-800">Pilih Mode:</span> Pilih gaya prompt yang sesuai kebutuhan (lihat penjelasan di bawah).</li>
                <li><span className="font-semibold text-slate-800">Pilih Bahasa:</span> Gunakan English untuk Generator Gambar AI, atau Indonesia untuk deskripsi teks.</li>
                <li><span className="font-semibold text-slate-800">Generate:</span> Klik tombol generate dan tunggu proses analisis selesai.</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 border-b pb-2">Penjelasan Mode:</h4>
              <div className="grid gap-3">
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="font-bold text-indigo-600 text-sm mb-1">Midjourney</div>
                  <p className="text-xs text-slate-500">
                    Menghasilkan prompt artistik. Otomatis menambahkan parameter seperti <code className="bg-slate-100 px-1 rounded">--ar</code> (aspek rasio) dan <code className="bg-slate-100 px-1 rounded">--v 6.0</code>.
                  </p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="font-bold text-purple-600 text-sm mb-1">Stable Diffusion</div>
                  <p className="text-xs text-slate-500">
                    Fokus pada teknis dan "tags". Menggunakan format koma dan pembobotan seperti <code className="bg-slate-100 px-1 rounded">(subject:1.2)</code>.
                  </p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="font-bold text-teal-600 text-sm mb-1">Deskriptif</div>
                  <p className="text-xs text-slate-500">
                    Menghasilkan paragraf cerita atau narasi panjang yang menjelaskan suasana gambar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* --- MODAL TENTANG --- */}
      {activeModal === 'about' && (
        <Modal title="Tentang Developer" onClose={() => setActiveModal(null)}>
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1 mb-4 shadow-xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                   <img 
                    src="https://drama-id.vercel.app/assets/IMG_20260108_00352181-DNA0WxA9.jpeg" 
                    alt="Idin Iskandar" 
                    className="w-full h-full object-cover"
                   />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">IDIN ISKANDAR</h2>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mt-2">
                Full Stack Developer
              </span>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-left space-y-3">
              <h4 className="font-bold text-slate-700 flex items-center gap-2">
                <Info size={16}/> Tentang Project
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>PromptGen Pro</strong> adalah alat bantu kreatif yang dibangun dengan React.js.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <ExternalLink size={20}/>
              </a>
            </div>

            <p className="text-xs text-slate-400">© 2025 Idin Iskandar. All Rights Reserved.</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;

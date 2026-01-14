import React from 'react';
import HomePage from './pages/HomePage';

function App() {
  return (
    <HomePage />
  );
}

export default App;font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              <Volume2 size={18} />
              <span className="hidden md:inline">Panduan</span>
            </button>
            <button 
              onClick={() => setActiveModal('about')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              <User size={18} />
              <span className="hidden md:inline">Tentang</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div 
              className={`relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer overflow-hidden ${image ? 'border-indigo-300 bg-indigo-50/30' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
              onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileInputRef.current.click()}
            >
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
              {image ? (
                <div className="relative">
                  <img src={image} alt="Preview" className="w-full h-64 object-cover rounded-xl shadow-md" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <p className="text-white font-medium flex items-center gap-2"><RefreshCw size={16} /> Ganti Gambar</p>
                  </div>
                </div>
              ) : (
                <div className="py-10 flex flex-col items-center justify-center text-slate-400">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Upload size={28} className="text-indigo-500" /></div>
                  <p className="text-slate-600 font-medium mb-1">Klik atau Drop Gambar</p>
                  <p className="text-xs text-slate-400">JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"><Settings2 size={16} /> Gaya Prompt</h3>
                <div className="space-y-2">
                  {modes.map((m) => (
                    <button key={m.id} onClick={() => setMode(m.id)} className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${mode === m.id ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                      <div className={`mt-0.5 p-1.5 rounded-lg ${mode === m.id ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>{m.icon}</div>
                      <div><p className={`text-sm font-semibold ${mode === m.id ? 'text-indigo-900' : 'text-slate-700'}`}>{m.label}</p><p className="text-xs text-slate-500 mt-0.5">{m.desc}</p></div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"><Languages size={16} /> Bahasa Output</h3>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button key={lang.id} onClick={() => setLanguage(lang.id)} className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${language === lang.id ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <span className="text-lg">{lang.flag}</span>{lang.id === 'english' ? 'English' : 'Indonesia'}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleGenerateClick} disabled={!image || loading} className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all ${!image || loading ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 hover:translate-y-[-2px]'}`}>
                {loading ? <><RefreshCw className="animate-spin" size={20} /> Menganalisis...</> : <><Sparkles size={20} /> Generate Prompt</>}
              </button>
              
              {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2"><AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}</div>}
            </div>
            
            <div className="text-center"><p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Sponsored</p><AdsterraBannerWidget /></div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[500px]">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2"><Globe size={16} className="text-slate-400" /> Hasil Prompt ({language === 'english' ? '🇬🇧' : '🇮🇩'})</h3>
                {promptResult && <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-md">Selesai</span>}
              </div>
              <div className="flex-1 p-6 relative">
                {!promptResult && !loading && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                    <Wand2 size={48} className="mb-4 text-slate-300" />
                    <p className="text-center max-w-xs">Upload gambar dan klik "Generate" untuk melihat keajaiban AI bekerja.</p>
                  </div>
                )}
                {loading && (
                  <div className="h-full flex flex-col items-center justify-center animate-pulse space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div><div className="h-4 bg-slate-200 rounded w-full"></div><div className="h-4 bg-slate-200 rounded w-5/6"></div><div className="h-4 bg-slate-200 rounded w-4/5"></div>
                  </div>
                )}
                {promptResult && <div className="prose prose-slate max-w-none"><p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">{promptResult}</p></div>}
              </div>
              {promptResult && (
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                  <button onClick={() => setPromptResult('')} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">Hapus</button>
                  <button onClick={copyToClipboard} className={`px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${copySuccess ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                    {copySuccess ? <><Check size={16} /> Disalin!</> : <><Copy size={16} /> Salin Prompt</>}
                  </button>
                </div>
              )}
            </div>
            <BottomAdButton />
            <div className="bg-indigo-900 rounded-xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Tips Singkat</h4>
                <ul className="text-indigo-200 text-sm space-y-2 list-disc list-inside">
                  <li>Gunakan <strong>Bahasa Inggris</strong> agar kompatibel dengan Midjourney.</li>
                  <li>Mode <strong>Deskriptif</strong> cocok untuk membuat caption Instagram atau cerita.</li>
                </ul>
              </div>
              <Sparkles className="absolute -bottom-4 -right-4 text-indigo-800 w-32 h-32 opacity-50" />
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL PANDUAN PENGGUNA --- */}
      {activeModal === 'help' && (
        <Modal title="Panduan Penggunaan" onClose={() => setActiveModal(null)}>
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><Sparkles size={16}/> Cara Kerja</h4>
              <p className="text-sm text-indigo-700">Aplikasi ini menggunakan teknologi AI Vision canggih untuk menganalisis gambar Anda dan mengubahnya menjadi teks prompt yang bisa digunakan untuk membuat gambar serupa di AI Generator lain.</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 border-b pb-2">Langkah-Langkah:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                <li><span className="font-semibold text-slate-800">Upload Gambar:</span> Klik kotak upload atau drag & drop file gambar (JPG/PNG).</li>
                <li><span className="font-semibold text-slate-800">Pilih Mode:</span> Sesuaikan gaya prompt yang Anda inginkan (lihat penjelasan di bawah).</li>
                <li><span className="font-semibold text-slate-800">Pilih Bahasa:</span> Gunakan English untuk kompatibilitas AI, atau Indonesia untuk deskripsi.</li>
                <li><span className="font-semibold text-slate-800">Generate:</span> Klik tombol generate dan tunggu analisis selesai.</li>
                <li><span className="font-semibold text-slate-800">Salin:</span> Copy hasil teks dan gunakan di Midjourney, Stable Diffusion, atau DALL-E.</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 border-b pb-2">Penjelasan Mode:</h4>
              <div className="grid gap-3">
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="font-bold text-indigo-600 text-sm mb-1">Midjourney</div>
                  <p className="text-xs text-slate-500">Menghasilkan prompt artistik dengan format khusus. Otomatis menambahkan parameter seperti <code className="bg-slate-100 px-1 rounded">--ar</code> (aspek rasio) dan <code className="bg-slate-100 px-1 rounded">--v</code> (versi).</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="font-bold text-purple-600 text-sm mb-1">Stable Diffusion</div>
                  <p className="text-xs text-slate-500">Berfokus pada teknis dan "tags". Menggunakan format koma dan pembobotan seperti <code className="bg-slate-100 px-1 rounded">(subject:1.2)</code>, <code className="bg-slate-100 px-1 rounded">8k</code>, <code className="bg-slate-100 px-1 rounded">masterpiece</code>.</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="font-bold text-teal-600 text-sm mb-1">Deskriptif</div>
                  <p className="text-xs text-slate-500">Bukan untuk generator gambar. Mode ini menghasilkan paragraf cerita atau caption yang menjelaskan suasana, emosi, dan detail visual gambar secara naratif.</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* --- MODAL TENTANG (ABOUT) --- */}
      {activeModal === 'about' && (
        <Modal title="Tentang Developer" onClose={() => setActiveModal(null)}>
          <div className="text-center space-y-6">
            
            {/* Profil */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1 mb-4 shadow-xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                   {/* Placeholder Image - Ganti src dengan foto asli Anda jika sudah online */}
                   <img 
                    src="https://ui-avatars.com/api/?name=Idin+Iskandar&background=6366f1&color=fff&size=128" 
                    alt="Idin Iskandar" 
                    className="w-full h-full object-cover"
                   />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">IDIN ISKANDAR</h2>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mt-2">Full Stack Developer</span>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-left space-y-3">
              <h4 className="font-bold text-slate-700 flex items-center gap-2"><Info size={16}/> Tentang Project</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>PromptGen Pro</strong> dibangun dengan tujuan membantu para seniman AI dan kreator konten untuk menganalisis referensi visual dengan cepat.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Aplikasi ini memanfaatkan kecerdasan buatan dari <strong>Google Gemini Vision</strong> untuk "melihat" struktur gambar dan menerjemahkannya ke dalam prompt teks yang sangat akurat.
              </p>
              <div className="pt-2 border-t border-slate-200 mt-2">
                <p className="text-xs text-slate-400 text-center">Built with React.js & Tailwind CSS</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><ExternalLink size={20}/></a>
            </div>

            <p className="text-xs text-slate-400">© 2025 Idin Iskandar. All Rights Reserved.</p>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default ImageToPromptApp;

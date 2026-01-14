import React, { useRef } from 'react';
import { Upload, RefreshCw, Settings2, Sparkles, Wand2, Image as ImageIcon, Languages, AlertCircle, Globe, Check, Copy } from 'lucide-react';

export const UploadZone = ({ image, onFileSelect }) => {
  const fileInputRef = useRef(null);
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.files?.[0]) onFileSelect(e.dataTransfer.files[0]); };

  return (
    <div 
      className={`relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer overflow-hidden ${image ? 'border-indigo-300 bg-indigo-50/30' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
      onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileInputRef.current.click()}
    >
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} />
      {image ? (
        <div className="relative"><img src={image} alt="Preview" className="w-full h-64 object-cover rounded-xl shadow-md" /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"><p className="text-white font-medium flex items-center gap-2"><RefreshCw size={16} /> Ganti Gambar</p></div></div>
      ) : (
        <div className="py-10 flex flex-col items-center justify-center text-slate-400"><div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Upload size={28} className="text-indigo-500" /></div><p className="text-slate-600 font-medium mb-1">Klik atau Drop Gambar</p><p className="text-xs text-slate-400">JPG, PNG, WEBP (Max 5MB)</p></div>
      )}
    </div>
  );
};

export const ControlPanel = ({ mode, setMode, language, setLanguage, loading, image, onGenerate, error }) => {
  const modes = [
    { id: 'midjourney', label: 'Midjourney', icon: <Sparkles className="w-4 h-4" />, desc: 'Parameter --ar, --v' },
    { id: 'stable-diffusion', label: 'Stable Diffusion', icon: <Wand2 className="w-4 h-4" />, desc: 'Tag & Bobot' },
    { id: 'descriptive', label: 'Deskriptif', icon: <ImageIcon className="w-4 h-4" />, desc: 'Narasi Panjang' }
  ];
  const languages = [{ id: 'english', label: 'English', flag: '🇬🇧' }, { id: 'indonesian', label: 'Indonesia', flag: '🇮🇩' }];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      <div><h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"><Settings2 size={16} /> Gaya Prompt</h3>
        <div className="space-y-2">{modes.map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)} className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${mode === m.id ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
            <div className={`mt-0.5 p-1.5 rounded-lg ${mode === m.id ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>{m.icon}</div><div><p className={`text-sm font-semibold ${mode === m.id ? 'text-indigo-900' : 'text-slate-700'}`}>{m.label}</p><p className="text-xs text-slate-500 mt-0.5">{m.desc}</p></div>
          </button>
        ))}</div>
      </div>
      <div><h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"><Languages size={16} /> Bahasa Output</h3>
        <div className="grid grid-cols-2 gap-2">{languages.map((lang) => (<button key={lang.id} onClick={() => setLanguage(lang.id)} className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${language === lang.id ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}><span className="text-lg">{lang.flag}</span>{lang.id === 'english' ? 'English' : 'Indonesia'}</button>))}</div>
      </div>
      <button onClick={onGenerate} disabled={!image || loading} className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all ${!image || loading ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 hover:translate-y-[-2px]'}`}>{loading ? <><RefreshCw className="animate-spin" size={20} /> Menganalisis...</> : <><Sparkles size={20} /> Generate Prompt</>}</button>
      {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2"><AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}</div>}
    </div>
  );
};

export const ResultDisplay = ({ promptResult, loading, language, copySuccess, onCopy, onClear }) => (
  <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[500px]">
    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between"><h3 className="font-semibold text-slate-700 flex items-center gap-2"><Globe size={16} className="text-slate-400" /> Hasil Prompt ({language === 'english' ? '🇬🇧' : '🇮🇩'})</h3>{promptResult && <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-md">Selesai</span>}</div>
    <div className="flex-1 p-6 relative">
      {!promptResult && !loading && (<div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60"><Wand2 size={48} className="mb-4 text-slate-300" /><p className="text-center max-w-xs">Upload gambar dan klik "Generate" untuk melihat keajaiban AI bekerja.</p></div>)}
      {loading && (<div className="h-full flex flex-col items-center justify-center animate-pulse space-y-4"><div className="h-4 bg-slate-200 rounded w-3/4"></div><div className="h-4 bg-slate-200 rounded w-full"></div><div className="h-4 bg-slate-200 rounded w-5/6"></div><div className="h-4 bg-slate-200 rounded w-4/5"></div></div>)}
      {promptResult && <div className="prose prose-slate max-w-none"><p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">{promptResult}</p></div>}
    </div>
    {promptResult && (<div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3"><button onClick={onClear} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">Hapus</button><button onClick={onCopy} className={`px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${copySuccess ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>{copySuccess ? <><Check size={16} /> Disalin!</> : <><Copy size={16} /> Salin Prompt</>}</button></div>)}
  </div>
);

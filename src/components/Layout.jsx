import React from 'react';
import { Zap, History, Volume2, User, X } from 'lucide-react';

export const Header = ({ onOpenModal }) => (
  <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
    <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <Zap size={20} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 leading-none">
            PromptGen Pro
          </h1>
          <span className="text-[10px] text-slate-400 font-medium tracking-wider">AI IMAGE ANALYZER</span>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={() => onOpenModal('history')} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Riwayat">
          <History size={18} /> <span className="hidden sm:inline">Riwayat</span>
        </button>
        <button onClick={() => onOpenModal('help')} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
          <Volume2 size={18} /><span className="hidden md:inline">Panduan</span>
        </button>
        <button onClick={() => onOpenModal('about')} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
          <User size={18} /><span className="hidden md:inline">Tentang</span>
        </button>
      </div>
    </div>
  </header>
);

export const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50 shrink-0">
        <h3 className="font-bold text-lg text-slate-800">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
          <X size={20} />
        </button>
      </div>
      <div className="p-6 overflow-y-auto">{children}</div>
    </div>
  </div>
);

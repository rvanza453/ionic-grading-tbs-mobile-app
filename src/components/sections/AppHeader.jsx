/**
 * AppHeader Component
 * Header utama aplikasi dengan navigation buttons
 */

import { Icons } from '../../constants/icons';

export function AppHeader({ 
  onDataMenuOpen, 
  onAddItem, 
  onShowSummary, 
  onSubmit, 
  onReset 
}) {
  return (
    <div className="bg-green-700 text-white p-2 pt-12 shadow-lg sticky top-0 z-40">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full">
        <div className="flex items-center gap-1 flex-shrink-0 mr-1">
          <Icons.Leaf className="w-5 h-5 text-yellow-300" />
          <h1 className="font-bold tracking-wide text-sm whitespace-nowrap">
            GRADING TBS
          </h1>
        </div>
        
        <div className="w-px h-6 bg-white/20 mx-1 flex-shrink-0"></div>
        
        <div className="flex gap-2 flex-nowrap items-center">
          <button 
            onClick={onDataMenuOpen} 
            className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md font-bold text-[10px] flex items-center gap-1 border border-white/20 whitespace-nowrap transition"
          >
            <Icons.Database className="w-3 h-3"/> DATA
          </button>
          
          <button 
            onClick={onAddItem} 
            className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md font-bold text-[10px] flex items-center gap-1 border border-white/20 whitespace-nowrap transition"
          >
            <Icons.Plus className="w-3 h-3"/> TPH+
          </button>
          
          <button 
            onClick={onShowSummary} 
            className="bg-blue-600/80 hover:bg-blue-600 px-3 py-1.5 rounded-md font-bold text-[10px] flex items-center gap-1 shadow-sm whitespace-nowrap transition"
          >
            <Icons.List className="w-3 h-3"/> SUM
          </button>
          
          <button 
            onClick={onSubmit} 
            className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-md font-bold text-[10px] flex items-center gap-1 shadow-sm whitespace-nowrap transition border border-green-600"
          >
            <Icons.Save className="w-3 h-3"/> SIMPAN
          </button>
          
          <button 
            onClick={onReset} 
            className="text-green-200 hover:text-white p-1.5"
          >
            <Icons.RefreshCw className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </div>
  );
}


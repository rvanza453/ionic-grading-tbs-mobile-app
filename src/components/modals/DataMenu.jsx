/**
 * DataMenu Component
 * Modal untuk pengurusan data (Backup, Restore, Reset)
 */

import { Icons } from '../../constants/icons';

export function DataMenu({ 
  isOpen, 
  onClose, 
  onExportJSON, 
  onImportJSON, 
  onReset 
}) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-xs rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <Icons.Database className="w-5 h-5"/> 
            PENGURUSAN DATA
          </h3>
          <button onClick={onClose}>
            <Icons.Close className="w-5 h-5 text-gray-500"/>
          </button>
        </div>
        
        <div className="p-2 space-y-1">
          <button 
            onClick={onExportJSON} 
            className="w-full p-3 text-left hover:bg-blue-50 rounded-lg flex items-center gap-3 text-blue-700 font-bold transition"
          >
            <Icons.FolderDown className="w-5 h-5"/> 
            Simpan ke Fail (Backup)
          </button>
          
          <label className="w-full p-3 text-left hover:bg-green-50 rounded-lg flex items-center gap-3 text-green-700 font-bold transition cursor-pointer border-t border-b border-gray-100">
            <Icons.FolderUp className="w-5 h-5"/> 
            Buka Fail (Restore)
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={onImportJSON} 
            />
          </label>
          
          <div className="border-t my-1"></div>
          
          <button 
            onClick={onReset} 
            className="w-full p-3 text-left hover:bg-red-50 rounded-lg flex items-center gap-3 text-red-600 font-bold transition"
          >
            <Icons.Trash className="w-5 h-5"/> 
            Padam Data Tempatan
          </button>
        </div>
      </div>
    </div>
  );
}


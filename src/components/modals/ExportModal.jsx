/**
 * ExportModal Component
 * Modal untuk memilih metode export (Share atau Save to Documents)
 */

import { Icons } from '../../constants/icons';
import { shareFile, saveToDocuments } from '../../services/storage';

export function ExportModal({ exportModal, onClose }) {
  if (!exportModal) return null;
  
  const handleShare = async () => {
    try {
      await shareFile(exportModal.data, exportModal.filename);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };
  
  const handleSave = async () => {
    try {
      const message = await saveToDocuments(exportModal.data, exportModal.filename);
      alert(message);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm no-print animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Simpan {exportModal.type}
        </h3>
        <p className="text-gray-500 text-xs mb-4">
          Pilih metode penyimpanan untuk file: <br/>
          <span className="font-mono text-black">{exportModal.filename}</span>
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleShare}
            className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition"
          >
            <div className="bg-blue-200 p-2 rounded-full">
              <Icons.List className="w-5 h-5"/>
            </div>
            <div className="text-left">
              <div className="text-sm">Bagikan (Share)</div>
              <div className="text-[10px] opacity-70">WhatsApp, Email, Drive, dll</div>
            </div>
          </button>

          <button 
            onClick={handleSave}
            className="flex items-center gap-3 p-3 rounded-lg border border-green-200 bg-green-50 text-green-700 font-bold hover:bg-green-100 transition"
          >
            <div className="bg-green-200 p-2 rounded-full">
              <Icons.FolderDown className="w-5 h-5"/>
            </div>
            <div className="text-left">
              <div className="text-sm">Simpan ke Dokumen</div>
              <div className="text-[10px] opacity-70">Folder Internal Storage/Documents</div>
            </div>
          </button>
          
          <button 
            onClick={onClose} 
            className="mt-2 text-gray-400 font-bold text-xs py-2 hover:text-gray-600"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}


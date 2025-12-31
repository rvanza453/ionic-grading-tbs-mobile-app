/**
 * HeaderSection Component
 * Section untuk input informasi dasar (Kerani, Tanggal, Afdeling)
 */

import { Icons } from '../../constants/icons';
import { MobileInput } from '../common';

export function HeaderSection({ 
  headerData, 
  setHeaderData, 
  isOpen, 
  toggleOpen 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div 
        onClick={toggleOpen} 
        className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
      >
        <h2 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
          <Icons.User className="w-4 h-4"/> 
          Informasi Dasar
        </h2>
        <Icons.ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      
      {isOpen && (
        <div className="p-4 grid grid-cols-2 gap-3 animate-[fadeIn_0.2s]">
          <div className="col-span-2 flex gap-3">
            <div className="flex-1">
              <MobileInput 
                label="Nama Kerani" 
                placeholder="Nama Anda" 
                value={headerData.namaKerani} 
                onChange={e => setHeaderData({
                  ...headerData, 
                  namaKerani: e.target.value
                })} 
              />
            </div>
            <div className="flex-1">
              <MobileInput 
                type="date" 
                label="Tanggal" 
                value={headerData.tanggalPemeriksaan} 
                onChange={e => setHeaderData({
                  ...headerData, 
                  tanggalPemeriksaan: e.target.value
                })} 
              />
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-500 uppercase mb-1">
                Afdeling
              </label>
              <input 
                type="text" 
                value={headerData.afdeling} 
                onChange={e => setHeaderData({
                  ...headerData, 
                  afdeling: e.target.value
                })} 
                className="border p-2.5 rounded-lg w-full text-sm" 
                placeholder="1" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/**
 * FilterBar Component
 * Filter controls untuk Summary View
 */

import { Icons } from '../../constants/icons';

export function FilterBar({ 
  filterAfdeling,
  setFilterAfdeling,
  filterBlok,
  setFilterBlok,
  filterPemanen,
  setFilterPemanen,
  filterTanggal,
  setFilterTanggal,
  filterBulan,
  setFilterBulan,
  uniqueAfdeling,
  uniqueBlok,
  uniquePemanen
}) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm no-print flex flex-col gap-2 border border-blue-100">
      <div className="flex items-center gap-2 mb-2">
        <Icons.Filter className="w-4 h-4 text-gray-500"/>
        <span className="font-bold text-xs text-gray-700">FILTER DATA</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-gray-500">Afdeling</label>
          <select 
            value={filterAfdeling} 
            onChange={e => setFilterAfdeling(e.target.value)} 
            className="border rounded p-1.5 text-xs bg-gray-50"
          >
            <option value="">Semua</option>
            {uniqueAfdeling.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-gray-500">Blok</label>
          <select 
            value={filterBlok} 
            onChange={e => setFilterBlok(e.target.value)} 
            className="border rounded p-1.5 text-xs bg-gray-50"
          >
            <option value="">Semua</option>
            {uniqueBlok.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-gray-500">Pemanen</label>
          <select 
            value={filterPemanen} 
            onChange={e => setFilterPemanen(e.target.value)} 
            className="border rounded p-1.5 text-xs bg-gray-50"
          >
            <option value="">Semua</option>
            {uniquePemanen.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-gray-500">Tanggal</label>
          <input 
            type="date" 
            value={filterTanggal} 
            onChange={e => {
              setFilterTanggal(e.target.value);
              setFilterBulan('');
            }} 
            className="border rounded p-1.5 text-xs bg-gray-50" 
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-gray-500">Bulan</label>
          <input 
            type="month" 
            value={filterBulan} 
            onChange={e => {
              setFilterBulan(e.target.value);
              setFilterTanggal('');
            }} 
            className="border rounded p-1.5 text-xs bg-gray-50" 
          />
        </div>
      </div>
    </div>
  );
}


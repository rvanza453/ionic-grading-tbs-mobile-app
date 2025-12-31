/**
 * SummaryView Component
 * View untuk menampilkan ringkasan dan export laporan
 */

import { useState, useMemo } from 'react';
import { Icons } from '../constants/icons';
import { ExportModal } from '../components/modals/ExportModal';
import { FilterBar, SummaryTable, PhotoGallery } from '../components/sections';
import { useFilter, useExport } from '../hooks';

export function SummaryView({ 
  headerData, 
  items, 
  compiledItems, 
  setCompiledItems, 
  onBack,
  onMultiImport 
}) {
  const activeDataset = useMemo(() => {
    if (compiledItems.length > 0) {
      return compiledItems;
    }
    
    return items.map(item => ({
      ...item,
      _tanggal: headerData.tanggalPemeriksaan,
      _afdeling: headerData.afdeling,
      _kerani: headerData.namaKerani
    }));
  }, [compiledItems, items, headerData]);

  const {
    filterPemanen,
    setFilterPemanen,
    filterBlok,
    setFilterBlok,
    filterAfdeling,
    setFilterAfdeling,
    filterTanggal,
    setFilterTanggal,
    filterBulan,
    setFilterBulan,
    filteredItems,
    uniquePemanen,
    uniqueBlok,
    uniqueAfdeling,
    clearFilters
  } = useFilter(activeDataset);

  const {
    exportModal,
    setExportModal,
    handleExcelExport,
    captureAndExport
  } = useExport(headerData, items);

  const handleBack = () => {
    setCompiledItems([]);
    clearFilters();
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 text-sm" id="summary-print-area">
      <ExportModal 
        exportModal={exportModal} 
        onClose={() => setExportModal(null)} 
      />

      {/* Header */}
      <div className="bg-white shadow p-4 sticky top-0 z-20 no-print flex justify-between items-center pt-12">
        <h2 className="font-bold text-gray-800 flex gap-2 items-center">
          <Icons.List className="w-5 h-5"/> 
          {compiledItems.length > 0 ? "LAPORAN KOMPILASI" : "RINGKASAN"}
        </h2>
        
        <div className="flex gap-2">
          <label className="bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer hover:bg-purple-700 transition">
            <Icons.Files className="w-3 h-3"/> GABUNG DATA
            <input 
              type="file" 
              accept=".json" 
              multiple 
              className="hidden" 
              onChange={onMultiImport} 
            />
          </label>
          
          <button 
            onClick={handleBack} 
            className="text-blue-600 font-bold text-xs border border-blue-200 px-3 py-1.5 rounded-full"
          >
            Kembali
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Filter Bar */}
        <FilterBar
          filterAfdeling={filterAfdeling}
          setFilterAfdeling={setFilterAfdeling}
          filterBlok={filterBlok}
          setFilterBlok={setFilterBlok}
          filterPemanen={filterPemanen}
          setFilterPemanen={setFilterPemanen}
          filterTanggal={filterTanggal}
          setFilterTanggal={setFilterTanggal}
          filterBulan={filterBulan}
          setFilterBulan={setFilterBulan}
          uniqueAfdeling={uniqueAfdeling}
          uniqueBlok={uniqueBlok}
          uniquePemanen={uniquePemanen}
        />

        {/* Summary Table */}
        <SummaryTable 
          filteredItems={filteredItems} 
          headerData={headerData} 
        />

        {/* Photo Gallery */}
        <PhotoGallery filteredItems={filteredItems} />

        {/* Export Buttons */}
        <div className="fixed bottom-8 left-0 w-full bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex gap-2 justify-center no-print z-30">
          <button 
            onClick={handleExcelExport} 
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1 shadow-lg active:scale-95"
          >
            <Icons.List className="w-4 h-4"/> XLS
          </button>
          
          <button 
            onClick={() => captureAndExport('png')} 
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1 shadow-lg active:scale-95"
          >
            <Icons.Image className="w-4 h-4"/> PNG
          </button>
          
          <button 
            onClick={() => captureAndExport('pdf')} 
            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1 shadow-lg active:scale-95"
          >
            <Icons.Save className="w-4 h-4"/> PDF
          </button>
        </div>
        
        <div className="h-16 no-print"></div>
      </div>
    </div>
  );
}


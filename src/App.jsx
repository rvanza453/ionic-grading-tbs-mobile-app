/**
 * App.jsx
 * Main Application Component - Refactored & Clean
 */

import React, { useState } from 'react';
import { AppHeader, HeaderSection, TPHCard } from './components/sections';
import { Toast } from './components/common';
import { ExportModal, DataMenu } from './components/modals';
import { SummaryView } from './views/SummaryView';
import { useGradingData, useGeolocation, useExport } from './hooks';
import { parseJSONImport, parseMultipleJSONImport } from './utils';

function App() {
  // State Management
  const {
    headerData,
    setHeaderData,
    items,
    setItems,
    updateItem,
    updatePhoto,
    addItem,
    removeItem,
    resetData
  } = useGradingData();

  const { loadingIndex, requestLocation } = useGeolocation();
  
  const {
    exportModal,
    setExportModal,
    handleJSONExport,
    handleJSONImport: parseJSON
  } = useExport(headerData, items);

  // UI State
    const [showSummary, setShowSummary] = useState(false);
    const [showDataMenu, setShowDataMenu] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(true);
    const [toast, setToast] = useState(null);
    const [compiledItems, setCompiledItems] = useState([]);
    
  // Helper Functions
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLocationRequest = (index) => {
    requestLocation(index, (coordinateString) => {
      updateItem(index, 'koordinat', coordinateString);
    });
  };

  const handleItemUpdate = (index, field, value) => {
    // Check for duplicate TPH
    if (field === 'noTPH' && value !== '') {
      const isDuplicate = items.some((item, i) => 
        i !== index && item.noTPH === value
      );
      
      if (isDuplicate) {
        showToast(`TPH ${value} duplikat!`);
      }
    }
    
    updateItem(index, field, value);
  };

  const handlePhotoUpdate = (index, field, file) => {
    if (file) {
      updatePhoto(index, field, file);
    }
  };

  const handleSubmit = () => {
    if (!headerData.namaKerani) {
      alert("Isi Nama Kerani");
      setAccordionOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Check for duplicate TPH
    const tphNumbers = items.map(i => i.noTPH).filter(n => n !== '');
    if (new Set(tphNumbers).size !== tphNumbers.length) {
      alert("Ada TPH Duplikat!");
      return;
    }
    
        alert(`Disimpan! ${items.length} TPH.`);
    };

  const handleJSONImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const data = await parseJSON(event);
      
      if (data) {
        setHeaderData(data.header);
        setItems(data.items);
        alert("Data dipulihkan!");
      }
    } catch (err) {
      alert("Gagal membaca file.");
    }
    
    setShowDataMenu(false);
  };

  const handleMultiImport = async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    
    try {
      const compiled = await parseMultipleJSONImport(files);
      
      if (compiled.length > 0) {
        setCompiledItems(compiled);
        setShowDataMenu(false);
        setShowSummary(true);
        alert(`Berhasil menggabungkan ${files.length} file.`);
      } else {
        alert("Tiada data.");
      }
        } catch (err) {
      alert("Gagal menggabungkan file.");
    }
  };

  const handleReset = () => {
    resetData();
    setShowDataMenu(false);
    setAccordionOpen(true);
  };

  const handleExportJSON = () => {
    handleJSONExport();
    setShowDataMenu(false);
  };

  // Render Summary View
  if (showSummary) {
    return (
      <SummaryView
        headerData={headerData}
        items={items}
        compiledItems={compiledItems}
        setCompiledItems={setCompiledItems}
        onBack={() => setShowSummary(false)}
        onMultiImport={handleMultiImport}
      />
    );
  }

  // Main View
    return (
        <div className="min-h-screen font-sans pb-24">
      {/* Export Modal */}
      <ExportModal 
        exportModal={exportModal} 
        onClose={() => setExportModal(null)} 
      />

      {/* Data Menu Modal */}
      <DataMenu
        isOpen={showDataMenu}
        onClose={() => setShowDataMenu(false)}
        onExportJSON={handleExportJSON}
        onImportJSON={handleJSONImport}
        onReset={handleReset}
      />

      {/* App Header */}
      <AppHeader
        onDataMenuOpen={() => setShowDataMenu(true)}
        onAddItem={addItem}
        onShowSummary={() => setShowSummary(true)}
        onSubmit={handleSubmit}
        onReset={resetData}
      />

      {/* Toast Notification */}
      <Toast message={toast} />

      {/* Main Content */}
            <div className="p-3 max-w-xl mx-auto space-y-4">
        {/* Header Section */}
        <HeaderSection
          headerData={headerData}
          setHeaderData={setHeaderData}
          isOpen={accordionOpen}
          toggleOpen={() => setAccordionOpen(!accordionOpen)}
        />

        {/* TPH Cards */}
        {items.map((item, index) => (
          <TPHCard
            key={item.id}
            item={item}
            index={index}
            items={items}
            onUpdate={handleItemUpdate}
            onPhotoUpdate={handlePhotoUpdate}
            onLocationRequest={handleLocationRequest}
            loadingLocation={loadingIndex}
            onRemove={removeItem}
          />
        ))}

                <div className="h-20"></div>
            </div>
        </div>
    );
}

export default App;

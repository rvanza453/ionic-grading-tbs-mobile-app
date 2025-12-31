/**
 * useGradingData Hook
 * Custom hook untuk menangani data grading (load, save, update)
 */

import { useState, useEffect } from 'react';
import { loadData, saveData, deleteData } from '../services/storage';
import { getTimestamp, getCurrentTime } from '../utils';

const createDefaultItem = () => {
  const now = new Date();
  
  return {
    id: Date.now(),
    namaPemanen: '',
    nikPemanen: '',
    blok: '',
    noAncak: '',
    noTPH: '',
    jam: getCurrentTime(),
    lastModified: getTimestamp(),
    koordinat: '',
    mainFoto: null,
    matang: '',
    foto_matang: null,
    mengkal: '',
    foto_mengkal: null,
    mentah: '',
    foto_mentah: null,
    lewatMatang: '',
    foto_lewatMatang: null,
    abnormal: '',
    foto_abnormal: null,
    seranganHama: '',
    foto_seranganHama: null,
    tangkaiPanjang: '',
    foto_tangkaiPanjang: null,
    janjangKosong: '',
    foto_janjangKosong: null,
    kgBerondolan: '',
    foto_kgBerondolan: null,
    bjr: ''
  };
};

export function useGradingData() {
  const [headerData, setHeaderData] = useState({
    namaKerani: '',
    tanggalPemeriksaan: new Date().toISOString().split('T')[0],
    afdeling: '1'
  });
  
  const [items, setItems] = useState([createDefaultItem()]);

  // Load data on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const data = await loadData();
      
      if (data) {
        setHeaderData(data.header);
        setItems(data.items);
      }
    };
    
    loadInitialData();
  }, []);

  // Auto-save data
  useEffect(() => {
    const timer = setTimeout(() => {
      saveData(headerData, items);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [headerData, items]);

  const updateLastModified = (item) => {
    return {
      ...item,
      lastModified: getTimestamp(),
      jam: getCurrentTime()
    };
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index] = updateLastModified(newItems[index]);
    setItems(newItems);
  };

  const updatePhoto = async (index, field, file) => {
    if (!file) return;
    
    const { fileToBase64 } = await import('../utils');
    const compressed = await fileToBase64(file);
    
    const newItems = [...items];
    newItems[index][field] = compressed;
    newItems[index] = updateLastModified(newItems[index]);
    setItems(newItems);
  };

  const addItem = () => {
    const lastItem = items[items.length - 1];
    
    const newItem = {
      ...createDefaultItem(),
      // Copy some fields from last item for convenience
      namaPemanen: lastItem.namaPemanen,
      nikPemanen: lastItem.nikPemanen,
      blok: lastItem.blok,
      noAncak: lastItem.noAncak
    };
    
    setItems([...items, newItem]);
    
    // Scroll to bottom
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const removeItem = (index) => {
    if (items.length > 1 && confirm('Hapus item ini?')) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const resetData = async () => {
    if (confirm('Reset semua data? Tindakan ini tidak dapat dibatalkan.')) {
      setHeaderData({
        namaKerani: '',
        tanggalPemeriksaan: new Date().toISOString().split('T')[0],
        afdeling: '1'
      });
      setItems([createDefaultItem()]);
      await deleteData();
    }
  };

  return {
    headerData,
    setHeaderData,
    items,
    setItems,
    updateItem,
    updatePhoto,
    addItem,
    removeItem,
    resetData
  };
}


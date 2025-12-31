/**
 * Storage Service
 * Service untuk menangani penyimpanan data (Filesystem & LocalStorage)
 */

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const APP_DATA_FILE = 'grading_saved_data.json';
const HEADER_KEY = 'grading_header';
const ITEMS_KEY = 'grading_items';

/**
 * Load data dari Filesystem atau fallback ke LocalStorage
 * @returns {Promise<Object>} { header, items }
 */
export async function loadData() {
  try {
    // Try Filesystem first
    const result = await Filesystem.readFile({
      path: APP_DATA_FILE,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    
    const parsed = JSON.parse(result.data);
    
    if (parsed.header && parsed.items) {
      return parsed;
    }
  } catch (e) {
    // Fallback to LocalStorage
    try {
      const header = localStorage.getItem(HEADER_KEY);
      const items = localStorage.getItem(ITEMS_KEY);
      
      if (header && items) {
        return {
          header: JSON.parse(header),
          items: JSON.parse(items)
        };
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
    }
  }
  
  return null;
}

/**
 * Save data ke Filesystem dan LocalStorage
 * @param {Object} header - Header data
 * @param {Array} items - Items data
 */
export async function saveData(header, items) {
  try {
    // Save to Filesystem
    await Filesystem.writeFile({
      path: APP_DATA_FILE,
      data: JSON.stringify({ header, items }),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    
    // Backup to LocalStorage
    localStorage.setItem(HEADER_KEY, JSON.stringify(header));
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Gagal menyimpan data:", e);
  }
}

/**
 * Delete all saved data
 */
export async function deleteData() {
  try {
    await Filesystem.deleteFile({
      path: APP_DATA_FILE,
      directory: Directory.Data
    });
  } catch (e) {
    console.error('Error deleting file:', e);
  }
  
  localStorage.removeItem(HEADER_KEY);
  localStorage.removeItem(ITEMS_KEY);
}

/**
 * Share file (untuk export)
 * @param {string} dataBase64 - Base64 data
 * @param {string} fileName - Nama file
 */
export async function shareFile(dataBase64, fileName) {
  try {
    await Filesystem.writeFile({
      path: fileName,
      data: dataBase64,
      directory: Directory.Cache,
    });
    
    const uriResult = await Filesystem.getUri({
      directory: Directory.Cache,
      path: fileName,
    });
    
    await Share.share({
      title: 'Export File',
      text: 'Laporan Grading TBS',
      url: uriResult.uri,
      dialogTitle: 'Pilih Aplikasi',
    });
  } catch (error) {
    console.error("Gagal share:", error);
    throw new Error("Gagal membagikan: " + error.message);
  }
}

/**
 * Save to Documents folder
 * @param {string} dataBase64 - Base64 data
 * @param {string} fileName - Nama file
 */
export async function saveToDocuments(dataBase64, fileName) {
  try {
    await Filesystem.writeFile({
      path: fileName,
      data: dataBase64,
      directory: Directory.Documents,
    });
    
    return `Berhasil disimpan!\nLokasi: Internal Storage/Documents/${fileName}`;
  } catch (error) {
    console.error("Gagal simpan:", error);
    throw new Error("Gagal menyimpan ke Dokumen: " + error.message);
  }
}


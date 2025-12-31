/**
 * useExport Hook
 * Custom hook untuk menangani export data ke berbagai format
 */

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  prepareJSONExport, 
  prepareExcelExport,
  parseJSONImport,
  parseMultipleJSONImport,
  generateFileName
} from '../utils';

export function useExport(headerData, items) {
  const [exportModal, setExportModal] = useState(null);

  const handleJSONExport = () => {
    const result = prepareJSONExport(headerData, items);
    
    setExportModal({
      type: 'JSON Backup',
      data: result.data,
      filename: result.filename
    });
  };

  const handleExcelExport = () => {
    const result = prepareExcelExport(headerData, items);
    
    setExportModal({
      type: 'Excel File',
      data: result.data,
      filename: result.filename
    });
  };

  const captureAndExport = async (format) => {
    const el = document.getElementById('summary-print-area');
    if (!el) return;

    // Hide print buttons
    const btns = document.querySelectorAll('.no-print');
    btns.forEach(b => b.style.display = 'none');

    // Save original styles
    const originalOverflow = document.body.style.overflow;
    const originalWidth = el.style.width;
    const originalHeight = el.style.height;
    const originalMinHeight = el.style.minHeight;
    const tableContainer = el.querySelector('.overflow-x-auto');
    let originalTableOverflow = '';
    
    let contentWidth = 1200;
    
    if (tableContainer) {
      originalTableOverflow = tableContainer.style.overflow;
      tableContainer.style.overflow = 'visible';
      
      const table = tableContainer.querySelector('table');
      if (table && table.scrollWidth > contentWidth) {
        contentWidth = table.scrollWidth + 80;
      }
    }
    
    // Set capture styles
    document.body.style.overflow = 'visible';
    el.style.width = `${contentWidth}px`;
    el.style.minHeight = '100vh';
    el.style.height = 'auto';
    
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: contentWidth,
        windowWidth: contentWidth,
        height: el.scrollHeight + 100,
        windowHeight: el.scrollHeight + 100,
        x: 0,
        y: 0,
        scrollY: -window.scrollY
      });

      const imgData = canvas.toDataURL(
        format === 'png' ? 'image/png' : 'image/jpeg',
        0.6
      );

      if (format === 'png') {
        const base64Data = imgData.split(',')[1];
        setExportModal({
          type: 'PNG Image',
          data: base64Data,
          filename: generateFileName(headerData, 'png')
        });
      } else if (format === 'pdf') {
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pdfPageWidth = 297;
        const pdfPageHeight = (imgHeight * pdfPageWidth) / imgWidth;
        
        const pdf = new jsPDF({
          orientation: 'l',
          unit: 'mm',
          format: [pdfPageWidth, pdfPageHeight]
        });
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfPageWidth, pdfPageHeight);
        
        const pdfBase64 = pdf.output('datauristring').split(',')[1];
        setExportModal({
          type: 'PDF Document',
          data: pdfBase64,
          filename: generateFileName(headerData, 'pdf')
        });
      }
    } catch (err) {
      console.error(err);
      alert("Gagal Export: " + err.message);
    } finally {
      // Restore original styles
      btns.forEach(b => b.style.display = '');
      document.body.style.overflow = originalOverflow;
      el.style.width = originalWidth;
      el.style.height = originalHeight;
      el.style.minHeight = originalMinHeight;
      if (tableContainer) tableContainer.style.overflow = originalTableOverflow;
    }
  };

  const handleJSONImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const data = await parseJSONImport(file);
      return data;
    } catch (err) {
      alert(err.message);
      return null;
    }
  };

  const handleMultipleImport = async (event) => {
    const files = event.target.files;
    if (files.length === 0) return null;
    
    try {
      const compiledItems = await parseMultipleJSONImport(files);
      return compiledItems;
    } catch (err) {
      alert("Gagal menggabungkan file.");
      return null;
    }
  };

  return {
    exportModal,
    setExportModal,
    handleJSONExport,
    handleExcelExport,
    captureAndExport,
    handleJSONImport,
    handleMultipleImport
  };
}


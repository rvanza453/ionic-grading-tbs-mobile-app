/**
 * Export Utilities
 * Fungsi-fungsi untuk export data ke berbagai format
 */

/**
 * Generate filename dengan format standar
 * @param {Object} headerData - Header data
 * @param {string} ext - File extension
 * @returns {string} Generated filename
 */
export function generateFileName(headerData, ext) {
  const now = new Date();
  const timeStr = now
    .toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    .replace(':', '.');
  
  return `Panen_${headerData.tanggalPemeriksaan}_${headerData.namaKerani}_Afd-${headerData.afdeling}_${timeStr}.${ext}`;
}

/**
 * Prepare JSON export data
 * @param {Object} headerData - Header data
 * @param {Array} items - Items data
 * @returns {Object} { data: base64, filename: string }
 */
export function prepareJSONExport(headerData, items) {
  const data = { header: headerData, items: items };
  const jsonString = JSON.stringify(data, null, 2);
  
  // Encode to base64 safely
  const safeBase64 = btoa(
    encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, 
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }
    )
  );
  
  return {
    data: safeBase64,
    filename: generateFileName(headerData, 'json')
  };
}

/**
 * Generate Excel HTML table
 * @param {Object} headerData - Header data
 * @param {Array} items - Items data
 * @returns {string} HTML table string
 */
export function generateExcelHTML(headerData, items) {
  const calculateTotalJanjang = (item) => {
    return (
      (parseInt(item.matang) || 0) +
      (parseInt(item.mengkal) || 0) +
      (parseInt(item.mentah) || 0) +
      (parseInt(item.lewatMatang) || 0) +
      (parseInt(item.abnormal) || 0) +
      (parseInt(item.seranganHama) || 0)
    );
  };
  
  const calculateTotalKg = (item) => {
    const totalJanjang = calculateTotalJanjang(item);
    const bjr = parseFloat(item.bjr) || 0;
    return totalJanjang * bjr;
  };
  
  const rows = items.map((item, idx) => {
    const totalJanjang = calculateTotalJanjang(item);
    const totalKg = calculateTotalKg(item);
    
    return `<tr>
      <td>${idx + 1}</td>
      <td>${item.namaPemanen || '-'}</td>
      <td>${item.nikPemanen || '-'}</td>
      <td>${headerData.afdeling}</td>
      <td>${item.blok || '-'}</td>
      <td>${item.noAncak || '-'}</td>
      <td>${headerData.tanggalPemeriksaan}</td>
      <td>${item.jam || '-'}</td>
      <td>${item.koordinat || '-'}</td>
      <td>${item.noTPH || '-'}</td>
      <td>${item.matang || 0}</td>
      <td>${item.mengkal || 0}</td>
      <td>${item.mentah || 0}</td>
      <td>${item.lewatMatang || 0}</td>
      <td>${item.abnormal || 0}</td>
      <td>${item.seranganHama || 0}</td>
      <td>${item.tangkaiPanjang || 0}</td>
      <td>${item.janjangKosong || 0}</td>
      <td>${item.kgBerondolan || 0}</td>
      <td>${totalJanjang}</td>
      <td>${item.bjr || '-'}</td>
      <td>${item.bjr && totalJanjang > 0 ? totalKg.toFixed(2) : '-'}</td>
      <td>${item.lastModified || '-'}</td>
    </tr>`;
  }).join('');
  
  return `<table border="1">
    <thead>
      <tr>
        <th colspan="24">LAPORAN GRADING TBS</th>
      </tr>
      <tr>
        <th colspan="24">Kerani: ${headerData.namaKerani} | Tanggal: ${headerData.tanggalPemeriksaan} | Afdeling: ${headerData.afdeling}</th>
      </tr>
      <tr>
        <th>No</th>
        <th>Pemanen</th>
        <th>NIK</th>
        <th>Afd</th>
        <th>Blok</th>
        <th>Ancak</th>
        <th>Tanggal</th>
        <th>Jam</th>
        <th>Koordinat</th>
        <th>TPH</th>
        <th>Matang</th>
        <th>Mengkal</th>
        <th>Mentah</th>
        <th>Lewat Matang</th>
        <th>Abnormal</th>
        <th>Hama</th>
        <th>Tangkai Panjang</th>
        <th>Janjang Kosong</th>
        <th>Kg Berondolan</th>
        <th>Total Janjang</th>
        <th>BJR</th>
        <th>Total Kg</th>
        <th>Terakhir Dirubah</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>`;
}

/**
 * Prepare Excel export
 * @param {Object} headerData - Header data
 * @param {Array} items - Items data
 * @returns {Object} { data: base64, filename: string }
 */
export function prepareExcelExport(headerData, items) {
  const html = generateExcelHTML(headerData, items);
  
  const safeBase64 = btoa(
    encodeURIComponent(html).replace(/%([0-9A-F]{2})/g, 
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }
    )
  );
  
  return {
    data: safeBase64,
    filename: generateFileName(headerData, 'xls')
  };
}

/**
 * Parse imported JSON file
 * @param {File} file - JSON file
 * @returns {Promise<Object>} Parsed data
 */
export function parseJSONImport(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (data.header && data.items) {
          resolve(data);
        } else {
          reject(new Error('Format file tidak valid'));
        }
      } catch (err) {
        reject(new Error('Gagal membaca file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Error membaca file'));
    reader.readAsText(file);
  });
}

/**
 * Parse multiple JSON files untuk kompilasi
 * @param {FileList} files - Multiple JSON files
 * @returns {Promise<Array>} Array of compiled items
 */
export async function parseMultipleJSONImport(files) {
  const fileArray = Array.from(files);
  
  const promises = fileArray.map(file => 
    new Promise(resolve => {
      const reader = new FileReader();
      
      reader.onload = event => {
        try {
          const json = JSON.parse(event.target.result);
          
          if (json.header && json.items) {
            const flatItems = json.items.map(item => ({
              ...item,
              _tanggal: json.header.tanggalPemeriksaan,
              _afdeling: json.header.afdeling,
              _kerani: json.header.namaKerani
            }));
            
            resolve(flatItems);
          } else {
            resolve([]);
          }
        } catch (err) {
          resolve([]);
        }
      };
      
      reader.readAsText(file);
    })
  );
  
  const results = await Promise.all(promises);
  return results.flat();
}


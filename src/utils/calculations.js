/**
 * Calculation Utilities
 * Fungsi-fungsi perhitungan untuk grading TBS
 */

/**
 * Hitung total janjang dari semua kategori
 * @param {Object} item - Data item grading
 * @returns {number} Total janjang
 */
export function calculateTotalJanjang(item) {
  return (
    (parseInt(item.matang) || 0) +
    (parseInt(item.mengkal) || 0) +
    (parseInt(item.mentah) || 0) +
    (parseInt(item.lewatMatang) || 0) +
    (parseInt(item.abnormal) || 0) +
    (parseInt(item.seranganHama) || 0)
  );
}

/**
 * Hitung total kg (Total Janjang * BJR)
 * @param {Object} item - Data item grading
 * @returns {number} Total kg
 */
export function calculateTotalKg(item) {
  const totalJanjang = calculateTotalJanjang(item);
  const bjr = parseFloat(item.bjr) || 0;
  return totalJanjang * bjr;
}

/**
 * Hitung summary totals dari filtered items
 * @param {Array} items - Array data items
 * @returns {Object} Summary totals object
 */
export function calculateSummaryTotals(items) {
  return items.reduce((acc, item) => ({
    matang: acc.matang + (parseInt(item.matang) || 0),
    mengkal: acc.mengkal + (parseInt(item.mengkal) || 0),
    mentah: acc.mentah + (parseInt(item.mentah) || 0),
    lewat: acc.lewat + (parseInt(item.lewatMatang) || 0),
    abn: acc.abn + (parseInt(item.abnormal) || 0),
    hama: acc.hama + (parseInt(item.seranganHama) || 0),
    tp: acc.tp + (parseInt(item.tangkaiPanjang) || 0),
    jk: acc.jk + (parseInt(item.janjangKosong) || 0),
    kg: acc.kg + (parseInt(item.kgBerondolan) || 0),
    total: acc.total + calculateTotalJanjang(item),
    totalKg: acc.totalKg + calculateTotalKg(item)
  }), {
    matang: 0,
    mengkal: 0,
    mentah: 0,
    lewat: 0,
    abn: 0,
    hama: 0,
    tp: 0,
    jk: 0,
    kg: 0,
    total: 0,
    totalKg: 0
  });
}

/**
 * Check if TPH number is duplicate
 * @param {Array} items - All items
 * @param {number} currentIndex - Current item index
 * @param {string} tphNumber - TPH number to check
 * @returns {boolean} True if duplicate
 */
export function isDuplicateTPH(items, currentIndex, tphNumber) {
  if (!tphNumber) return false;
  
  return items.filter((item, index) => 
    index !== currentIndex && 
    item.noTPH === tphNumber
  ).length > 0;
}

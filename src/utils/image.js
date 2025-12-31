/**
 * Image Processing Utilities
 * Fungsi untuk kompresi dan processing gambar
 */

/**
 * Kompresi gambar base64 dengan resize dan quality adjustment
 * @param {string} base64Str - Base64 string gambar
 * @param {number} maxWidth - Lebar maksimal (default: 800px)
 * @param {number} quality - Kualitas JPEG 0-1 (default: 0.6)
 * @returns {Promise<string>} Base64 string gambar yang sudah dikompresi
 */
export const compressImage = (base64Str, maxWidth = 800, quality = 0.6) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Resize jika lebih lebar dari maxWidth
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    
    img.onerror = () => resolve(base64Str);
  });
};

/**
 * Convert file to base64
 * @param {File} file - File object
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const compressed = await compressImage(reader.result);
      resolve(compressed);
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


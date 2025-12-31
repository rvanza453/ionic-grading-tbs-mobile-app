/**
 * Device Utilities
 * Fungsi untuk menangani device ID dan info device
 */

const DEVICE_ID_KEY = 'grading_device_id';

/**
 * Generate dan simpan Device ID unik
 * @returns {string} Device ID
 */
export function getDeviceId() {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  
  if (!id) {
    // Generate ID baru
    id = 'DEV-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  
  return id;
}

/**
 * Generate timestamp untuk lastModified
 * @returns {string} Formatted timestamp dengan Device ID
 */
export function getTimestamp() {
  const now = new Date();
  const date = now.toLocaleDateString('id-ID');
  const time = now.toLocaleTimeString('id-ID');
  
  return `${getDeviceId()} ${date} ${time}`;
}

/**
 * Get current time in HH:mm format
 * @returns {string} Current time
 */
export function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}


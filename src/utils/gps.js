/**
 * GPS & Location Utilities
 * Fungsi untuk menangani GPS dan konversi koordinat
 */

/**
 * Konversi koordinat Lat/Long ke format UTM
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {string} Format UTM string
 */
export function toUTM(lat, lon) {
  if (!lat || !lon) return "";
  
  const RADIANS_PER_DEGREE = Math.PI / 180.0;
  const K0 = 0.9996;
  
  const latRad = lat * RADIANS_PER_DEGREE;
  const lonRad = lon * RADIANS_PER_DEGREE;
  
  let zoneNumber = Math.floor((lon + 180) / 6) + 1;
  
  let UTMEasting = (
    K0 * 
    (6378137.0 / Math.sqrt(1 - 0.00669438 * Math.sin(latRad) * Math.sin(latRad))) * 
    (Math.cos(latRad) * (lonRad - ((zoneNumber - 1) * 6 - 180 + 3) * RADIANS_PER_DEGREE)) + 
    500000.0
  );
  
  let UTMNorthing = (
    K0 * 
    (6378137.0 * (
      (1 - 0.00669438 / 4) * latRad - 
      (3 * 0.00669438 / 8) * Math.sin(2 * latRad) + 
      (15 * 0.00669438 / 256) * Math.sin(4 * latRad)
    ))
  );
  
  if (lat < 0) UTMNorthing += 10000000.0;
  
  return `Z${zoneNumber}${lat >= 0 ? 'N' : 'S'} E:${Math.round(UTMEasting)} N:${Math.round(UTMNorthing)}`;
}

/**
 * Mendapatkan lokasi GPS dengan permission handling
 * @param {Function} onSuccess - Callback ketika sukses
 * @param {Function} onError - Callback ketika error
 */
export function getCurrentLocation(onSuccess, onError) {
  const options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const utm = toUTM(position.coords.latitude, position.coords.longitude);
      const accuracy = Math.round(position.coords.accuracy);
      onSuccess(`${utm} ±${accuracy}m`);
    },
    (error) => {
      let message = error.message;
      
      if (error.code === 1) {
        message = "Izin Lokasi Ditolak.";
      } else if (error.code === 2) {
        message = "Sinyal GPS Lemah.";
      } else if (error.code === 3) {
        message = "Timeout.";
      }
      
      onError(`Gagal GPS: ${message}`);
    },
    options
  );
}


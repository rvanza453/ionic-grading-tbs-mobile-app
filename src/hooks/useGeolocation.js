/**
 * useGeolocation Hook
 * Custom hook untuk menangani geolocation dengan Capacitor
 */

import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { getCurrentLocation } from '../utils';

export function useGeolocation() {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const requestLocation = async (index, onSuccess) => {
    setLoadingIndex(index);
    
    try {
      // Check dan request permissions
      const permissionStatus = await Geolocation.checkPermissions();
      
      if (permissionStatus.location !== 'granted') {
        const request = await Geolocation.requestPermissions();
        
        if (request.location !== 'granted') {
          throw new Error("Izin lokasi ditolak.");
        }
      }
    } catch (e) {
      console.warn("Check permissions error:", e);
    }

    // Get current location
    getCurrentLocation(
      (coordinateString) => {
        onSuccess(coordinateString);
        setLoadingIndex(null);
      },
      (errorMessage) => {
        alert(errorMessage);
        setLoadingIndex(null);
      }
    );
  };

  return {
    loadingIndex,
    requestLocation
  };
}


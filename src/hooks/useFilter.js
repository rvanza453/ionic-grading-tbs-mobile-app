/**
 * useFilter Hook
 * Custom hook untuk filtering data di summary view
 */

import { useState, useMemo } from 'react';

export function useFilter(activeDataset) {
  const [filterPemanen, setFilterPemanen] = useState('');
  const [filterBlok, setFilterBlok] = useState('');
  const [filterAfdeling, setFilterAfdeling] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('');
  const [filterBulan, setFilterBulan] = useState('');

  const filteredItems = useMemo(() => {
    return activeDataset.filter(item => {
      if (filterPemanen && item.namaPemanen !== filterPemanen) return false;
      
      const itemBlok = item.blok;
      if (filterBlok && itemBlok !== filterBlok) return false;
      
      const itemAfdeling = item._afdeling;
      if (filterAfdeling && itemAfdeling !== filterAfdeling) return false;
      
      const itemDate = item._tanggal;
      if (filterTanggal && itemDate !== filterTanggal) return false;
      if (filterBulan && !itemDate.startsWith(filterBulan)) return false;
      
      return true;
    });
  }, [activeDataset, filterPemanen, filterBlok, filterAfdeling, filterTanggal, filterBulan]);

  const uniquePemanen = useMemo(() => 
    [...new Set(activeDataset.map(i => i.namaPemanen).filter(n => n))],
    [activeDataset]
  );

  const uniqueBlok = useMemo(() => 
    [...new Set(activeDataset.map(i => i.blok).filter(n => n))],
    [activeDataset]
  );

  const uniqueAfdeling = useMemo(() => 
    [...new Set(activeDataset.map(i => i._afdeling).filter(n => n))],
    [activeDataset]
  );

  const clearFilters = () => {
    setFilterPemanen('');
    setFilterBlok('');
    setFilterAfdeling('');
    setFilterTanggal('');
    setFilterBulan('');
  };

  return {
    filterPemanen,
    setFilterPemanen,
    filterBlok,
    setFilterBlok,
    filterAfdeling,
    setFilterAfdeling,
    filterTanggal,
    setFilterTanggal,
    filterBulan,
    setFilterBulan,
    filteredItems,
    uniquePemanen,
    uniqueBlok,
    uniqueAfdeling,
    clearFilters
  };
}


/**
 * SummaryTable Component
 * Tabel ringkasan data grading
 */

import { calculateTotalJanjang, calculateTotalKg, calculateSummaryTotals } from '../../utils';

export function SummaryTable({ filteredItems, headerData }) {
  const summaryTotals = calculateSummaryTotals(filteredItems);
  
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-xs text-center whitespace-nowrap">
        <thead className="bg-gray-100 font-bold text-gray-700 border-b">
          <tr>
            <th className="p-2 text-left">Pemanen</th>
            <th className="p-2">NIK</th>
            <th className="p-2">Afd</th>
            <th className="p-2">Blok</th>
            <th className="p-2">Ancak</th>
            <th className="p-2">Tgl</th>
            <th className="p-2">Jam</th>
            <th className="p-2">Koordinat</th>
            <th className="p-2">TPH</th>
            <th className="p-2 bg-green-50">Mtg</th>
            <th className="p-2 bg-lime-50">Mgk</th>
            <th className="p-2">Mth</th>
            <th className="p-2">LM</th>
            <th className="p-2">Abn</th>
            <th className="p-2">Hm</th>
            <th className="p-2 bg-orange-50">TP</th>
            <th className="p-2 bg-orange-50">JK</th>
            <th className="p-2 bg-yellow-50">Kg Brd</th>
            <th className="p-2 font-black">Total Jjg</th>
            <th className="p-2 bg-blue-50">BJR</th>
            <th className="p-2 bg-blue-50">Total Kg</th>
            <th className="p-2 text-gray-500">Terakhir Dirubah</th>
          </tr>
        </thead>
        
        <tbody className="divide-y">
          {filteredItems.map((item, i) => (
            <tr key={i}>
              <td className="p-2 text-left">{item.namaPemanen}</td>
              <td className="p-2">{item.nikPemanen}</td>
              <td className="p-2">{item._afdeling || headerData.afdeling}</td>
              <td className="p-2">{item.blok}</td>
              <td className="p-2">{item.noAncak}</td>
              <td className="p-2">{item._tanggal || headerData.tanggalPemeriksaan}</td>
              <td className="p-2">{item.jam}</td>
              <td className="p-2 text-[8px] text-gray-500 font-mono max-w-[100px] whitespace-normal">
                {item.koordinat}
              </td>
              <td className="p-2 font-bold bg-gray-50">{item.noTPH}</td>
              <td className="p-2 bg-green-50 font-bold">{item.matang || 0}</td>
              <td className="p-2 bg-lime-50">{item.mengkal || 0}</td>
              <td className="p-2">{item.mentah || 0}</td>
              <td className="p-2">{item.lewatMatang || 0}</td>
              <td className="p-2">{item.abnormal || 0}</td>
              <td className="p-2">{item.seranganHama || 0}</td>
              <td className="p-2 bg-orange-50">{item.tangkaiPanjang || 0}</td>
              <td className="p-2 bg-orange-50">{item.janjangKosong || 0}</td>
              <td className="p-2 bg-yellow-50">{item.kgBerondolan || 0}</td>
              <td className="p-2 font-black">{calculateTotalJanjang(item)}</td>
              <td className="p-2 bg-blue-50">{item.bjr || '-'}</td>
              <td className="p-2 bg-blue-50 font-bold">
                {item.bjr && calculateTotalJanjang(item) > 0 
                  ? calculateTotalKg(item).toFixed(2) 
                  : '-'}
              </td>
              <td className="p-2 text-[9px] text-gray-400 italic">
                {item.lastModified || '-'}
              </td>
            </tr>
          ))}
        </tbody>
        
        <tfoot className="bg-gray-800 text-white font-bold">
          <tr>
            <td colSpan={9} className="p-2 text-right">TOTAL</td>
            <td className="p-2">{summaryTotals.matang}</td>
            <td className="p-2">{summaryTotals.mengkal}</td>
            <td className="p-2">{summaryTotals.mentah}</td>
            <td className="p-2">{summaryTotals.lewat}</td>
            <td className="p-2">{summaryTotals.abn}</td>
            <td className="p-2">{summaryTotals.hama}</td>
            <td className="p-2">{summaryTotals.tp}</td>
            <td className="p-2">{summaryTotals.jk}</td>
            <td className="p-2">{summaryTotals.kg}</td>
            <td className="p-2 text-lg">{summaryTotals.total}</td>
            <td className="p-2">-</td>
            <td className="p-2 text-lg">{summaryTotals.totalKg.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}


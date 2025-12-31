/**
 * TPHCard Component
 * Card untuk input data TPH individual
 */

import { Icons } from '../../constants/icons';
import { MobileInput, BoxInput, BoxPhoto, BoxButton } from '../common';
import { GradeInput } from '../grading/GradeInput';
import { calculateTotalJanjang, calculateTotalKg, isDuplicateTPH } from '../../utils';

export function TPHCard({ 
  item, 
  index, 
  items,
  onUpdate, 
  onPhotoUpdate, 
  onLocationRequest,
  loadingLocation,
  onRemove 
}) {
  const isDuplicate = isDuplicateTPH(items, index, item.noTPH);
  const totalJanjang = calculateTotalJanjang(item);
  const totalKg = calculateTotalKg(item);

  return (
    <div 
      className={`bg-white rounded-xl shadow-md border overflow-hidden animate-[slideIn_0.3s] ${
        isDuplicate 
          ? 'border-red-500 ring-2 ring-red-200' 
          : 'border-gray-200'
      }`}
    >
      <div className="bg-gray-50 p-3 border-b border-gray-100 flex flex-col gap-3">
        {isDuplicate && (
          <div className="text-[10px] text-red-600 font-bold text-center animate-pulse bg-red-50 p-1 rounded">
            NOMOR TPH DUPLIKAT!
          </div>
        )}
        
        {/* Pemanen & NIK */}
        <div className="flex gap-2">
          <div className="flex-1">
            <MobileInput 
              label="Pemanen" 
              placeholder="Nama..." 
              value={item.namaPemanen} 
              onChange={e => onUpdate(index, 'namaPemanen', e.target.value)} 
            />
          </div>
          <div className="w-1/3">
            <MobileInput 
              label="NIK" 
              placeholder="123.." 
              value={item.nikPemanen} 
              onChange={e => onUpdate(index, 'nikPemanen', e.target.value)} 
            />
          </div>
        </div>
        
        {/* Blok, Ancak & BJR */}
        <div className="flex gap-2">
          <div className="flex-1">
            <MobileInput 
              label="Blok" 
              placeholder="D20" 
              value={item.blok} 
              onChange={e => onUpdate(index, 'blok', e.target.value.toUpperCase())} 
            />
          </div>
          <div className="flex-1">
            <MobileInput 
              label="Ancak" 
              placeholder="#" 
              value={item.noAncak} 
              onChange={e => onUpdate(index, 'noAncak', e.target.value)} 
            />
          </div>
          <div className="flex-1">
            <MobileInput 
              label="BJR (Kg)" 
              type="number" 
              placeholder="5" 
              value={item.bjr} 
              onChange={e => onUpdate(index, 'bjr', e.target.value)} 
            />
          </div>
        </div>
        
        {/* TPH, Foto, GPS, Hapus */}
        <div className="grid grid-cols-4 gap-2 h-[50px]">
          <BoxInput 
            label="No. TPH" 
            value={item.noTPH} 
            onChange={e => onUpdate(index, 'noTPH', e.target.value)} 
            isDuplicate={isDuplicate} 
            placeholder="#" 
          />
          
          <BoxPhoto 
            label="Foto" 
            photo={item.mainFoto} 
            onPhotoChange={e => onPhotoUpdate(index, 'mainFoto', e.target.files[0])} 
          />
          
          <BoxButton 
            label="GPS" 
            onClick={() => onLocationRequest(index)}
            className={
              item.koordinat 
                ? 'bg-blue-50 border-blue-300 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-500'
            }
          >
            {loadingLocation === index ? (
              <span className="text-[10px] animate-pulse">...</span>
            ) : item.koordinat ? (
              <div className="flex flex-col items-center justify-center w-full h-full leading-none overflow-hidden">
                <div className="text-[8px] font-bold">
                  {item.koordinat.split(' ')[1]}
                </div>
                <div className="text-[8px] font-bold">
                  {item.koordinat.split(' ')[2]}
                </div>
                <div className="text-[6px] text-gray-500 mt-0.5">
                  {item.koordinat.split(' ')[3]}
                </div>
              </div>
            ) : (
              <Icons.MapPin className="w-5 h-5"/>
            )}
          </BoxButton>
          
          <button 
            onClick={() => onRemove(index)} 
            className="w-full h-full flex flex-col items-center justify-center text-red-400 bg-red-50 rounded-lg border border-red-100 active:scale-90 transition"
          >
            <Icons.Trash className="w-5 h-5"/>
            <span className="text-[10px] font-bold mt-0.5">HAPUS</span>
          </button>
        </div>
      </div>
      
      {/* Grading Section */}
      <div className="p-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block tracking-wider">
          Input Kriteria Buah
        </label>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <GradeInput 
            label="MATANG" 
            value={item.matang} 
            onChange={v => onUpdate(index, 'matang', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_matang', e.target.files[0])} 
            photo={item.foto_matang} 
          />
          <GradeInput 
            label="MENGKAL" 
            value={item.mengkal} 
            onChange={v => onUpdate(index, 'mengkal', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_mengkal', e.target.files[0])} 
            photo={item.foto_mengkal} 
          />
          <GradeInput 
            label="MENTAH" 
            value={item.mentah} 
            onChange={v => onUpdate(index, 'mentah', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_mentah', e.target.files[0])} 
            photo={item.foto_mentah} 
          />
          <GradeInput 
            label="L. MATANG" 
            value={item.lewatMatang} 
            onChange={v => onUpdate(index, 'lewatMatang', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_lewatMatang', e.target.files[0])} 
            photo={item.foto_lewatMatang} 
          />
          <GradeInput 
            label="ABNORMAL" 
            value={item.abnormal} 
            onChange={v => onUpdate(index, 'abnormal', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_abnormal', e.target.files[0])} 
            photo={item.foto_abnormal} 
          />
          <GradeInput 
            label="HAMA" 
            value={item.seranganHama} 
            onChange={v => onUpdate(index, 'seranganHama', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_seranganHama', e.target.files[0])} 
            photo={item.foto_seranganHama} 
          />
        </div>
        
        <div className="border-t border-dashed my-3"></div>
        
        <label className="text-[10px] font-bold text-orange-400 uppercase mb-2 block tracking-wider">
          Kondisi Lain
        </label>
        
        <div className="grid grid-cols-3 gap-2">
          <GradeInput 
            label="T. PANJANG" 
            value={item.tangkaiPanjang} 
            onChange={v => onUpdate(index, 'tangkaiPanjang', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_tangkaiPanjang', e.target.files[0])} 
            photo={item.foto_tangkaiPanjang} 
          />
          <GradeInput 
            label="J. KOSONG" 
            value={item.janjangKosong} 
            onChange={v => onUpdate(index, 'janjangKosong', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_janjangKosong', e.target.files[0])} 
            photo={item.foto_janjangKosong} 
          />
          <GradeInput 
            label="KG BRD" 
            value={item.kgBerondolan} 
            onChange={v => onUpdate(index, 'kgBerondolan', v)} 
            onPhoto={e => onPhotoUpdate(index, 'foto_kgBerondolan', e.target.files[0])} 
            photo={item.foto_kgBerondolan} 
          />
        </div>
        
        {/* Footer Info */}
        <div className="mt-3 bg-gray-50 p-2 rounded space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Jam Input: {item.jam}</span>
            <div className="text-xs font-bold text-gray-700">
              Total Janjang: <span className="text-lg text-green-600">{totalJanjang}</span>
            </div>
          </div>
          {item.bjr && totalJanjang > 0 && (
            <div className="flex justify-between items-center border-t pt-1">
              <span className="text-xs text-gray-500">BJR: {item.bjr} Kg</span>
              <div className="text-xs font-bold text-blue-700">
                Total: <span className="text-lg">{totalKg.toFixed(2)} Kg</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/**
 * GradeInput Component
 * Input untuk grading buah dengan foto
 */

import { Icons } from '../../constants/icons';

export function GradeInput({ 
  label, 
  value, 
  onChange, 
  onPhoto, 
  photo 
}) {
  return (
    <div 
      className={`relative p-1.5 rounded-xl border shadow-sm flex flex-col items-center justify-between h-28 overflow-hidden transition-all ${
        photo 
          ? 'border-green-500 bg-green-50' 
          : 'bg-white border-gray-200'
      }`}
    >
      {photo && (
        <img 
          src={photo} 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
          alt={label}
        />
      )}
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center">
        <span className="text-[9px] font-bold text-gray-700 uppercase bg-white/80 px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
          {label}
        </span>
        
        <input 
          type="number" 
          inputMode="numeric"
          value={value} 
          onChange={(e) => { 
            if (e.target.value.length <= 4) {
              onChange(e.target.value);
            }
          }}
          className="w-16 h-10 text-center text-2xl font-black text-gray-900 bg-white/60 rounded-lg border-b-2 border-green-600 focus:bg-white focus:ring-2 focus:ring-green-400 outline-none shadow-sm backdrop-blur-sm p-0"
          placeholder="0"
        />
        
        <label 
          className={`p-1.5 rounded-full cursor-pointer shadow-sm border transition-transform active:scale-90 ${
            photo 
              ? 'bg-blue-600 border-blue-700 text-white' 
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            onChange={onPhoto} 
          />
          {photo ? (
            <Icons.Image className="w-4 h-4" />
          ) : (
            <Icons.Camera className="w-4 h-4" />
          )}
        </label>
      </div>
    </div>
  );
}


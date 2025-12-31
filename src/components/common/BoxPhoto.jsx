/**
 * BoxPhoto Component
 * Photo input dalam bentuk kotak
 */

import { Icons } from '../../constants/icons';

export function BoxPhoto({ 
  label, 
  photo, 
  onPhotoChange 
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 text-center">
        {label}
      </label>
      <label 
        className={`w-full flex-1 rounded-lg border cursor-pointer relative overflow-hidden flex items-center justify-center transition active:scale-95 ${
          photo ? 'border-green-500' : 'bg-white border-gray-300'
        }`}
      >
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          onChange={onPhotoChange} 
        />
        {photo ? (
          <img 
            src={photo} 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Preview"
          />
        ) : (
          <Icons.Camera className="w-5 h-5 text-gray-400"/>
        )}
      </label>
    </div>
  );
}


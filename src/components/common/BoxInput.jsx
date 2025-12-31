/**
 * BoxInput Component
 * Input kotak untuk TPH number dan data ringkas
 */

export function BoxInput({ 
  label, 
  value, 
  onChange, 
  isDuplicate, 
  placeholder 
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 text-center">
        {label}
      </label>
      <input 
        type="number" 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className={`w-full flex-1 border rounded-lg text-center text-lg font-bold outline-none focus:ring-2 ${
          isDuplicate
            ? 'bg-red-50 border-red-500 text-red-900 focus:ring-red-500'
            : 'bg-white border-gray-300 focus:border-green-500'
        }`} 
      />
    </div>
  );
}


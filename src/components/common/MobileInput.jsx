/**
 * MobileInput Component
 * Input field yang dioptimasi untuk mobile
 */

export function MobileInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  className = "" 
}) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label className="text-[10px] font-bold text-gray-500 uppercase mb-1">
        {label}
      </label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
      />
    </div>
  );
}


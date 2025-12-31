/**
 * BoxButton Component
 * Button dalam bentuk kotak untuk actions
 */

export function BoxButton({ 
  label, 
  onClick, 
  children, 
  className 
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 text-center">
        {label}
      </label>
      <button 
        onClick={onClick} 
        className={`w-full flex-1 rounded-lg border flex flex-col items-center justify-center transition active:scale-95 overflow-hidden ${className}`}
      >
        {children}
      </button>
    </div>
  );
}


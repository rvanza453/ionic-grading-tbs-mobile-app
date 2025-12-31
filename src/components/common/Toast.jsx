/**
 * Toast Component
 * Notification toast untuk feedback
 */

export function Toast({ message }) {
  if (!message) return null;
  
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold z-50 animate-[fadeIn_0.3s]">
      {message}
    </div>
  );
}


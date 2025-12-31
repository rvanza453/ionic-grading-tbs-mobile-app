/**
 * PhotoGallery Component
 * Gallery dokumentasi foto dari semua TPH
 */

export function PhotoGallery({ filteredItems }) {
  const photos = filteredItems.flatMap(item => {
    const imgs = [];
    const label = `${item.namaPemanen}, TPH ${item.noTPH}`;
    
    const addPhoto = (src, category) => {
      if (src) {
        imgs.push({ src, label: `${label}, ${category}` });
      }
    };
    
    addPhoto(item.mainFoto, 'Buah TPH');
    addPhoto(item.foto_matang, 'Matang');
    addPhoto(item.foto_mengkal, 'Mengkal');
    addPhoto(item.foto_mentah, 'Mentah');
    addPhoto(item.foto_lewatMatang, 'Lewat');
    addPhoto(item.foto_abnormal, 'Abn');
    addPhoto(item.foto_seranganHama, 'Hama');
    addPhoto(item.foto_tangkaiPanjang, 'TP');
    addPhoto(item.foto_janjangKosong, 'JK');
    
    return imgs;
  });
  
  if (photos.length === 0) return null;
  
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-gray-700 border-b pb-1 mb-2">
        Lampiran Dokumentasi
      </h3>
      
      <div className="grid grid-cols-3 gap-2 gallery-grid">
        {photos.map((photo, idx) => (
          <div 
            key={idx} 
            className="bg-white p-1 rounded border gallery-item break-inside-avoid"
          >
            <div className="aspect-video w-full bg-gray-100 mb-1">
              <img 
                src={photo.src} 
                className="w-full h-full object-cover"
                alt={photo.label}
              />
            </div>
            <p className="text-[8px] text-center font-bold">
              {photo.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


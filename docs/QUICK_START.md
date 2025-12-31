# 🚀 Quick Start Guide

## Untuk Tim IT - Mulai Development

### 1️⃣ Setup Awal

```bash
# Pastikan Node.js v16+ terinstall
node --version

# Install dependencies
npm install

# Test di browser
npm run dev
# Buka http://localhost:5173
```

### 2️⃣ Struktur Project (Ringkas)

```
src/
├── components/     # UI Components (15+ files)
├── views/          # Page Views
├── hooks/          # Custom Hooks (4 files)
├── utils/          # Utility Functions (5 files)
├── services/       # Storage Service
├── constants/      # Icons & Config
└── App.jsx         # Main Component (150 lines - CLEAN!)
```

### 3️⃣ Cara Kerja Aplikasi

#### Flow Data:
```
User Input → Component → Hook → Utils/Services → State Update → Re-render
```

#### Contoh: Tambah TPH Baru
```javascript
// 1. User click button di AppHeader
<AppHeader onAddItem={addItem} />

// 2. Function addItem dari hook useGradingData
const { addItem } = useGradingData();

// 3. Hook update state items
setItems([...items, newItem]);

// 4. Auto-save triggered (debounced 1s)
useEffect(() => {
  saveData(headerData, items);
}, [headerData, items]);
```

### 4️⃣ File Penting yang Harus Diketahui

| File | Deskripsi | Baris |
|------|-----------|-------|
| `src/App.jsx` | Entry point utama | 150 |
| `src/hooks/useGradingData.js` | Data management | 100 |
| `src/services/storage.js` | Storage operations | 100 |
| `src/utils/export.js` | Export functionality | 150 |
| `src/components/sections/TPHCard.jsx` | Card input TPH | 180 |

### 5️⃣ Menambah Fitur Baru

#### Tambah Component:
```javascript
// 1. Buat file
src/components/common/NewComponent.jsx

// 2. Export di index
// src/components/common/index.js
export * from './NewComponent';

// 3. Import & gunakan
import { NewComponent } from './components/common';
```

#### Tambah Utility Function:
```javascript
// 1. Buat function
// src/utils/newUtil.js
export function newFunction(param) {
  return result;
}

// 2. Export di index
// src/utils/index.js
export * from './newUtil';

// 3. Import & gunakan
import { newFunction } from './utils';
```

#### Tambah Custom Hook:
```javascript
// 1. Buat hook
// src/hooks/useNewFeature.js
export function useNewFeature() {
  const [state, setState] = useState();
  // logic here
  return { state, actions };
}

// 2. Export di index
// src/hooks/index.js
export * from './useNewFeature';

// 3. Gunakan di component
import { useNewFeature } from './hooks';
const { state, actions } = useNewFeature();
```

### 6️⃣ Testing

#### Test di Browser:
```bash
npm run dev
# Test semua fitur di browser
```

#### Test di Android:
```bash
# Build & sync
npm run build
npx cap sync

# Buka Android Studio
npx cap open android

# Atau langsung run
npm run capacitor:run:android
```

### 7️⃣ Common Tasks

#### Update UI Component:
```bash
# Edit component di src/components/
# Save → Auto reload di browser (npm run dev)
```

#### Update Logic:
```bash
# Edit hook atau util
# Save → Test di browser
```

#### Fix Bug:
```bash
# 1. Identifikasi di file mana
# 2. Edit file tersebut
# 3. Test di browser
# 4. Build & test di Android
```

### 8️⃣ Build untuk Production

```bash
# 1. Build web app
npm run build

# 2. Sync ke Android
npx cap sync

# 3. Buka Android Studio
npx cap open android

# 4. Build APK
# Di Android Studio: Build > Generate Signed Bundle / APK
```

### 9️⃣ Troubleshooting

#### Error: Module not found
```bash
# Solution: Check import path
# Pastikan path relatif benar
# Contoh: '../utils' bukan './utils'
```

#### Error: Hook error
```bash
# Solution: Pastikan hook dipanggil di top level
# Jangan panggil hook di dalam if/loop
```

#### Android app tidak update
```bash
# Solution: Full rebuild
npm run build
npx cap sync
npx cap copy
```

### 🔟 Resources

- **Struktur Detail**: `docs/PROJECT_STRUCTURE.md`
- **Development Guide**: `docs/DEVELOPMENT_GUIDE.md`
- **Folder Tree**: `docs/FOLDER_TREE.md`
- **Refactoring Summary**: `docs/REFACTORING_SUMMARY.md`

---

## 💡 Tips Cepat

1. **Cari Component**: `src/components/`
2. **Cari Logic**: `src/hooks/` atau `src/utils/`
3. **Cari Storage**: `src/services/`
4. **Main Entry**: `src/App.jsx`
5. **Test di Browser**: `npm run dev`

## ✅ Checklist Handover

- [x] Code refactored & organized
- [x] No linting errors
- [x] Documentation complete
- [x] Structure professional
- [x] Ready for team

**🎉 Selamat coding!**


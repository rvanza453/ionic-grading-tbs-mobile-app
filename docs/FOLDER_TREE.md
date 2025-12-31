# 📂 Folder Tree - Struktur Project Lengkap

## Struktur Folder Baru (Setelah Refactoring)

```
grading_tbs_tph-mobile/
│
├── 📁 src/                           # Source Code
│   │
│   ├── 📁 components/                # UI Components
│   │   │
│   │   ├── 📁 common/                # Komponen Umum (Reusable)
│   │   │   ├── MobileInput.jsx       # Input field mobile-optimized
│   │   │   ├── BoxInput.jsx          # Input dalam bentuk kotak
│   │   │   ├── BoxButton.jsx         # Button dalam bentuk kotak
│   │   │   ├── BoxPhoto.jsx          # Photo input kotak
│   │   │   ├── Toast.jsx             # Notification toast
│   │   │   └── index.js              # Export semua common components
│   │   │
│   │   ├── 📁 grading/               # Komponen Grading
│   │   │   └── GradeInput.jsx        # Input grading buah dengan foto
│   │   │
│   │   ├── 📁 modals/                # Modal Components
│   │   │   ├── ExportModal.jsx       # Modal pilihan export
│   │   │   └── DataMenu.jsx          # Modal pengurusan data
│   │   │
│   │   └── 📁 sections/              # Section Components
│   │       ├── AppHeader.jsx         # Header utama aplikasi
│   │       ├── HeaderSection.jsx     # Section informasi dasar
│   │       ├── TPHCard.jsx           # Card input TPH individual
│   │       ├── FilterBar.jsx         # Bar filter untuk summary
│   │       ├── SummaryTable.jsx      # Tabel ringkasan data
│   │       ├── PhotoGallery.jsx      # Gallery dokumentasi foto
│   │       └── index.js              # Export semua sections
│   │
│   ├── 📁 views/                     # Page Views
│   │   ├── SummaryView.jsx           # View untuk summary & export
│   │   └── index.js                  # Export views
│   │
│   ├── 📁 hooks/                     # Custom React Hooks
│   │   ├── useGradingData.js         # Hook untuk data management
│   │   ├── useGeolocation.js         # Hook untuk GPS/location
│   │   ├── useExport.js              # Hook untuk export functionality
│   │   ├── useFilter.js              # Hook untuk filtering data
│   │   └── index.js                  # Export semua hooks
│   │
│   ├── 📁 utils/                     # Utility Functions (Pure)
│   │   ├── gps.js                    # GPS & coordinate utilities
│   │   ├── image.js                  # Image processing & compression
│   │   ├── device.js                 # Device ID & timestamp utilities
│   │   ├── calculations.js           # Calculation functions
│   │   ├── export.js                 # Export utilities (JSON, Excel, etc)
│   │   └── index.js                  # Export semua utils
│   │
│   ├── 📁 services/                  # Services Layer
│   │   └── storage.js                # Storage service (Filesystem & LocalStorage)
│   │
│   ├── 📁 constants/                 # Constants & Configuration
│   │   └── icons.jsx                 # SVG Icon components (20+ icons)
│   │
│   ├── 📄 App.jsx                    # Main App Component (150 lines - Clean!)
│   ├── 📄 main.jsx                   # Entry Point
│   ├── 📄 index.css                  # Global Styles
│   └── 📁 assets/                    # Static Assets
│       └── react.svg
│
├── 📁 docs/                          # Dokumentasi
│   ├── PROJECT_STRUCTURE.md          # Penjelasan struktur project
│   ├── DEVELOPMENT_GUIDE.md          # Panduan development
│   ├── REFACTORING_SUMMARY.md        # Ringkasan refactoring
│   └── FOLDER_TREE.md                # File ini
│
├── 📁 android/                       # Android Native Project
│   ├── app/
│   ├── build.gradle
│   └── ... (Android files)
│
├── 📁 public/                        # Static Public Assets
│   └── vite.svg
│
├── 📁 dist/                          # Build Output (generated)
│
├── 📄 .gitignore                     # Git ignore rules (BARU!)
├── 📄 README.md                      # Project README (UPDATED!)
├── 📄 package.json                   # Dependencies & scripts
├── 📄 vite.config.js                 # Vite configuration
├── 📄 tailwind.config.js             # Tailwind configuration
├── 📄 postcss.config.js              # PostCSS configuration
├── 📄 eslint.config.js               # ESLint configuration
└── 📄 capacitor.config.json          # Capacitor configuration
```

## 📊 Statistics

### File Count by Type

| Type | Count | Purpose |
|------|-------|---------|
| Components | 15 | UI presentation |
| Views | 1 | Full page views |
| Hooks | 4 | Complex logic & state |
| Utils | 5 | Pure functions |
| Services | 1 | External interactions |
| Constants | 1 | Icons & config |
| **Total** | **27** | **Organized code** |

### Lines of Code Distribution

| Category | Files | Avg Lines/File | Total Lines |
|----------|-------|----------------|-------------|
| Components | 15 | ~50 | ~750 |
| Views | 1 | ~150 | ~150 |
| Hooks | 4 | ~100 | ~400 |
| Utils | 5 | ~80 | ~400 |
| Services | 1 | ~100 | ~100 |
| Constants | 1 | ~120 | ~120 |
| Main (App.jsx) | 1 | ~150 | ~150 |
| **Total** | **27** | - | **~2070** |

## 🎯 Dependency Graph

```
App.jsx
├─→ Hooks (useGradingData, useGeolocation, useExport)
│   ├─→ Utils (calculations, gps, export, device, image)
│   └─→ Services (storage)
│
├─→ Components
│   ├─→ Sections (AppHeader, HeaderSection, TPHCard)
│   ├─→ Common (MobileInput, BoxInput, etc)
│   ├─→ Grading (GradeInput)
│   └─→ Modals (ExportModal, DataMenu)
│
├─→ Views (SummaryView)
│   ├─→ Hooks (useFilter, useExport)
│   ├─→ Components (FilterBar, SummaryTable, PhotoGallery)
│   └─→ Utils
│
└─→ Constants (Icons)
```

## 📋 Import Examples

### Contoh Import di Component

```javascript
// App.jsx
import { AppHeader, HeaderSection, TPHCard } from './components/sections';
import { Toast } from './components/common';
import { ExportModal, DataMenu } from './components/modals';
import { SummaryView } from './views';
import { useGradingData, useGeolocation, useExport } from './hooks';
```

### Contoh Import di Hook

```javascript
// hooks/useGradingData.js
import { loadData, saveData } from '../services/storage';
import { getTimestamp, getCurrentTime } from '../utils';
```

### Contoh Import di Component

```javascript
// components/sections/TPHCard.jsx
import { Icons } from '../../constants/icons';
import { MobileInput, BoxInput } from '../common';
import { GradeInput } from '../grading/GradeInput';
import { calculateTotalJanjang } from '../../utils';
```

## 🔍 Navigasi Cepat

### Mencari Component
```
src/components/
├── common/       → Input, Button, Toast
├── grading/      → Grading-specific UI
├── modals/       → Modal dialogs
└── sections/     → Page sections
```

### Mencari Logic
```
src/hooks/        → Complex logic & state management
src/utils/        → Pure functions & calculations
src/services/     → External APIs & storage
```

### Mencari Data/Config
```
src/constants/    → Icons, config, constants
```

## 💡 Tips Navigasi

1. **Cari Component**: Lihat di `src/components/`
2. **Cari Logic**: Lihat di `src/hooks/` atau `src/utils/`
3. **Cari Storage/API**: Lihat di `src/services/`
4. **Cari Constants**: Lihat di `src/constants/`
5. **Main Entry Point**: `src/App.jsx`

## 🎨 Folder Color Legend

- 📁 **Blue Folder**: Directory
- 📄 **White Document**: File
- 🎯 **Target**: Entry Point
- ⚙️ **Gear**: Configuration
- 📚 **Books**: Documentation

---

**Clean, Organized, Professional! 🎉**


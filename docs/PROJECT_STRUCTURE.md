# Struktur Project - Grading TBS Mobile

## 📁 Struktur Folder

```
grading_tbs_tph-mobile/
├── src/
│   ├── components/          # UI Components
│   │   ├── common/          # Komponen umum yang reusable
│   │   │   ├── MobileInput.jsx
│   │   │   ├── BoxInput.jsx
│   │   │   ├── BoxButton.jsx
│   │   │   ├── BoxPhoto.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── index.js
│   │   ├── grading/         # Komponen spesifik grading
│   │   │   └── GradeInput.jsx
│   │   ├── modals/          # Modal components
│   │   │   ├── ExportModal.jsx
│   │   │   └── DataMenu.jsx
│   │   └── sections/        # Section components
│   │       ├── AppHeader.jsx
│   │       ├── HeaderSection.jsx
│   │       ├── TPHCard.jsx
│   │       ├── FilterBar.jsx
│   │       ├── SummaryTable.jsx
│   │       ├── PhotoGallery.jsx
│   │       └── index.js
│   ├── views/              # Page Views
│   │   └── SummaryView.jsx
│   ├── hooks/              # Custom React Hooks
│   │   ├── useGradingData.js
│   │   ├── useGeolocation.js
│   │   ├── useExport.js
│   │   ├── useFilter.js
│   │   └── index.js
│   ├── utils/              # Utility Functions
│   │   ├── gps.js
│   │   ├── image.js
│   │   ├── device.js
│   │   ├── calculations.js
│   │   ├── export.js
│   │   └── index.js
│   ├── services/           # Services Layer
│   │   └── storage.js
│   ├── constants/          # Constants & Config
│   │   └── icons.jsx
│   ├── App.jsx            # Main App Component
│   ├── main.jsx           # Entry Point
│   ├── index.css          # Global Styles
│   └── App.css
├── android/               # Android Native Project
├── public/                # Static Assets
├── docs/                  # Documentation
├── capacitor.config.json  # Capacitor Config
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 📦 Deskripsi Folder

### `/src/components/`
Berisi semua komponen UI yang digunakan di aplikasi.

#### `/components/common/`
Komponen-komponen umum yang bisa digunakan di berbagai tempat:
- **MobileInput**: Input field yang dioptimasi untuk mobile
- **BoxInput**: Input dalam bentuk kotak untuk TPH number
- **BoxButton**: Button dalam bentuk kotak
- **BoxPhoto**: Photo input dalam bentuk kotak
- **Toast**: Notification toast

#### `/components/grading/`
Komponen spesifik untuk grading:
- **GradeInput**: Input untuk grading buah dengan foto

#### `/components/modals/`
Modal components:
- **ExportModal**: Modal untuk memilih metode export
- **DataMenu**: Modal untuk pengurusan data (backup/restore)

#### `/components/sections/`
Section components untuk organizing layout:
- **AppHeader**: Header utama aplikasi
- **HeaderSection**: Section informasi dasar
- **TPHCard**: Card untuk input data TPH individual
- **FilterBar**: Bar untuk filtering data
- **SummaryTable**: Tabel ringkasan data
- **PhotoGallery**: Gallery dokumentasi foto

### `/src/views/`
Full page views:
- **SummaryView**: View untuk menampilkan ringkasan dan export

### `/src/hooks/`
Custom React Hooks untuk logic yang kompleks:
- **useGradingData**: Hook untuk data management
- **useGeolocation**: Hook untuk GPS/location
- **useExport**: Hook untuk export functionality
- **useFilter**: Hook untuk filtering data

### `/src/utils/`
Utility functions yang pure (no side effects):
- **gps.js**: GPS & coordinate conversion utilities
- **image.js**: Image processing & compression
- **device.js**: Device ID & timestamp utilities
- **calculations.js**: Calculation functions untuk grading
- **export.js**: Export utilities (JSON, Excel, PDF, PNG)

### `/src/services/`
Services layer untuk external interactions:
- **storage.js**: Filesystem & LocalStorage service

### `/src/constants/`
Constants & configuration:
- **icons.jsx**: SVG Icon components

## 🎯 Design Principles

### 1. **Separation of Concerns**
Setiap file memiliki tanggung jawab yang jelas:
- Components hanya untuk UI
- Hooks untuk logic & state
- Utils untuk pure functions
- Services untuk external interactions

### 2. **Reusability**
Komponen dibuat reusable dan configurable melalui props.

### 3. **Single Responsibility**
Setiap komponen/function memiliki satu tanggung jawab utama.

### 4. **DRY (Don't Repeat Yourself)**
Logic yang berulang di-extract ke utils atau hooks.

### 5. **Easy to Test**
Pure functions di utils mudah untuk di-test.

## 🔄 Data Flow

```
App.jsx (Main State)
    ↓
  Hooks (Logic & Side Effects)
    ↓
Components (UI & Presentation)
    ↓
  Utils (Pure Functions)
    ↓
Services (External Interactions)
```

## 📝 Naming Conventions

### Files
- **Components**: PascalCase (e.g., `MobileInput.jsx`)
- **Hooks**: camelCase dengan prefix `use` (e.g., `useGradingData.js`)
- **Utils**: camelCase (e.g., `calculations.js`)
- **Constants**: camelCase (e.g., `icons.jsx`)

### Variables & Functions
- **camelCase**: untuk variables & functions
- **PascalCase**: untuk Components
- **UPPER_SNAKE_CASE**: untuk constants

## 🚀 Adding New Features

### 1. Tambah Component Baru
```javascript
// src/components/common/NewComponent.jsx
export function NewComponent({ prop1, prop2 }) {
  return <div>...</div>;
}

// Jangan lupa export di index.js
// src/components/common/index.js
export * from './NewComponent';
```

### 2. Tambah Utility Function
```javascript
// src/utils/newUtil.js
export function newUtilFunction(param) {
  // Pure function logic
  return result;
}

// Export di index.js
// src/utils/index.js
export * from './newUtil';
```

### 3. Tambah Custom Hook
```javascript
// src/hooks/useNewHook.js
export function useNewHook() {
  // Hook logic
  return { data, actions };
}

// Export di index.js
// src/hooks/index.js
export * from './useNewHook';
```

## 🔧 Maintenance Tips

1. **Keep Components Small**: Max 200-300 lines per component
2. **Extract Complex Logic**: Pindahkan ke hooks atau utils
3. **Document Complex Functions**: Tambahkan JSDoc comments
4. **Update Index Files**: Jangan lupa update `index.js` files
5. **Test Before Commit**: Pastikan aplikasi berjalan dengan baik

## 📚 Further Reading

- [React Hooks Documentation](https://react.dev/reference/react)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)
- [Capacitor Documentation](https://capacitorjs.com/docs)


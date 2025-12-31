# Development Guide - Grading TBS Mobile

## 🛠️ Setup Development Environment

### Prerequisites
- Node.js v16+ 
- npm atau yarn
- Android Studio (untuk Android development)
- Java JDK 21 LTS

### Installation
```bash
# Clone repository
git clone <repository-url>
cd grading_tbs_tph-mobile

# Install dependencies
npm install

# Setup Android (jika belum)
npx cap add android
npx cap sync
```

## 🚀 Development Workflow

### 1. Development Mode (Web)
```bash
# Run development server
npm run dev

# Aplikasi akan berjalan di http://localhost:5173
```

### 2. Build untuk Production
```bash
# Build aplikasi
npm run build

# Preview build
npm run preview
```

### 3. Development dengan Android
```bash
# Sync ke Android
npm run capacitor:sync

# Buka di Android Studio
npm run capacitor:open:android

# Atau langsung run
npm run capacitor:run:android
```

## 📝 Code Style Guide

### JavaScript/JSX

#### Import Order
```javascript
// 1. External libraries
import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

// 2. Internal components
import { MobileInput, BoxInput } from './components/common';
import { Icons } from './constants/icons';

// 3. Hooks & Utils
import { useGradingData } from './hooks';
import { calculateTotal } from './utils';

// 4. Styles (jika ada)
import './styles.css';
```

#### Component Structure
```javascript
/**
 * Component Description
 * Brief explanation of what this component does
 */

// Imports here

export function ComponentName({ prop1, prop2 }) {
  // 1. Hooks (useState, useEffect, custom hooks)
  const [state, setState] = useState(initialValue);
  const { data, actions } = useCustomHook();
  
  // 2. Derived state & computed values
  const computedValue = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  // 3. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 5. Render
  return (
    <div>
      {/* JSX here */}
    </div>
  );
}
```

#### Function Documentation
```javascript
/**
 * Calculate total janjang from all categories
 * @param {Object} item - Data item grading
 * @returns {number} Total janjang
 */
export function calculateTotalJanjang(item) {
  return (
    (parseInt(item.matang) || 0) +
    (parseInt(item.mengkal) || 0) +
    // ...
  );
}
```

### Naming Conventions

#### Components
```javascript
// ✅ Good
export function MobileInput({ ... }) { }
export function TPHCard({ ... }) { }

// ❌ Bad
export function mobileInput({ ... }) { }
export function tph_card({ ... }) { }
```

#### Hooks
```javascript
// ✅ Good
export function useGradingData() { }
export function useGeolocation() { }

// ❌ Bad
export function gradingData() { }
export function getLocation() { }
```

#### Event Handlers
```javascript
// ✅ Good
const handleClick = () => { };
const handleSubmit = () => { };
const handlePhotoChange = () => { };

// ❌ Bad
const click = () => { };
const submit = () => { };
const photoChange = () => { };
```

## 🧪 Testing

### Manual Testing Checklist

#### Basic Functions
- [ ] Input data header (Kerani, Tanggal, Afdeling)
- [ ] Add new TPH
- [ ] Input semua kriteria buah
- [ ] Upload foto untuk setiap kategori
- [ ] Get GPS coordinates
- [ ] Duplicate TPH detection
- [ ] Delete TPH item

#### Data Management
- [ ] Auto-save functionality
- [ ] Export to JSON
- [ ] Import from JSON
- [ ] Multiple file import
- [ ] Reset data

#### Export Functions
- [ ] Export to Excel
- [ ] Export to PDF
- [ ] Export to PNG
- [ ] Share functionality
- [ ] Save to Documents

#### Summary View
- [ ] Display all data correctly
- [ ] Filter by Pemanen
- [ ] Filter by Blok
- [ ] Filter by Afdeling
- [ ] Filter by Date
- [ ] Filter by Month
- [ ] Total calculations correct
- [ ] Photo gallery display

### Testing di Android

```bash
# Build & install di device/emulator
npm run capacitor:run:android

# Test checklist:
# - Camera capture
# - GPS/Location permission
# - File system write/read
# - Share functionality
# - Offline functionality
```

## 🐛 Debugging

### Web Development
```javascript
// Use console.log strategically
console.log('Debug:', variable);

// Use React DevTools
// Install: https://chrome.google.com/webstore/detail/react-developer-tools/

// Use browser DevTools
// F12 atau Ctrl+Shift+I
```

### Android Debugging
```bash
# View Android logs
adb logcat

# Filter by app
adb logcat | grep -i "chromium"

# Or use Android Studio Logcat
```

## 🔧 Common Issues & Solutions

### Issue: Build gagal setelah install dependencies baru
```bash
# Solution: Clear cache dan rebuild
rm -rf node_modules
rm package-lock.json
npm install
npm run build
npx cap sync
```

### Issue: Android app tidak reflect changes
```bash
# Solution: Full rebuild
npm run build
npx cap sync
npx cap copy
```

### Issue: GPS tidak berfungsi
```bash
# Check permissions di AndroidManifest.xml
# Ensure location permissions are granted
```

### Issue: Export tidak berfungsi di Android
```bash
# Check Filesystem permissions
# Test dengan file size yang lebih kecil
```

## 📦 Build & Deployment

### Production Build
```bash
# 1. Update version di package.json
# 2. Build web app
npm run build

# 3. Sync ke Android
npx cap sync

# 4. Buka Android Studio
npx cap open android

# 5. Generate APK/AAB
# Build > Generate Signed Bundle / APK
```

### Release Checklist
- [ ] Update version number
- [ ] Test all features
- [ ] Build production
- [ ] Test production build
- [ ] Generate signed APK/AAB
- [ ] Test signed build
- [ ] Create release notes
- [ ] Tag version in git

## 🤝 Contributing

### Branch Strategy
```bash
# Main branches
main          # Production-ready code
develop       # Development branch

# Feature branches
feature/nama-fitur    # New features
bugfix/nama-bug       # Bug fixes
hotfix/nama-hotfix    # Urgent fixes
```

### Commit Messages
```bash
# Format: type(scope): message

# Examples:
feat(grading): add photo compression
fix(export): resolve PDF generation issue
docs(readme): update installation steps
refactor(components): restructure folder
style(ui): improve mobile responsiveness
```

### Pull Request Process
1. Create feature branch dari `develop`
2. Implement changes
3. Test thoroughly
4. Create PR ke `develop`
5. Code review
6. Merge after approval

## 📚 Resources

- [React Documentation](https://react.dev)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 💡 Tips & Best Practices

1. **Keep it Simple**: Jangan over-engineer
2. **Document Complex Logic**: Tambahkan comments untuk logic yang kompleks
3. **Test Early, Test Often**: Test setiap perubahan
4. **Mobile First**: Selalu pikirkan UX mobile
5. **Performance Matters**: Optimize images dan data
6. **Error Handling**: Handle semua possible errors
7. **User Feedback**: Berikan feedback untuk setiap action
8. **Accessibility**: Pastikan app accessible untuk semua user


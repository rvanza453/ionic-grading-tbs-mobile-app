# Grading TBS TPH Mobile

Aplikasi mobile untuk Grading TBS (Tandan Buah Segar) menggunakan React + Vite + Capacitor dengan arsitektur yang bersih dan terstruktur.

## ✨ Fitur Utama

- 📱 Input data grading TPH dengan foto untuk setiap kategori
- 📍 GPS/Koordinat otomatis dengan format UTM
- 📊 Summary & Report dengan filter lengkap
- 📤 Export ke Excel, PDF, PNG, dan JSON
- 💾 Auto-save & Offline support
- 🔄 Import & Compile multiple JSON files
- 📸 Image compression otomatis
- 🎨 Modern & Responsive UI

## 🛠️ Teknologi yang Digunakan

- **React 19** - Framework UI
- **Vite** - Build tool dan dev server yang super cepat
- **Capacitor** - Native mobile runtime
- **Tailwind CSS** - Utility-first CSS framework
- **Android** - Platform native
- **jsPDF & html2canvas** - Export functionality

## Cara Menjalankan Aplikasi

### 1. Install Dependencies

Pastikan semua dependencies terinstall:

```bash
npm install
```

### 2. Menjalankan di Web Browser (Development)

Untuk development dan testing di browser:

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

### 3. Build untuk Production

Sebelum menjalankan di Android, build aplikasi terlebih dahulu:

```bash
npm run build
```

Ini akan membuat folder `dist` yang berisi file-file yang sudah di-build.

### 4. Menjalankan di Android

#### Opsi A: Menggunakan Capacitor CLI (Recommended)

**Langkah 1:** Sync web assets ke project Android:
```bash
npm run capacitor:sync
```

**Langkah 2:** Buka Android Studio:
```bash
npm run capacitor:open:android
```

**Langkah 3:** Di Android Studio, jalankan aplikasi dengan:
- Klik tombol "Run" (▶️) atau
- Tekan `Shift + F10`

#### Opsi B: Build dan Run Sekaligus

```bash
npm run capacitor:run:android
```

Perintah ini akan:
1. Build aplikasi web (`npm run build`)
2. Sync ke project Android (`npx cap sync`)
3. Menjalankan aplikasi di emulator/device yang terhubung

#### Opsi C: Menggunakan Gradle Langsung

```bash
# Build APK
npm run android:build

# Install dan jalankan di device/emulator
npm run android:run
```

### 5. Script yang Tersedia

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Menjalankan ESLint
- `npm run capacitor:sync` - Sync web assets ke native projects
- `npm run capacitor:copy` - Copy web assets ke native projects
- `npm run capacitor:update` - Update Capacitor dependencies
- `npm run capacitor:open:android` - Buka project Android di Android Studio
- `npm run capacitor:run:android` - Build, sync, dan run di Android
- `npm run android:build` - Build APK menggunakan Gradle
- `npm run android:run` - Install dan jalankan APK di device/emulator

## Persyaratan

- **Node.js** (v16 atau lebih baru)
- **npm** atau **yarn**
- **Android Studio** (untuk development Android)
- **Java JDK 21 LTS** - **WAJIB**: Gradle 8.10.2 memerlukan Java 21 (bukan Java 25)
- **Android SDK** (terinstall melalui Android Studio)

### ⚠️ PERHATIAN: Java 21 Diperlukan

Project ini sudah dikonfigurasi dengan lengkap. **Yang perlu dilakukan:**

**Install Java 21 LTS** dari: https://adoptium.net/temurin/releases/?version=21

Setelah install:
1. Set `JAVA_HOME` environment variable
2. Restart terminal
3. Jalankan: `npm run capacitor:run:android`

**Lihat `FINAL-SUMMARY.md` untuk panduan lengkap step-by-step.**

### ⚠️ Masalah Java Version

Jika Anda mendapatkan error tentang Java version:
- **Error**: "Unsupported class file major version 69"
- **Penyebab**: Java 25 terlalu baru untuk Gradle
- **Solusi**: Install Java 21 LTS atau gunakan script helper

**Solusi Cepat - Gunakan Script Helper:**
```powershell
# Jalankan script setup Java
.\setup-java.ps1
```

**Atau Install Java 21 Manual:**
1. Download dari [Eclipse Temurin](https://adoptium.net/temurin/releases/?version=21)
2. Install Java 21
3. Set sebagai JAVA_HOME di environment variables
4. Restart terminal

**Atau Gunakan Android Studio JDK:**
Jika Android Studio sudah terinstall, gunakan JDK yang sudah tersedia di:
`C:\Program Files\Android\Android Studio\jbr`

**Build Berhasil?** Project sudah dikonfigurasi untuk mendukung Java 25 dengan Gradle 8.13. Jika masih error, lihat `SETUP_JAVA.md` untuk troubleshooting lengkap.

## 📁 Struktur Project (Refactored)

```
src/
├── components/          # UI Components
│   ├── common/          # Reusable components
│   ├── grading/         # Grading specific components
│   ├── modals/          # Modal components
│   └── sections/        # Section components
├── views/              # Page views
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # Services layer (storage, etc)
├── constants/          # Constants & icons
├── App.jsx            # Main component (refactored & clean)
└── main.jsx           # Entry point
```

Struktur ini mengikuti **best practices** dengan:
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Custom hooks untuk complex logic
- ✅ Utility functions untuk pure logic
- ✅ Easy to maintain & scale

📖 **Lihat [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** untuk penjelasan lengkap!

## Troubleshooting

### Error: "android platform already exists"
Jika Anda mendapatkan error ini setelah `npm run build`, ini normal! Android platform sudah ada. Yang perlu dilakukan adalah **sync** build terbaru:
```bash
npm run capacitor:sync
```
**Lihat `SYNC-ANDROID.md` untuk panduan lengkap.**

### Error saat sync Capacitor
Pastikan sudah menjalankan `npm run build` sebelum `npm run capacitor:sync`.

### Android Studio tidak terbuka
Pastikan Android Studio sudah terinstall dan path sudah benar di environment variables.

### Build Android gagal
1. Pastikan Android SDK sudah terinstall
2. Pastikan Java JDK sudah terinstall
3. Coba clean build: `cd android && ./gradlew clean`

## 📚 Dokumentasi Lengkap

- **[docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Penjelasan lengkap struktur project
- **[docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)** - Panduan development untuk tim IT

## 🤝 Untuk Tim IT

Project ini sudah dirapikan dan direstruktur untuk memudahkan:
- ✅ **Maintenance** - Kode modular dan terorganisir
- ✅ **Scalability** - Mudah menambah fitur baru
- ✅ **Collaboration** - Struktur yang jelas dan konsisten
- ✅ **Testing** - Pure functions mudah di-test
- ✅ **Documentation** - Lengkap dengan code comments

## 💡 Tips Development

- Untuk **development cepat**: Gunakan `npm run dev` di browser
- Setelah **perubahan kode**: `npm run build` → `npx cap sync`
- **Hot reload** tidak tersedia di Android, perlu rebuild
- Gunakan **React DevTools** untuk debugging

## 📝 Catatan Penting

- Project ini menggunakan **modern React patterns** (Hooks, custom hooks)
- Semua **logic kompleks** sudah di-extract ke hooks dan utils
- **Components** fokus pada UI/presentation saja
- **Auto-save** aktif dengan debounce 1 detik

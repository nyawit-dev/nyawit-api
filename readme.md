<p align="center">
  <img src="assets/images/logo.png" width="96" alt="Logo Nyawit API" />
</p>

<h1 align="center">Nyawit API</h1>

<p align="center">
  <strong>Tempat meracik, menguji, dan merapikan API—langsung di komputer sendiri.</strong><br>
  Berangkat dari fondasi Bruno, untuk pengembang yang menyukai privasi, Git, dan aplikasi yang tidak mengajak rapat dulu sebelum mengirim permintaan.
</p>

<p align="center">
  <a href="license.md"><img src="https://img.shields.io/badge/Lisensi-MIT-blue.svg" alt="Lisensi MIT"></a>
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen.svg" alt="Windows, macOS, dan Linux">
  <img src="https://img.shields.io/badge/Penyimpanan-Lokal-cyan.svg" alt="Penyimpanan lokal">
  <img src="https://img.shields.io/badge/Git-Terintegrasi-orange.svg" alt="Git terintegrasi">
</p>

---

## Apa itu Nyawit API?

**Nyawit API** adalah lingkungan kerja untuk mengeksekusi permintaan API, memeriksa janji-janji respons, dan menjalankan uji kelayakan—tanpa jalur “orang dalam” atau revisi aturan di tengah malam. Seluruh *collection* disimpan sebagai berkas lokal di komputer sendiri dan mudah dikelola lewat Git. Aset digital Anda tidak perlu dititipkan ke layanan awan pihak ketiga yang sewaktu-waktu bisa “bocor halus”, lalu dianggap bukan masalah serius.

Nyawit API dibangun di atas fondasi sumber terbuka **Bruno**, sebagai bentuk penghormatan pada konsep keberlanjutan. Bruno bukan sekadar “pembangunan fondasi infrastruktur” yang namanya dilupakan begitu tongkat estafet berganti: ekosistem, format *collection*, dan kerja para kontributor pendahulunya tetap dijaga, sambil menghadirkan fitur dan identitas yang lebih segar.

### Sedikit suasana kerja

Di negeri dongeng bernama **Republik Konoha Emas 2045**, mengurus satu *request* sederhana kadang terasa harus menunggu jadwal pembagian makan siang gratis, menghitung anggaran yang bikin bendahara pusing, melewati iuran wajib dan pajak yang berubah diam-diam, lalu menunggu restu “Paman Konstitusi”. Untungnya, di Nyawit API prosesnya lebih waras: susun *request*, kirim, baca *response* apa adanya, lalu *debug* bagian yang memang bermasalah—tanpa cawe-cawe, membentuk satgas yang rapat di hotel, atau mengucapkan “Saya belum baca drafnya” saat skrip *crash* di produksi.

Humor di halaman ini adalah satire fiktif tentang birokrasi dan tata kelola sistem, bukan tuduhan tentang orang, lembaga, atau peristiwa nyata. Kalau antrean *request* terkena *rate limit* atau *timeout*, itu urusan *endpoint* dan kapasitasnya—bukan jalur yang sedang disterilkan untuk siapa pun.

## Kenapa memilih Koalisi Nyawit API?

- **Hilirisasi lokal sejati:** *Collection* dan data kerja disimpan langsung di komputer dalam berkas teks biasa, bukan diwajibkan melewati layanan *cloud* pihak ketiga.
- **Git terintegrasi tanpa drama dinasti:** Tinjau perubahan, *stage*, *commit*, buat *branch*, sinkronkan *remote*, dan selesaikan konflik *merge* lewat musyawarah mufakat di dalam aplikasi.
- **Keberlanjutan fondasi Bruno:** Hormati arsitektur, format, dan ekosistem Bruno yang telah teruji alih-alih membongkar proyek dari nol setiap pergantian periode.
- **Pintasan praktis, bukan jalur khusus keluarga:** Tekan `Ctrl+K` atau `Cmd+K` untuk mencari *request*, *collection*, perintah, dan pengaturan secara instan.
- **Koalisi protokol gemuk:** Kelola REST, GraphQL, gRPC, dan WebSocket dalam satu lingkungan kerja tanpa bagi-bagi kursi memori secara berlebihan.
- **Uji fakta dan integritas:** Jalankan skrip *pra-request*, *assertion*, dan kumpulan *request* untuk memastikan *server* benar-benar menepati janji, bukan sekadar mengirim status `200 OK` dengan *payload* kosong.
- **Dua kaki di desktop dan web:** Gunakan aplikasi Electron atau antarmuka web, dari komputer pribadi hingga lingkungan kerja yang lebih besar—tanpa anggaran perjalanan dinas.

> **Catatan privasi—transparansi tanpa pasal karet:** Repositori ini memiliki jalur telemetri PostHog yang hanya aktif apabila kunci API telemetri dipasang saat aplikasi dibangun (*build*). Implementasi yang ditinjau mengirim *event* dasar berupa informasi sistem operasi dan versi aplikasi. Komponen **Golden Edition (Edisi Indonesia Emas)** juga mencatat interaksi modal dan tombol. Periksa konfigurasi *build* yang Anda gunakan untuk memastikan status telemetri. Jangan hanya mengandalkan klaim bebas pemantauan—periksa sendiri kode dan konfigurasi, karena kewaspadaan tetap lebih bisa diandalkan daripada janji manis di baliho.

## Fitur utama

| Fitur | Kegunaan |
| :--- | :--- |
| **Pembuat request** | Susun URL, parameter, header, autentikasi, serta isi JSON, XML, form-data, biner, atau teks biasa. |
| **Pemeriksa respons** | Lihat status, header, waktu respons, pencarian, serta tampilan terformat dan berwarna. |
| **Pengelolaan environment** | Atur beberapa environment, variabel, pewarisan, interpolasi, dan penyamaran nilai rahasia. |
| **Pengujian otomatis** | Tulis skrip JavaScript pra-request dan assertion untuk memeriksa hasil. |
| **Collection Runner** | Jalankan serangkaian request dengan iterasi dan laporan hasil. |
| **Nyawit Git Studio** | Kelola perubahan collection, commit, branch, remote, riwayat, diff, stash, dan konflik Git. |
| **Palet perintah** | Cari request, collection, perintah, dan pengaturan dengan `Ctrl+K` atau `Cmd+K`. |
| **Tema** | Gunakan tampilan gelap atau terang. |
| **Aplikasi desktop** | Bangun aplikasi untuk Windows, macOS, dan Linux menggunakan Electron. |

## Mulai dari sumber

### Persyaratan

- [Bun](https://bun.sh/) (disarankan versi 1.1 atau lebih baru) atau [Node.js](https://nodejs.org/) (versi 20 LTS atau lebih baru)
- [Git](https://git-scm.com/)

### Pasang dependensi dan jalankan

```bash
git clone https://github.com/nyawit-dev/nyawit-api.git
cd nyawit-api
bun run setup
```

Jalankan aplikasi desktop:

```bash
bun run dev
```

Jalankan desktop dengan pemantau proses utama:

```bash
bun run dev:watch
```

Jalankan antarmuka web:

```bash
bun run dev:web
```

## Bangun aplikasi

Bangun antarmuka web:

```bash
bun run build:web
```

Bangun paket desktop:

```bash
# Windows
bun run build:electron:win

# macOS
bun run build:electron:mac

# Linux
bun run build:electron:linux
```

Hasil build tersedia di `packages/bruno-electron/out`.

## Pengujian dan pemeriksaan kode

Jalankan pemeriksaan gaya kode:

```bash
bun run lint
```

Jalankan pengujian ujung ke ujung standar:

```bash
bun run test:e2e
```

Untuk pilihan pengujian lain, lihat perintah yang tersedia di `package.json` dan konfigurasi Playwright.

## Susunan proyek

```text
├── assets/                  # Ikon, gambar, dan aset merek
├── packages/
│   ├── bruno-app/           # Antarmuka React dan panel aplikasi
│   ├── bruno-electron/      # Proses utama Electron dan integrasi desktop
│   ├── bruno-cli/           # Antarmuka baris perintah
│   ├── bruno-common/        # Utilitas dan struktur data bersama
│   ├── bruno-filestore/     # Penyimpanan collection di disk
│   ├── bruno-requests/      # Pengiriman HTTP, HTTPS, gRPC, dan WebSocket
│   ├── bruno-schema/        # Skema validasi
│   ├── bruno-io/            # Pembacaan dan penulisan collection
│   ├── bruno-sqlite/        # Cache collection berbasis SQLite
│   └── bruno-lang/          # Parser dan serialisasi bahasa collection
├── docs/                    # Dokumentasi proyek
└── DESIGN.md                # Panduan sistem desain
```

## Kontribusi

Laporan bug, usulan fitur, dan kontribusi kode sangat diterima. Sebelum mengirim perubahan, silakan baca [panduan kontribusi](contributing.md) dan [standar pengodean](CODING_STANDARDS.md). Untuk pertanyaan keamanan, lihat [kebijakan keamanan](security.md).

## Lisensi dan penghargaan

Nyawit API didistribusikan di bawah [Lisensi MIT](license.md). Proyek ini dibangun di atas fondasi sumber terbuka **Bruno**, yang dibuat oleh Anoop M D dan para kontributor Bruno. Terima kasih kepada mereka yang telah membangun dan merawat ekosistem tersebut.

Silakan baca berkas lisensi dan pemberitahuan atribusi yang disertakan di repositori sebelum menggunakan atau mendistribusikan perangkat lunak ini.

---

<p align="center"><em>Semoga request-nya lancar, responsnya jelas, dan jumlah stempelnya cukup satu: tombol Kirim.</em></p>

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

**Nyawit API** adalah lingkungan kerja untuk membuat permintaan API, memeriksa respons, dan menjalankan pengujian. Collection disimpan sebagai berkas lokal yang mudah ditinjau dan dikelola dengan Git—bukan harus dititipkan ke layanan awan tertentu.

Nyawit API dibangun di atas fondasi sumber terbuka **Bruno**. Bruno bukan tempelan nama di halaman ucapan terima kasih: ekosistem, format collection, dan kerja para kontributornya adalah bagian penting dari proyek ini. Nyawit API mempertahankan fondasi tersebut sambil mengembangkan identitas, pengalaman, dan tambahan fiturnya sendiri.

### Sedikit suasana kerja

Di negeri fiktif bernama **Republik Antrean**, satu permintaan sederhana kadang terasa perlu formulir, stempel, dan persetujuan dari meja yang kebetulan sedang istirahat. API setidaknya bisa kita uji dengan lebih langsung: susun request, kirim, baca respons, lalu perbaiki yang memang perlu diperbaiki.

Humor di sini menyindir pengalaman birokrasi secara umum dan fiktif; bukan tuduhan atau pernyataan faktual tentang orang, lembaga, maupun peristiwa tertentu. Kalau antreannya makin panjang, itu urusan endpoint—bukan ramalan politik.

## Kenapa memakai Nyawit API?

- **Berorientasi lokal:** collection dan data kerja disimpan di komputer pengguna dalam berkas biasa.
- **Git terintegrasi:** tinjau perubahan, stage, commit, branch, sinkronkan remote, dan tangani konflik dari dalam aplikasi.
- **Berangkat dari Bruno:** tetap menghargai fondasi, format, dan ekosistem Bruno alih-alih membangun ulang semuanya dari nol.
- **Pintasan praktis:** gunakan `Ctrl+K` atau `Cmd+K` untuk mencari request, collection, perintah, dan pengaturan.
- **Beragam protokol:** dukungan untuk REST, GraphQL, gRPC, dan WebSocket.
- **Dibuat untuk pengujian:** jalankan skrip pra-request, assertion, dan kumpulan request.
- **Antarmuka desktop dan web:** proyek menyediakan pengembangan Electron dan antarmuka web.

> **Catatan privasi:** repositori ini memiliki jalur telemetri PostHog yang dapat aktif apabila kunci API telemetri disediakan saat aplikasi dibangun. Implementasi yang ditinjau mengirim event mulai dengan informasi sistem operasi dan versi; komponen Golden Edition juga mengirim event interaksi modal dan tombol. Periksa konfigurasi build yang Anda gunakan untuk mengetahui apakah telemetri aktif. Karena itu, jangan menganggap semua build otomatis bebas telemetri.

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

Laporan bug, usulan fitur, dan kontribusi kode sangat diterima. Sebelum mengirim perubahan, silakan baca [panduan kontribusi](contributing.md) dan [standar pengodean](CODING_STANDARDS.md). Untuk usulan yang menyentuh fondasi Bruno, pertimbangkan dampaknya terhadap kompatibilitas dan sinkronisasi dengan upstream—jangan sampai perbaikan kecil berubah menjadi rapat lintas kementerian.

## Lisensi dan penghargaan

Nyawit API didistribusikan di bawah [Lisensi MIT](license.md). Proyek ini dibangun di atas fondasi sumber terbuka **Bruno**, yang dibuat oleh Anoop M D dan para kontributor Bruno. Terima kasih kepada mereka dan komunitas sumber terbuka yang telah membangun serta merawat fondasi tersebut.

Silakan baca berkas lisensi dan pemberitahuan atribusi yang disertakan di repositori sebelum menggunakan atau mendistribusikan perangkat lunak ini.

---

<p align="center"><em>Semoga request-nya lancar, responsnya jelas, dan jumlah stempelnya cukup satu: tombol Kirim.</em></p>

# Project Task Tracker: Toluwei Web CMS & Landing Page

## Deskripsi Proyek
Website company profile dan katalog produk untuk "Toluwei" (Penjualan daging babi & olahan di Wudi, Sumba Timur). Terdiri dari halaman *public* (SEO friendly) dan *dashboard admin* (CMS) untuk mengelola produk dan konten utama. 
Stack: Next.js (App Router), Tailwind CSS, Prisma ORM, Server Actions.

---

## Tahap 1: Setup & Inisialisasi Proyek
- [ ] Inisiasi Next.js dengan App Router, TypeScript, dan Tailwind CSS.
- [ ] Konfigurasi font (misal: Inter atau Poppins) dan warna tema dasar (warna dominan brand Toluwei).
- [ ] Install library tambahan yang dibutuhkan (misal: `lucide-react` untuk icon, `clsx`, `tailwind-merge`).
- [ ] Setup komponen UI dasar (Button, Input, Card) jika tidak menggunakan library eksternal seperti Shadcn.

## Tahap 2: Setup Database & Skema (Prisma ORM)
- [ ] Install Prisma dan inisiasi menggunakan SQLite (untuk dev).
- [ ] Buat skema `User` (untuk login Admin).
- [ ] Buat skema `Product` (id, nama, deskripsi, kategori_olahan_atau_mentah, harga, imageUrl, isPublished).
- [ ] Buat skema `SiteSetting` atau `HeroContent` (untuk mengatur teks landing page secara dinamis).
- [ ] Buat file *seed* (seed.ts) untuk memasukkan 1 akun admin default dan beberapa data dummy produk Toluwei.
- [ ] Jalankan migrasi database.

## Tahap 3: Halaman Landing Page (Public & SEO)
- [ ] Buat komponen `Navbar` (Public) dan `Footer`.
- [ ] Buat komponen `HeroSection`. Ambil data teksnya (headline, subheadline) dari database menggunakan React Server Components.
- [ ] Buat komponen `ProductList`. Ambil data produk (yang `isPublished: true`) dari database. Tampilkan dalam bentuk *Grid Card* yang responsif.
- [ ] Buat komponen `AboutSection` (Informasi Toluwei dan lokasi di Wudi, Sumba Timur).
- [ ] Konfigurasi `metadata` bawaan Next.js di `app/layout.tsx` dan `app/page.tsx` untuk SEO (Title, Description, Keywords: daging babi Sumba Timur, olahan babi Toluwei).

## Tahap 4: Autentikasi Admin
- [ ] Buat halaman `/login` untuk admin.
- [ ] Implementasi sistem otentikasi sederhana (bisa menggunakan NextAuth/Auth.js, atau *session cookies* sederhana menggunakan `jose` / JWT).
- [ ] Buat *Middleware* (`middleware.ts`) untuk memproteksi *routing* `/admin/*` agar hanya bisa diakses jika sudah login.

## Tahap 5: Dashboard Admin (CMS) Layout & Navigasi
- [ ] Buat layout khusus untuk dashboard (`app/admin/layout.tsx`).
- [ ] Buat komponen `Sidebar` admin (Menu: Dashboard, Kelola Produk, Kelola Konten, Logout).
- [ ] Buat halaman utama `/admin` yang menampilkan statistik sederhana (Total Produk).

## Tahap 6: CRUD Produk & Konten (Server Actions)
- [ ] Buat *Server Actions* untuk Produk (Create, Read, Update, Delete).
- [ ] Buat halaman `/admin/products` (Tabel daftar produk dengan tombol Edit & Hapus).
- [ ] Buat halaman `/admin/products/new` (Form tambah produk).
- [ ] Buat halaman `/admin/products/[id]/edit` (Form edit produk).
- [ ] Buat *Server Actions* dan halaman `/admin/content` untuk mengedit teks utama *Landing Page* (Hero title, subtitle, kontak).

## Tahap 7: Finalisasi & Testing
- [ ] Pastikan semua form admin berjalan baik (tidak ada error *hydration* atau *server action error*).
- [ ] Cek responsivitas tampilan (Mobile, Tablet, Desktop) menggunakan Tailwind classes.
- [ ] Cek ulang SEO (tag title, meta description sudah sesuai).
- [ ] Bersihkan *console.log* dan kode yang tidak terpakai.

## Tahap 8: Revisi Database & CRUD Gambar Produk
- [ ] Update skema Prisma `Product` untuk memastikan *field* `image` (URL atau path lokal) terkonfigurasi dengan benar. Jalankan `prisma db push` atau `migrate`.
- [ ] Buat utilitas *Server Action* untuk menangani *upload file* gambar dari form admin dan menyimpannya ke folder `/public/uploads` (atau layanan pihak ketiga jika disepakati).
- [ ] Update halaman `/admin/products/new` dan `/admin/products/[id]/edit` untuk menyertakan input `<input type="file" accept="image/*" />`.
- [ ] Update tabel di `/admin/products` untuk menampilkan *thumbnail* gambar produk.

## Tahap 9: Revamp Desain & Penambahan Section Landing Page
- [ ] Refaktor komponen `HeroSection` menjadi lebih modern (hapus kotak-kotak kaku, gunakan *layout* asimetris atau teks yang lebih berani dengan latar belakang gambar/pola yang *subtle*).
- [ ] Buat komponen `WhyChooseUs` dengan desain *grid* yang *clean* dan ikon yang minimalis.
- [ ] Buat komponen `HowToOrder` yang menampilkan langkah-langkah pemesanan yang mudah dipahami.
- [ ] Refaktor komponen `ProductList` menjadi `CatalogSection`. Tampilkan gambar produk menggunakan `next/image` dengan *styling* kartu yang premium (tanpa *border* tebal, dengan efek *hover* yang mulus/smooth).
- [ ] Lakukan *review* menyeluruh terhadap *whitespace*, tipografi, dan palet warna di seluruh halaman publik agar terasa seperti buatan *agency* profesional.

---

## Tahap 10: Revamp UI/UX — Gaya Premium cinghaji.com
Referensi desain: [cinghaji.com](https://cinghaji.com) — *Quiet Luxury*, whitespace luas, serif heading + sans-serif body, off-white background, borderless card, subtle shadow.

### 10.1 — Design System & Global Styling
- [ ] Update palet warna di `globals.css` / Tailwind config: background off-white (`#F8FAFC`), teks charcoal (`#1E293B`), aksen dark navy (`#0F172A`), dan aksen brand Toluwei.
- [ ] Tambahkan font serif (misal: *Playfair Display* atau *Cormorant Garamond*) untuk heading dan gunakan *Inter* untuk body text.
- [ ] Definisikan ulang spacing & border-radius global agar konsisten (generous padding, `rounded-2xl` / `rounded-3xl`).

### 10.2 — Revamp Landing Page (Public)
- [ ] **Navbar**: Buat navbar yang bersih, dengan font sans-serif, link tipis, dan CTA button yang premium (rounded pill, dark fill).
- [ ] **HeroSection**: Full-width image hero dengan overlay gelap, teks serif besar di tengah, sub-heading letter-spaced, dan CTA glassmorphism / border pill.
- [ ] **ProductsSection (CatalogSection)**: Card produk borderless dengan subtle shadow, hover scale effect halus, badge kategori elegan (pill shape, warna muted).
- [ ] **WhyChooseUsSection**: Grid ikon minimalis dengan subtle background, tipografi clean.
- [ ] **HowToOrderSection**: Redesign langkah-langkah pemesanan sebagai stepper horizontal yang elegan.
- [ ] **AboutSection**: Asymmetric layout (gambar + teks berdampingan), whitespace luas.
- [ ] **ContactSection**: Card kontak yang clean dengan ikon minimalis.
- [ ] **Footer**: Dark background (navy/charcoal), teks terang, link halus.

### 10.3 — Revamp Dashboard Admin
- [ ] Ganti skema warna admin dari dark-mode gelap pekat menjadi *clean light mode* atau *soft dark* yang konsisten dengan brand.
- [ ] **Sidebar**: Minimalis, border tipis / borderless, ikon halus, active state dengan highlight subtle.
- [ ] **Tabel Produk** (`/admin/products`): Borderless / garis pemisah ultra-tipis, baris hover subtle, badge status (Published / Draft) berbentuk pill dengan warna muted.
- [ ] **Form Produk & Konten**: Input field dengan border halus, label clean, spacing luas, tombol aksi premium.
- [ ] **Dashboard Utama** (`/admin`): Statistik dalam card modern dengan subtle shadow dan angka besar.

---

## Tahap 11: Stabilisasi CRUD — Zero Error Tolerance

### 11.1 — Error Handling (try-catch) di Server Actions
- [x] Audit dan pastikan **semua** Server Actions (`product.actions.ts`, `site-setting.actions.ts`) memiliki `try-catch` yang solid dan mengembalikan `ActionResult` dengan pesan error yang jelas.
- [x] Khusus `deleteProductAction`: tambahkan `try-catch` (saat ini tidak ada).
- [x] Khusus `updateSiteSettingAction`: tambahkan `try-catch` (saat ini tidak ada).

### 11.2 — Loading State & Form UX
- [ ] Pastikan semua form admin menggunakan `useActionState` / `useFormStatus` dan men-disable tombol submit saat `isPending` (sudah ada di `ProductForm`, perlu dicek di `ContentForm` & `DeleteButton`).
- [ ] Tambahkan spinner/loading indicator yang konsisten di semua tombol aksi.

### 11.3 — Toast Notifications
- [ ] Install library toast (`sonner` atau `react-hot-toast`).
- [ ] Tambahkan `<Toaster />` di layout admin.
- [ ] Integrasikan toast `success` dan `error` di semua Server Actions: setelah create, update, delete produk, dan update konten.
- [ ] Pastikan `revalidatePath` dipanggil di semua aksi mutasi (sudah ada, perlu diverifikasi keseluruhan).

### 11.4 — Bug Fix Runtime Error
- [x] Perbaiki runtime error di `/admin/products/new` (*"unexpected response from the server"*). Root cause: `redirect()` di server action throws internal error yang breaks `useActionState`. Fix: return `{ success: true }` + `useEffect` navigation di client.

---

## Tahap 12: Fitur Pencatatan & Rekap Penjualan (Laporan)

### 12.1 — Database: Skema Penjualan
- [ ] Tambahkan model `Sale` di `schema.prisma`:
  - `id` (String, cuid)
  - `date` (DateTime) — tanggal transaksi
  - `productId` (String, opsional) — relasi ke Product
  - `categoryType` (String) — "SEGAR" | "OLAHAN" (agar tetap tercatat walau produk dihapus)
  - `productName` (String) — nama produk saat dijual (snapshot)
  - `quantity` (Int) — jumlah terjual
  - `unitPrice` (Float) — harga satuan saat dijual
  - `totalPrice` (Float) — quantity × unitPrice
  - `notes` (String, opsional) — catatan tambahan
  - `createdAt`, `updatedAt`
- [ ] Buat relasi `Sale → Product` (opsional, `onDelete: SetNull`).
- [ ] Jalankan `npx prisma db push` atau `migrate`.

### 12.2 — Service Layer & Server Actions
- [ ] Buat `src/services/sale.service.ts` — CRUD untuk Sale (create, getAll, getByDateRange, getSummary, delete).
- [ ] Buat `src/actions/sale.actions.ts` — Server Actions: `createSaleAction`, `deleteSaleAction`, dengan `try-catch`, `revalidatePath`, dan toast integration.
- [ ] Update `src/types/index.ts` — Tambahkan type `Sale`, `SaleCreateInput`.

### 12.3 — Input Form Penjualan
- [ ] Buat halaman `/admin/sales/new` — Form input penjualan harian.
- [ ] Form berisi: pilih tanggal, pilih produk (dropdown dari daftar produk), qty, harga otomatis terisi dari data produk (bisa di-override), total otomatis terhitung.
- [ ] Buat komponen `SaleForm.tsx` di `src/components/admin/`.
- [ ] Tambahkan menu "Penjualan" di Sidebar admin.

### 12.4 — Daftar & Hapus Penjualan
- [ ] Buat halaman `/admin/sales` — Tabel daftar transaksi penjualan (tanggal, produk, qty, total, aksi hapus).
- [ ] Implementasi tabel dengan desain konsisten (sesuai revamp Tahap 10).
- [ ] Tombil hapus dengan konfirmasi.

### 12.5 — Halaman Rekap/Laporan (`/admin/reports`)
- [ ] Buat halaman `/admin/reports` — Menampilkan ringkasan penjualan.
- [ ] **Rangkuman per Hari**: Tabel / list yang menampilkan total penjualan per hari untuk rentang waktu tertentu.
- [ ] **Rangkuman per Bulan**: Akumulasi total penjualan per bulan (nama bulan, total transaksi, total pendapatan).
- [ ] Sediakan filter: pilih bulan/tahun, kategori (SEGAR/OLAHAN/Semua).
- [ ] Tampilkan angka total besar (total revenue) di card statistik.
- [ ] Tambahkan menu "Laporan" di Sidebar admin.
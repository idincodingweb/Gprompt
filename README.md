#Cara Menjalankan Image to Prompt Pro di LocalhostIkuti struktur folder di bawah ini agar aplikasi berjalan sempurna.

1. Struktur FolderBuatlah folder proyek baru, lalu susun file seperti ini:
   Gprompt/
├── node_modules/       (Akan muncul setelah npm install)
├── public/
├── src/
│   ├── App.jsx         (Paste kode "ImageToPromptProFinal.jsx" di sini, rename jadi App.jsx)
│   ├── main.jsx        (Kode entry point, lihat di bawah)
│   └── index.css       (Kode CSS tailwind, lihat di bawah)
├── index.html          (File HTML utama)
├── package.json        (File yang saya berikan di atas)
├── vite.config.js      (File yang saya berikan di atas)
├── tailwind.config.js  (File yang saya berikan di atas)
└── postcss.config.js   (File yang saya berikan di atas)

2. Cara Install & RunBuka terminal/cmd di folder proyek.Jalankan perintah:npm install
Setelah selesai, jalankan:npm run dev
Buka link yang muncul (biasanya http://localhost:5173) di browser.Catatan Penting: Jangan lupa memasukkan API Key Gemini Anda di dalam file src/App.jsx pada variabel const apiKey = "ISI_API_KEY_DISINI";.

// DOM Elements
const promptForm = document.getElementById('promptForm');
const resultContainer = document.getElementById('resultContainer');
const resultDiv = document.getElementById('result');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');

// Show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden', 'show');
    
    // Trigger reflow to restart animation
    void toast.offsetWidth;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Generate the prompt based on form inputs
function generatePrompt() {
    const targetAudiens = document.getElementById('targetAudiens').value || '[siapa? contoh: bunda yang ingin mengajarkan anak mengaji sendiri]';
    const masalahBatin = document.getElementById('masalahBatin').value || '[contoh: takut melepas pendidikan agama ke orang lain, ingin pahala jariyah]';
    const harapanEmosional = document.getElementById('harapanEmosional').value || '[contoh: pahala mengalir, kedekatan dengan anak, ketenangan hati]';
    const produk = document.getElementById('produk').value || '[contoh: worksheet anak tema islami]';
    const keunggulan = document.getElementById('keunggulan').value || '[contoh: 1.200++ halaman, bisa dipakai bertahun-tahun]';
    const gayaBahasa = document.getElementById('gayaBahasa').value;
    const emoji = document.getElementById('emoji').value;
    const isHardSelling = !document.getElementById('hardSelling').checked;

    // Generate the prompt text
    const promptText = `Buatkan 1 caption konten media sosial (gaya Threads / Instagram)
dengan karakter:

- Target audiens: ${targetAudiens}
- Masalah batin audiens: ${masalahBatin}
- Harapan emosional: ${harapanEmosional}
- Produk yang ditawarkan: ${produk}
- Keunggulan produk (boleh angka besar): ${keunggulan}
- Gaya bahasa: ${gayaBahasa}
- Gunakan emoji secukupnya (${emoji})
- ${isHardSelling ? 'Boleh hard selling' : 'Jangan hard selling'}
- Tutup dengan CTA komentar 1 kata (contoh: "MAU")

Strukturkan caption:
1. Sapaan pembuka yang terasa personal
2. Kalimat yang membayangkan pahala / masa depan
3. Sentuhan rasa bersalah atau harapan yang halus
4. Selipkan produk sebagai solusi
5. CTA komentar`;

    return promptText;
}

// Handle form submission
promptForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const promptText = generatePrompt();
    resultDiv.textContent = promptText;
    resultContainer.classList.remove('hidden');
});

// Copy to clipboard functionality
copyBtn.addEventListener('click', function() {
    const textToCopy = resultDiv.textContent;
    
    if (!textToCopy) {
        showToast('Tidak ada teks untuk disalin!');
        return;
    }
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            showToast('Teks telah disalin!');
        })
        .catch(err => {
            showToast('Gagal menyalin teks: ' + err);
        });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set default values for read-only fields
    document.getElementById('gayaBahasa').value = 'lembut, emosional, relatable, seolah curhat';
    document.getElementById('emoji').value = '🥹🫶🏻🩷';
});
/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Çok Dilli İçerik Yönetimi JavaScript Dosyası
 */

// Mevcut dil
let currentLang = localStorage.getItem('lang') || 'tr';

// Dil verilerini tutacak obje
let translations = {};

// Sayfa yüklendiğinde çalışacak
document.addEventListener('DOMContentLoaded', async () => {
    // Dil dosyasını yükle
    await loadTranslations();
    // Sayfa içeriğini çevir
    translatePage();
    // Dil butonlarını güncelle
    updateLanguageButtons();
});

// Dil dosyasını yükleme
async function loadTranslations() {
    try {
        const response = await fetch(`/lang/${currentLang}.json`);
        if (!response.ok) throw new Error('Translation file not found');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Dil değiştirme fonksiyonu
function changeLanguage(lang) {
    if (currentLang === lang) return;
    
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    loadTranslations().then(() => {
        translatePage();
        updateLanguageButtons();
    });
}

// Sayfa içeriğini çevirme
function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (translation) {
            switch(element.tagName.toLowerCase()) {
                case 'input':
                    if (element.type === 'submit' || element.type === 'button') {
                        element.value = translation;
                    } else {
                        element.placeholder = translation;
                    }
                    break;
                    
                case 'meta':
                    if (element.getAttribute('name') === 'description') {
                        element.setAttribute('content', translation);
                    }
                    break;
                    
                case 'img':
                    element.setAttribute('alt', translation);
                    break;
                    
                default:
                    element.textContent = translation;
            }
        }
    });

    // Sayfa başlığını çevir
    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.getAttribute('data-i18n')) {
        titleElement.textContent = getTranslation(titleElement.getAttribute('data-i18n'));
    }
}

// Çeviri değerini alma
function getTranslation(key) {
    return key.split('.').reduce((obj, i) => obj?.[i], translations) || key;
}

// Dil butonlarını güncelleme
function updateLanguageButtons() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-lang') === currentLang);
    });
}

// Global olarak kullanılabilecek fonksiyonlar
window.i18n = {
    translate: getTranslation,
    changeLanguage,
    getCurrentLang: () => currentLang
};

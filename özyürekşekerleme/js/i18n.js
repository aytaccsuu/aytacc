/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Çok Dilli İçerik Yönetimi JavaScript Dosyası
 */

// Mevcut dil
let currentLanguage = 'tr';

// Dil verilerini tutacak obje
let translations = {
    tr: {},
    en: {},
    ar: {}
};

// Diller ve karşılık gelen HTML dir özniteliği ayarları
const languageSettings = {
    tr: { dir: 'ltr', rtlStyle: '' },
    en: { dir: 'ltr', rtlStyle: '' },
    ar: { dir: 'rtl', rtlStyle: 'css/rtl.css' }
};

/**
 * Sayfanın ilk yüklenişinde çalışacak fonksiyon
 */
document.addEventListener('DOMContentLoaded', () => {
    // localStorage'da kayıtlı bir dil tercihi varsa onu kullan
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['tr', 'en', 'ar'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
    }

    // Tüm dil dosyalarını yükle
    loadTranslations()
        .then(() => {
            // Dil butonlarını aktif et
            updateLanguageButtons();
            // Sayfa içeriğini çevir
            translatePage();
        })
        .catch(error => {
            console.error('Dil dosyaları yüklenirken hata oluştu:', error);
        });
});

/**
 * Dil değiştirme fonksiyonu
 * @param {string} language - 'tr', 'en' veya 'ar'
 */
function changeLanguage(language) {
    if (!['tr', 'en', 'ar'].includes(language) || language === currentLanguage) {
        return;
    }

    // Mevcut dili güncelle
    currentLanguage = language;
    
    // Dil tercihini localStorage'a kaydet
    localStorage.setItem('language', language);
    
    // HTML dir özniteliğini güncelle (RTL desteği için)
    document.documentElement.setAttribute('dir', languageSettings[language].dir);
    
    // RTL stil dosyasını yükle veya kaldır
    const rtlStyle = document.getElementById('rtl-style');
    rtlStyle.setAttribute('href', languageSettings[language].rtlStyle);
    
    // Dil butonlarını güncelle
    updateLanguageButtons();
    
    // Sayfa içeriğini çevir
    translatePage();
}

/**
 * Dil butonlarının aktif durumunu güncelleme
 */
function updateLanguageButtons() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(button => {
        const buttonLang = button.getAttribute('data-lang');
        if (buttonLang === currentLanguage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Tüm dil dosyalarını yükleme
 * @returns {Promise} - Tüm dil verilerinin yüklenme sözü
 */
function loadTranslations() {
    const languages = ['tr', 'en', 'ar'];
    const promises = languages.map(lang => {
        return fetch(`lang/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${lang}.json dosyası yüklenemedi: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                translations[lang] = data;
            });
    });
    
    return Promise.all(promises);
}

/**
 * Sayfa içeriğindeki tüm çevrilebilir metinleri çevirme
 */
function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (translation) {
            // Eğer element bir input ise placeholder'ı çevir
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translation);
            } 
            // Eğer element bir buton veya metinsel içerik ise içeriği çevir
            else {
                element.textContent = translation;
            }
        }
    });
    
    // Sayfa başlığını çevir (varsa)
    updatePageTitle();
    
    // Diğer dinamik içerikleri çevir (ürün kartları, vs.)
    updateDynamicContent();
}

/**
 * Belirli bir çeviri anahtarına ait metni getirme
 * @param {string} key - Çeviri anahtarı (nokta notasyonu ile: "menu.home" gibi)
 * @returns {string|null} - Çevrilmiş metin veya null
 */
function getTranslation(key) {
    // Noktalarla ayrılmış anahtarı parçalara ayır
    const parts = key.split('.');
    
    // Mevcut dildeki çevirilere eriş
    let translation = translations[currentLanguage];
    
    // Anahtarı takip ederek doğru çeviriyi bul
    for (const part of parts) {
        if (translation && translation[part] !== undefined) {
            translation = translation[part];
        } else {
            // Çeviri bulunamadıysa
            console.warn(`"${key}" anahtarı için çeviri bulunamadı (${currentLanguage})`);
            return null;
        }
    }
    
    return translation;
}

/**
 * Sayfa başlığını çevirme
 */
function updatePageTitle() {
    // Sayfa türüne göre başlığı çevir
    const pagePath = window.location.pathname;
    let titleKey = 'site.title'; // Varsayılan başlık
    
    // Sayfa türüne göre başlık anahtarını belirle
    if (pagePath.includes('products.html')) {
        titleKey = 'pages.products_title';
    } else if (pagePath.includes('product.html')) {
        titleKey = 'pages.product_title';
    } else if (pagePath.includes('cart.html')) {
        titleKey = 'pages.cart_title';
    } else if (pagePath.includes('checkout.html')) {
        titleKey = 'pages.checkout_title';
    } else if (pagePath.includes('login.html')) {
        titleKey = 'pages.login_title';
    } else if (pagePath.includes('register.html')) {
        titleKey = 'pages.register_title';
    } else if (pagePath.includes('profile.html')) {
        titleKey = 'pages.profile_title';
    } else if (pagePath.includes('admin.html')) {
        titleKey = 'pages.admin_title';
    }
    
    // Başlığı çevir ve güncelle
    const translatedTitle = getTranslation(titleKey);
    if (translatedTitle) {
        document.title = translatedTitle;
    }
}

/**
 * Dinamik içerikleri çevirme (ürün kartları, vs.)
 * Bu fonksiyon diğer JavaScript dosyalarındaki olaylara tepki olarak çağrılabilir
 */
function updateDynamicContent() {
    // Eğer varsa ürün kartlarını çevir
    updateProductCards();
    
    // Eğer varsa sepet içeriğini çevir
    updateCartItems();
    
    // Diğer dinamik alanları güncelle
    // ...
}

/**
 * Ürün kartlarını çevirme
 */
function updateProductCards() {
    // Bu fonksiyon product.js içinde daha ayrıntılı olarak uygulanacak
    // Burada sadece temel çeviri işlemi yapılıyor
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Ürün kategorisi gibi static elemanları çevir
        const categoryElement = card.querySelector('.product-category');
        if (categoryElement && categoryElement.hasAttribute('data-category-key')) {
            const categoryKey = categoryElement.getAttribute('data-category-key');
            const translatedCategory = getTranslation(`categories.${categoryKey}`);
            if (translatedCategory) {
                categoryElement.textContent = translatedCategory;
            }
        }
    });
}

/**
 * Sepet içeriğini çevirme
 */
function updateCartItems() {
    // Bu fonksiyon cart.js içinde daha ayrıntılı olarak uygulanacak
    // Burada sadece temel çeviri işlemi yapılıyor
}

// Dışa aktarılan fonksiyonlar
window.changeLanguage = changeLanguage;
window.getTranslation = getTranslation;
window.translatePage = translatePage;

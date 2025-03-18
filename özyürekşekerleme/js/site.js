/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Genel Site İşlevselliği JavaScript Dosyası
 */

// Genel site değişkenleri
const siteConfig = {
    apiUrl: 'https://api.ozyureksekerleme.com', // Gerçek API URL'si ile değiştirilecek
    currency: {
        tr: '₺',
        en: '$',
        ar: 'د.إ'
    },
    // Varsayılan olarak mock API kullanıyoruz
    useMockData: true
};

/**
 * Sayfanın ilk yüklenişinde çalışacak fonksiyon
 */
document.addEventListener('DOMContentLoaded', () => {
    // Mobil menü butonuna tıklama olayı ekle
    initMobileMenu();
    
    // Modals için olay dinleyicileri ekle
    initModals();
    
    // Kullanıcı dropdown menüsü için olay dinleyicileri
    initUserDropdown();
    
    // Form doğrulama işlevselliği
    initFormValidation();
    
    // Tab panelleri için olay dinleyicileri
    initTabPanels();
    
    // İletişim formu işleme
    initContactForm();
    
    // Bülten aboneliği formu işleme
    initNewsletterForm();
    
    // Diğer sayfa başlangıç işlevleri
    initPageSpecificFunctions();
    
    // Scroll olayları
    initScrollEvents();
});

/**
 * Mobil menü işlevselliği
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
        
        // Menü dışına tıklanınca menüyü kapat
        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                menu.classList.remove('show');
            }
        });
    }
}

/**
 * Modallar için işlevsellik
 */
function initModals() {
    // Modal açma butonları
    const modalOpenButtons = document.querySelectorAll('[data-modal-target]');
    modalOpenButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetModal = document.getElementById(button.getAttribute('data-modal-target'));
            if (targetModal) {
                openModal(targetModal);
            }
        });
    });
    
    // Modal kapatma butonları
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-cancel');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Modal dışına tıklayarak kapatma
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}

/**
 * Modal açma fonksiyonu
 * @param {HTMLElement} modal - Açılacak modal element
 */
function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Sayfa kaydırmayı devre dışı bırak
}

/**
 * Modal kapatma fonksiyonu
 * @param {HTMLElement} modal - Kapatılacak modal element
 */
function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Sayfa kaydırmayı tekrar etkinleştir
}

/**
 * Kullanıcı dropdown menüsü işlevselliği
 */
function initUserDropdown() {
    const userButton = document.querySelector('.user-button');
    const userDropdown = document.querySelector('.user-dropdown-content');
    const adminUserButton = document.querySelector('.admin-user-button');
    const adminDropdown = document.querySelector('.admin-dropdown-content');
    
    // Normal kullanıcı dropdown
    if (userButton && userDropdown) {
        userButton.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // Dropdown dışına tıklanınca kapat
        document.addEventListener('click', () => {
            userDropdown.classList.remove('show');
        });
        
        // Dropdown içine tıklanınca kapatma (event propagation)
        userDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Admin kullanıcı dropdown
    if (adminUserButton && adminDropdown) {
        adminUserButton.addEventListener('click', (e) => {
            e.stopPropagation();
            adminDropdown.classList.toggle('show');
        });
        
        // Dropdown dışına tıklanınca kapat
        document.addEventListener('click', () => {
            adminDropdown.classList.remove('show');
        });
        
        // Dropdown içine tıklanınca kapatma (event propagation)
        adminDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

/**
 * Form doğrulama işlevselliği
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            let isValid = true;
            
            // Tüm gerekli alanları kontrol et
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightInvalidField(field);
                } else {
                    removeInvalidHighlight(field);
                }
            });
            
            // E-posta doğrulama
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    highlightInvalidField(field);
                }
            });
            
            // Şifre eşleşme kontrolü (kayıt formu için)
            if (form.id === 'register-form' || form.id === 'password-form') {
                const password = form.querySelector('input[name="password"]') || form.querySelector('input[name="new_password"]');
                const confirmPassword = form.querySelector('input[name="confirm-password"]') || form.querySelector('input[name="confirm_password"]');
                
                if (password && confirmPassword && password.value !== confirmPassword.value) {
                    isValid = false;
                    highlightInvalidField(confirmPassword);
                }
            }
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
    
    // Şifre gücü göstergesi
    const passwordInputs = document.querySelectorAll('#register-password, #new-password');
    passwordInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                updatePasswordStrength(this);
            });
        }
    });
    
    // Şifre göster/gizle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            
            // Şifre tipini değiştir
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
}

/**
 * Geçersiz form alanını vurgulama
 * @param {HTMLElement} field - Vurgulanacak form alanı
 */
function highlightInvalidField(field) {
    field.classList.add('invalid');
    
    // Geçersizlik mesajı ekle
    const parent = field.parentElement;
    let errorMessage = parent.querySelector('.error-message');
    
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        parent.appendChild(errorMessage);
    }
    
    // Hata mesajını belirle
    let message = 'Bu alan gereklidir.';
    
    if (field.type === 'email') {
        message = 'Geçerli bir e-posta adresi giriniz.';
    } else if (field.name === 'confirm-password' || field.name === 'confirm_password') {
        message = 'Şifreler eşleşmiyor.';
    }
    
    // Çeviri kontrolü
    const currentLang = localStorage.getItem('language') || 'tr';
    if (currentLang !== 'tr' && window.getTranslation) {
        const translationKey = `validation.${field.type === 'email' ? 'invalid_email' : (field.name === 'confirm-password' || field.name === 'confirm_password') ? 'passwords_not_match' : 'required_field'}`;
        const translatedMessage = window.getTranslation(translationKey);
        
        if (translatedMessage) {
            message = translatedMessage;
        }
    }
    
    errorMessage.textContent = message;
    
    // Input olayı ile hata mesajını temizle
    field.addEventListener('input', function onInput() {
        removeInvalidHighlight(field);
        field.removeEventListener('input', onInput);
    });
}

/**
 * Geçersiz vurgulamayı kaldırma
 * @param {HTMLElement} field - Vurgulaması kaldırılacak form alanı
 */
function removeInvalidHighlight(field) {
    field.classList.remove('invalid');
    
    // Hata mesajını kaldır
    const parent = field.parentElement;
    const errorMessage = parent.querySelector('.error-message');
    
    if (errorMessage) {
        parent.removeChild(errorMessage);
    }
}

/**
 * E-posta geçerlilik kontrolü
 * @param {string} email - Kontrol edilecek e-posta adresi
 * @returns {boolean} - E-posta adresi geçerli mi
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Şifre gücünü güncelleme
 * @param {HTMLElement} passwordInput - Şifre input alanı
 */
function updatePasswordStrength(passwordInput) {
    const password = passwordInput.value;
    const strengthBar = passwordInput.parentElement.parentElement.querySelector('.strength-indicator');
    const strengthText = passwordInput.parentElement.parentElement.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    let status = '';
    
    // Şifre uzunluğunu kontrol et
    if (password.length >= 8) {
        strength += 25;
    }
    
    // Küçük harf kontrolü
    if (password.match(/[a-z]/g)) {
        strength += 25;
    }
    
    // Büyük harf kontrolü
    if (password.match(/[A-Z]/g)) {
        strength += 25;
    }
    
    // Rakam ve özel karakter kontrolü
    if (password.match(/[0-9]/g) || password.match(/[^a-zA-Z0-9]/g)) {
        strength += 25;
    }
    
    // Güç durumunu belirle
    if (strength <= 25) {
        status = 'Zayıf';
        strengthBar.style.backgroundColor = '#e74c3c';
    } else if (strength <= 50) {
        status = 'Orta';
        strengthBar.style.backgroundColor = '#f39c12';
    } else if (strength <= 75) {
        status = 'İyi';
        strengthBar.style.backgroundColor = '#3498db';
    } else {
        status = 'Güçlü';
        strengthBar.style.backgroundColor = '#2ecc71';
    }
    
    // Güç çubuğunu güncelle
    strengthBar.style.width = strength + '%';
    
    // Güç metni güncellemesini çeviri ile yap
    if (window.getTranslation) {
        const translatedStatus = window.getTranslation(`validation.password_strength_${status.toLowerCase()}`);
        if (translatedStatus) {
            strengthText.textContent = window.getTranslation('validation.password_strength') + ': ' + translatedStatus;
        } else {
            strengthText.textContent = `Şifre Gücü: ${status}`;
        }
    } else {
        strengthText.textContent = `Şifre Gücü: ${status}`;
    }
}

/**
 * Tab panelleri işlevselliği
 */
function initTabPanels() {
    // Ürün detay sayfası tab panelleri
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                activateTab(button, tabId);
            });
        });
    }
    
    // Admin sayfası tab içerikleri
    const formTabs = document.querySelectorAll('.form-tab');
    if (formTabs.length > 0) {
        formTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                activateFormTab(tab, tabId);
            });
        });
    }
    
    // Yönetici paneli tab butonları
    const adminTabButtons = document.querySelectorAll('.tab-button');
    if (adminTabButtons.length > 0) {
        adminTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                activateAdminTab(button, tabId);
            });
        });
    }
    
    // Admin yan menü panelleri
    const adminMenuItems = document.querySelectorAll('.admin-menu-item');
    if (adminMenuItems.length > 0) {
        adminMenuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const panelId = item.getAttribute('data-panel');
                activateAdminPanel(item, panelId);
                
                // URL'yi güncelle (sadece admin.html sayfasında)
                if (window.location.pathname.includes('admin.html')) {
                    window.history.pushState({}, '', `#${panelId}`);
                }
            });
        });
        
        // URL hash ile panel aktivasyonu
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            const menuItem = document.querySelector(`.admin-menu-item[data-panel="${hash}"]`);
            if (menuItem) {
                activateAdminPanel(menuItem, hash);
            }
        }
    }
    
    // Profil sayfası tab kontrolü
    const profileMenuItems = document.querySelectorAll('.profile-menu-item');
    if (profileMenuItems.length > 0) {
        profileMenuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Sadece data-tab özniteliği olan öğeler için
                if (item.hasAttribute('data-tab')) {
                    e.preventDefault();
                    const tabId = item.getAttribute('data-tab');
                    activateProfileTab(item, tabId);
                    
                    // URL'yi güncelle
                    window.history.pushState({}, '', `#${tabId}`);
                }
            });
        });
        
        // URL hash ile tab aktivasyonu
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            const menuItem = document.querySelector(`.profile-menu-item[data-tab="${hash}"]`);
            if (menuItem) {
                activateProfileTab(menuItem, hash);
            }
        }
    }
}

/**
 * Ürün detay tab aktivasyonu
 * @param {HTMLElement} button - Aktif edilecek buton
 * @param {string} tabId - Aktif edilecek tab ID'si
 */
function activateTab(button, tabId) {
    // Tüm tabları deaktif et
    const allTabs = document.querySelectorAll('.tab-pane');
    const allTabButtons = document.querySelectorAll('.tab-btn');
    
    allTabs.forEach(tab => tab.classList.remove('active'));
    allTabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Seçilen tabı aktif et
    button.classList.add('active');
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

/**
 * Form tab aktivasyonu
 * @param {HTMLElement} tab - Aktif edilecek tab
 * @param {string} tabId - Aktif edilecek tab ID'si
 */
function activateFormTab(tab, tabId) {
    // Tüm tabları deaktif et
    const allTabs = document.querySelectorAll('.form-tab-content');
    const allFormTabs = document.querySelectorAll('.form-tab');
    
    allTabs.forEach(t => t.classList.remove('active'));
    allFormTabs.forEach(t => t.classList.remove('active'));
    
    // Seçilen tabı aktif et
    tab.classList.add('active');
    const selectedTab = document.getElementById(`${tabId}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

/**
 * Yönetici paneli tab aktivasyonu
 * @param {HTMLElement} button - Aktif edilecek buton
 * @param {string} tabId - Aktif edilecek tab ID'si
 */
function activateAdminTab(button, tabId) {
    // Tüm tabları deaktif et
    const tabContainer = button.closest('.tabs');
    const allTabs = tabContainer.querySelectorAll('.tab-content');
    const allTabButtons = tabContainer.querySelectorAll('.tab-button');
    
    allTabs.forEach(tab => tab.classList.remove('active'));
    allTabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Seçilen tabı aktif et
    button.classList.add('active');
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

/**
 * Yönetici paneli aktivasyonu
 * @param {HTMLElement} menuItem - Aktif edilecek menü öğesi
 * @param {string} panelId - Aktif edilecek panel ID'si
 */
function activateAdminPanel(menuItem, panelId) {
    // Tüm panelleri deaktif et
    const allPanels = document.querySelectorAll('.admin-panel');
    const allMenuItems = document.querySelectorAll('.admin-menu-item');
    
    allPanels.forEach(panel => panel.classList.remove('active'));
    allMenuItems.forEach(item => item.classList.remove('active'));
    
    // Seçilen paneli aktif et
    menuItem.classList.add('active');
    const selectedPanel = document.getElementById(panelId);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
}

/**
 * Profil sayfası tab aktivasyonu
 * @param {HTMLElement} menuItem - Aktif edilecek menü öğesi
 * @param {string} tabId - Aktif edilecek tab ID'si
 */
function activateProfileTab(menuItem, tabId) {
    // Tüm tabları deaktif et
    const allTabs = document.querySelectorAll('.profile-tab');
    const allMenuItems = document.querySelectorAll('.profile-menu-item');
    
    allTabs.forEach(tab => tab.classList.remove('active'));
    allMenuItems.forEach(item => item.classList.remove('active'));
    
    // Seçilen tabı aktif et
    menuItem.classList.add('active');
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

/**
 * İletişim formu işleme
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // İsteği başlat (Mock)
            contactForm.classList.add('loading');
            
            // API isteği yerine mock
            setTimeout(() => {
                contactForm.classList.remove('loading');
                
                // Başarılı mesajı göster
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                
                // Mesaj içeriğini çeviri ile yap
                if (window.getTranslation) {
                    successMessage.textContent = window.getTranslation('contact.success_message');
                } else {
                    successMessage.textContent = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
                }
                
                contactForm.appendChild(successMessage);
                
                // Formu sıfırla
                contactForm.reset();
                
                // Başarı mesajını kaldır
                setTimeout(() => {
                    contactForm.removeChild(successMessage);
                }, 5000);
            }, 1500);
        });
    }
}

/**
 * Bülten aboneliği formu işleme
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Form verilerini al
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // İsteği başlat (Mock)
            newsletterForm.classList.add('loading');
            
            // API isteği yerine mock
            setTimeout(() => {
                newsletterForm.classList.remove('loading');
                
                // Başarılı mesajı göster
                const formGroup = newsletterForm.querySelector('.form-group');
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                
                // Mesaj içeriğini çeviri ile yap
                if (window.getTranslation) {
                    successMessage.textContent = window.getTranslation('newsletter.success_message');
                } else {
                    successMessage.textContent = 'Bültenimize başarıyla abone oldunuz.';
                }
                
                formGroup.appendChild(successMessage);
                
                // Formu sıfırla
                newsletterForm.reset();
                
                // Başarı mesajını kaldır
                setTimeout(() => {
                    formGroup.removeChild(successMessage);
                }, 5000);
            }, 1500);
        });
    }
}

/**
 * Sayfa türüne özel işlevler
 */
function initPageSpecificFunctions() {
    // Sayfayı kontrol et ve ilgili işlevleri başlat
    const currentPage = window.location.pathname;
    
    // Admin sayfası
    if (currentPage.includes('admin.html')) {
        initAdminPage();
    }
    
    // Ödeme sayfası
    if (currentPage.includes('checkout.html')) {
        initCheckoutPage();
    }
    
    // Ürün detay sayfası
    if (currentPage.includes('product.html')) {
        initQuantitySelectors();
    }
    
    // Sepet sayfası
    if (currentPage.includes('cart.html')) {
        initQuantitySelectors();
    }
    
    // Giriş sayfası
    if (currentPage.includes('login.html')) {
        initLoginPage();
    }
}

/**
 * Admin sayfası işlevleri
 */
function initAdminPage() {
    // Admin sayfası için ek işlevler burada uygulanabilir
    console.log('Admin sayfası başlatıldı');
    
    // Admin template listesi için tıklama olayları
    const templateItems = document.querySelectorAll('.template-item');
    if (templateItems.length > 0) {
        templateItems.forEach(item => {
            item.addEventListener('click', () => {
                // Tüm öğeleri deaktif et
                templateItems.forEach(i => i.classList.remove('active'));
                
                // Seçilen öğeyi aktif et
                item.classList.add('active');
                
                // Şablon yükleme işlemi burada yapılabilir
                const templateKey = item.getAttribute('data-template');
                console.log(`Şablon yükleniyor: ${templateKey}`);
                
                // Şablon yükleme işlevi admin.js'de uygulanacak
            });
        });
    }
}

/**
 * Ödeme sayfası işlevleri
 */
function initCheckoutPage() {
    // Ödeme adımları arası geçiş
    const continueToPayment = document.getElementById('continue-to-payment');
    const backToShipping = document.getElementById('back-to-shipping');
    const placeOrder = document.getElementById('place-order');
    
    if (continueToPayment) {
        continueToPayment.addEventListener('click', () => {
            // Teslimat formunu doğrula
            const shippingForm = document.getElementById('shipping-address-form');
            if (validateForm(shippingForm)) {
                // Ödeme adımına geç
                goToCheckoutStep('payment');
            }
        });
    }
    
    if (backToShipping) {
        backToShipping.addEventListener('click', () => {
            goToCheckoutStep('shipping');
        });
    }
    
    if (placeOrder) {
        placeOrder.addEventListener('click', () => {
            // Ödeme formunu doğrula
            const paymentForm = document.getElementById('payment-method-form');
            if (validateForm(paymentForm)) {
                // Sipariş onay adımına geç
                goToCheckoutStep('confirmation');
                
                // Sipariş tamamlama işlemleri (simulasyon)
                simulateOrderProcessing();
            }
        });
    }
    
    // Ödeme yöntemi değişikliği
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    if (paymentMethods.length > 0) {
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                toggleCreditCardForm(method.value);
            });
        });
    }
}

/**
 * Ödeme sayfası adım geçişi
 * @param {string} step - Geçilecek adım ('shipping', 'payment', 'confirmation')
 */
function goToCheckoutStep(step) {
    // Tüm adım formlarını gizle
    const forms = document.querySelectorAll('.checkout-form');
    forms.forEach(form => form.classList.remove('active'));
    
    // İlgili formu göster
    const targetForm = document.getElementById(`${step}-form`);
    if (targetForm) {
        targetForm.classList.add('active');
    }
    
    // Adım göstergesini güncelle
    const steps = document.querySelectorAll('.step');
    steps.forEach(s => s.classList.remove('active'));
    
    // İlgili adımı ve önceki adımları aktif et
    const stepOrder = ['shipping', 'payment', 'confirmation'];
    const currentIndex = stepOrder.indexOf(step);
    
    for (let i = 0; i <= currentIndex; i++) {
        const activeStep = document.querySelector(`.step[data-step="${stepOrder[i]}"]`);
        if (activeStep) {
            activeStep.classList.add('active');
        }
        
        // Adım ayırıcılarını güncelle
        if (i < currentIndex) {
            const divider = activeStep.nextElementSibling;
            if (divider && divider.classList.contains('step-divider')) {
                divider.classList.add('active');
            }
        }
    }
}

/**
 * Kredi kartı formunu göster/gizle
 * @param {string} paymentMethod - Seçilen ödeme yöntemi
 */
function toggleCreditCardForm(paymentMethod) {
    const creditCardForm = document.getElementById('credit-card-form');
    
    if (creditCardForm) {
        if (paymentMethod === 'credit-card') {
            creditCardForm.style.display = 'block';
        } else {
            creditCardForm.style.display = 'none';
        }
    }
}

/**
 * Sipariş işleme simulasyonu
 */
function simulateOrderProcessing() {
    // Gerçek uygulamada burada API çağrısı yapılacak
    // Bu sadece demo amaçlı bir simulasyon
    
    // Örnek sipariş numarası oluştur
    const orderNumber = `#${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Sipariş tarihini bugün olarak ayarla
    const orderDate = new Date().toLocaleDateString();
    
    // Sipariş bilgilerini güncelle
    const orderNumberElement = document.getElementById('order-number');
    const orderDateElement = document.getElementById('order-date');
    
    if (orderNumberElement) {
        orderNumberElement.textContent = orderNumber;
    }
    
    if (orderDateElement) {
        orderDateElement.textContent = orderDate;
    }
    
    // localStorage'a sipariş bilgilerini kaydet (sepeti temizlemek için)
    localStorage.setItem('lastOrderNumber', orderNumber);
    localStorage.setItem('lastOrderDate', orderDate);
    localStorage.removeItem('cart'); // Sepeti temizle
    
    // Sepet sayacını güncelle
    updateCartCount(0);
}

/**
 * Miktar seçicileri işlevselliği
 */
function initQuantitySelectors() {
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    
    quantitySelectors.forEach(selector => {
        const decreaseBtn = selector.querySelector('.decrease');
        const increaseBtn = selector.querySelector('.increase');
        const input = selector.querySelector('input');
        
        if (decreaseBtn && increaseBtn && input) {
            decreaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    // Değişiklik olayını tetikle
                    input.dispatchEvent(new Event('change'));
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                const max = parseInt(input.getAttribute('max') || '10');
                
                if (currentValue < max) {
                    input.value = currentValue + 1;
                    // Değişiklik olayını tetikle
                    input.dispatchEvent(new Event('change'));
                }
            });
            
            // Manuel giriş kontrolü
            input.addEventListener('input', () => {
                let value = parseInt(input.value);
                const min = parseInt(input.getAttribute('min') || '1');
                const max = parseInt(input.getAttribute('max') || '10');
                
                if (isNaN(value) || value < min) {
                    value = min;
                } else if (value > max) {
                    value = max;
                }
                
                input.value = value;
            });
        }
    });
}

/**
 * Giriş sayfası işlevleri
 */
function initLoginPage() {
    // Admin giriş formunu göster/gizle
    const adminLoginToggle = document.getElementById('admin-login-toggle');
    const adminLoginForm = document.getElementById('admin-login-form');
    const userLoginForm = document.getElementById('login-form');
    const backToUserLogin = document.getElementById('back-to-user-login');
    
    if (adminLoginToggle && adminLoginForm && userLoginForm) {
        adminLoginToggle.addEventListener('click', (e) => {
            e.preventDefault();
            userLoginForm.classList.add('hidden');
            adminLoginForm.classList.remove('hidden');
        });
    }
    
    if (backToUserLogin && adminLoginForm && userLoginForm) {
        backToUserLogin.addEventListener('click', (e) => {
            e.preventDefault();
            adminLoginForm.classList.add('hidden');
            userLoginForm.classList.remove('hidden');
        });
    }
}

/**
 * Form doğrulama
 * @param {HTMLElement} form - Doğrulanacak form
 * @returns {boolean} - Form geçerli mi?
 */
function validateForm(form) {
    let isValid = true;
    
    // Tüm gerekli alanları kontrol et
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            highlightInvalidField(field);
        } else {
            removeInvalidHighlight(field);
        }
    });
    
    return isValid;
}

/**
 * Kaydırma olayları
 */
function initScrollEvents() {
    // Sayfa içi bağlantılar için yumuşak kaydırma
    const inPageLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    inPageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Yumuşak kaydırma
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Başlık çubuğu için offset
                    behavior: 'smooth'
                });
                
                // URL'yi güncelle
                window.history.pushState({}, '', `#${targetId}`);
            }
        });
    });
    
    // Geri Yukarı butonu
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Para birimini formatla
 * @param {number} amount - Formatlanacak miktar
 * @param {string} language - Dil kodu ('tr', 'en', 'ar')
 * @returns {string} - Formatlanmış para birimi
 */
function formatCurrency(amount, language = 'tr') {
    const currencySymbol = siteConfig.currency[language] || '₺';
    
    // Binlik ayraçları ve ondalık nokta formatı
    const formattedAmount = amount.toLocaleString(
        language === 'tr' ? 'tr-TR' : (language === 'en' ? 'en-US' : 'ar-SA'),
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );
    
    // Para birimi konumu
    return language === 'ar' ? `${formattedAmount} ${currencySymbol}` : `${currencySymbol}${formattedAmount}`;
}

/**
 * Sepet sayacını güncelle
 * @param {number} count - Sepetteki öğe sayısı
 */
function updateCartCount(count) {
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        
        // Eğer sayı 0 ise gizle, değilse göster
        if (count === 0) {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
    });
}

/**
 * Ürün fiyatını ağırlığa göre hesapla
 * @param {number} basePrice - Temel ürün fiyatı
 * @param {number} weight - Seçilen ağırlık (gram)
 * @returns {number} - Hesaplanan fiyat
 */
function calculatePriceByWeight(basePrice, weight) {
    // Varsayılan ağırlık 250g
    const defaultWeight = 250;
    
    // Orantısal hesaplama
    return basePrice * (weight / defaultWeight);
}

// Global işlevleri dışa aktar
window.formatCurrency = formatCurrency;
window.calculatePriceByWeight = calculatePriceByWeight;
window.updateCartCount = updateCartCount;
window.openModal = openModal;
window.closeModal = closeModal;
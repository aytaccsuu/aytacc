/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Ödeme Sistemi JavaScript Dosyası
 */

// İyzico API için konfigürasyon
const iyzico = {
    // Test ortamı için mock API anahtarları
    apiKey: 'sandbox-xxxxxxxxxxxx',
    secretKey: 'sandbox-xxxxxxxxxxxx',
    baseUrl: 'https://sandbox-api.iyzipay.com'
};

// Ödeme adımları arasındaki geçişler için değişkenler
let currentStep = 'shipping';
let paymentMethod = 'credit-card';
let orderCreated = false;

/**
 * Sayfanın ilk yüklenişinde çalışacak fonksiyon
 */
document.addEventListener('DOMContentLoaded', () => {
    // Ödeme sayfası kontrolü
    if (window.location.pathname.includes('checkout.html')) {
        initCheckoutProcess();
    }
});

/**
 * Ödeme sürecini başlatma
 */
function initCheckoutProcess() {
    // Sepet özetini yükle
    loadCartSummary();
    
    // Adım butonlarına olayları ekle
    const continueToPaymentButton = document.getElementById('continue-to-payment');
    const backToShippingButton = document.getElementById('back-to-shipping');
    const placeOrderButton = document.getElementById('place-order');
    
    if (continueToPaymentButton) {
        continueToPaymentButton.addEventListener('click', () => {
            // Teslimat bilgilerini doğrula ve kaydet
            if (validateShippingForm()) {
                saveShippingInfo();
                goToStep('payment');
            }
        });
    }
    
    if (backToShippingButton) {
        backToShippingButton.addEventListener('click', () => {
            goToStep('shipping');
        });
    }
    
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', () => {
            // Ödeme bilgilerini doğrula ve siparişi tamamla
            if (validatePaymentForm()) {
                processPayment();
            }
        });
    }
    
    // Ödeme yöntemi değişikliğini dinle
    const paymentMethodOptions = document.querySelectorAll('input[name="payment-method"]');
    paymentMethodOptions.forEach(option => {
        option.addEventListener('change', function() {
            paymentMethod = this.value;
            togglePaymentFormFields(paymentMethod);
        });
    });
    
    // Sayfa içi navigasyon ve geri tuşu yönetimi
    window.addEventListener('popstate', handleBackNavigation);
    
    // Şehir değişikliğinde ilçe seçeneklerini güncelleme
    const citySelect = document.getElementById('city');
    if (citySelect) {
        citySelect.addEventListener('change', function() {
            updateDistrictOptions(this.value);
        });
    }
    
    // Sipariş detayı butonuna olayını ekle
    const viewOrderButton = document.getElementById('view-order');
    if (viewOrderButton) {
        viewOrderButton.addEventListener('click', () => {
            // Sipariş detayı sayfasına yönlendir 
            // Gerçek uygulamada sipariş id ile profil sayfasına yönlendirilir
            window.location.href = 'profile.html#orders';
        });
    }
    
    // Kredi kartı formatını uygula
    initPaymentInputFormatting();
}

/**
 * Ödeme adımları arası geçiş
 * @param {string} step - Geçilecek adım ('shipping', 'payment', 'confirmation')
 */
function goToStep(step) {
    // Geçerli adımı güncelle
    currentStep = step;
    
    // URL'yi güncelle (tarayıcı geçmişi için)
    window.history.pushState({ step: step }, '', `#${step}`);
    
    // Tüm adım formlarını gizle
    const forms = document.querySelectorAll('.checkout-form');
    forms.forEach(form => {
        form.classList.remove('active');
    });
    
    // İlgili adım formunu göster
    const targetForm = document.getElementById(`${step}-form`);
    if (targetForm) {
        targetForm.classList.add('active');
    }
    
    // Adım göstergesini güncelle
    updateStepIndicator(step);
}

/**
 * Adım göstergesini güncelleme
 * @param {string} currentStep - Mevcut adım ('shipping', 'payment', 'confirmation')
 */
function updateStepIndicator(currentStep) {
    const steps = document.querySelectorAll('.step');
    const stepDividers = document.querySelectorAll('.step-divider');
    
    // Adım sırası
    const stepOrder = ['shipping', 'payment', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    // Tüm adımları sıfırla
    steps.forEach(step => step.classList.remove('active'));
    stepDividers.forEach(divider => divider.classList.remove('active'));
    
    // Mevcut ve önceki adımları aktifleştir
    for (let i = 0; i <= currentIndex; i++) {
        const step = document.querySelector(`.step[data-step="${stepOrder[i]}"]`);
        if (step) {
            step.classList.add('active');
        }
        
        // Adım ayırıcıları güncelle
        if (i < currentIndex) {
            const nextStep = document.querySelector(`.step[data-step="${stepOrder[i+1]}"]`);
            if (nextStep) {
                const divider = nextStep.previousElementSibling;
                if (divider && divider.classList.contains('step-divider')) {
                    divider.classList.add('active');
                }
            }
        }
    }
}

/**
 * Tarayıcı geri tuşu yönetimi
 * @param {Event} event - Popstate olayı
 */
function handleBackNavigation(event) {
    if (event.state && event.state.step) {
        goToStep(event.state.step);
    } else {
        // Varsayılan olarak teslimat adımına dönüş
        goToStep('shipping');
    }
}

/**
 * Geçersiz form alanını vurgulama
 * @param {HTMLElement} field - Vurgulanacak form alanı
 * @param {string} message - Hata mesajı (opsiyonel)
 */
function highlightInvalidField(field, message) {
    field.classList.add('invalid');
    
    // Geçersizlik mesajı ekle
    const parent = field.parentElement;
    let errorMessage = parent.querySelector('.error-message');
    
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        parent.appendChild(errorMessage);
    }
    
    // Eğer özel bir mesaj verilmişse onu göster, yoksa varsayılan mesajı göster
    if (message) {
        errorMessage.textContent = message;
    } else {
        errorMessage.textContent = window.getTranslation ? 
            window.getTranslation('validation.required') : 
            'Bu alan gereklidir.';
    }
    
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
 * Teslimat formunu doğrulama
 * @returns {boolean} - Form geçerliyse true, değilse false
 */
function validateShippingForm() {
    const form = document.getElementById('shipping-address-form');
    if (!form) return false;
    
    let isValid = true;
    
    // Form elemanlarını doğrula
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
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !validateEmail(emailField.value)) {
        isValid = false;
        highlightInvalidField(emailField, "Geçerli bir e-posta adresi giriniz.");
    }
    
    // Telefon doğrulama
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value && !validatePhone(phoneField.value)) {
        isValid = false;
        highlightInvalidField(phoneField, "Geçerli bir telefon numarası giriniz.");
    }
    
    return isValid;
}

/**
 * Ödeme formunu doğrulama
 * @returns {boolean} - Form geçerliyse true, değilse false
 */
function validatePaymentForm() {
    const termsAccepted = document.getElementById('terms-accepted');
    
    // Sözleşme onayını kontrol et
    if (!termsAccepted.checked) {
        // Sözleşmenin kabul edilmesi gerektiğini belirt
        const parent = termsAccepted.closest('.terms-acceptance');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = window.getTranslation ? 
            window.getTranslation('checkout.accept_terms_error') : 
            'Devam etmek için şartları kabul etmelisiniz.';
        
        // Eğer hata mesajı zaten eklenmemişse, ekle
        if (!parent.querySelector('.error-message')) {
            parent.appendChild(errorMessage);
        }
        
        return false;
    }
    
    // Kredi kartı ödemesi seçilmişse kart bilgilerini doğrula
    if (paymentMethod === 'credit-card') {
        const cardForm = document.getElementById('credit-card-form');
        if (!cardForm) return true; // Form yoksa doğrulama yapma
        
        let isValid = true;
        
        // Kart sahibi adını doğrula
        const cardHolder = document.getElementById('card-holder');
        if (cardHolder && !cardHolder.value.trim()) {
            isValid = false;
            highlightInvalidField(cardHolder);
        }
        
        // Kart numarasını doğrula
        const cardNumber = document.getElementById('card-number');
        if (cardNumber && !validateCardNumber(cardNumber.value)) {
            isValid = false;
            highlightInvalidField(cardNumber, "Geçerli bir kart numarası giriniz.");
        }
        
        // Son kullanma tarihini doğrula
        const expiryDate = document.getElementById('expiry-date');
        if (expiryDate && !validateExpiryDate(expiryDate.value)) {
            isValid = false;
            highlightInvalidField(expiryDate, "Geçerli bir son kullanma tarihi giriniz (AA/YY).");
        }
        
        // CVV kodunu doğrula
        const cvv = document.getElementById('cvv');
        if (cvv && !validateCVV(cvv.value)) {
            isValid = false;
            highlightInvalidField(cvv, "Geçerli bir CVV kodu giriniz.");
        }
        
        return isValid;
    }
    
    // Diğer ödeme yöntemlerinde doğrulama gerekmiyor
    return true;
}

/**
 * Teslimat bilgilerini kaydetme
 */
function saveShippingInfo() {
    // Gerçek bir API çağrısında, burada girilen bilgiler sunucuya gönderilir
    // Bu örnekte localStorage'a kaydediyoruz
    
    const shippingData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        district: document.getElementById('district').value,
        postalCode: document.getElementById('postal-code').value,
        note: document.getElementById('shipping-note').value
    };
    
    localStorage.setItem('checkoutShippingInfo', JSON.stringify(shippingData));
}

/**
 * Ödeme işlemi
 */
function processPayment() {
    // Yükleniyor göster
    showProcessingPayment();
    
    // Ödeme yöntemine göre farklı işlem yap
    if (paymentMethod === 'credit-card') {
        // İyzico API'si ile ödeme işlemi (mock)
        processIyzicoPayment();
    } else {
        // Kapıda ödeme için doğrudan sipariş oluştur
        createOrder(paymentMethod);
    }
}

/**
 * Ödeme işlemi sırasında yükleniyor göstergesi
 */
function showProcessingPayment() {
    const placeOrderButton = document.getElementById('place-order');
    if (placeOrderButton) {
        placeOrderButton.disabled = true;
        placeOrderButton.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>${window.getTranslation ? window.getTranslation('checkout.processing') : 'İşleniyor...'}</span>
        `;
    }
}

/**
 * İyzico ile ödeme işlemi (mock)
 */
function processIyzicoPayment() {
    // Burada gerçek bir API çağrısı yapılacak
    // Bu örnekte, başarılı olduğunu varsayıyoruz
    
    // Kart bilgilerini al
    const cardHolder = document.getElementById('card-holder').value;
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiry-date').value.split('/');
    const cvv = document.getElementById('cvv').value;
    
    // İyzico için kart bilgilerini hazırla
    const cardInfo = {
        cardHolderName: cardHolder,
        cardNumber: cardNumber,
        expireMonth: expiryDate[0],
        expireYear: '20' + expiryDate[1],
        cvc: cvv
    };
    
    // Sipariş bilgilerini al
    const shippingInfo = JSON.parse(localStorage.getItem('checkoutShippingInfo') || '{}');
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
    // Mock API çağrısını simüle et (2 saniye gecikme)
    setTimeout(() => {
        // Burada gerçek API çağrısı olacak
        // Başarılı yanıt varsayalım
        const paymentResponse = {
            status: 'success',
            transactionId: 'IYZICO' + Math.floor(Math.random() * 1000000)
        };
        
        if (paymentResponse.status === 'success') {
            // Ödeme başarılı - sipariş oluştur
            createOrder('credit-card', paymentResponse.transactionId);
        } else {
            // Ödeme başarısız - hata göster
            showPaymentError("Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }, 2000);
}

/**
 * Sipariş oluşturma
 * @param {string} paymentMethod - Ödeme yöntemi
 * @param {string} transactionId - Ödeme işlem ID'si (varsa)
 */
function createOrder(paymentMethod, transactionId = null) {
    // Sipariş verilerini hazırla
    const shippingInfo = JSON.parse(localStorage.getItem('checkoutShippingInfo') || '{}');
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
    // Sipariş numarası oluştur
    const orderNumber = generateOrderNumber();
    const orderDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatı
    
    // Sipariş nesnesi
    const order = {
        id: orderNumber,
        date: orderDate,
        customerInfo: shippingInfo,
        items: cart.items || [],
        totalAmount: cart.total || 0,
        paymentMethod: paymentMethod,
        transactionId: transactionId,
        status: 'pending'
    };
    
    // Gerçek bir API çağrısında, bu sipariş verileri sunucuya gönderilir
    // Bu örnekte, başarılı olduğunu varsayıyoruz
    
    // Mock API çağrısını simüle et (1 saniye gecikme)
    setTimeout(() => {
        // Siparişi kaydet (localStorage kullanıyoruz)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Sipariş bilgilerini göster
        completeOrder(orderNumber, orderDate);
        
        // Sepeti temizle
        localStorage.removeItem('cart');
        
        // Sipariş tamamlandı bayrağını ayarla
        orderCreated = true;
    }, 1000);
}

/**
 * Sipariş numarası oluşturma
 * @returns {string} - Sipariş numarası
 */
function generateOrderNumber() {
    const prefix = 'OSK'; // Özyürek Şekerleme Kodu
    const timestamp = new Date().getTime().toString().substr(-6); // Son 6 basamak
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3 basamaklı rastgele sayı
    return `${prefix}${timestamp}${random}`;
}/**
 * Siparişi tamamlama
 * @param {string} orderNumber - Sipariş numarası
 * @param {string} orderDate - Sipariş tarihi
 */
function completeOrder(orderNumber, orderDate) {
    // Sipariş numarası ve tarihini göster
    const orderNumberElement = document.getElementById('order-number');
    const orderDateElement = document.getElementById('order-date');
    
    if (orderNumberElement) {
        orderNumberElement.textContent = orderNumber;
    }
    
    if (orderDateElement) {
        orderDateElement.textContent = formatDate(orderDate);
    }
    
    // Onay adımına geç
    goToStep('confirmation');
    
    // Sepet sayacını güncelle
    if (window.updateCartCount) {
        window.updateCartCount(0);
    }
}

/**
 * Tarihi formatla
 * @param {string} dateString - YYYY-MM-DD formatında tarih
 * @returns {string} - Formatlanmış tarih
 */
function formatDate(dateString) {
    const currentLang = localStorage.getItem('language') || 'tr';
    
    try {
        const date = new Date(dateString);
        
        // Dile göre tarih formatı
        if (currentLang === 'tr') {
            return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } else if (currentLang === 'en') {
            return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        } else if (currentLang === 'ar') {
            return date.toLocaleDateString('ar-SA', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
        
        return date.toLocaleDateString();
    } catch (error) {
        return dateString;
    }
}

/**
 * Ödeme hatasını gösterme
 * @param {string} errorMessage - Hata mesajı
 */
function showPaymentError(errorMessage) {
    // Ödeme butonunu normale döndür
    const placeOrderButton = document.getElementById('place-order');
    if (placeOrderButton) {
        placeOrderButton.disabled = false;
        placeOrderButton.innerHTML = `
            <span>${window.getTranslation ? window.getTranslation('checkout.place_order') : 'Siparişi Tamamla'}</span>
        `;
    }
    
    // Hata mesajını göster
    const paymentForm = document.getElementById('payment-method-form');
    if (paymentForm) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'payment-error-message';
        errorDiv.textContent = errorMessage;
        
        // Mevcut hata mesajını kaldır
        const existingError = paymentForm.querySelector('.payment-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Yeni hata mesajını ekle
        paymentForm.appendChild(errorDiv);
        
        // 5 saniye sonra hata mesajını kaldır
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

/**
 * Ödeme yöntemine göre form alanlarını göster/gizle
 * @param {string} method - Ödeme yöntemi
 */
function togglePaymentFormFields(method) {
    const creditCardForm = document.getElementById('credit-card-form');
    
    if (creditCardForm) {
        if (method === 'credit-card') {
            creditCardForm.style.display = 'block';
        } else {
            creditCardForm.style.display = 'none';
        }
    }
}

/**
 * Sepet özetini yükleme
 */
function loadCartSummary() {
    // Sepeti localStorage'dan yükle
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
    // Sepet boşsa ana sayfaya yönlendir
    if (!cart.items || cart.items.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Sipariş öğeleri listesini hazırla
    const orderItemsContainer = document.getElementById('order-items');
    if (orderItemsContainer) {
        // Dil ayarı
        const currentLang = localStorage.getItem('language') || 'tr';
        
        // İçeriği oluştur
        let itemsHTML = '';
        
        cart.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            const formattedPrice = window.formatCurrency ? 
                window.formatCurrency(itemTotal, currentLang) : 
                `₺${itemTotal.toFixed(2)}`;
            
            // Ağırlık bilgisi
            const weightText = item.weight >= 1000 ? 
                `${item.weight / 1000} kg` : 
                `${item.weight} g`;
            
            itemsHTML += `
                <div class="order-item">
                    <div class="order-item-image">
                        <img src="${item.image}" alt="${item.name[currentLang]}">
                    </div>
                    <div class="order-item-info">
                        <h4 class="order-item-name">${item.name[currentLang]}</h4>
                        <div class="order-item-meta">
                            <span>${weightText} x ${item.quantity}</span>
                        </div>
                    </div>
                    <div class="order-item-price">
                        ${formattedPrice}
                    </div>
                </div>
            `;
        });
        
        // İçeriği sayfaya ekle
        orderItemsContainer.innerHTML = itemsHTML;
    }
    
    // Sipariş özetini güncelle
    updateOrderSummaryTotals(cart);
}

/**
 * Sipariş özeti toplam tutarlarını güncelleme
 * @param {Object} cart - Sepet verileri
 */
function updateOrderSummaryTotals(cart) {
    const currentLang = localStorage.getItem('language') || 'tr';
    
    // Toplam tutarlar
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const discountElement = document.getElementById('checkout-discount');
    const discountRow = document.getElementById('checkout-discount-row');
    const totalElement = document.getElementById('checkout-total');
    
    if (subtotalElement) {
        subtotalElement.textContent = window.formatCurrency ? 
            window.formatCurrency(cart.subtotal, currentLang) : 
            `₺${cart.subtotal.toFixed(2)}`;
    }
    
    if (shippingElement) {
        const shippingText = cart.shipping === 0 ? 
            (window.getTranslation ? window.getTranslation('checkout.free_shipping') : 'Ücretsiz') : 
            (window.formatCurrency ? window.formatCurrency(cart.shipping, currentLang) : `₺${cart.shipping.toFixed(2)}`);
            
        shippingElement.textContent = shippingText;
    }
    
    if (discountElement && discountRow) {
        if (cart.discount && cart.discount > 0) {
            discountElement.textContent = window.formatCurrency ? 
                `-${window.formatCurrency(cart.discount, currentLang)}` : 
                `-₺${cart.discount.toFixed(2)}`;
            discountRow.style.display = 'flex';
        } else {
            discountRow.style.display = 'none';
        }
    }
    
    if (totalElement) {
        totalElement.textContent = window.formatCurrency ? 
            window.formatCurrency(cart.total, currentLang) : 
            `₺${cart.total.toFixed(2)}`;
    }
}

/**
 * İlçe seçeneklerini güncelleme
 * @param {string} city - Seçilen şehir
 */
function updateDistrictOptions(city) {
    const districtSelect = document.getElementById('district');
    if (!districtSelect) return;
    
    // Seçenekleri temizle
    districtSelect.innerHTML = '';
    
    // Varsayılan seçenek ekle
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = window.getTranslation ? 
        window.getTranslation('checkout.select_district') : 
        'İlçe Seçiniz';
    defaultOption.setAttribute('data-i18n', 'checkout.select_district');
    districtSelect.appendChild(defaultOption);
    
    // Mock ilçe verileri (gerçek uygulamada API'den gelecek)
    const districtData = {
        'istanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Beyoğlu', 'Ataşehir', 'Maltepe'],
        'ankara': ['Çankaya', 'Keçiören', 'Mamak', 'Yenimahalle', 'Etimesgut'],
        'izmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli']
    };
    
    // İlçeleri ekle
    if (city && districtData[city.toLowerCase()]) {
        districtData[city.toLowerCase()].forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase();
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

/**
 * Ödeme formu giriş alanlarının formatlanması
 */
function initPaymentInputFormatting() {
    // Kredi kartı numarası formatı
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            // 16 haneyle sınırla
            if (value.length > 16) {
                value = value.substring(0, 16);
            }
            
            // Her 4 hanede bir boşluk ekle
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue;
        });
    }
    
    // Son kullanma tarihi formatı (AA/YY)
    const expiryDateInput = document.getElementById('expiry-date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            // 4 haneyle sınırla
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
            
            // İlk iki hane 1-12 arasında olmalı
            if (value.length >= 2) {
                let month = parseInt(value.substring(0, 2));
                if (month > 12) {
                    month = 12;
                } else if (month < 1) {
                    month = 1;
                }
                
                value = month.toString().padStart(2, '0') + value.substring(2);
            }
            
            // 2 haneden sonra '/' ekle
            if (value.length > 2) {
                this.value = value.substring(0, 2) + '/' + value.substring(2);
            } else {
                this.value = value;
            }
        });
    }
    
    // CVV formatı (3 veya 4 hane)
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            // 4 haneyle sınırla
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
            
            this.value = value;
        });
    }
}

// Yardımcı Doğrulama Fonksiyonları

/**
 * E-posta doğrulaması
 * @param {string} email - Doğrulanacak e-posta
 * @returns {boolean} - Geçerli ise true, değilse false
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Telefon numarası doğrulaması
 * @param {string} phone - Doğrulanacak telefon numarası
 * @returns {boolean} - Geçerli ise true, değilse false
 */
function validatePhone(phone) {
    // En az 10 rakam içermeli
    return phone.replace(/\D/g, '').length >= 10;
}

/**
 * Kredi kartı numarası doğrulaması
 * @param {string} cardNumber - Doğrulanacak kart numarası
 * @returns {boolean} - Geçerli ise true, değilse false
 */
function validateCardNumber(cardNumber) {
    // Boşlukları kaldır
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    // 13 ile 19 haneli olmalı
    if (!/^\d{13,19}$/.test(cleanNumber)) {
        return false;
    }
    
    // Luhn algoritması ile doğrulama (kredi kartı algoritması)
    let sum = 0;
    let shouldDouble = false;
    
    // Sondan başlayarak doğrulama
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber.charAt(i));
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
}

/**
 * Son kullanma tarihi doğrulaması
 * @param {string} expiryDate - Doğrulanacak son kullanma tarihi (AA/YY formatında)
 * @returns {boolean} - Geçerli ise true, değilse false
 */
function validateExpiryDate(expiryDate) {
    // AA/YY formatını kontrol et
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        return false;
    }
    
    const [month, year] = expiryDate.split('/').map(part => parseInt(part, 10));
    
    // Ay 1-12 arasında olmalı
    if (month < 1 || month > 12) {
        return false;
    }
    
    // Şu anki tarih bilgisini al
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Son iki hane
    const currentMonth = now.getMonth() + 1; // JavaScript'te aylar 0-11 arasında
    
    // Geçmiş tarihleri reddet
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }
    
    return true;
}

/**
 * CVV doğrulaması
 * @param {string} cvv - Doğrulanacak CVV kodu
 * @returns {boolean} - Geçerli ise true, değilse false
 */
function validateCVV(cvv) {
    // CVV 3 veya 4 haneli olmalı
    return /^\d{3,4}$/.test(cvv);
}
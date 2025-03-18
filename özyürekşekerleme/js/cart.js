/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Sepet İşlemleri JavaScript Dosyası (Bölüm 1)
 */

// Sepet nesnesi 
let cart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    couponCode: null
};

// Varsayılan kargo ücreti
const SHIPPING_FEE = 25.00;
// Ücretsiz kargo için minimum sepet tutarı
const FREE_SHIPPING_THRESHOLD = 250.00;

/**
 * Sayfanın ilk yüklenişinde çalışacak fonksiyon
 */
document.addEventListener('DOMContentLoaded', () => {
    // Sepeti localStorage'dan yükle
    loadCartFromStorage();
    
    // Sayfa türüne göre ilgili fonksiyonları çağır
    const currentPage = window.location.pathname;
    
    // Sepet sayfası işlevleri
    if (currentPage.includes('cart.html')) {
        displayCart();
        initCartEvents();
    }
    
    // Ödeme sayfası işlevleri
    if (currentPage.includes('checkout.html')) {
        displayOrderSummary();
    }
    
    // Sepet sayacını güncelle (tüm sayfalarda)
    updateCartCount(cart.items.length);
});

/**
 * localStorage'dan sepet verilerini yükleme
 */
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            
            // Sepet öğelerini doğrula ve filtreleme - bozuk verileri önlemek için
            if (Array.isArray(cart.items)) {
                cart.items = cart.items.filter(item => 
                    item && 
                    typeof item === 'object' && 
                    item.id && 
                    item.quantity > 0
                );
            } else {
                cart.items = [];
            }
            
            // Toplam tutarları yeniden hesapla
            calculateCartTotals();
        } catch (error) {
            console.error('Sepet verileri yüklenirken hata oluştu:', error);
            resetCart();
        }
    } else {
        resetCart();
    }
}

/**
 * Sepeti sıfırlama
 */
function resetCart() {
    cart = {
        items: [],
        subtotal: 0,
        shipping: 0,
        discount: 0,
        total: 0,
        couponCode: null
    };
    
    saveCartToStorage();
}

/**
 * Sepeti localStorage'a kaydetme
 */
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Sepet sayacını güncelle
    updateCartCount(cart.items.length);
}

/**
 * Sepete ürün ekleme
 * @param {number} productId - Eklenecek ürün ID'si
 * @param {number} quantity - Eklenecek miktar
 * @param {number} weight - Seçilen ağırlık (g)
 */
function addToCart(productId, quantity = 1, weight = 250) {
    // Ürünü bul
    const product = mockProducts.find(p => p.id === parseInt(productId));
    
    if (!product) {
        console.error(`Ürün bulunamadı: ID ${productId}`);
        return;
    }
    
    // Ağırlık seçeneğini bul
    const weightOption = product.weight_options.find(opt => opt.weight === parseInt(weight));
    
    if (!weightOption) {
        console.error(`Ağırlık seçeneği bulunamadı: ${weight}g`);
        return;
    }
    
    // Ürün fiyatını al
    const price = weightOption.price;
    const oldPrice = weightOption.old_price || null;
    
    // Sepette aynı ürün ve ağırlıkta başka bir öğe var mı kontrol et
    const existingItemIndex = cart.items.findIndex(item => 
        item.id === product.id && item.weight === parseInt(weight)
    );
    
    if (existingItemIndex !== -1) {
        // Varsa miktarı güncelle
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        // Yoksa yeni öğe ekle
        const currentLang = localStorage.getItem('language') || 'tr';
        
        cart.items.push({
            id: product.id,
            name: product.name,
            price: price,
            oldPrice: oldPrice,
            image: product.images[0],
            quantity: quantity,
            weight: parseInt(weight),
            sku: product.sku
        });
    }
    
    // Toplam tutarları güncelle
    calculateCartTotals();
    
    // Sepeti kaydet
    saveCartToStorage();
    
    return true;
}

/**
 * Sepetten ürün silme
 * @param {number} index - Silinecek ürünün indeksi
 */
function removeFromCart(index) {
    if (index >= 0 && index < cart.items.length) {
        cart.items.splice(index, 1);
        
        // Toplam tutarları güncelle
        calculateCartTotals();
        
        // Sepeti kaydet
        saveCartToStorage();
        
        return true;
    }
    
    return false;
}

/**
 * Sepet ürün miktarını güncelleme
 * @param {number} index - Güncellenecek ürünün indeksi
 * @param {number} quantity - Yeni miktar
 */
function updateCartItemQuantity(index, quantity) {
    if (index >= 0 && index < cart.items.length) {
        // Miktar geçerli mi kontrol et
        if (quantity <= 0) {
            // Miktar 0 veya negatifse ürünü sepetten kaldır
            return removeFromCart(index);
        }
        
        // Miktarı güncelle
        cart.items[index].quantity = quantity;
        
        // Toplam tutarları güncelle
        calculateCartTotals();
        
        // Sepeti kaydet
        saveCartToStorage();
        
        return true;
    }
    
    return false;
}

/**
 * Sepet toplam tutarlarını hesaplama
 */
function calculateCartTotals() {
    // Ara toplam
    cart.subtotal = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    
    // Kargo ücreti
    cart.shipping = cart.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    
    // İndirim (kupon kodu varsa)
    cart.discount = calculateDiscount();
    
    // Genel toplam
    cart.total = Math.max(0, cart.subtotal + cart.shipping - cart.discount);
}

/**
 * İndirim tutarını hesaplama
 * @returns {number} - Hesaplanan indirim tutarı
 */
function calculateDiscount() {
    // Bu fonksiyon ikinci kısımda daha ayrıntılı olarak ele alınacak
    // Şimdilik basit bir hesaplama yapalım
    if (!cart.couponCode) return 0;
    
    // Örnek kupon kodları ve indirimleri
    const coupons = {
        'WELCOME10': { type: 'percentage', value: 10 },
        'OZYRK20': { type: 'percentage', value: 20 },
        'FREESHIP': { type: 'free_shipping', value: SHIPPING_FEE },
        'FLAT50TL': { type: 'fixed', value: 50 }
    };
    
    const coupon = coupons[cart.couponCode];
    
    if (!coupon) return 0;
    
    if (coupon.type === 'percentage') {
        return (cart.subtotal * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
        return Math.min(cart.subtotal, coupon.value);
    } else if (coupon.type === 'free_shipping') {
        cart.shipping = 0;
        return 0;
    }
    
    return 0;
}

/**
 * Sepeti temizleme
 */
function clearCart() {
    cart.items = [];
    cart.couponCode = null;
    
    // Toplam tutarları güncelle
    calculateCartTotals();
    
    // Sepeti kaydet
    saveCartToStorage();
    
    // Sepet sayfasını güncelle
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
}

/**
 * Sepet içeriğini gösterme
 */
function displayCart() {
    const cartContent = document.getElementById('cart-content');
    const emptyCart = document.getElementById('empty-cart');
    const filledCart = document.getElementById('filled-cart');
    const cartLoader = document.getElementById('cart-loader');
    
    if (!cartContent || !emptyCart || !filledCart || !cartLoader) return;
    
    // Yükleniyor durumunu göster
    cartLoader.classList.remove('hidden');
    emptyCart.classList.add('hidden');
    filledCart.classList.add('hidden');
    
    // Biraz gecikme ekle (gerçek uygulamada API çağrısı olacak)
    setTimeout(() => {
        cartLoader.classList.add('hidden');
        
        if (cart.items.length === 0) {
            // Sepet boşsa
            emptyCart.classList.remove('hidden');
        } else {
            // Sepette ürün varsa
            filledCart.classList.remove('hidden');
            
            // Sepet öğelerini göster
            displayCartItems();
            
            // Sepet özetini güncelle
            updateCartSummary();
        }
    }, 500);
}

/**
 * Sepet öğelerini gösterme
 */
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (!cartItemsContainer) return;
    
    const currentLang = localStorage.getItem('language') || 'tr';
    
    let itemsHTML = '';
    
    cart.items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const formattedPrice = window.formatCurrency ? window.formatCurrency(item.price, currentLang) : `₺${item.price.toFixed(2)}`;
        const formattedTotal = window.formatCurrency ? window.formatCurrency(itemTotal, currentLang) : `₺${itemTotal.toFixed(2)}`;
        
        // Ağırlık metni
        const weightText = item.weight >= 1000 ? `${item.weight/1000}kg` : `${item.weight}g`;
        
        itemsHTML += `
        <div class="cart-item" data-index="${index}">
            <div class="cart-column product-column">
                <div class="cart-product">
                    <div class="cart-product-image">
                        <img src="${item.image}" alt="${item.name[currentLang]}">
                    </div>
                    <div class="cart-product-details">
                        <h3>${item.name[currentLang]}</h3>
                        <div class="cart-product-meta">
                            <span>${weightText}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-column price-column">
                <div class="cart-price">${formattedPrice}</div>
            </div>
            <div class="cart-column quantity-column">
                <div class="quantity-selector">
                    <button class="qty-btn decrease" data-index="${index}">-</button>
                    <input type="number" class="cart-quantity-input" data-index="${index}" value="${item.quantity}" min="1" max="10">
                    <button class="qty-btn increase" data-index="${index}">+</button>
                </div>
            </div>
            <div class="cart-column total-column">
                <div class="cart-total">${formattedTotal}</div>
            </div>
            <div class="cart-column action-column">
                <button class="cart-remove" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    
    // Miktar değiştirme butonları için olay dinleyicileri ekle
    initCartItemEvents();
}

/**
 * Sepet öğeleri için olay dinleyicileri
 */
function initCartItemEvents() {
    // Miktar azaltma butonları
    const decreaseButtons = document.querySelectorAll('.qty-btn.decrease');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const currentQuantity = cart.items[index].quantity;
            
            if (currentQuantity > 1) {
                updateCartItemQuantity(index, currentQuantity - 1);
                // Sepet sayfasını güncelle
                displayCartItems();
                updateCartSummary();
            } else {
                // Miktar 1'e eşitse, kullanıcıya ürünü silmek istediğini sor
                if (confirm(window.getTranslation ? window.getTranslation('cart.confirm_remove') : 'Bu ürünü sepetten çıkarmak istediğinize emin misiniz?')) {
                    removeFromCart(index);
                    displayCart(); // Tüm sepeti güncelle
                }
            }
        });
    });
    
    // Miktar arttırma butonları
    const increaseButtons = document.querySelectorAll('.qty-btn.increase');
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const currentQuantity = cart.items[index].quantity;
            
            if (currentQuantity < 10) {
                updateCartItemQuantity(index, currentQuantity + 1);
                // Sepet sayfasını güncelle
                displayCartItems();
                updateCartSummary();
            }
        });
    });
    
    // Miktar input alanları
    const quantityInputs = document.querySelectorAll('.cart-quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const newQuantity = parseInt(this.value);
            
            if (newQuantity >= 1 && newQuantity <= 10) {
                updateCartItemQuantity(index, newQuantity);
                // Sepet sayfasını güncelle
                displayCartItems();
                updateCartSummary();
            } else {
                // Geçersiz miktar girildiyse, mevcut miktara geri dön
                this.value = cart.items[index].quantity;
            }
        });
    });
    
    // Ürün silme butonları
    const removeButtons = document.querySelectorAll('.cart-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            
            if (confirm(window.getTranslation ? window.getTranslation('cart.confirm_remove') : 'Bu ürünü sepetten çıkarmak istediğinize emin misiniz?')) {
                removeFromCart(index);
                displayCart(); // Tüm sepeti güncelle
            }
        });
    });
}/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Sepet İşlemleri JavaScript Dosyası (Bölüm 2)
 */

/**
 * Sepet özeti bilgilerini güncelleme
 */
function updateCartSummary() {
    const currentLang = localStorage.getItem('language') || 'tr';
    
    // Sepet özet bilgileri
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const discountElement = document.getElementById('cart-discount');
    const discountRow = document.getElementById('discount-row');
    const totalElement = document.getElementById('cart-total');
    
    if (subtotalElement) {
        subtotalElement.textContent = window.formatCurrency ? 
            window.formatCurrency(cart.subtotal, currentLang) : 
            `₺${cart.subtotal.toFixed(2)}`;
    }
    
    if (shippingElement) {
        shippingElement.textContent = cart.shipping === 0 ? 
            (window.getTranslation ? window.getTranslation('cart.free_shipping') : 'Ücretsiz') : 
            (window.formatCurrency ? window.formatCurrency(cart.shipping, currentLang) : `₺${cart.shipping.toFixed(2)}`);
    }
    
    if (discountElement && discountRow) {
        if (cart.discount > 0) {
            discountElement.textContent = window.formatCurrency ? 
                `-${window.formatCurrency(cart.discount, currentLang)}` : 
                `-₺${cart.discount.toFixed(2)}`;
            discountRow.classList.remove('hidden');
        } else {
            discountRow.classList.add('hidden');
        }
    }
    
    if (totalElement) {
        totalElement.textContent = window.formatCurrency ? 
            window.formatCurrency(cart.total, currentLang) : 
            `₺${cart.total.toFixed(2)}`;
    }
}

/**
 * Kupon kodu uygulama
 * @param {string} couponCode - Uygulanacak kupon kodu
 * @returns {Object} - İşlem sonucu {success: boolean, message: string}
 */
function applyCoupon(couponCode) {
    if (!couponCode) {
        return {
            success: false,
            message: window.getTranslation ? 
                window.getTranslation('cart.enter_coupon') : 
                'Lütfen bir kupon kodu girin.'
        };
    }
    
    // Örnek kupon kodları ve indirimleri
    const coupons = {
        'WELCOME10': { 
            type: 'percentage', 
            value: 10,
            minAmount: 100,
            message: {
                tr: '%10 indirim uygulandı!',
                en: '10% discount applied!',
                ar: 'تم تطبيق خصم 10٪!'
            }
        },
        'OZYRK20': { 
            type: 'percentage', 
            value: 20,
            minAmount: 200,
            message: {
                tr: '%20 indirim uygulandı!',
                en: '20% discount applied!',
                ar: 'تم تطبيق خصم 20٪!'
            }
        },
        'FREESHIP': { 
            type: 'free_shipping', 
            value: SHIPPING_FEE,
            message: {
                tr: 'Ücretsiz kargo uygulandı!',
                en: 'Free shipping applied!',
                ar: 'تم تطبيق الشحن المجاني!'
            }
        },
        'FLAT50TL': { 
            type: 'fixed', 
            value: 50,
            minAmount: 300,
            message: {
                tr: '50 TL indirim uygulandı!',
                en: '50 TL discount applied!',
                ar: 'تم تطبيق خصم 50 ليرة تركية!'
            }
        }
    };
    
    const coupon = coupons[couponCode.toUpperCase()];
    const currentLang = localStorage.getItem('language') || 'tr';
    
    if (!coupon) {
        return {
            success: false,
            message: window.getTranslation ? 
                window.getTranslation('cart.invalid_coupon') : 
                'Geçersiz kupon kodu.'
        };
    }
    
    // Minimum sepet tutarı kontrolü
    if (coupon.minAmount && cart.subtotal < coupon.minAmount) {
        const minAmount = window.formatCurrency ? 
            window.formatCurrency(coupon.minAmount, currentLang) : 
            `₺${coupon.minAmount.toFixed(2)}`;
            
        return {
            success: false,
            message: window.getTranslation ? 
                `${window.getTranslation('cart.min_amount')} ${minAmount}` : 
                `Bu kuponu kullanmak için minimum sepet tutarı ${minAmount} olmalıdır.`
        };
    }
    
    // Kuponu uygula
    cart.couponCode = couponCode.toUpperCase();
    
    // Toplam tutarları güncelle
    calculateCartTotals();
    
    // Sepeti kaydet
    saveCartToStorage();
    
    return {
        success: true,
        message: coupon.message[currentLang]
    };
}

/**
 * Sepet sayfası için olay dinleyicileri
 */
function initCartEvents() {
    // Sepeti temizle butonu
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function() {
            if (confirm(window.getTranslation ? 
                window.getTranslation('cart.confirm_clear') : 
                'Sepetinizi tamamen temizlemek istediğinize emin misiniz?')) {
                clearCart();
            }
        });
    }
    
    // Sepeti güncelle butonu
    const updateCartButton = document.getElementById('update-cart');
    if (updateCartButton) {
        updateCartButton.addEventListener('click', function() {
            // Bu fonksiyon, gerçek bir e-ticaret sisteminde sepet öğelerinin 
            // güncel miktarlarını sunucuya göndermek için kullanılabilir.
            // Burada sadece bir bildirim gösteriyoruz.
            showNotification(
                window.getTranslation ? 
                window.getTranslation('cart.cart_updated') : 
                'Sepetiniz güncellendi.'
            );
        });
    }
    
    // Kupon uygulama butonu
    const applyCouponButton = document.getElementById('apply-coupon');
    if (applyCouponButton) {
        applyCouponButton.addEventListener('click', function() {
            const couponInput = document.getElementById('coupon-code');
            if (!couponInput) return;
            
            const couponCode = couponInput.value.trim();
            const result = applyCoupon(couponCode);
            
            if (result.success) {
                showNotification(result.message, 'success');
                // Sepet özetini güncelle
                updateCartSummary();
            } else {
                showNotification(result.message, 'error');
            }
        });
    }
    
    // Ödemeye geç butonu
    const proceedToCheckoutButton = document.getElementById('proceed-to-checkout');
    if (proceedToCheckoutButton) {
        proceedToCheckoutButton.addEventListener('click', function() {
            // Sepeti kontrol et
            if (cart.items.length === 0) {
                showNotification(
                    window.getTranslation ? 
                    window.getTranslation('cart.empty_cart_error') : 
                    'Ödeme sayfasına geçmek için sepetinizde en az bir ürün olmalıdır.',
                    'error'
                );
                return;
            }
            
            // Ödeme sayfasına yönlendir
            window.location.href = 'checkout.html';
        });
    }
    
    // Tavsiye edilen ürünleri yükle
    loadRecommendedProducts();
}

/**
 * Tavsiye edilen ürünleri yükleme
 */
function loadRecommendedProducts() {
    const recommendedProductsContainer = document.getElementById('recommended-products');
    
    if (!recommendedProductsContainer) return;
    
    // Yükleniyor göstergesi
    recommendedProductsContainer.innerHTML = '<div class="product-loader"><i class="fas fa-spinner fa-spin"></i></div>';
    
    // Tavsiye algoritmamız: 
    // 1. Sepetteki ürünlerin ilişkili ürünlerini al
    // 2. Tekrarlananları çıkar
    // 3. Zaten sepette olanları çıkar
    // 4. En fazla 4 ürün göster
    
    let recommendedProductIds = [];
    
    // Sepetteki ürünlerin ilişkili ürünlerini topla
    cart.items.forEach(item => {
        const product = mockProducts.find(p => p.id === item.id);
        if (product && product.related_products) {
            recommendedProductIds = [...recommendedProductIds, ...product.related_products];
        }
    });
    
    // Tekrarlanan ürün ID'lerini kaldır
    recommendedProductIds = [...new Set(recommendedProductIds)];
    
    // Sepette zaten olan ürünleri kaldır
    const cartProductIds = cart.items.map(item => item.id);
    recommendedProductIds = recommendedProductIds.filter(id => !cartProductIds.includes(id));
    
    // En fazla 4 ürün göster
    recommendedProductIds = recommendedProductIds.slice(0, 4);
    
    // Tavsiye edilen ürünleri bul
    const recommendedProducts = recommendedProductIds.map(id => mockProducts.find(p => p.id === id)).filter(Boolean);
    
    // Eğer yeterli tavsiye yoksa, popüler ürünlerle tamamla
    if (recommendedProducts.length < 4) {
        const popularProducts = mockProducts
            .filter(p => !cartProductIds.includes(p.id) && !recommendedProductIds.includes(p.id))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4 - recommendedProducts.length);
            
        recommendedProducts.push(...popularProducts);
    }
    
    // Biraz gecikme ekle - gerçek API çağrısını simüle etmek için
    setTimeout(() => {
        let productsHTML = '';
        
        if (recommendedProducts.length > 0) {
            recommendedProducts.forEach(product => {
                if (window.createProductCard) {
                    productsHTML += window.createProductCard(product);
                } else {
                    // Ürün kartı fonksiyonu yoksa basit bir kart oluştur
                    const currentLang = localStorage.getItem('language') || 'tr';
                    const price = window.formatCurrency ? 
                        window.formatCurrency(product.price, currentLang) : 
                        `₺${product.price.toFixed(2)}`;
                        
                    productsHTML += `
                    <div class="product-card" data-product-id="${product.id}">
                        <div class="product-image">
                            <a href="product.html?id=${product.id}">
                                <img src="${product.images[0]}" alt="${product.name[currentLang]}">
                            </a>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">
                                <a href="product.html?id=${product.id}">${product.name[currentLang]}</a>
                            </h3>
                            <div class="product-price">
                                <span class="current-price">${price}</span>
                            </div>
                            <div class="product-actions">
                                <button class="btn-secondary add-to-cart-btn" data-product-id="${product.id}">
                                    <i class="fas fa-shopping-cart"></i>
                                    <span data-i18n="products.add_to_cart">Sepete Ekle</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    `;
                }
            });
            
            recommendedProductsContainer.innerHTML = productsHTML;
            
            // Sepete ekleme butonlarına event listener ekle
            const addToCartButtons = recommendedProductsContainer.querySelectorAll('.add-to-cart-btn');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-product-id'));
                    if (addToCart(productId, 1)) {
                        showNotification(
                            window.getTranslation ? 
                            window.getTranslation('cart.added_to_cart') : 
                            'Ürün sepete eklendi.',
                            'success'
                        );
                    }
                });
            });
            
            // Sayfa çevirisini güncelle
            if (window.translatePage) {
                window.translatePage();
            }
        } else {
            // Tavsiye edilen ürün yoksa, sekmeyi gizle
            const recommendedSection = document.querySelector('.recommended-products');
            if (recommendedSection) {
                recommendedSection.style.display = 'none';
            }
        }
    }, 800);
}

/**
 * Ödeme sayfasındaki sipariş özetini gösterme
 */
function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    
    if (!orderItemsContainer) return;
    
    // Yükleniyor göstergesi
    orderItemsContainer.innerHTML = '<div class="order-item-loader"><i class="fas fa-spinner fa-spin"></i></div>';
    
    const currentLang = localStorage.getItem('language') || 'tr';
    
    // Sepet özet bilgileri
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const discountElement = document.getElementById('checkout-discount');
    const discountRow = document.getElementById('checkout-discount-row');
    const totalElement = document.getElementById('checkout-total');
    
    // Biraz gecikme ekle - gerçek API çağrısını simüle etmek için
    setTimeout(() => {
        let itemsHTML = '';
        
        if (cart.items.length > 0) {
            cart.items.forEach(item => {
                const itemTotal = item.price * item.quantity;
                const formattedTotal = window.formatCurrency ? 
                    window.formatCurrency(itemTotal, currentLang) : 
                    `₺${itemTotal.toFixed(2)}`;
                
                // Ağırlık metni
                const weightText = item.weight >= 1000 ? `${item.weight/1000}kg` : `${item.weight}g`;
                
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
                        ${formattedTotal}
                    </div>
                </div>
                `;
            });
            
            orderItemsContainer.innerHTML = itemsHTML;
            
            // Sepet özetini güncelle
            if (subtotalElement) {
                subtotalElement.textContent = window.formatCurrency ? 
                    window.formatCurrency(cart.subtotal, currentLang) : 
                    `₺${cart.subtotal.toFixed(2)}`;
            }
            
            if (shippingElement) {
                shippingElement.textContent = cart.shipping === 0 ? 
                    (window.getTranslation ? window.getTranslation('cart.free_shipping') : 'Ücretsiz') : 
                    (window.formatCurrency ? window.formatCurrency(cart.shipping, currentLang) : `₺${cart.shipping.toFixed(2)}`);
            }
            
            if (discountElement && discountRow) {
                if (cart.discount > 0) {
                    discountElement.textContent = window.formatCurrency ? 
                        `-${window.formatCurrency(cart.discount, currentLang)}` : 
                        `-₺${cart.discount.toFixed(2)}`;
                    discountRow.classList.remove('hidden');
                } else {
                    discountRow.classList.add('hidden');
                }
            }
            
            if (totalElement) {
                totalElement.textContent = window.formatCurrency ? 
                    window.formatCurrency(cart.total, currentLang) : 
                    `₺${cart.total.toFixed(2)}`;
            }
            
            // Sayfa çevirisini güncelle
            if (window.translatePage) {
                window.translatePage();
            }
        } else {
            // Sepet boşsa, ödeme sayfasından sepet sayfasına yönlendir
            window.location.href = 'cart.html';
        }
    }, 500);
}

/**
 * Bildirim gösterme
 * @param {string} message - Gösterilecek mesaj
 * @param {string} type - Bildirim türü ('success' veya 'error')
 */
function showNotification(message, type = 'info') {
    // Mevcut bildirimleri temizle
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Kapatma butonu ekle
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    notification.appendChild(closeButton);
    
    // Sayfaya ekle
    document.body.appendChild(notification);
    
    // Otomatik kapanma zamanlayıcısı başlat
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 500);
        }
    }, 5000);
}

/**
 * Sepete ekleme butonları için olay dinleyicileri
 */
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const quantity = 1; // Varsayılan miktar
            
            // Ürün detay sayfasından sepete ekleme
            const quantityInput = document.getElementById('product-quantity');
            const weightOptions = document.querySelectorAll('.weight-option');
            
            let selectedQuantity = quantity;
            let selectedWeight = 250; // Varsayılan ağırlık
            
            // Eğer ürün detay sayfasındaysa miktar ve ağırlık bilgilerini al
            if (quantityInput) {
                selectedQuantity = parseInt(quantityInput.value);
            }
            
            if (weightOptions.length > 0) {
                const activeWeightOption = document.querySelector('.weight-option.active');
                if (activeWeightOption) {
                    selectedWeight = parseInt(activeWeightOption.getAttribute('data-weight'));
                }
            }
            
            // Sepete ekle
            if (addToCart(productId, selectedQuantity, selectedWeight)) {
                showNotification(
                    window.getTranslation ? 
                    window.getTranslation('cart.added_to_cart') : 
                    'Ürün sepete eklendi.',
                    'success'
                );
            }
        });
    });
}

/**
 * Ağırlık seçenekleri için olay dinleyicileri
 */
function initWeightOptions() {
    // Sayfa yüklendiğinde ağırlık seçeneği butonlarını dinle
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('weight-option') || event.target.closest('.weight-option')) {
            const weightOption = event.target.classList.contains('weight-option') ? 
                event.target : 
                event.target.closest('.weight-option');
                
            // Tüm ağırlık seçeneklerinin active sınıfını kaldır
            const allOptions = weightOption.parentElement.querySelectorAll('.weight-option');
            allOptions.forEach(option => option.classList.remove('active'));
            
            // Seçilen seçeneğe active sınıfı ekle
            weightOption.classList.add('active');
            
            // Fiyatı güncelle
            updateProductPriceByWeight(weightOption);
        }
    });
}

/**
 * Seçilen ağırlığa göre ürün fiyatını güncelleme
 * @param {HTMLElement} weightOption - Seçilen ağırlık seçeneği
 */
function updateProductPriceByWeight(weightOption) {
    // Fiyat ve eski fiyat elementlerini bul
    const priceElement = document.getElementById('product-price');
    const oldPriceElement = document.getElementById('product-old-price');
    
    if (!priceElement) return;
    
    // Seçilen ağırlığın fiyat bilgisini al
    const price = parseFloat(weightOption.getAttribute('data-price'));
    const oldPrice = weightOption.getAttribute('data-old-price') ? 
        parseFloat(weightOption.getAttribute('data-old-price')) : 
        null;
    
    // Fiyatı güncelle
    const currentLang = localStorage.getItem('language') || 'tr';
    
    priceElement.textContent = window.formatCurrency ? 
        window.formatCurrency(price, currentLang) : 
        `₺${price.toFixed(2)}`;
    
    if (oldPriceElement && oldPrice) {
        oldPriceElement.textContent = window.formatCurrency ? 
            window.formatCurrency(oldPrice, currentLang) : 
            `₺${oldPrice.toFixed(2)}`;
        oldPriceElement.style.display = 'inline-block';
    } else if (oldPriceElement) {
        oldPriceElement.style.display = 'none';
    }
}

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartUI();
    }

    // Sepete ürün ekleme
    addItem(productId, quantity = 1) {
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            this.items.push({
                id: productId,
                quantity: parseInt(quantity)
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showAddToCartMessage();
    }

    // Sepetten ürün silme
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    // Ürün miktarını güncelleme
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            this.saveCart();
            this.updateCartUI();
        }
    }

    // Sepeti locale kaydetme
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Sepet UI güncellemesi
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
        }
    }

    // Sepete eklendi mesajı
    showAddToCartMessage() {
        const message = document.createElement('div');
        message.className = 'cart-message';
        message.textContent = i18n.translate('cart.added_to_cart');
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }
}

// Cart instance'ını oluştur ve global olarak erişilebilir yap
window.cart = new Cart();

// Sepete ekle butonlarını dinle
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        if (e.target.matches('.add-to-cart, .add-to-cart *')) {
            e.preventDefault();
            const button = e.target.closest('.add-to-cart');
            const productId = button.dataset.productId;
            const quantityInput = document.querySelector(`#quantity-${productId}`) || { value: 1 };
            cart.addItem(productId, quantityInput.value);
        }
    });
});
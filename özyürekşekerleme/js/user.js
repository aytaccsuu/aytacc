/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Kullanıcı İşlemleri JavaScript Dosyası
 */

// Mock kullanıcı verileri (gerçek projelerde backend API ile değiştirilecek)
const mockUsers = [
    {
        id: 1,
        email: 'demo@example.com',
        password: 'demo1234', // Gerçek uygulamada hash'lenmiş olmalı
        firstName: 'Demo',
        lastName: 'Kullanıcı',
        phone: '+90 (555) 123 4567',
        birthdate: '1990-01-01',
        gender: 'male',
        newsletter: true,
        addresses: [
            {
                id: 1,
                title: 'Ev Adresi',
                firstName: 'Demo',
                lastName: 'Kullanıcı',
                phone: '+90 (555) 123 4567',
                address: 'Örnek Mahallesi, Numune Sokak No:5 D:10',
                city: 'istanbul',
                district: 'kadikoy',
                postcode: '34700',
                isDefault: true
            },
            {
                id: 2,
                title: 'İş Adresi',
                firstName: 'Demo',
                lastName: 'Kullanıcı',
                phone: '+90 (555) 987 6543',
                address: 'İş Merkezi, Ofis Blok No:12 Kat:3',
                city: 'istanbul',
                district: 'sisli',
                postcode: '34394',
                isDefault: false
            }
        ],
        orders: [
            {
                id: "ORD12345",
                date: "2025-03-01",
                status: "delivered",
                total: 320.50,
                paymentMethod: "credit-card",
                items: [
                    { 
                        productId: 1, 
                        quantity: 2, 
                        price: 120.00, 
                        weight: 250, 
                        name: { tr: 'Antep Fıstıklı Lokum', en: 'Pistachio Turkish Delight', ar: 'راحة الترك بالفستق الحلبي' } 
                    },
                    { 
                        productId: 5, 
                        quantity: 1, 
                        price: 80.50, 
                        weight: 250, 
                        name: { tr: 'Çifte Kavrulmuş Lokum', en: 'Double Roasted Turkish Delight', ar: 'راحة الترك المحمصة مرتين' } 
                    }
                ],
                address: {
                    title: 'Ev Adresi',
                    firstName: 'Demo',
                    lastName: 'Kullanıcı',
                    phone: '+90 (555) 123 4567',
                    address: 'Örnek Mahallesi, Numune Sokak No:5 D:10',
                    city: 'istanbul',
                    district: 'kadikoy',
                    postcode: '34700'
                }
            },
            {
                id: "ORD12346",
                date: "2025-02-15",
                status: "delivered",
                total: 220.00,
                paymentMethod: "cash-on-delivery",
                items: [
                    { 
                        productId: 2, 
                        quantity: 1, 
                        price: 100.00, 
                        weight: 250, 
                        name: { tr: 'Gül Aromalı Lokum', en: 'Rose Flavored Turkish Delight', ar: 'راحة الترك بنكهة الورد' } 
                    },
                    { 
                        productId: 6, 
                        quantity: 2, 
                        price: 60.00, 
                        weight: 250, 
                        name: { tr: 'Akide Şekeri', en: 'Hard Candy', ar: 'حلوى صلبة' } 
                    }
                ],
                address: {
                    title: 'İş Adresi',
                    firstName: 'Demo',
                    lastName: 'Kullanıcı',
                    phone: '+90 (555) 987 6543',
                    address: 'İş Merkezi, Ofis Blok No:12 Kat:3',
                    city: 'istanbul',
                    district: 'sisli',
                    postcode: '34394'
                }
            },
            {
                id: "ORD12347",
                date: "2025-03-12",
                status: "processing",
                total: 130.00,
                paymentMethod: "credit-card",
                items: [
                    { 
                        productId: 3, 
                        quantity: 1, 
                        price: 130.00, 
                        weight: 250, 
                        name: { tr: 'Fındıklı Lokum', en: 'Hazelnut Turkish Delight', ar: 'راحة الترك بالبندق' } 
                    }
                ],
                address: {
                    title: 'Ev Adresi',
                    firstName: 'Demo',
                    lastName: 'Kullanıcı',
                    phone: '+90 (555) 123 4567',
                    address: 'Örnek Mahallesi, Numune Sokak No:5 D:10',
                    city: 'istanbul',
                    district: 'kadikoy',
                    postcode: '34700'
                }
            }
        ]
    }
];

// Admin kullanıcı
const adminUser = {
    email: 'aytaccsu1@gmail.com',
    password: 'Admin1234', // Gerçek uygulamada hash'lenmiş olmalı
    name: 'Admin'
};

// Aktif kullanıcı
let currentUser = null;

/**
 * Sayfanın ilk yüklenişinde çalışacak fonksiyon
 */
document.addEventListener('DOMContentLoaded', () => {
    // Oturum kontrolü
    checkSession();
    
    // Sayfa türüne göre ilgili fonksiyonları çağır
    const currentPage = window.location.pathname;
    
    // Giriş sayfası işlemleri
    if (currentPage.includes('login.html')) {
        initLoginPage();
    }
    
    // Kayıt sayfası işlemleri
    if (currentPage.includes('register.html')) {
        initRegisterPage();
    }
    
    // Profil sayfası işlemleri
    if (currentPage.includes('profile.html')) {
        initProfilePage();
    }
    
    // Genel kullanıcı olayları
    initUserEvents();
});

/**
 * Oturum kontrolü
 */
function checkSession() {
    // localStorage'dan kullanıcı bilgilerini al
    const userSession = localStorage.getItem('userSession');
    
    if (userSession) {
        try {
            const sessionData = JSON.parse(userSession);
            
            // Admin oturumu kontrolü
            if (sessionData.isAdmin) {
                // Admin sayfalarına yönlendirme kontrolü
                const currentPage = window.location.pathname;
                
                if (currentPage.includes('admin.html')) {
                    // Admin panelindeyiz, işleme devam
                    currentUser = { isAdmin: true, name: adminUser.name };
                    updateUserUI();
                } else {
                    // Admin paneli dışında, kullanıcı gibi davran
                    const userEmail = sessionData.email;
                    currentUser = mockUsers.find(user => user.email === userEmail);
                    
                    if (currentUser) {
                        updateUserUI();
                    } else {
                        // Kullanıcı bulunamadı, oturumu temizle
                        localStorage.removeItem('userSession');
                    }
                }
            } else {
                // Normal kullanıcı oturumu
                const userEmail = sessionData.email;
                currentUser = mockUsers.find(user => user.email === userEmail);
                
                if (currentUser) {
                    updateUserUI();
                    
                    // Admin sayfasındaysak ana sayfaya yönlendir
                    if (window.location.pathname.includes('admin.html')) {
                        window.location.href = 'index.html';
                    }
                } else {
                    // Kullanıcı bulunamadı, oturumu temizle
                    localStorage.removeItem('userSession');
                }
            }
        } catch (e) {
            console.error('Oturum verisi okunamadı:', e);
            localStorage.removeItem('userSession');
        }
    } else {
        // Oturum yoksa, korumalı sayfalara erişimi engelle
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('profile.html')) {
            window.location.href = 'login.html';
        } else if (currentPage.includes('admin.html')) {
            window.location.href = 'login.html';
        }
    }
}

/**
 * Kullanıcı arayüzünü güncelleme
 */
function updateUserUI() {
    // Kullanıcı menüsünü göster/gizle
    const userActions = document.querySelector('.user-actions');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userActions && userDropdown) {
        // Giriş/Kayıt linklerini gizle
        const loginLink = userActions.querySelector('a[href="login.html"]');
        const registerLink = userActions.querySelector('a[href="register.html"]');
        
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        
        // Kullanıcı dropdown menüsünü göster
        userDropdown.style.display = 'block';
        
        // Kullanıcı adını güncelle
        const userNameElement = document.getElementById('user-name');
        if (userNameElement && currentUser) {
            userNameElement.textContent = currentUser.isAdmin ? 'Admin' : `${currentUser.firstName}`;
        }
    }
    
    // Admin paneli UI güncellemesi
    const adminName = document.getElementById('admin-name');
    if (adminName && currentUser && currentUser.isAdmin) {
        adminName.textContent = 'Admin';
    }
    
    // Profil sayfası içeriğini güncelle
    updateProfileContent();
}

/**
 * Genel kullanıcı olayları
 */
function initUserEvents() {
    // Çıkış butonları
    const logoutButtons = document.querySelectorAll('#logout-button, #sidebar-logout, #admin-logout');
    logoutButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    });
}

/**
 * Çıkış işlemi
 */
function logout() {
    // Oturum verisini temizle
    localStorage.removeItem('userSession');
    
    // Aktif kullanıcıyı sıfırla
    currentUser = null;
    
    // Ana sayfaya yönlendir
    window.location.href = 'index.html';
}

/**
 * Giriş sayfası işlevselliği
 */
function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    const adminLoginForm = document.getElementById('admin-login-form');
    
    // Kullanıcı giriş formu
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Kullanıcıyı doğrula
            const user = mockUsers.find(user => user.email === email && user.password === password);
            
            if (user) {
                // Başarılı giriş
                currentUser = user;
                
                // Oturum verisi oluştur
                const sessionData = {
                    email: user.email,
                    isAdmin: false,
                    rememberMe: rememberMe
                };
                
                // localStorage'a kaydet
                localStorage.setItem('userSession', JSON.stringify(sessionData));
                
                // Ana sayfaya yönlendir
                window.location.href = 'index.html';
            } else {
                // Giriş hatası
                showLoginError(loginForm, 'Geçersiz e-posta veya şifre.');
            }
        });
    }
    
    // Admin giriş formu
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            
            // Admin kullanıcısını doğrula
            if (email === adminUser.email && password === adminUser.password) {
                // Başarılı admin girişi
                currentUser = { isAdmin: true, name: adminUser.name };
                
                // Oturum verisi oluştur
                const sessionData = {
                    email: adminUser.email,
                    isAdmin: true,
                    rememberMe: true
                };
                
                // localStorage'a kaydet
                localStorage.setItem('userSession', JSON.stringify(sessionData));
                
                // Admin paneline yönlendir
                window.location.href = 'admin.html';
            } else {
                // Giriş hatası
                showLoginError(adminLoginForm, 'Geçersiz yönetici bilgileri.');
            }
        });
    }
}

/**
 * Giriş hatası gösterme
 * @param {HTMLElement} form - Hata gösterilecek form
 * @param {string} message - Hata mesajı
 */
function showLoginError(form, message) {
    const errorContainer = form.querySelector('.auth-message');
    
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.classList.add('error');
        
        // 5 saniye sonra hata mesajını kaldır
        setTimeout(() => {
            errorContainer.textContent = '';
            errorContainer.classList.remove('error');
        }, 5000);
    }
}

/**
 * Kayıt sayfası işlevselliği
 */
function initRegisterPage() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const firstName = document.getElementById('register-firstname').value;
            const lastName = document.getElementById('register-lastname').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const newsletter = document.getElementById('newsletter-subscribe').checked;
            
            // Şifre eşleşme kontrolü
            if (password !== confirmPassword) {
                showRegisterError('Şifreler eşleşmiyor.');
                return;
            }
            
            // E-posta kullanım kontrolü
            const emailExists = mockUsers.some(user => user.email === email);
            if (emailExists) {
                showRegisterError('Bu e-posta adresi zaten kullanımda.');
                return;
            }
            
            // Gerçek uygulamada burada API çağrısı olacak
            // Bu örnekte mock kullanıcı oluşturuyoruz
            const newUser = {
                id: mockUsers.length + 1,
                email: email,
                password: password, // Gerçek uygulamada hash'lenecek
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                newsletter: newsletter,
                addresses: [],
                orders: []
            };
            
            // Mock kullanıcılar listesine ekle
            mockUsers.push(newUser);
            
            // Başarı mesajı göster ve giriş sayfasına yönlendir
            showRegisterSuccess();
        });
    }
}

/**
 * Kayıt hatası gösterme
 * @param {string} message - Hata mesajı
 */
function showRegisterError(message) {
    const errorContainer = document.getElementById('register-message');
    
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.classList.add('error');
        
        // 5 saniye sonra hata mesajını kaldır
        setTimeout(() => {
            errorContainer.textContent = '';
            errorContainer.classList.remove('error');
        }, 5000);
    }
}

/**
 * Kayıt başarı mesajı gösterme
 */
function showRegisterSuccess() {
    const messageContainer = document.getElementById('register-message');
    
    if (messageContainer) {
        messageContainer.textContent = 'Kayıt işlemi başarıyla tamamlandı. Giriş sayfasına yönlendiriliyorsunuz...';
        messageContainer.classList.add('success');
        
        // 3 saniye sonra giriş sayfasına yönlendir
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }
}

/**
 * Profil sayfası işlevselliği
 */
function initProfilePage() {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    if (!currentUser || currentUser.isAdmin) {
        window.location.href = 'login.html';
        return;
    }
    
    // Profil içeriğini güncelle
    updateProfileContent();
    
    // Profil formlarını işle
    initProfileForms();
    
    // Adres yönetimi
    initAddressManagement();
}

/**
 * Profil içeriğini güncelleme
 */
function updateProfileContent() {
    // Kullanıcı giriş yapmamışsa çık
    if (!currentUser || currentUser.isAdmin) return;
    
    // Kullanıcı adı ve e-posta bilgisi
    const usernameElements = document.querySelectorAll('#sidebar-username, #user-name');
    const emailElement = document.getElementById('sidebar-email');
    
    usernameElements.forEach(element => {
        if (element) element.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    });
    
    if (emailElement) emailElement.textContent = currentUser.email;
    
    // Dashboard istatistikleri
    const totalOrdersElement = document.getElementById('total-orders');
    const activeOrdersElement = document.getElementById('active-orders');
    const favoriteProductsElement = document.getElementById('favorite-products');
    
    if (totalOrdersElement) totalOrdersElement.textContent = currentUser.orders.length;
    
    if (activeOrdersElement) {
        const activeOrders = currentUser.orders.filter(order => 
            ['pending', 'processing', 'shipped'].includes(order.status)
        ).length;
        activeOrdersElement.textContent = activeOrders;
    }
    
    if (favoriteProductsElement) {
        // Bu örnekte favoriler yok, gerçek uygulamada eklenebilir
        favoriteProductsElement.textContent = '0';
    }
    
    // Son siparişler
    loadRecentOrders();
    
    // Siparişler tablosu
    loadOrdersTable();
    
    // Adresler
    loadAddresses();
    
    // Hesap bilgileri formu
    loadAccountInfo();
}

/**
 * Son siparişleri yükleme
 */
function loadRecentOrders() {
    const recentOrdersContainer = document.getElementById('recent-orders-container');
    const currentLang = localStorage.getItem('language') || 'tr';
    
    if (recentOrdersContainer && currentUser && currentUser.orders.length > 0) {
        // Son 3 siparişi al
        const recentOrders = currentUser.orders.slice(0, 3);
        
        // İçeriği temizle
        recentOrdersContainer.innerHTML = '';
        
        // Siparişleri ekle
        recentOrders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'recent-order';
            
            // Fiyat biçimlendirme
            const total = window.formatCurrency ? 
                window.formatCurrency(order.total, currentLang) : 
                `₺${order.total.toFixed(2)}`;
            
            // Sipariş durumu çevirisi
            let statusText = order.status;
            if (window.getTranslation) {
                const translatedStatus = window.getTranslation(`profile.${order.status}`);
                if (translatedStatus) statusText = translatedStatus;
            }
            
            // Sipariş HTML'i
            orderElement.innerHTML = `
                <div class="recent-order-info">
                    <div class="recent-order-id">${order.id}</div>
                    <div class="recent-order-date">${order.date}</div>
                </div>
                <div class="recent-order-total">${total}</div>
                <div class="order-status ${order.status}">${statusText}</div>
            `;
            
            recentOrdersContainer.appendChild(orderElement);
        });
    } else if (recentOrdersContainer) {
        // Sipariş yoksa mesaj göster
        const noOrdersMessage = window.getTranslation ? 
            window.getTranslation('profile.no_orders') : 
            'Henüz siparişiniz bulunmamaktadır.';
            
        recentOrdersContainer.innerHTML = `<p class="no-data">${noOrdersMessage}</p>`;
    }
}

/**
 * Siparişler tablosunu yükleme
 */
function loadOrdersTable() {
    const ordersContainer = document.getElementById('orders-list');
    const currentLang = localStorage.getItem('language') || 'tr';
    
    if (ordersContainer && currentUser) {
        // İçeriği temizle
        ordersContainer.innerHTML = '';
        
        if (currentUser.orders.length > 0) {
            // Siparişleri ekle
            currentUser.orders.forEach(order => {
                const orderElement = document.createElement('div');
                orderElement.className = 'order-item';
                
                // Fiyat biçimlendirme
                const total = window.formatCurrency ? 
                    window.formatCurrency(order.total, currentLang) : 
                    `₺${order.total.toFixed(2)}`;
                
                // Sipariş durumu çevirisi
                let statusText = order.status;
                if (window.getTranslation) {
                    const translatedStatus = window.getTranslation(`profile.${order.status}`);
                    if (translatedStatus) statusText = translatedStatus;
                }
                
                // Ödeme yöntemi çevirisi
                let paymentText = order.paymentMethod;
                if (window.getTranslation) {
                    const translatedPayment = window.getTranslation(`profile.${order.paymentMethod.replace('-', '_')}`);
                    if (translatedPayment) paymentText = translatedPayment;
                }
                
                // Ürün adedi
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                
                // Sipariş HTML'i
                orderElement.innerHTML = `
                    <div class="order-header">
                        <div class="order-id">
                            <strong data-i18n="profile.order_number">Sipariş No:</strong> ${order.id}
                        </div>
                        <div class="order-status ${order.status}">${statusText}</div>
                    </div>
                    <div class="order-details">
                        <div class="order-info-row">
                            <div class="order-info-item">
                                <span data-i18n="profile.order_date">Sipariş Tarihi:</span> ${order.date}
                            </div>
                            <div class="order-info-item">
                                <span data-i18n="profile.items">Ürünler:</span> ${itemCount}
                            </div>
                            <div class="order-info-item">
                                <span data-i18n="profile.total">Toplam:</span> ${total}
                            </div>
                            <div class="order-info-item">
                                <span data-i18n="profile.payment_method">Ödeme Yöntemi:</span> ${paymentText}
                            </div>
                        </div>
                    </div>
                    <div class="order-footer">
                        <button class="btn-secondary view-order-btn" data-order-id="${order.id}" data-i18n="profile.view_details">Detayları Görüntüle</button>
                    </div>
                `;
                
                ordersContainer.appendChild(orderElement);
            });
            
            // Sipariş detay butonlarına olay dinleyicisi ekle
            const viewOrderButtons = document.querySelectorAll('.view-order-btn');
            viewOrderButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const orderId = button.getAttribute('data-order-id');
                    showOrderDetails(orderId);
                });
            });
        } else {
            // Sipariş yoksa mesaj göster
            const noOrdersMessage = window.getTranslation ? 
                window.getTranslation('profile.no_orders_found') : 
                'Sipariş bulunamadı.';
                
            ordersContainer.innerHTML = `<div class="no-orders"><p>${noOrdersMessage}</p></div>`;
        }
    }
}

/**
 * Sipariş detaylarını gösterme
 * @param {string} orderId - Sipariş ID'si
 */
function showOrderDetails(orderId) {
    // Sipariş bulunamadıysa çık
    if (!currentUser) return;
    
    const order = currentUser.orders.find(order => order.id === orderId);
    if (!order) return;
    
    // Modal içeriğini hazırla
    const modalContainer = document.getElementById('order-detail-modal');
    const modalContent = document.getElementById('order-detail-container');
    const currentLang = localStorage.getItem('language') || 'tr';
    
    if (modalContainer && modalContent) {
        // Fiyat biçimlendirme
        const total = window.formatCurrency ? 
            window.formatCurrency(order.total, currentLang) : 
            `₺${order.total.toFixed(2)}`;
        
        // Sipariş durumu çevirisi
        let statusText = order.status;
        if (window.getTranslation) {
            const translatedStatus = window.getTranslation(`profile.${order.status}`);
            if (translatedStatus) statusText = translatedStatus;
        }
        
        // Ödeme yöntemi çevirisi
        let paymentText = order.paymentMethod;
        if (window.getTranslation) {
            const translatedPayment = window.getTranslation(`profile.${order.paymentMethod.replace('-', '_')}`);
            if (translatedPayment) paymentText = translatedPayment;
        }
        
        // Ürün listesi HTML'i
        let itemsHTML = '';
        let subtotal = 0;
        
        order.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemPrice = window.formatCurrency ? 
                window.formatCurrency(item.price, currentLang) : 
                `₺${item.price.toFixed(2)}`;
                
            const itemTotalPrice = window.formatCurrency ? 
                window.formatCurrency(itemTotal, currentLang) : 
                `₺${itemTotal.toFixed(2)}`;
            
            itemsHTML += `
                <div class="order-detail-item">
                    <div class="order-item-name">${item.name[currentLang]}</div>
                    <div class="order-item-quantity">${item.quantity} adet</div>
                    <div class="order-item-weight">${item.weight}g</div>
                    <div class="order-item-price">${itemPrice}</div>
                    <div class="order-item-total">${itemTotalPrice}</div>
                </div>
            `;
        });
        
        // Ara toplam ve kargo ücreti
        const shipping = order.total - subtotal;
        const subtotalFormatted = window.formatCurrency ? 
            window.formatCurrency(subtotal, currentLang) : 
            `₺${subtotal.toFixed(2)}`;
            
        const shippingFormatted = window.formatCurrency ? 
            window.formatCurrency(shipping, currentLang) : 
            `₺${shipping.toFixed(2)}`;
        
        // Modal içeriğini oluştur
        modalContent.innerHTML = `
            <div class="order-detail-header">
                <div class="order-detail-id">
                    <h3>${order.id}</h3>
                    <span class="order-status ${order.status}">${statusText}</span>
                </div>
                <div class="order-detail-date">
                    <span data-i18n="profile.order_date">Sipariş Tarihi:</span> ${order.date}
                </div>
            </div>
            
            <div class="order-detail-section">
                <h4 data-i18n="profile.order_items">Sipariş Ürünleri</h4>
                <div class="order-detail-items">
                    <div class="order-detail-header-row">
                        <div class="order-item-name" data-i18n="profile.product">Ürün</div>
                        <div class="order-item-quantity" data-i18n="profile.quantity">Adet</div>
                        <div class="order-item-weight" data-i18n="profile.weight">Ağırlık</div>
                        <div class="order-item-price" data-i18n="profile.price">Fiyat</div>
                        <div class="order-item-total" data-i18n="profile.total">Toplam</div>
                    </div>
                    ${itemsHTML}
                </div>
            </div>
            
            <div class="order-detail-totals">
                <div class="order-total-row">
                    <span data-i18n="profile.subtotal">Ara Toplam:</span>
                    <span>${subtotalFormatted}</span>
                </div>
                <div class="order-total-row">
                    <span data-i18n="profile.shipping">Kargo:</span>
                    <span>${shippingFormatted}</span>
                </div>
                <div class="order-total-row total">
                    <span data-i18n="profile.total">Toplam:</span>
                    <span>${total}</span>
                </div>
            </div>
            
            <div class="order-detail-section">
                <div class="order-info-columns">
                    <div class="order-info-column">
                        <h4 data-i18n="profile.shipping_address">Teslimat Adresi</h4>
                        <p>${order.address.firstName} ${order.address.lastName}</p>
                        <p>${order.address.address}</p>
                        <p>${order.address.district} / ${order.address.city}</p>
                        <p>${order.address.postcode}</p>
                        <p>${order.address.phone}</p>
                    </div>
                    <div class="order-info-column">
                        <h4 data-i18n="profile.payment_info">Ödeme Bilgileri</h4>
                        <p><span data-i18n="profile.payment_method">Ödeme Yöntemi:</span> ${paymentText}</p>
                        <p><span data-i18n="profile.payment_status">Ödeme Durumu:</span> <span data-i18n="profile.payment_completed">Tamamlandı</span></p>
                    </div>
                </div>
            </div>
        `;
        
        // Modalı göster
        window.openModal(modalContainer);
        
        // Sayfa çevirisini güncelle
        if (window.translatePage) {
            window.translatePage();
        }
    }
}

/**
 * Adresleri yükleme
 */
function loadAddresses() {
    const addressesContainer = document.getElementById('addresses-container');
    
    if (addressesContainer && currentUser) {
        // İçeriği temizle
        addressesContainer.innerHTML = '';
        
        if (currentUser.addresses && currentUser.addresses.length > 0) {
            // Adresleri ekle
            currentUser.addresses.forEach(address => {
                const addressElement = document.createElement('div');
                addressElement.className = `address-card ${address.isDefault ? 'default' : ''}`;
                
                // Adres HTML'i
                addressElement.innerHTML = `
                    <div class="address-title">${address.title}</div>
                    <div class="address-content">
                        <p>${address.firstName} ${address.lastName}</p>
                        <p>${address.address}</p>
                        <p>${address.district} / ${address.city}</p>
                        <p>${address.postcode}</p>
                        <p>${address.phone}</p>
                    </div>
                    <div class="address-actions">
                        <button class="btn-secondary edit-address-btn" data-address-id="${address.id}" data-i18n="profile.edit">Düzenle</button>
                        <button class="btn-secondary delete-address-btn" data-address-id="${address.id}" data-i18n="profile.delete">Sil</button>
                        ${!address.isDefault ? `<button class="btn-secondary set-default-btn" data-address-id="${address.id}" data-i18n="profile.set_default">Varsayılan Yap</button>` : ''}
                    </div>
                `;
                
                addressesContainer.appendChild(addressElement);
            });
            
            // Adres butonlarına olay dinleyicileri ekle
            initAddressButtons();
        } else {
            // Adres yoksa mesaj göster
            const noAddressesMessage = window.getTranslation ? 
                window.getTranslation('profile.no_addresses') : 
                'Kayıtlı adresiniz bulunmamaktadır.';
                
            addressesContainer.innerHTML = `<div class="no-addresses"><p>${noAddressesMessage}</p></div>`;
        }
    }
}

/**
 * Adres butonlarına olay dinleyicileri ekleme
 */
function initAddressButtons() {
    // Düzenleme butonları
    const editButtons = document.querySelectorAll('.edit-address-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const addressId = parseInt(button.getAttribute('data-address-id'));
            editAddress(addressId);
        });
    });
    
    // Silme butonları
    const deleteButtons = document.querySelectorAll('.delete-address-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const addressId = parseInt(button.getAttribute('data-address-id'));
            deleteAddress(addressId);
        });
    });
    
    // Varsayılan yapma butonları
    const defaultButtons = document.querySelectorAll('.set-default-btn');
    defaultButtons.forEach(button => {
        button.addEventListener('click', () => {
            const addressId = parseInt(button.getAttribute('data-address-id'));
            setDefaultAddress(addressId);
        });
    });
}

/**
 * Adres yönetimi işlevselliği
 */
function initAddressManagement() {
    // Adres ekleme butonu
    const addAddressBtn = document.getElementById('add-address-btn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            showAddressModal();
        });
    }
    
    // Adres formu
    const addressForm = document.getElementById('address-form');
    if (addressForm) {
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveAddress();
        });
    }
    
    // İptal butonu
    const cancelButtons = document.querySelectorAll('.modal-cancel, .modal-close');
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal && window.closeModal) {
                window.closeModal(modal);
            }
        });
    });
}

/**
 * Adres modalını gösterme
 * @param {Object|null} address - Düzenlenecek adres (yeni adres için null)
 */
function showAddressModal(address = null) {
    const modal = document.getElementById('address-modal');
    const modalTitle = document.getElementById('address-modal-title');
    const addressForm = document.getElementById('address-form');
    
    if (modal && modalTitle && addressForm) {
        // Form başlığını güncelle
        if (address) {
            modalTitle.textContent = 'Adres Düzenle';
            modalTitle.setAttribute('data-i18n', 'profile.edit_address');
        } else {
            modalTitle.textContent = 'Yeni Adres Ekle';
            modalTitle.setAttribute('data-i18n', 'profile.add_new_address');
        }
        
        // Formu sıfırla
        addressForm.reset();
        
        // Adres ID'sini ayarla
        const addressIdInput = document.getElementById('address-id');
        if (addressIdInput) {
            addressIdInput.value = address ? address.id : '';
        }
        
        // Adres bilgilerini doldur
        if (address) {
            document.getElementById('address-title').value = address.title;
            document.getElementById('address-firstname').value = address.firstName;
            document.getElementById('address-lastname').value = address.lastName;
            document.getElementById('address-phone').value = address.phone;
            document.getElementById('address-text').value = address.address;
            document.getElementById('address-city').value = address.city;
            
            // İlçe seçeneğini güncelle
            updateDistrictOptions(address.city);
            
            setTimeout(() => {
                document.getElementById('address-district').value = address.district;
            }, 100);
            
            document.getElementById('address-postcode').value = address.postcode;
            document.getElementById('address-default').checked = address.isDefault;
        }
        
        // Şehir değişikliğinde ilçeleri güncelle
        const citySelect = document.getElementById('address-city');
        if (citySelect) {
            citySelect.addEventListener('change', () => {
                updateDistrictOptions(citySelect.value);
            });
        }
        
        // Modalı göster
        if (window.openModal) {
            window.openModal(modal);
        }
        
        // Çeviriyi güncelle
        if (window.translatePage) {
            window.translatePage();
        }
    }
}

/**
 * İlçe seçeneklerini güncelleme
 * @param {string} city - Seçilen şehir
 */
function updateDistrictOptions(city) {
    const districtSelect = document.getElementById('address-district');
    
    if (districtSelect) {
        // İlçeleri temizle
        districtSelect.innerHTML = '<option value="" data-i18n="profile.select_district">İlçe Seçiniz</option>';
        
        // İlçe verisi (Gerçek uygulamada API'den alınacak)
        const districts = {
            'istanbul': ['kadikoy', 'besiktas', 'sisli', 'uskudar', 'beyoglu'],
            'ankara': ['cankaya', 'kecioren', 'yenimahalle', 'mamak', 'etimesgut'],
            'izmir': ['konak', 'karsiyaka', 'bornova', 'buca', 'cigli']
        };
        
        // Şehir için ilçeler varsa ekle
        if (city && districts[city]) {
            districts[city].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district.charAt(0).toUpperCase() + district.slice(1); // İlk harf büyük
                districtSelect.appendChild(option);
            });
        }
    }
}

/**
 * Adres kaydetme
 */
function saveAddress() {
    // Kullanıcı giriş yapmamışsa çık
    if (!currentUser) return;
    
    // Form verilerini al
    const addressId = document.getElementById('address-id').value;
    const title = document.getElementById('address-title').value;
    const firstName = document.getElementById('address-firstname').value;
    const lastName = document.getElementById('address-lastname').value;
    const phone = document.getElementById('address-phone').value;
    const address = document.getElementById('address-text').value;
    const city = document.getElementById('address-city').value;
    const district = document.getElementById('address-district').value;
    const postcode = document.getElementById('address-postcode').value;
    const isDefault = document.getElementById('address-default').checked;
    
    // Adres nesnesi oluştur
    const addressData = {
        title,
        firstName,
        lastName,
        phone,
        address,
        city,
        district,
        postcode,
        isDefault
    };
    
    // Yeni adres mi düzenleme mi?
    if (addressId) {
        // Adresi güncelle
        const addressIndex = currentUser.addresses.findIndex(a => a.id === parseInt(addressId));
        
        if (addressIndex !== -1) {
            // Varsayılan adres ise diğerlerinin varsayılan durumunu kaldır
            if (isDefault) {
                currentUser.addresses.forEach(a => a.isDefault = false);
            }
            
            // Adresi güncelle
            addressData.id = parseInt(addressId);
            currentUser.addresses[addressIndex] = addressData;
        }
    } else {
        // Yeni adres
        addressData.id = currentUser.addresses.length > 0 ? 
            Math.max(...currentUser.addresses.map(a => a.id)) + 1 : 1;
        
        // Varsayılan adres ise diğerlerinin varsayılan durumunu kaldır
        if (isDefault) {
            currentUser.addresses.forEach(a => a.isDefault = false);
        }
        
        // Eğer bu ilk adres ise otomatik olarak varsayılan yap
        if (currentUser.addresses.length === 0) {
            addressData.isDefault = true;
        }
        
        // Adresi ekle
        currentUser.addresses.push(addressData);
    }
    
    // Adresleri yeniden yükle
    loadAddresses();
    
    // Modalı kapat
    const modal = document.getElementById('address-modal');
    if (modal && window.closeModal) {
        window.closeModal(modal);
    }
}

/**
 * Adres düzenleme
 * @param {number} addressId - Düzenlenecek adres ID'si
 */
function editAddress(addressId) {
    // Kullanıcı giriş yapmamışsa çık
    if (!currentUser) return;
    
    // Adresi bul
    const address = currentUser.addresses.find(a => a.id === addressId);
    
    if (address) {
        // Adres modalını göster
        showAddressModal(address);
    }
}

/**
 * Adres silme
 * @param {number} addressId - Silinecek adres ID'si
 */
function deleteAddress(addressId) {
    // Kullanıcı giriş yapmamışsa çık
    if (!currentUser) return;
    
    // Onay penceresi göster
    const confirmDelete = confirm('Bu adresi silmek istediğinizden emin misiniz?');
    
    if (confirmDelete) {
        // Adresi bul ve kaldır
        const addressIndex = currentUser.addresses.findIndex(a => a.id === addressId);
        
        if (addressIndex !== -1) {
            // Silinen adres varsayılan ise ve başka adres varsa yeni varsayılan belirle
            if (currentUser.addresses[addressIndex].isDefault && currentUser.addresses.length > 1) {
                // Silinenden farklı ilk adresi varsayılan yap
                const newDefaultIndex = addressIndex === 0 ? 1 : 0;
                currentUser.addresses[newDefaultIndex].isDefault = true;
            }
            
            // Adresi kaldır
            currentUser.addresses.splice(addressIndex, 1);
            
            // Adresleri yeniden yükle
            loadAddresses();
        }
    }
}

/**
 * Varsayılan adres ayarlama
 * @param {number} addressId - Varsayılan yapılacak adres ID'si
 */
function setDefaultAddress(addressId) {
    // Kullanıcı giriş yapmamışsa çık
    if (!currentUser) return;
    
    // Tüm adreslerin varsayılan durumunu kaldır
    currentUser.addresses.forEach(address => {
        address.isDefault = false;
    });
    
    // Seçilen adresi varsayılan yap
    const address = currentUser.addresses.find(a => a.id === addressId);
    if (address) {
        address.isDefault = true;
    }
    
    // Adresleri yeniden yükle
    loadAddresses();
}

/**
 * Profil formlarını işleme
 */
function initProfileForms() {
    // Hesap bilgileri formu
    const accountForm = document.getElementById('account-form');
    if (accountForm) {
        accountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveAccountInfo();
        });
    }
    
    // Şifre değiştirme formu
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            changePassword();
        });
    }
}

/**
 * Hesap bilgilerini yükleme
 */
function loadAccountInfo() {
    // Kullanıcı giriş yapmamışsa çık
    if (!currentUser) return;
    
    // Form elementleri
    const firstNameInput = document.getElementById('account-firstname');
    const lastNameInput = document.getElementById('account-lastname');
    const emailInput = document.getElementById('account-email');
    const phoneInput = document.getElementById('account-phone');
    const birthdateInput = document.getElementById('account-birthdate');
    const genderSelect = document.getElementById('account-gender');
    const newsletterCheckbox = document.getElementById('account-newsletter');
    
    // Form alanlarını doldur
    if (firstNameInput) firstNameInput.value = currentUser.firstName;
    if (lastNameInput) lastNameInput.value = currentUser.lastName;
    if (emailInput) emailInput.value = currentUser.email;
    if (phoneInput) phoneInput.value = currentUser.phone;
    if (birthdateInput && currentUser.birthdate) birthdateInput.value = currentUser.birthdate;
    if (genderSelect && currentUser.gender) genderSelect.value = currentUser.gender;
    if (newsletterCheckbox) newsletterCheckbox.checked = currentUser.newsletter;
}

/**
 * Hesap bilgilerini kaydetme
 */
function saveAccountInfo() {
    // Kullanıcı giriş yapmamışsa çık
    if (!currentUser) return;
    
    // Form verilerini al
    const firstName = document.getElementById('account-firstname').value;
    const lastName = document.getElementById('account-lastname').value;
    const phone = document.getElementById('account-phone').value;
    const birthdate = document.getElementById('account-birthdate').value;
    const gender = document.getElementById('account-gender').value;
    const newsletter = document.getElementById('account-newsletter').checked;
    
    // Kullanıcı bilgilerini güncelle
    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.phone = phone;
    currentUser.birthdate = birthdate;
    currentUser.gender = gender;
    currentUser.newsletter = newsletter;
    
    // UI'ı güncelle
    updateProfileContent();
    
    // Başarı mesajı göster
    showAccountUpdateSuccess();
}

/**
 * Hesap bilgileri güncelleme başarı mesajı
 */
function showAccountUpdateSuccess() {
    // Başarı mesajı oluştur
    const accountForm = document.getElementById('account-form');
    
    if (accountForm) {
        // Var olan mesajı kaldır
        const existingMessage = accountForm.querySelector('.form-success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        
        // Mesaj içeriğini çeviri ile yap
        if (window.getTranslation) {
            successMessage.textContent = window.getTranslation('profile.account_updated');
        } else {
            successMessage.textContent = 'Hesap bilgileriniz başarıyla güncellendi.';
        }
        
        accountForm.appendChild(successMessage);
        
        // 3 saniye sonra mesajı kaldır
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
}

/**
 * Şifre değiştirme
 */
function changePassword() {
    // Kullanıcı giriş yapmamışsa çık
    if (!currentUser) return;
    
    // Form verilerini al
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Mevcut şifre kontrolü
    if (currentPassword !== currentUser.password) {
        showPasswordError('Mevcut şifre hatalı.');
        return;
    }
    
    // Şifre eşleşme kontrolü
    if (newPassword !== confirmPassword) {
        showPasswordError('Yeni şifreler eşleşmiyor.');
        return;
    }
    
    // Şifreyi güncelle
    currentUser.password = newPassword;
    
    // Formu sıfırla
    document.getElementById('password-form').reset();
    
    // Başarı mesajı göster
    showPasswordUpdateSuccess();
}

/**
 * Şifre değiştirme hatası gösterme
 * @param {string} message - Hata mesajı
 */
function showPasswordError(message) {
    // Hata mesajı oluştur
    const passwordForm = document.getElementById('password-form');
    
    if (passwordForm) {
        // Var olan mesajları kaldır
        const existingMessages = passwordForm.querySelectorAll('.form-error-message, .form-success-message');
        existingMessages.forEach(msg => msg.remove());
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error-message';
        
        // Çeviri kontrolü
        if (window.getTranslation) {
            // Mesaj türüne göre çeviri anahtarı
            let translationKey = '';
            
            if (message.includes('Mevcut şifre')) {
                translationKey = 'profile.current_password_incorrect';
            } else if (message.includes('eşleşmiyor')) {
                translationKey = 'profile.passwords_not_match';
            }
            
            const translatedMessage = window.getTranslation(translationKey);
            if (translatedMessage) {
                errorMessage.textContent = translatedMessage;
            } else {
                errorMessage.textContent = message;
            }
        } else {
            errorMessage.textContent = message;
        }
        
        passwordForm.appendChild(errorMessage);
        
        // 3 saniye sonra mesajı kaldır
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }
}

/**
 * Şifre değiştirme başarı mesajı
 */
function showPasswordUpdateSuccess() {
    // Başarı mesajı oluştur
    const passwordForm = document.getElementById('password-form');
    
    if (passwordForm) {
        // Var olan mesajları kaldır
        const existingMessages = passwordForm.querySelectorAll('.form-error-message, .form-success-message');
        existingMessages.forEach(msg => msg.remove());
        
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        
        // Mesaj içeriğini çeviri ile yap
        if (window.getTranslation) {
            successMessage.textContent = window.getTranslation('profile.password_updated');
        } else {
            successMessage.textContent = 'Şifreniz başarıyla güncellendi.';
        }
        
        passwordForm.appendChild(successMessage);
        
        // 3 saniye sonra mesajı kaldır
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
}
/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Yönetici Paneli JavaScript Dosyası
 */

// Mock veri yapıları (gerçek uygulamada veritabanından gelecek)
let adminData = {
    // Ürünler
    products: [
        {
            id: 1,
            name: {
                tr: 'Antep Fıstıklı Lokum',
                en: 'Pistachio Turkish Delight',
                ar: 'راحة الترك بالفستق الحلبي'
            },
            sku: 'LKM-001',
            category: 'lokum',
            price: 120.00,
            old_price: 150.00,
            status: 'active',
            stock: 100,
            sold: 253,
            image: 'img/products/antep-fistikli-lokum-1.jpg',
            is_new: true,
            is_featured: true
        },
        {
            id: 2,
            name: {
                tr: 'Gül Aromalı Lokum',
                en: 'Rose Flavored Turkish Delight',
                ar: 'راحة الترك بنكهة الورد'
            },
            sku: 'LKM-002',
            category: 'lokum',
            price: 100.00,
            old_price: 130.00,
            status: 'active',
            stock: 80,
            sold: 187,
            image: 'img/products/gul-aromali-lokum-1.jpg',
            is_new: false,
            is_featured: true
        },
        {
            id: 3,
            name: {
                tr: 'Fındıklı Lokum',
                en: 'Hazelnut Turkish Delight',
                ar: 'راحة الترك بالبندق'
            },
            sku: 'LKM-003',
            category: 'lokum',
            price: 130.00,
            old_price: 160.00,
            status: 'active',
            stock: 60,
            sold: 127,
            image: 'img/products/findikli-lokum-1.jpg',
            is_new: true,
            is_featured: true
        },
        {
            id: 4,
            name: {
                tr: 'Karışık Meyve Aromalı Lokum',
                en: 'Mixed Fruit Flavored Turkish Delight',
                ar: 'راحة الترك بنكهة الفواكه المشكلة'
            },
            sku: 'LKM-004',
            category: 'lokum',
            price: 90.00,
            old_price: 110.00,
            status: 'active',
            stock: 90,
            sold: 164,
            image: 'img/products/meyve-aromali-lokum-1.jpg',
            is_new: false,
            is_featured: false
        },
        {
            id: 5,
            name: {
                tr: 'Çifte Kavrulmuş Lokum',
                en: 'Double Roasted Turkish Delight',
                ar: 'راحة الترك المحمصة مرتين'
            },
            sku: 'LKM-005',
            category: 'lokum',
            price: 80.00,
            old_price: 95.00,
            status: 'out-of-stock',
            stock: 0,
            sold: 112,
            image: 'img/products/cifte-kavrulmus-lokum-1.jpg',
            is_new: false,
            is_featured: false
        },
        {
            id: 6,
            name: {
                tr: 'Akide Şekeri',
                en: 'Hard Candy',
                ar: 'حلوى صلبة'
            },
            sku: 'SKR-001',
            category: 'sekerleme',
            price: 70.00,
            old_price: 85.00,
            status: 'active',
            stock: 150,
            sold: 95,
            image: 'img/products/akide-sekeri-1.jpg',
            is_new: false,
            is_featured: true
        },
        {
            id: 7,
            name: {
                tr: 'Tarçınlı Lokum',
                en: 'Cinnamon Turkish Delight',
                ar: 'راحة الترك بالقرفة'
            },
            sku: 'LKM-007',
            category: 'lokum',
            price: 85.00,
            old_price: 100.00,
            status: 'active',
            stock: 70,
            sold: 103,
            image: 'img/products/tarcinli-lokum-1.jpg',
            is_new: true,
            is_featured: false
        },
        {
            id: 8,
            name: {
                tr: 'Karamelli Lokum',
                en: 'Caramel Turkish Delight',
                ar: 'راحة الترك بالكراميل'
            },
            sku: 'LKM-008',
            category: 'lokum',
            price: 110.00,
            old_price: 140.00,
            status: 'active',
            stock: 85,
            sold: 79,
            image: 'img/products/karamelli-lokum-1.jpg',
            is_new: true,
            is_featured: true
        },
        {
            id: 9,
            name: {
                tr: 'Karışık Baharatlı Lokum',
                en: 'Mixed Spice Turkish Delight',
                ar: 'راحة الترك بالتوابل المشكلة'
            },
            sku: 'LKM-009',
            category: 'lokum',
            price: 95.00,
            old_price: 115.00,
            status: 'inactive',
            stock: 65,
            sold: 45,
            image: 'img/products/baharatli-lokum-1.jpg',
            is_new: false,
            is_featured: false
        },
        {
            id: 10,
            name: {
                tr: 'Meyveli Akide Şekeri',
                en: 'Fruit Flavored Hard Candy',
                ar: 'حلوى صلبة بنكهة الفواكه'
            },
            sku: 'SKR-002',
            category: 'sekerleme',
            price: 75.00,
            old_price: 90.00,
            status: 'active',
            stock: 110,
            sold: 86,
            image: 'img/products/meyveli-akide-sekeri-1.jpg',
            is_new: false,
            is_featured: true
        }
    ],
    
    // Kategoriler
    categories: [
        {
            id: 1,
            name: {
                tr: 'Türk Lokumu',
                en: 'Turkish Delight',
                ar: 'راحة الترك'
            },
            slug: 'lokum',
            image: 'img/backgrounds/lokum-bg.jpg',
            status: 'active',
            products_count: 7,
            description: {
                tr: 'Geleneksel Türk lokumu çeşitleri',
                en: 'Traditional Turkish delight varieties',
                ar: 'أنواع راحة الترك التقليدية'
            }
        },
        {
            id: 2,
            name: {
                tr: 'Şekerleme',
                en: 'Candy',
                ar: 'حلويات'
            },
            slug: 'sekerleme',
            image: 'img/backgrounds/sekerleme-bg.jpg',
            status: 'active',
            products_count: 2,
            description: {
                tr: 'Geleneksel Türk şekerlemeleri',
                en: 'Traditional Turkish candies',
                ar: 'الحلويات التركية التقليدية'
            }
        },
        {
            id: 3,
            name: {
                tr: 'Özel Üretim',
                en: 'Special Production',
                ar: 'الإنتاج الخاص'
            },
            slug: 'ozel',
            image: 'img/backgrounds/ozel-bg.jpg',
            status: 'active',
            products_count: 1,
            description: {
                tr: 'Özel günler için hazırlanan ürünler',
                en: 'Products prepared for special occasions',
                ar: 'منتجات معدة للمناسبات الخاصة'
            }
        }
    ],
    
    // Siparişler
    orders: [
        {
            id: 'ORD12345',
            customer: 'Ahmet Yılmaz',
            date: '2025-03-15',
            items: 3,
            total: 320.00,
            payment_method: 'credit-card',
            status: 'delivered',
            shipping_address: 'Örnek Mahallesi, İstanbul',
            email: 'ahmet@example.com',
            phone: '+90 555 123 4567'
        },
        {
            id: 'ORD12346',
            customer: 'Ayşe Kaya',
            date: '2025-03-14',
            items: 2,
            total: 190.00,
            payment_method: 'cash-on-delivery',
            status: 'shipped',
            shipping_address: 'Yeni Sokak, Ankara',
            email: 'ayse@example.com',
            phone: '+90 555 987 6543'
        },
        {
            id: 'ORD12347',
            customer: 'Mehmet Demir',
            date: '2025-03-12',
            items: 4,
            total: 450.00,
            payment_method: 'credit-card',
            status: 'processing',
            shipping_address: 'Ana Cadde, İzmir',
            email: 'mehmet@example.com',
            phone: '+90 555 456 7890'
        },
        {
            id: 'ORD12348',
            customer: 'Zeynep Şahin',
            date: '2025-03-10',
            items: 1,
            total: 100.00,
            payment_method: 'card-on-delivery',
            status: 'pending',
            shipping_address: 'Merkez Mahallesi, Bursa',
            email: 'zeynep@example.com',
            phone: '+90 555 234 5678'
        },
        {
            id: 'ORD12349',
            customer: 'Ali Özkan',
            date: '2025-03-08',
            items: 3,
            total: 280.00,
            payment_method: 'credit-card',
            status: 'cancelled',
            shipping_address: 'Park Yolu, Antalya',
            email: 'ali@example.com',
            phone: '+90 555 345 6789'
        }
    ],
    
    // İndirim kuponları
    discounts: [
        {
            id: 1,
            code: 'WELCOME10',
            type: 'percentage',
            amount: 10,
            usage_limit: 100,
            used: 45,
            expiry_date: '2025-12-31',
            status: 'active'
        },
        {
            id: 2,
            code: 'OZYRK20',
            type: 'percentage',
            amount: 20,
            usage_limit: 50,
            used: 12,
            expiry_date: '2025-06-30',
            status: 'active'
        },
        {
            id: 3,
            code: 'FREESHIP',
            type: 'free-shipping',
            amount: 0,
            usage_limit: 200,
            used: 67,
            expiry_date: '2025-05-15',
            status: 'active'
        },
        {
            id: 4,
            code: 'FLAT50TL',
            type: 'fixed',
            amount: 50,
            usage_limit: 30,
            used: 30,
            expiry_date: '2025-04-01',
            status: 'expired'
        }
    ],
    
    // Kullanıcılar
    users: [
        {
            id: 1,
            name: 'Ahmet Yılmaz',
            email: 'ahmet@example.com',
            phone: '+90 555 123 4567',
            orders: 5,
            date_registered: '2024-12-10'
        },
        {
            id: 2,
            name: 'Ayşe Kaya',
            email: 'ayse@example.com',
            phone: '+90 555 987 6543',
            orders: 3,
            date_registered: '2025-01-05'
        },
        {
            id: 3,
            name: 'Mehmet Demir',
            email: 'mehmet@example.com',
            phone: '+90 555 456 7890',
            orders: 2,
            date_registered: '2025-01-22'
        },
        {
            id: 4,
            name: 'Zeynep Şahin',
            email: 'zeynep@example.com',
            phone: '+90 555 234 5678',
            orders: 4,
            date_registered: '2025-02-14'
        },
        {
            id: 5,
            name: 'Ali Özkan',
            email: 'ali@example.com',
            phone: '+90 555 345 6789',
            orders: 1,
            date_registered: '2025-03-01'
        }
    ]
};
// admin.js (Devam)

// Bildirim şablonları
adminData.notification_templates = {
    email: {
        'order-received': {
            subject: {
                tr: 'Siparişiniz Alındı - Özyürek Şekerleme',
                en: 'Your Order Received - Özyürek Şekerleme',
                ar: 'تم استلام طلبك - أوزيوريك شيكيرليمه'
            },
            body: {
                tr: '<p>Sayın {{name}},</p><p>Siparişiniz başarıyla alındı. Sipariş numaranız: {{order_id}}.</p><p>Siparişiniz hazırlanmaya başladığında sizi bilgilendireceğiz.</p><p>Teşekkürler,<br>Özyürek Şekerleme</p>',
                en: '<p>Dear {{name}},</p><p>Your order has been received successfully. Your order number: {{order_id}}.</p><p>We will inform you when your order starts processing.</p><p>Thank you,<br>Özyürek Şekerleme</p>',
                ar: '<p>عزيزي {{name}}،</p><p>تم استلام طلبك بنجاح. رقم طلبك: {{order_id}}.</p><p>سنعلمك عندما تبدأ معالجة طلبك.</p><p>شكرًا لك،<br>أوزيوريك شيكيرليمه</p>'
            }
        },
        'payment-confirmed': {
            subject: {
                tr: 'Ödemeniz Onaylandı - Özyürek Şekerleme',
                en: 'Your Payment Confirmed - Özyürek Şekerleme',
                ar: 'تم تأكيد الدفع الخاص بك - أوزيوريك شيكيرليمه'
            },
            body: {
                tr: '<p>Sayın {{name}},</p><p>{{order_id}} numaralı siparişiniz için ödemeniz onaylanmıştır.</p><p>Siparişiniz hazırlanmaya başlamıştır.</p><p>Teşekkürler,<br>Özyürek Şekerleme</p>',
                en: '<p>Dear {{name}},</p><p>Your payment for order {{order_id}} has been confirmed.</p><p>Your order is now being processed.</p><p>Thank you,<br>Özyürek Şekerleme</p>',
                ar: '<p>عزيزي {{name}}،</p><p>تم تأكيد الدفع الخاص بك للطلب {{order_id}}.</p><p>يتم الآن معالجة طلبك.</p><p>شكرًا لك،<br>أوزيوريك شيكيرليمه</p>'
            }
        },
        'order-shipped': {
            subject: {
                tr: 'Siparişiniz Kargoya Verildi - Özyürek Şekerleme',
                en: 'Your Order Shipped - Özyürek Şekerleme',
                ar: 'تم شحن طلبك - أوزيوريك شيكيرليمه'
            },
            body: {
                tr: '<p>Sayın {{name}},</p><p>{{order_id}} numaralı siparişiniz kargoya verilmiştir.</p><p>Takip numaranız: {{tracking_number}}</p><p>Teşekkürler,<br>Özyürek Şekerleme</p>',
                en: '<p>Dear {{name}},</p><p>Your order {{order_id}} has been shipped.</p><p>Your tracking number: {{tracking_number}}</p><p>Thank you,<br>Özyürek Şekerleme</p>',
                ar: '<p>عزيزي {{name}}،</p><p>تم شحن طلبك {{order_id}}.</p><p>رقم التتبع الخاص بك: {{tracking_number}}</p><p>شكرًا لك،<br>أوزيوريك شيكيرليمه</p>'
            }
        }
    },
    sms: {
        'order-received': {
            tr: 'Özyürek Şekerleme: Siparişiniz alındı. Sipariş no: {{order_id}}. Teşekkürler.',
            en: 'Özyürek Şekerleme: Your order received. Order no: {{order_id}}. Thank you.',
            ar: 'أوزيوريك شيكيرليمه: تم استلام طلبك. رقم الطلب: {{order_id}}. شكرًا لك.'
        },
        'payment-confirmed': {
            tr: 'Özyürek Şekerleme: {{order_id}} no\'lu siparişiniz için ödemeniz onaylandı.',
            en: 'Özyürek Şekerleme: Payment confirmed for your order {{order_id}}.',
            ar: 'أوزيوريك شيكيرليمه: تم تأكيد الدفع لطلبك {{order_id}}.'
        },
        'order-shipped': {
            tr: 'Özyürek Şekerleme: {{order_id}} no\'lu siparişiniz kargoya verildi. Takip no: {{tracking_number}}',
            en: 'Özyürek Şekerleme: Your order {{order_id}} shipped. Tracking no: {{tracking_number}}',
            ar: 'أوزيوريك شيكيرليمه: تم شحن طلبك {{order_id}}. رقم التتبع: {{tracking_number}}'
        }
    }
};

// Site ayarları
adminData.settings = {
    site_title: {
        tr: 'Özyürek Şekerleme - Geleneksel Türk Lokumu',
        en: 'Özyürek Şekerleme - Traditional Turkish Delight',
        ar: 'أوزيوريك شيكيرليمه - راحة تركية تقليدية'
    },
    contact_email: 'info@ozyureksekerleme.com',
    contact_phone: '+90 212 123 4567',
    address: {
        tr: 'İstanbul, Türkiye',
        en: 'Istanbul, Turkey',
        ar: 'إسطنبول، تركيا'
    },
    social_media: {
        facebook: 'https://facebook.com/ozyureksekerleme',
        instagram: 'https://instagram.com/ozyureksekerleme',
        twitter: 'https://twitter.com/ozyureksekerleme'
    },
    payment_settings: {
        iyzico_api_key: 'sandbox-xxxxxxxxxxxx',
        iyzico_secret_key: 'sandbox-xxxxxxxxxxxx'
    },
    shipping_settings: {
        free_shipping_threshold: 250.00,
        default_shipping_fee: 25.00
    }
};

// İstatistikler
adminData.statistics = {
    revenue: {
        daily: 4350.00,
        weekly: 27450.00,
        monthly: 92750.00,
        yearly: 275000.00
    },
    orders: {
        daily: 15,
        weekly: 88,
        monthly: 320,
        yearly: 1250
    },
    products_sold: {
        daily: 45,
        weekly: 286,
        monthly: 950,
        yearly: 3850
    },
    top_selling_products: [1, 2, 3, 6, 8],
    top_cities: ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa']
};

/**
 * Sayfa yüklendiğinde çalışacak fonksiyon
 */
document.addEventListener('DOMContentLoaded', () => {
    // Admin oturum kontrolü
    checkAdminSession();
    
    // Sayfa içeriğini başlat
    initAdminPage();
    
    // Event Listener'ları ekle
    setupEventListeners();
    
    // Varsayılan grafikleri yükle
    loadDashboardCharts();
});

/**
 * Admin oturum kontrolü
 */
function checkAdminSession() {
    const userSession = localStorage.getItem('userSession');
    
    if (userSession) {
        try {
            const sessionData = JSON.parse(userSession);
            
            // Admin kontrolü
            if (!sessionData.isAdmin) {
                // Admin değilse ana sayfaya yönlendir
                window.location.href = 'index.html';
            }
        } catch (e) {
            console.error('Oturum bilgisi okunamadı:', e);
            window.location.href = 'login.html';
        }
    } else {
        // Oturum yoksa giriş sayfasına yönlendir
        window.location.href = 'login.html';
    }
}

/**
 * Admin panelini başlatma
 */
function initAdminPage() {
    // URL hash kontrolü
    const hash = window.location.hash.substring(1);
    let activePanel = 'dashboard'; // Varsayılan panel
    
    if (hash && document.getElementById(hash)) {
        activePanel = hash;
    }
    
    // İlgili panel ve menü öğesini aktifleştir
    activateAdminPanel(activePanel);
    
    // Dashboard içeriğini yükle
    loadDashboardData();
    
    // Ürünleri yükle
    loadProducts();
    
    // Kategorileri yükle
    loadCategories();
    
    // Siparişleri yükle
    loadOrders();
    
    // İndirimleri yükle
    loadDiscounts();
    
    // Bildirim şablonlarını yükle
    loadNotificationTemplates();
    
    // Çevirileri yükle
    loadTranslations();
    
    // Ayarları yükle
    loadSettings();
}

/**
 * Admin panel event listener'larını ayarlama
 */
function setupEventListeners() {
    // Menü buton tıklama olayları
    setupMenuEvents();
    
    // Ürün yönetim olayları
    setupProductEvents();
    
    // Kategori yönetim olayları
    setupCategoryEvents();
    
    // Sipariş yönetim olayları
    setupOrderEvents();
    
    // İndirim yönetim olayları
    setupDiscountEvents();
    
    // Bildirim şablonları olayları
    setupNotificationEvents();
    
    // Çeviriler olayları
    setupTranslationEvents();
    
    // Ayarlar olayları
    setupSettingsEvents();
    
    // Çıkış butonu
    document.getElementById('admin-logout').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
}

/**
 * Menü olaylarını ayarlama
 */
function setupMenuEvents() {
    const menuItems = document.querySelectorAll('.admin-menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const panelId = this.getAttribute('data-panel');
            activateAdminPanel(panelId);
            
            // URL'yi güncelle
            window.history.pushState({}, '', `#${panelId}`);
        });
    });
}/**
 * Panel aktivasyonu
 * @param {string} panelId - Aktifleştirilecek panel ID'si
 */
function activateAdminPanel(panelId) {
    // Tüm panelleri gizle
    const panels = document.querySelectorAll('.admin-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Tüm menü öğelerini deaktif yap
    const menuItems = document.querySelectorAll('.admin-menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Seçilen paneli göster
    const activePanel = document.getElementById(panelId);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    // Seçilen menü öğesini aktifleştir
    const activeMenuItem = document.querySelector(`.admin-menu-item[data-panel="${panelId}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
}

/**
 * Dashboard verilerini yükleme
 */
function loadDashboardData() {
    // İstatistikleri yükle
    document.getElementById('daily-revenue').textContent = adminData.statistics.revenue.daily.toFixed(2) + ' ₺';
    document.getElementById('weekly-revenue').textContent = adminData.statistics.revenue.weekly.toFixed(2) + ' ₺';
    document.getElementById('monthly-revenue').textContent = adminData.statistics.revenue.monthly.toFixed(2) + ' ₺';
    document.getElementById('yearly-revenue').textContent = adminData.statistics.revenue.yearly.toFixed(2) + ' ₺';
    
    document.getElementById('daily-orders').textContent = adminData.statistics.orders.daily;
    document.getElementById('weekly-orders').textContent = adminData.statistics.orders.weekly;
    document.getElementById('monthly-orders').textContent = adminData.statistics.orders.monthly;
    document.getElementById('yearly-orders').textContent = adminData.statistics.orders.yearly;
    
    // Son siparişleri yükle
    const recentOrdersTable = document.getElementById('recent-orders-table');
    if (recentOrdersTable) {
        let recentOrdersHTML = `
            <thead>
                <tr>
                    <th>Sipariş No</th>
                    <th>Müşteri</th>
                    <th>Tarih</th>
                    <th>Tutar</th>
                    <th>Durum</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        // Son 5 siparişi listeye ekle
        const recentOrders = [...adminData.orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        
        recentOrders.forEach(order => {
            const statusClass = getOrderStatusClass(order.status);
            
            recentOrdersHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${formatDate(order.date)}</td>
                    <td>${order.total.toFixed(2)} ₺</td>
                    <td><span class="status-badge ${statusClass}">${translateOrderStatus(order.status)}</span></td>
                </tr>
            `;
        });
        
        recentOrdersHTML += '</tbody>';
        recentOrdersTable.innerHTML = recentOrdersHTML;
    }
    
    // En çok satan ürünleri yükle
    const topSellingTable = document.getElementById('top-selling-table');
    if (topSellingTable) {
        let topSellingHTML = `
            <thead>
                <tr>
                    <th>Ürün</th>
                    <th>Kategori</th>
                    <th>Fiyat</th>
                    <th>Satış</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        // En çok satan ürünleri bul
        const topSellingProducts = adminData.statistics.top_selling_products.map(id => {
            return adminData.products.find(product => product.id === id);
        });
        
        topSellingProducts.forEach(product => {
            if (product) {
                const category = adminData.categories.find(cat => cat.slug === product.category);
                
                topSellingHTML += `
                    <tr>
                        <td>${product.name.tr}</td>
                        <td>${category ? category.name.tr : ''}</td>
                        <td>${product.price.toFixed(2)} ₺</td>
                        <td>${product.sold}</td>
                    </tr>
                `;
            }
        });
        
        topSellingHTML += '</tbody>';
        topSellingTable.innerHTML = topSellingHTML;
    }
    
    // Stok durumu düşük ürünleri yükle
    const lowStockTable = document.getElementById('low-stock-table');
    if (lowStockTable) {
        let lowStockHTML = `
            <thead>
                <tr>
                    <th>Ürün</th>
                    <th>SKU</th>
                    <th>Kalan Stok</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        // Stok durumu 20'nin altında olan ürünleri listele
        const lowStockProducts = adminData.products.filter(product => product.stock < 20 && product.status === 'active');
        
        lowStockProducts.forEach(product => {
            lowStockHTML += `
                <tr>
                    <td>${product.name.tr}</td>
                    <td>${product.sku}</td>
                    <td>${product.stock}</td>
                </tr>
            `;
        });
        
        lowStockHTML += '</tbody>';
        lowStockTable.innerHTML = lowStockHTML;
    }
}

/**
 * Dashboard grafiklerini yükleme
 */
function loadDashboardCharts() {
    // Satış grafiği
    const salesChartCanvas = document.getElementById('sales-chart');
    if (salesChartCanvas) {
        const ctx = salesChartCanvas.getContext('2d');
        
        // Son 7 günün örnek satış verileri
        const salesData = {
            labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
            datasets: [{
                label: 'Satışlar (₺)',
                data: [3200, 4100, 3800, 4500, 4200, 3900, 4350],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4
            }]
        };
        
        new Chart(ctx, {
            type: 'line',
            data: salesData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Haftalık Satış Grafiği'
                    }
                }
            }
        });
    }
    
    // Kategori satış dağılımı
    const categoryChartCanvas = document.getElementById('category-chart');
    if (categoryChartCanvas) {
        const ctx = categoryChartCanvas.getContext('2d');
        
        // Kategorilerin toplam satış sayıları
        const categorySalesData = {};
        
        adminData.products.forEach(product => {
            if (!categorySalesData[product.category]) {
                categorySalesData[product.category] = 0;
            }
            
            categorySalesData[product.category] += product.sold;
        });
        
        const categoryLabels = [];
        const categoryData = [];
        const backgroundColors = ['#4CAF50', '#FF5722', '#2196F3', '#FFC107', '#9C27B0'];
        
        let i = 0;
        for (const category in categorySalesData) {
            const categoryInfo = adminData.categories.find(cat => cat.slug === category);
            
            if (categoryInfo) {
                categoryLabels.push(categoryInfo.name.tr);
                categoryData.push(categorySalesData[category]);
            }
            i++;
        }
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categoryLabels,
                datasets: [{
                    data: categoryData,
                    backgroundColor: backgroundColors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Kategori Satış Dağılımı'
                    }
                }
            }
        });
    }
}

/**
 * Ürünleri listeleme
 */
function loadProducts() {
    const productsTable = document.getElementById('products-table');
    if (productsTable) {
        let productsHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Ürün</th>
                    <th>SKU</th>
                    <th>Kategori</th>
                    <th>Fiyat</th>
                    <th>Stok</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        adminData.products.forEach(product => {
            const category = adminData.categories.find(cat => cat.slug === product.category);
            const statusClass = getProductStatusClass(product.status);
            
            productsHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name.tr}</td>
                    <td>${product.sku}</td>
                    <td>${category ? category.name.tr : ''}</td>
                    <td>${product.price.toFixed(2)} ₺</td>
                    <td>${product.stock}</td>
                    <td><span class="status-badge ${statusClass}">${translateProductStatus(product.status)}</span></td>
                    <td>
                        <button class="btn-edit" data-id="${product.id}">Düzenle</button>
                        <button class="btn-delete" data-id="${product.id}">Sil</button>
                    </td>
                </tr>
            `;
        });
        
        productsHTML += '</tbody>';
        productsTable.innerHTML = productsHTML;
    }
}

/**
 * Kategorileri listeleme
 */
function loadCategories() {
    const categoriesTable = document.getElementById('categories-table');
    if (categoriesTable) {
        let categoriesHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Kategori</th>
                    <th>Ürün Sayısı</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        adminData.categories.forEach(category => {
            const statusClass = category.status === 'active' ? 'status-active' : 'status-inactive';
            
            categoriesHTML += `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.name.tr}</td>
                    <td>${category.products_count}</td>
                    <td><span class="status-badge ${statusClass}">${category.status === 'active' ? 'Aktif' : 'Pasif'}</span></td>
                    <td>
                        <button class="btn-edit-category" data-id="${category.id}">Düzenle</button>
                        <button class="btn-delete-category" data-id="${category.id}">Sil</button>
                    </td>
                </tr>
            `;
        });
        
        categoriesHTML += '</tbody>';
        categoriesTable.innerHTML = categoriesHTML;
    }
}

/**
 * Siparişleri listeleme
 */
function loadOrders() {
    const ordersTable = document.getElementById('orders-table');
    if (ordersTable) {
        let ordersHTML = `
            <thead>
                <tr>
                    <th>Sipariş No</th>
                    <th>Müşteri</th>
                    <th>Tarih</th>
                    <th>Tutar</th>
                    <th>Ödeme</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        adminData.orders.forEach(order => {
            const statusClass = getOrderStatusClass(order.status);
            
            ordersHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${formatDate(order.date)}</td>
                    <td>${order.total.toFixed(2)} ₺</td>
                    <td>${translatePaymentMethod(order.payment_method)}</td>
                    <td><span class="status-badge ${statusClass}">${translateOrderStatus(order.status)}</span></td>
                    <td>
                        <button class="btn-view-order" data-id="${order.id}">Görüntüle</button>
                        <button class="btn-update-status" data-id="${order.id}">Durum Güncelle</button>
                    </td>
                </tr>
            `;
        });
        
        ordersHTML += '</tbody>';
        ordersTable.innerHTML = ordersHTML;
    }
}

/**
 * İndirimleri listeleme
 */
function loadDiscounts() {
    const discountsTable = document.getElementById('discounts-table');
    if (discountsTable) {
        let discountsHTML = `
            <thead>
                <tr>
                    <th>Kod</th>
                    <th>Tür</th>
                    <th>Tutar/Oran</th>
                    <th>Kullanım</th>
                    <th>Son Tarih</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        adminData.discounts.forEach(discount => {
            const statusClass = discount.status === 'active' ? 'status-active' : 'status-inactive';
            const discountValue = discount.type === 'percentage' 
                ? `%${discount.amount}`
                : discount.type === 'fixed' 
                    ? `${discount.amount} ₺` 
                    : 'Ücretsiz Kargo';
            
            discountsHTML += `
                <tr>
                    <td>${discount.code}</td>
                    <td>${translateDiscountType(discount.type)}</td>
                    <td>${discountValue}</td>
                    <td>${discount.used}/${discount.usage_limit}</td>
                    <td>${formatDate(discount.expiry_date)}</td>
                    <td><span class="status-badge ${statusClass}">${discount.status === 'active' ? 'Aktif' : 'Süresi Doldu'}</span></td>
                    <td>
                        <button class="btn-edit-discount" data-id="${discount.id}">Düzenle</button>
                        <button class="btn-delete-discount" data-id="${discount.id}">Sil</button>
                    </td>
                </tr>
            `;
        });
        
        discountsHTML += '</tbody>';
        discountsTable.innerHTML = discountsHTML;
    }
}

/**
 * Bildirim şablonlarını yükleme
 */
function loadNotificationTemplates() {
    const emailTemplatesContainer = document.getElementById('email-templates');
    const smsTemplatesContainer = document.getElementById('sms-templates');
    
    if (emailTemplatesContainer) {
        let emailTemplatesHTML = '';
        
        // E-posta şablonları
        for (const templateKey in adminData.notification_templates.email) {
            const template = adminData.notification_templates.email[templateKey];
            
            emailTemplatesHTML += `
                <div class="template-card">
                    <h3>${translateNotificationTemplate(templateKey)}</h3>
                    <div class="template-tabs">
                        <button class="template-tab active" data-lang="tr">Türkçe</button>
                        <button class="template-tab" data-lang="en">English</button>
                        <button class="template-tab" data-lang="ar">العربية</button>
                    </div>
                    <div class="template-content">
                        <div class="template-field">
                            <label>Konu:</label>
                            <input type="text" class="template-subject" data-template="${templateKey}" data-lang="tr" value="${template.subject.tr}">
                        </div>
                        <div class="template-field">
                            <label>İçerik:</label>
                            <textarea class="template-body" data-template="${templateKey}" data-lang="tr">${template.body.tr}</textarea>
                        </div>
                    </div>
                    <div class="template-actions">
                        <button class="btn-save-template" data-type="email" data-template="${templateKey}">Kaydet</button>
                    </div>
                </div>
            `;
        }
        
        emailTemplatesContainer.innerHTML = emailTemplatesHTML;
    }
    
    if (smsTemplatesContainer) {
        let smsTemplatesHTML = '';
        
        // SMS şablonları
        for (const templateKey in adminData.notification_templates.sms) {
            const template = adminData.notification_templates.sms[templateKey];
            
            smsTemplatesHTML += `
                <div class="template-card">
                    <h3>${translateNotificationTemplate(templateKey)}</h3>
                    <div class="template-tabs">
                        <button class="template-tab active" data-lang="tr">Türkçe</button>
                        <button class="template-tab" data-lang="en">English</button>
                        <button class="template-tab" data-lang="ar">العربية</button>
                    </div>
                    <div class="template-content">
                        <div class="template-field">
                            <label>İçerik:</label>
                            <textarea class="template-sms" data-template="${templateKey}" data-lang="tr">${template.tr}</textarea>
                        </div>
                    </div>
                    <div class="template-actions">
                        <button class="btn-save-template" data-type="sms" data-template="${templateKey}">Kaydet</button>
                    </div>
                </div>
            `;
        }
        
        smsTemplatesContainer.innerHTML = smsTemplatesHTML;
    }
    
    // Şablon sekmelerine tıklama olayları
    setupTemplateTabEvents();
}

/**
 * Şablon sekme tıklama olaylarını ayarlama
 */
function setupTemplateTabEvents() {
    const templateTabs = document.querySelectorAll('.template-tab');
    
    templateTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Aynı karttaki diğer sekmeleri deaktif yap
            const card = this.closest('.template-card');
            card.querySelectorAll('.template-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Tıklanan sekmeyi aktifleştir
            this.classList.add('active');
            
            // Seçilen dil
            const lang = this.getAttribute('data-lang');
            
            // E-posta şablonları
            const subject = card.querySelector('.template-subject');
            const body = card.querySelector('.template-body');
            
            if (subject && body) {
                const templateKey = subject.getAttribute('data-template');
                const template = adminData.notification_templates.email[templateKey];
                
                subject.value = template.subject[lang];
                subject.setAttribute('data-lang', lang);
                
                body.value = template.body[lang];
                body.setAttribute('data-lang', lang);
            }
            
            // SMS şablonları
            const sms = card.querySelector('.template-sms');
            
            if (sms) {
                const templateKey = sms.getAttribute('data-template');
                const template = adminData.notification_templates.sms[templateKey];
                
                sms.value = template[lang];
                sms.setAttribute('data-lang', lang);
            }
        });
    });
}

/**
 * Çevirileri yükleme
 */
function loadTranslations() {
    // Bu fonksiyon, web sitesindeki çeviri metinlerini yönetmek için kullanılabilir
    // Şu an için mock veriler ile bir şey yapmıyoruz
    console.log('Çeviriler yüklendi');
}

/**
 * Site ayarlarını yükleme
 */
function loadSettings() {
    // Site başlığı
    const siteTitleTr = document.getElementById('site-title-tr');
    const siteTitleEn = document.getElementById('site-title-en');
    const siteTitleAr = document.getElementById('site-title-ar');
    
    if (siteTitleTr) siteTitleTr.value = adminData.settings.site_title.tr;
    if (siteTitleEn) siteTitleEn.value = adminData.settings.site_title.en;
    if (siteTitleAr) siteTitleAr.value = adminData.settings.site_title.ar;
    
    // İletişim bilgileri
    const contactEmail = document.getElementById('contact-email');
    const contactPhone = document.getElementById('contact-phone');
    
    if (contactEmail) contactEmail.value = adminData.settings.contact_email;
    if (contactPhone) contactPhone.value = adminData.settings.contact_phone;
    
    // Adres
    const addressTr = document.getElementById('address-tr');
    const addressEn = document.getElementById('address-en');
    const addressAr = document.getElementById('address-ar');
    
    if (addressTr) addressTr.value = adminData.settings.address.tr;
    if (addressEn) addressEn.value = adminData.settings.address.en;
    if (addressAr) addressAr.value = adminData.settings.address.ar;
    
    // Sosyal medya
    const facebookUrl = document.getElementById('facebook-url');
    const instagramUrl = document.getElementById('instagram-url');
    const twitterUrl = document.getElementById('twitter-url');
    
    if (facebookUrl) facebookUrl.value = adminData.settings.social_media.facebook;
    if (instagramUrl) instagramUrl.value = adminData.settings.social_media.instagram;
    if (twitterUrl) twitterUrl.value = adminData.settings.social_media.twitter;
    
    // Ödeme ayarları
    const iyzicoApiKey = document.getElementById('iyzico-api-key');
    const iyzicoSecretKey = document.getElementById('iyzico-secret-key');
    
    if (iyzicoApiKey) iyzicoApiKey.value = adminData.settings.payment_settings.iyzico_api_key;
    if (iyzicoSecretKey) iyzicoSecretKey.value = adminData.settings.payment_settings.iyzico_secret_key;
    
    // Kargo ayarları
    const freeShippingThreshold = document.getElementById('free-shipping-threshold');
    const defaultShippingFee = document.getElementById('default-shipping-fee');
    
    if (freeShippingThreshold) freeShippingThreshold.value = adminData.settings.shipping_settings.free_shipping_threshold;
    if (defaultShippingFee) defaultShippingFee.value = adminData.settings.shipping_settings.default_shipping_fee;
}

/**
 * Ürün olay dinleyicilerini ayarlama
 */
function setupProductEvents() {
    // Ürün düzenleme butonları
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openProductEditModal(productId);
        });
    });
    
    // Ürün silme butonları
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            
            if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
                deleteProduct(productId);
            }
        });
    });
    
    // Yeni ürün ekleme butonu
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            openProductEditModal();
        });
    }
    
    // Ürün form gönderme
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProduct();
        });
    }
}

/**
 * Kategori olay dinleyicilerini ayarlama
 */
function setupCategoryEvents() {
    // Kategori düzenleme butonları
    const editButtons = document.querySelectorAll('.btn-edit-category');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = parseInt(this.getAttribute('data-id'));
            openCategoryEditModal(categoryId);
        });
    });
    
    // Kategori silme butonları
    const deleteButtons = document.querySelectorAll('.btn-delete-category');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = parseInt(this.getAttribute('data-id'));
            
            if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
                deleteCategory(categoryId);
            }
        });
    });
    
    // Yeni kategori ekleme butonu
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', function() {
            openCategoryEditModal();
        });
    }
    
    // Kategori form gönderme
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveCategory();
        });
    }
}

/**
 * Sipariş olay dinleyicilerini ayarlama
 */
function setupOrderEvents() {
    // Sipariş görüntüleme butonları
    const viewButtons = document.querySelectorAll('.btn-view-order');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-id');
            openOrderDetailModal(orderId);
        });
    });
    
    // Sipariş durumu güncelleme butonları
    const updateStatusButtons = document.querySelectorAll('.btn-update-status');
    updateStatusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-id');
            openOrderStatusModal(orderId);
        });
    });
    
    // Sipariş durumu form gönderme
    const statusForm = document.getElementById('order-status-form');
    if (statusForm) {
        statusForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateOrderStatus();
        });
    }
}

/**
 * İndirim olay dinleyicilerini ayarlama
 */
function setupDiscountEvents() {
    // İndirim düzenleme butonları
    const editButtons = document.querySelectorAll('.btn-edit-discount');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const discountId = parseInt(this.getAttribute('data-id'));
            openDiscountEditModal(discountId);
        });
    });
    
    // İndirim silme butonları
    const deleteButtons = document.querySelectorAll('.btn-delete-discount');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const discountId = parseInt(this.getAttribute('data-id'));
            
            if (confirm('Bu indirim kodunu silmek istediğinizden emin misiniz?')) {
                deleteDiscount(discountId);
            }
        });
    });
    
    // Yeni indirim ekleme butonu
    const addDiscountBtn = document.getElementById('add-discount-btn');
    if (addDiscountBtn) {
        addDiscountBtn.addEventListener('click', function() {
            openDiscountEditModal();
        });
    }
    
    // İndirim form gönderme
    const discountForm = document.getElementById('discount-form');
    if (discountForm) {
        discountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveDiscount();
        });
    }
}

/**
 * Bildirim şablonları olay dinleyicilerini ayarlama
 */
function setupNotificationEvents() {
    // Şablon kaydetme butonları
    const saveButtons = document.querySelectorAll('.btn-save-template');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const templateKey = this.getAttribute('data-template');
            saveNotificationTemplate(type, templateKey);
        });
    });
}

/**
 * Çeviri olay dinleyicilerini ayarlama
 */
function setupTranslationEvents() {
    // Bu fonksiyon, çeviri metinleri için olay dinleyicileri ayarlamak için kullanılabilir
    // Şu an için bir şey yapmıyoruz
    console.log('Çeviri olayları ayarlandı');
}

/**
 * Ayarlar olay dinleyicilerini ayarlama
 */
function setupSettingsEvents() {
    // Ayarlar form gönderme
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }
}

/**
 * Ürün düzenle modalını açma
 * @param {number|null} productId - Düzenlenecek ürün ID'si (yeni ürün için null)
 */
function openProductEditModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    
    if (modal && form) {
        // Modalı göster
        modal.classList.add('active');
        
        // Form alanlarını temizle
        form.reset();
        
        // Form başlığını güncelle
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.textContent = productId ? 'Ürün Düzenle' : 'Yeni Ürün Ekle';
        }
        
        // Ürün ID'sini form input'una ekle
        const productIdInput = form.querySelector('#product-id');
        if (productIdInput) {
            productIdInput.value = productId || '';
        }
        
        // Eğer ürün ID'si varsa, ürün bilgilerini doldur
        if (productId) {
            const product = adminData.products.find(p => p.id === productId);
            
            if (product) {
                // Türkçe form alanlarını doldur (dil ayarlanabilir)
                form.querySelector('#product-name-tr').value = product.name.tr;
                form.querySelector('#product-name-en').value = product.name.en;
                form.querySelector('#product-name-ar').value = product.name.ar;
                form.querySelector('#product-sku').value = product.sku;
                form.querySelector('#product-category').value = product.category;
                form.querySelector('#product-price').value = product.price;
                form.querySelector('#product-old-price').value = product.old_price;
                form.querySelector('#product-stock').value = product.stock;
                form.querySelector('#product-status').value = product.status;
                
                // Checkbox'ları güncelle
                form.querySelector('#product-is-new').checked = product.is_new;
                form.querySelector('#product-is-featured').checked = product.is_featured;
                
                // Resim önizleme
                const imagePreview = form.querySelector('#product-image-preview');
                if (imagePreview) {
                    imagePreview.src = product.image;
                    imagePreview.style.display = 'block';
                }
            }
        } else {
            // Yeni ürün oluşturma için varsayılan değerler
            form.querySelector('#product-status').value = 'active';
            
            // Resim önizlemeyi gizle
            const imagePreview = form.querySelector('#product-image-preview');
            if (imagePreview) {
                imagePreview.style.display = 'none';
            }
        }
    }
}

/**
 * Kategori düzenle modalını açma
 * @param {number|null} categoryId - Düzenlenecek kategori ID'si (yeni kategori için null)
 */
function openCategoryEditModal(categoryId = null) {
    const modal = document.getElementById('category-modal');
    const form = document.getElementById('category-form');
    
    if (modal && form) {
        // Modalı göster
        modal.classList.add('active');
        
        // Form alanlarını temizle
        form.reset();
        
        // Form başlığını güncelle
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.textContent = categoryId ? 'Kategori Düzenle' : 'Yeni Kategori Ekle';
        }
        
        // Kategori ID'sini form input'una ekle
        const categoryIdInput = form.querySelector('#category-id');
        if (categoryIdInput) {
            categoryIdInput.value = categoryId || '';
        }
        
        // Eğer kategori ID'si varsa, kategori bilgilerini doldur
        if (categoryId) {
            const category = adminData.categories.find(c => c.id === categoryId);
            
            if (category) {
                // Form alanlarını doldur
                form.querySelector('#category-name-tr').value = category.name.tr;
                form.querySelector('#category-name-en').value = category.name.en;
                form.querySelector('#category-name-ar').value = category.name.ar;
                form.querySelector('#category-slug').value = category.slug;
                form.querySelector('#category-status').value = category.status;
                
                // Açıklamaları doldur
                form.querySelector('#category-description-tr').value = category.description.tr;
                form.querySelector('#category-description-en').value = category.description.en;
                form.querySelector('#category-description-ar').value = category.description.ar;
                
                // Resim önizleme
                const imagePreview = form.querySelector('#category-image-preview');
                if (imagePreview) {
                    imagePreview.src = category.image;
                    imagePreview.style.display = 'block';
                }
            }
        } else {
            // Yeni kategori oluşturma için varsayılan değerler
            form.querySelector('#category-status').value = 'active';
            
            // Resim önizlemeyi gizle
            const imagePreview = form.querySelector('#category-image-preview');
            if (imagePreview) {
                imagePreview.style.display = 'none';
            }
        }
    }
}

/**
 * Sipariş detay modalını açma
 * @param {string} orderId - Görüntülenecek sipariş ID'si
 */
function openOrderDetailModal(orderId) {
    const modal = document.getElementById('order-detail-modal');
    
    if (modal) {
        // Modalı göster
        modal.classList.add('active');
        
        // Sipariş bilgisini bul
        const order = adminData.orders.find(o => o.id === orderId);
        
        if (order) {
            // Modal içeriğini güncelle
            const modalContent = modal.querySelector('.modal-content');
            
            if (modalContent) {
                modalContent.innerHTML = `
                    <h2>Sipariş Detayları - ${order.id}</h2>
                    
                    <div class="order-info-grid">
                        <div class="order-info-item">
                            <strong>Müşteri:</strong> ${order.customer}
                        </div>
                        <div class="order-info-item">
                            <strong>Tarih:</strong> ${formatDate(order.date)}
                        </div>
                        <div class="order-info-item">
                            <strong>E-posta:</strong> ${order.email}
                        </div>
                        <div class="order-info-item">
                            <strong>Telefon:</strong> ${order.phone}
                        </div>
                        <div class="order-info-item">
                            <strong>Teslimat Adresi:</strong> ${order.shipping_address}
                        </div>
                        <div class="order-info-item">
                            <strong>Ödeme Yöntemi:</strong> ${translatePaymentMethod(order.payment_method)}
                        </div>
                        <div class="order-info-item">
                            <strong>Durum:</strong> <span class="status-badge ${getOrderStatusClass(order.status)}">${translateOrderStatus(order.status)}</span>
                        </div>
                        <div class="order-info-item">
                            <strong>Toplam Tutar:</strong> ${order.total.toFixed(2)} ₺
                        </div>
                    </div>
                    
                    <h3>Sipariş Öğeleri</h3>
                    <p>Bu sipariş ${order.items} adet ürün içermektedir.</p>
                    
                    <div class="order-actions">
                        <button id="close-order-detail" class="btn-primary">Kapat</button>
                        <button id="print-order" class="btn-secondary">Yazdır</button>
                    </div>
                `;
                
                // Modal kapatma butonu
                const closeButton = modalContent.querySelector('#close-order-detail');
                if (closeButton) {
                    closeButton.addEventListener('click', function() {
                        modal.classList.remove('active');
                    });
                }
                
                // Yazdırma butonu
                const printButton = modalContent.querySelector('#print-order');
                if (printButton) {
                    printButton.addEventListener('click', function() {
                        window.print();
                    });
                }
            }
        }
    }
}

/**
 * Sipariş durumu güncelleme modalını açma
 * @param {string} orderId - Güncellenecek sipariş ID'si
 */
function openOrderStatusModal(orderId) {
    const modal = document.getElementById('order-status-modal');
    const form = document.getElementById('order-status-form');
    
    if (modal && form) {
        // Modalı göster
        modal.classList.add('active');
        
        // Sipariş bilgisini bul
        const order = adminData.orders.find(o => o.id === orderId);
        
        if (order) {
            // Form başlığını güncelle
            const modalTitle = modal.querySelector('.modal-title');
            if (modalTitle) {
                modalTitle.textContent = `Sipariş Durumu Güncelle - ${order.id}`;
            }
            
            // Sipariş ID'sini form input'una ekle
            const orderIdInput = form.querySelector('#order-id');
            if (orderIdInput) {
                orderIdInput.value = orderId;
            }
            
            // Mevcut durumu seç
            const statusSelect = form.querySelector('#order-status');
            if (statusSelect) {
                statusSelect.value = order.status;
            }
        }
    }
}

/**
 * İndirim düzenle modalını açma
 * @param {number|null} discountId - Düzenlenecek indirim ID'si (yeni indirim için null)
 */
function openDiscountEditModal(discountId = null) {
    const modal = document.getElementById('discount-modal');
    const form = document.getElementById('discount-form');
    
    if (modal && form) {
        // Modalı göster
        modal.classList.add('active');
        
        // Form alanlarını temizle
        form.reset();
        
        // Form başlığını güncelle
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.textContent = discountId ? 'İndirim Düzenle' : 'Yeni İndirim Ekle';
        }
        
        // İndirim ID'sini form input'una ekle
        const discountIdInput = form.querySelector('#discount-id');
        if (discountIdInput) {
            discountIdInput.value = discountId || '';
        }
        
        // Eğer indirim ID'si varsa, indirim bilgilerini doldur
        if (discountId) {
            const discount = adminData.discounts.find(d => d.id === discountId);
            
            if (discount) {
                // Form alanlarını doldur
                form.querySelector('#discount-code').value = discount.code;
                form.querySelector('#discount-type').value = discount.type;
                form.querySelector('#discount-amount').value = discount.amount;
                form.querySelector('#discount-usage-limit').value = discount.usage_limit;
                form.querySelector('#discount-expiry-date').value = discount.expiry_date;
                form.querySelector('#discount-status').value = discount.status;
                
                // Kullanım sayısını göster (sadece edit modunda görünür)
                const usedCountContainer = form.querySelector('.discount-used-count');
                if (usedCountContainer) {
                    usedCountContainer.textContent = `${discount.used} kez kullanıldı`;
                    usedCountContainer.style.display = 'block';
                }
            }
        } else {
            // Yeni indirim oluşturma için varsayılan değerler
            form.querySelector('#discount-type').value = 'percentage';
            form.querySelector('#discount-status').value = 'active';
            
            // Kullanım sayısını gizle
            const usedCountContainer = form.querySelector('.discount-used-count');
            if (usedCountContainer) {
                usedCountContainer.style.display = 'none';
            }
        }
    }
}

/**
 * Ürün kaydetme
 */
function saveProduct() {
    const form = document.getElementById('product-form');
    
    if (form) {
        const productId = form.querySelector('#product-id').value;
        const isNewProduct = !productId;
        
        // Form verilerini al
        const productData = {
            name: {
                tr: form.querySelector('#product-name-tr').value,
                en: form.querySelector('#product-name-en').value,
                ar: form.querySelector('#product-name-ar').value
            },
            sku: form.querySelector('#product-sku').value,
            category: form.querySelector('#product-category').value,
            price: parseFloat(form.querySelector('#product-price').value),
            old_price: parseFloat(form.querySelector('#product-old-price').value) || 0,
            status: form.querySelector('#product-status').value,
            stock: parseInt(form.querySelector('#product-stock').value),
            sold: isNewProduct ? 0 : (adminData.products.find(p => p.id === parseInt(productId))?.sold || 0),
            image: form.querySelector('#product-image').value || 'img/products/default.jpg',
            is_new: form.querySelector('#product-is-new').checked,
            is_featured: form.querySelector('#product-is-featured').checked
        };
        
        if (isNewProduct) {
            // Yeni ürün oluştur
            const newId = adminData.products.length > 0 
                ? Math.max(...adminData.products.map(p => p.id)) + 1 
                : 1;
            
            const newProduct = {
                id: newId,
                ...productData
            };
            
            adminData.products.push(newProduct);
        } else {
            // Mevcut ürünü güncelle
            const productIndex = adminData.products.findIndex(p => p.id === parseInt(productId));
            
            if (productIndex !== -1) {
                adminData.products[productIndex] = {
                    ...adminData.products[productIndex],
                    ...productData
                };
            }
        }
        
        // Ürün listesini güncelle
        loadProducts();
        
        // Modalı kapat
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        // Başarılı mesajı göster
        showNotification(isNewProduct ? 'Ürün başarıyla eklendi.' : 'Ürün başarıyla güncellendi.');
    }
}

/**
 * Kategori kaydetme
 */
function saveCategory() {
    const form = document.getElementById('category-form');
    
    if (form) {
        const categoryId = form.querySelector('#category-id').value;
        const isNewCategory = !categoryId;
        
        // Form verilerini al
        const categoryData = {
            name: {
                tr: form.querySelector('#category-name-tr').value,
                en: form.querySelector('#category-name-en').value,
                ar: form.querySelector('#category-name-ar').value
            },
            slug: form.querySelector('#category-slug').value,
            status: form.querySelector('#category-status').value,
            image: form.querySelector('#category-image').value || 'img/backgrounds/default-bg.jpg',
            products_count: isNewCategory ? 0 : (adminData.categories.find(c => c.id === parseInt(categoryId))?.products_count || 0),
            description: {
                tr: form.querySelector('#category-description-tr').value,
                en: form.querySelector('#category-description-en').value,
                ar: form.querySelector('#category-description-ar').value
            }
        };
        
        if (isNewCategory) {
            // Yeni kategori oluştur
            const newId = adminData.categories.length > 0 
                ? Math.max(...adminData.categories.map(c => c.id)) + 1 
                : 1;
            
            const newCategory = {
                id: newId,
                ...categoryData
            };
            
            adminData.categories.push(newCategory);
        } else {
            // Mevcut kategoriyi güncelle
            const categoryIndex = adminData.categories.findIndex(c => c.id === parseInt(categoryId));
            
            if (categoryIndex !== -1) {
                adminData.categories[categoryIndex] = {
                    ...adminData.categories[categoryIndex],
                    ...categoryData
                };
            }
        }
        
        // Kategori listesini güncelle
        loadCategories();
        
        // Modalı kapat
        const modal = document.getElementById('category-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        // Başarılı mesajı göster
        showNotification(isNewCategory ? 'Kategori başarıyla eklendi.' : 'Kategori başarıyla güncellendi.');
    }
}

/**
 * İndirim kaydetme
 */
function saveDiscount() {
    const form = document.getElementById('discount-form');
    
    if (form) {
        const discountId = form.querySelector('#discount-id').value;
        const isNewDiscount = !discountId;
        
        // Form verilerini al
        const discountData = {
            code: form.querySelector('#discount-code').value,
            type: form.querySelector('#discount-type').value,
            amount: parseFloat(form.querySelector('#discount-amount').value),
            usage_limit: parseInt(form.querySelector('#discount-usage-limit').value),
            used: isNewDiscount ? 0 : (adminData.discounts.find(d => d.id === parseInt(discountId))?.used || 0),
            expiry_date: form.querySelector('#discount-expiry-date').value,
            status: form.querySelector('#discount-status').value
        };
        
        if (isNewDiscount) {
            // Yeni indirim oluştur
            const newId = adminData.discounts.length > 0 
                ? Math.max(...adminData.discounts.map(d => d.id)) + 1 
                : 1;
            
            const newDiscount = {
                id: newId,
                ...discountData
            };
            
            adminData.discounts.push(newDiscount);
        } else {
            // Mevcut indirimi güncelle
            const discountIndex = adminData.discounts.findIndex(d => d.id === parseInt(discountId));
            
            if (discountIndex !== -1) {
                adminData.discounts[discountIndex] = {
                    ...adminData.discounts[discountIndex],
                    ...discountData
                };
            }
        }
        
        // İndirim listesini güncelle
        loadDiscounts();
        
        // Modalı kapat
        const modal = document.getElementById('discount-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        // Başarılı mesajı göster
        showNotification(isNewDiscount ? 'İndirim kodu başarıyla eklendi.' : 'İndirim kodu başarıyla güncellendi.');
    }
}

/**
 * Sipariş durumu güncelleme
 */
function updateOrderStatus() {
    const form = document.getElementById('order-status-form');
    
    if (form) {
        const orderId = form.querySelector('#order-id').value;
        const newStatus = form.querySelector('#order-status').value;
        
        // Sipariş durumunu güncelle
        const orderIndex = adminData.orders.findIndex(o => o.id === orderId);
        
        if (orderIndex !== -1) {
            adminData.orders[orderIndex].status = newStatus;
            
            // Sipariş listesini güncelle
            loadOrders();
            
            // Modalı kapat
            const modal = document.getElementById('order-status-modal');
            if (modal) {
                modal.classList.remove('active');
            }
            
            // Başarılı mesajı göster
            showNotification('Sipariş durumu başarıyla güncellendi.');
        }
    }
}

/**
 * Bildirim şablonu kaydetme
 * @param {string} type - Şablon türü (email veya sms)
 * @param {string} templateKey - Şablon anahtarı
 */
function saveNotificationTemplate(type, templateKey) {
    if (type === 'email') {
        const subjectInput = document.querySelector(`.template-subject[data-template="${templateKey}"]`);
        const bodyInput = document.querySelector(`.template-body[data-template="${templateKey}"]`);
        
        if (subjectInput && bodyInput) {
            const lang = subjectInput.getAttribute('data-lang');
            
            // Şablon değerlerini güncelle
            adminData.notification_templates.email[templateKey].subject[lang] = subjectInput.value;
            adminData.notification_templates.email[templateKey].body[lang] = bodyInput.value;
            
            // Başarılı mesajı göster
            showNotification('E-posta şablonu başarıyla kaydedildi.');
        }
    } else if (type === 'sms') {
        const smsInput = document.querySelector(`.template-sms[data-template="${templateKey}"]`);
        
        if (smsInput) {
            const lang = smsInput.getAttribute('data-lang');
            
            // Şablon değerini güncelle
            adminData.notification_templates.sms[templateKey][lang] = smsInput.value;
            
            // Başarılı mesajı göster
            showNotification('SMS şablonu başarıyla kaydedildi.');
        }
    }
}

/**
 * Site ayarlarını kaydetme
 */
function saveSettings() {
    const form = document.getElementById('settings-form');
    
    if (form) {
        // Site başlığı
        adminData.settings.site_title.tr = form.querySelector('#site-title-tr').value;
        adminData.settings.site_title.en = form.querySelector('#site-title-en').value;
        adminData.settings.site_title.ar = form.querySelector('#site-title-ar').value;
        
        // İletişim bilgileri
        adminData.settings.contact_email = form.querySelector('#contact-email').value;
        adminData.settings.contact_phone = form.querySelector('#contact-phone').value;
        
        // Adres
        adminData.settings.address.tr = form.querySelector('#address-tr').value;
        adminData.settings.address.en = form.querySelector('#address-en').value;
        adminData.settings.address.ar = form.querySelector('#address-ar').value;
        
        // Sosyal medya
        adminData.settings.social_media.facebook = form.querySelector('#facebook-url').value;
        adminData.settings.social_media.instagram = form.querySelector('#instagram-url').value;
        adminData.settings.social_media.twitter = form.querySelector('#twitter-url').value;
        
        // Ödeme ayarları
        adminData.settings.payment_settings.iyzico_api_key = form.querySelector('#iyzico-api-key').value;
        adminData.settings.payment_settings.iyzico_secret_key = form.querySelector('#iyzico-secret-key').value;
        
        // Kargo ayarları
        adminData.settings.shipping_settings.free_shipping_threshold = parseFloat(form.querySelector('#free-shipping-threshold').value);
        adminData.settings.shipping_settings.default_shipping_fee = parseFloat(form.querySelector('#default-shipping-fee').value);
        
        // Başarılı mesajı göster
        showNotification('Site ayarları başarıyla kaydedildi.');
    }
}

/**
 * Ürün silme
 * @param {number} productId - Silinecek ürün ID'si
 */
function deleteProduct(productId) {
    const productIndex = adminData.products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        adminData.products.splice(productIndex, 1);
        
        // Ürün listesini güncelle
        loadProducts();
        
        // Başarılı mesajı göster
        showNotification('Ürün başarıyla silindi.');
    }
}

/**
 * Kategori silme
 * @param {number} categoryId - Silinecek kategori ID'si
 */
function deleteCategory(categoryId) {
    const categoryIndex = adminData.categories.findIndex(c => c.id === categoryId);
    
    if (categoryIndex !== -1) {
        const category = adminData.categories[categoryIndex];
        
        // Bu kategoriye ait ürün var mı kontrol et
        const hasProducts = adminData.products.some(p => p.category === category.slug);
        
        if (hasProducts) {
            showNotification('Bu kategoriye ait ürünler bulunduğu için silinemez.', 'error');
            return;
        }
        
        // Kategoriyi sil
        adminData.categories.splice(categoryIndex, 1);
        
        // Kategori listesini güncelle
        loadCategories();
        
        // Başarılı mesajı göster
        showNotification('Kategori başarıyla silindi.');
    }
}

/**
 * İndirim silme
 * @param {number} discountId - Silinecek indirim ID'si
 */
function deleteDiscount(discountId) {
    const discountIndex = adminData.discounts.findIndex(d => d.id === discountId);
    
    if (discountIndex !== -1) {
        adminData.discounts.splice(discountIndex, 1);
        
        // İndirim listesini güncelle
        loadDiscounts();
        
        // Başarılı mesajı göster
        showNotification('İndirim kodu başarıyla silindi.');
    }
}

/**
 * Çıkış işlemi
 */
function logout() {
    // Oturum bilgisini temizle
    localStorage.removeItem('userSession');
    
    // Giriş sayfasına yönlendir
    window.location.href = 'login.html';
}

/**
 * Bildirim gösterme
 * @param {string} message - Bildirim mesajı
 * @param {string} type - Bildirim türü (success, error, warning)
 */
function showNotification(message, type = 'success') {
    // Bildirim HTML'i oluştur
    const notificationHTML = `
        <div class="notification notification-${type}">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Bildirim konteynerini bul veya oluştur
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Bildirim elementini ekle
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = notificationHTML;
    const notificationElement = tempDiv.firstElementChild;
    notificationContainer.appendChild(notificationElement);
    
    // Kapatma butonu olayı
    const closeButton = notificationElement.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notificationContainer.removeChild(notificationElement);
    });
    
    // Otomatik kaybolma zamanlayıcısı
    setTimeout(function() {
        if (notificationContainer.contains(notificationElement)) {
            notificationContainer.removeChild(notificationElement);
        }
    }, 5000);
}

/**
 * Sipariş durumu için CSS sınıfı
 * @param {string} status - Sipariş durumu
 * @returns {string} - CSS sınıfı
 */
function getOrderStatusClass(status) {
    switch (status) {
        case 'pending':
            return 'status-pending';
        case 'processing':
            return 'status-processing';
        case 'shipped':
            return 'status-shipped';
        case 'delivered':
            return 'status-delivered';
        case 'cancelled':
            return 'status-cancelled';
        default:
            return '';
    }
}

/**
 * Ürün durumu için CSS sınıfı
 * @param {string} status - Ürün durumu
 * @returns {string} - CSS sınıfı
 */
function getProductStatusClass(status) {
    switch (status) {
        case 'active':
            return 'status-active';
        case 'inactive':
            return 'status-inactive';
        case 'out-of-stock':
            return 'status-out-of-stock';
        default:
            return '';
    }
}

/**
 * Sipariş durumunu Türkçe'ye çevirme
 * @param {string} status - Sipariş durumu
 * @returns {string} - Türkçe karşılık
 */
function translateOrderStatus(status) {
    switch (status) {
        case 'pending':
            return 'Beklemede';
        case 'processing':
            return 'Hazırlanıyor';
        case 'shipped':
            return 'Kargoda';
        case 'delivered':
            return 'Teslim Edildi';
        case 'cancelled':
            return 'İptal Edildi';
        default:
            return status;
    }
}

/**
 * Ürün durumunu Türkçe'ye çevirme
 * @param {string} status - Ürün durumu
 * @returns {string} - Türkçe karşılık
 */
function translateProductStatus(status) {
    switch (status) {
        case 'active':
            return 'Aktif';
        case 'inactive':
            return 'Pasif';
        case 'out-of-stock':
            return 'Stokta Yok';
        default:
            return status;
    }
}

/**
 * Ödeme yöntemini Türkçe'ye çevirme
 * @param {string} method - Ödeme yöntemi
 * @returns {string} - Türkçe karşılık
 */
function translatePaymentMethod(method) {
    switch (method) {
        case 'credit-card':
            return 'Kredi Kartı';
        case 'cash-on-delivery':
            return 'Kapıda Nakit';
        case 'card-on-delivery':
            return 'Kapıda Kart';
        default:
            return method;
    }
}

/**
 * İndirim türünü Türkçe'ye çevirme
 * @param {string} type - İndirim türü
 * @returns {string} - Türkçe karşılık
 */
function translateDiscountType(type) {
    switch (type) {
        case 'percentage':
            return 'Yüzde';
        case 'fixed':
            return 'Sabit Tutar';
        case 'free-shipping':
            return 'Ücretsiz Kargo';
        default:
            return type;
    }
}

/**
 * Bildirim şablonu adını Türkçe'ye çevirme
 * @param {string} template - Şablon anahtarı
 * @returns {string} - Türkçe karşılık
 */
function translateNotificationTemplate(template) {
    switch (template) {
        case 'order-received':
            return 'Sipariş Alındı';
        case 'payment-confirmed':
            return 'Ödeme Onaylandı';
        case 'order-shipped':
            return 'Sipariş Kargoya Verildi';
        default:
            return template;
    }
}

/**
 * Tarih formatı
 * @param {string} dateString - ISO tarih formatı
 * @returns {string} - Formatlanmış tarih (GG.AA.YYYY)
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}

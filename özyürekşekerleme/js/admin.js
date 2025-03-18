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
}
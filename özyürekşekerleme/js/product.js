/**
 * Özyürek Şekerleme E-Ticaret Sitesi
 * Ürün İşlemleri JavaScript Dosyası
 */

// Ürün verileri için mock data (gerçek projelerde API'den gelecek)
const mockProducts = [
    {
        id: 1,
        name: {
            tr: 'Antep Fıstıklı Lokum',
            en: 'Pistachio Turkish Delight',
            ar: 'راحة الترك بالفستق الحلبي'
        },
        slug: 'antep-fistikli-lokum',
        description: {
            tr: 'Geleneksel yöntemlerle üretilen, ağızda dağılan Antep fıstıklı lokum.',
            en: 'Traditionally produced, melt-in-mouth pistachio Turkish delight.',
            ar: 'راحة الترك بالفستق الحلبي المنتجة بالطرق التقليدية والتي تذوب في الفم.'
        },
        long_description: {
            tr: 'Ozyurek Sekerleme nin ozenle secilmis Antep fistiklari ile hazirlanan bu ozel lokum, geleneksel uretim yontemleri kullanilarak tamamen dogal malzemelerle uretilmektedir. Icerdigi yuksek kaliteli Antep fistiklari sayesinde essiz bir lezzet sunar. Yumusay ve agizda dagilan dokusu, hafif sekerli tadi ile damaklarda unutulmaz bir tat birakir.',
            en: 'This special Turkish delight, prepared with carefully selected pistachios by Özyürek Şekerleme, is produced entirely with natural ingredients using traditional production methods. It offers a unique taste thanks to the high-quality pistachios it contains. Its soft and melting texture leaves an unforgettable taste on the palate with its slightly sweet taste.',
            ar: 'راحة الترك الخاصة هذه، المحضرة بالفستق الحلبي المختار بعناية من قبل أوزيورك شيكيرليمه، يتم إنتاجها بالكامل بمكونات طبيعية باستخدام طرق الإنتاج التقليدية. إنها تقدم مذاقًا فريدًا بفضل الفستق الحلبي عالي الجودة الذي تحتوي عليه. قوامها الناعم والذائب يترك طعمًا لا يُنسى على الحنك بطعمها الحلو قليلاً.'
        },
        category: 'lokum',
        categoryName: {
            tr: 'Türk Lokumu',
            en: 'Turkish Delight',
            ar: 'راحة الترك'
        },
        price: 120.00,
        old_price: 150.00,
        discount_percentage: 20,
        weight_options: [
            { weight: 250, price: 120.00, old_price: 150.00 },
            { weight: 500, price: 220.00, old_price: 270.00 },
            { weight: 1000, price: 400.00, old_price: 500.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '370 kcal', en: '370 kcal', ar: '370 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '3.2g', en: '3.2g', ar: '3.2 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '75g', en: '75g', ar: '75 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '65g', en: '65g', ar: '65 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '8.5g', en: '8.5g', ar: '8.5 غرام' } }
        ],
        features: [
            { tr: '100% doğal malzemeler', en: '100% natural ingredients', ar: 'مكونات طبيعية 100٪' },
            { tr: 'Koruyucu madde içermez', en: 'No preservatives', ar: 'خالي من المواد الحافظة' },
            { tr: 'Özenle seçilmiş Antep fıstıkları', en: 'Carefully selected pistachios', ar: 'فستق حلبي مختار بعناية' },
            { tr: 'Geleneksel üretim yöntemleri', en: 'Traditional production methods', ar: 'طرق إنتاج تقليدية' }
        ],
        images: [
            'img/products/antep-fistikli-lokum-1.jpg',
            'img/products/antep-fistikli-lokum-2.jpg',
            'img/products/antep-fistikli-lokum-3.jpg'
        ],
        rating: 4.8,
        reviews_count: 156,
        stock: 100,
        sku: 'LKM-001',
        is_new: true,
        is_featured: true,
        related_products: [2, 3, 6, 8]
    },
    {
        id: 2,
        name: {
            tr: 'Gül Aromalı Lokum',
            en: 'Rose Flavored Turkish Delight',
            ar: 'راحة الترك بنكهة الورد'
        },
        slug: 'gul-aromali-lokum',
        description: {
            tr: 'Gerçek gül yapraklarıyla hazırlanan, özel aromalı ve yumuşak lokum.',
            en: 'Soft Turkish delight with special aroma, prepared with real rose petals.',
            ar: 'راحة الترك ناعمة بنكهة خاصة، محضرة بأوراق الورد الحقيقية.'
        },
        long_description: {
            tr: 'Geleneksel Türk tatlısı olan gül lokumu, hakiki gül yapraklarından özenle hazırlanmaktadır. İçindeki doğal gül esansı sayesinde eşsiz bir aromaya sahiptir. Yumuşak dokusu ve zarif gül kokusuyla, özel anlarda ikram etmek için mükemmel bir seçim. Dışı hafif pudra şekeriyle kaplı, içi yumuşacık ve ağızda dağılan bir lezzettir.',
            en: 'Rose Turkish delight, a traditional Turkish dessert, is carefully prepared from real rose petals. It has a unique aroma thanks to the natural rose essence it contains. With its soft texture and elegant rose scent, it is a perfect choice to serve on special occasions. It is covered with light powdered sugar on the outside, and has a soft, melt-in-the-mouth flavor.',
            ar: 'راحة الترك بالورد، وهي حلوى تركية تقليدية، تم تحضيرها بعناية من بتلات الورد الحقيقية. لديها رائحة فريدة بفضل خلاصة الورد الطبيعية التي تحتويها. بقوامها الناعم ورائحة الورد الأنيقة، إنه خيار مثالي للتقديم في المناسبات الخاصة. مغطاة بالسكر البودرة الخفيف من الخارج، ولها نكهة ناعمة تذوب في الفم.'
        },
        category: 'lokum',
        categoryName: {
            tr: 'Türk Lokumu',
            en: 'Turkish Delight',
            ar: 'راحة الترك'
        },
        price: 100.00,
        old_price: 130.00,
        discount_percentage: 23,
        weight_options: [
            { weight: 250, price: 100.00, old_price: 130.00 },
            { weight: 500, price: 180.00, old_price: 230.00 },
            { weight: 1000, price: 340.00, old_price: 440.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '350 kcal', en: '350 kcal', ar: '350 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '1.8g', en: '1.8g', ar: '1.8 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '80g', en: '80g', ar: '80 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '68g', en: '68g', ar: '68 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '0.5g', en: '0.5g', ar: '0.5 غرام' } }
        ],
        features: [
            { tr: 'Gerçek gül yaprakları', en: 'Real rose petals', ar: 'بتلات ورد حقيقية' },
            { tr: 'Doğal gül esansı', en: 'Natural rose essence', ar: 'خلاصة الورد الطبيعية' },
            { tr: 'Koruyucu madde içermez', en: 'No preservatives', ar: 'خالي من المواد الحافظة' },
            { tr: 'Geleneksel üretim yöntemleri', en: 'Traditional production methods', ar: 'طرق إنتاج تقليدية' }
        ],
        images: [
            'img/products/gul-aromali-lokum-1.jpg',
            'img/products/gul-aromali-lokum-2.jpg',
            'img/products/gul-aromali-lokum-3.jpg'
        ],
        rating: 4.6,
        reviews_count: 124,
        stock: 80,
        sku: 'LKM-002',
        is_new: false,
        is_featured: true,
        related_products: [1, 3, 4, 7]
    },
    {
        id: 3,
        name: {
            tr: 'Fındıklı Lokum',
            en: 'Hazelnut Turkish Delight',
            ar: 'راحة الترك بالبندق'
        },
        slug: 'findikli-lokum',
        description: {
            tr: 'Giresun\'un en kaliteli fındıklarıyla hazırlanan özel lokum.',
            en: 'Special Turkish delight prepared with the highest quality hazelnuts from Giresun.',
            ar: 'راحة الترك خاصة محضرة بأجود أنواع البندق من جيرسون.'
        },
        long_description: {
            tr: 'Özyürek Şekerleme\'nin eşsiz tariflerinden biri olan Fındıklı Lokum, Giresun\'un en kaliteli fındıklarıyla hazırlanır. Her bir lokma, ağızda dağılan yumuşak dokusu ve kavrulmuş fındıkların zengin aromasıyla lezzet patlaması yaşatır. Geleneksel yöntemlerle, hiçbir katkı maddesi kullanılmadan üretilir. Hem kendiniz için hem de sevdiklerinize hediye etmek için mükemmel bir tercih.',
            en: 'Hazelnut Turkish Delight, one of Özyürek Şekerleme\'s unique recipes, is prepared with the highest quality hazelnuts from Giresun. Each bite creates a flavor explosion with its soft, melt-in-mouth texture and the rich aroma of roasted hazelnuts. It is produced using traditional methods, without any additives. A perfect choice both for yourself and as a gift for your loved ones.',
            ar: 'راحة الترك بالبندق، إحدى الوصفات الفريدة من أوزيورك شيكيرليمه، يتم تحضيرها بأجود أنواع البندق من جيرسون. كل قضمة تخلق انفجارًا من النكهة بقوامها الناعم الذي يذوب في الفم والعبير الغني للبندق المحمص. يتم إنتاجها باستخدام الطرق التقليدية، بدون أي مواد مضافة. خيار مثالي سواء لنفسك أو كهدية لأحبائك.'
        },
        category: 'lokum',
        categoryName: {
            tr: 'Türk Lokumu',
            en: 'Turkish Delight',
            ar: 'راحة الترك'
        },
        price: 130.00,
        old_price: 160.00,
        discount_percentage: 19,
        weight_options: [
            { weight: 250, price: 130.00, old_price: 160.00 },
            { weight: 500, price: 240.00, old_price: 290.00 },
            { weight: 1000, price: 440.00, old_price: 540.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '380 kcal', en: '380 kcal', ar: '380 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '3.5g', en: '3.5g', ar: '3.5 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '73g', en: '73g', ar: '73 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '64g', en: '64g', ar: '64 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '9.2g', en: '9.2g', ar: '9.2 غرام' } }
        ],
        features: [
            { tr: 'Giresun\'un kaliteli fındıkları', en: 'Quality hazelnuts from Giresun', ar: 'بندق جودة من جيرسون' },
            { tr: 'El yapımı üretim', en: 'Handmade production', ar: 'إنتاج يدوي' },
            { tr: 'Koruyucu madde içermez', en: 'No preservatives', ar: 'خالي من المواد الحافظة' },
            { tr: 'Doğal şeker kullanımı', en: 'Natural sugar use', ar: 'استخدام السكر الطبيعي' }
        ],
        images: [
            'img/products/findikli-lokum-1.jpg',
            'img/products/findikli-lokum-2.jpg',
            'img/products/findikli-lokum-3.jpg'
        ],
        rating: 4.7,
        reviews_count: 98,
        stock: 60,
        sku: 'LKM-003',
        is_new: true,
        is_featured: true,
        related_products: [1, 2, 5, 8]
    },
    {
        id: 4,
        name: {
            tr: 'Karışık Meyve Aromalı Lokum',
            en: 'Mixed Fruit Flavored Turkish Delight',
            ar: 'راحة الترك بنكهة الفواكه المشكلة'
        },
        slug: 'karisik-meyve-aromali-lokum',
        description: {
            tr: 'Portakal, limon, çilek ve elma aromalarının buluştuğu özel lokum çeşidi.',
            en: 'Special Turkish delight variety with orange, lemon, strawberry and apple flavors.',
            ar: 'مجموعة خاصة من راحة الترك بنكهات البرتقال والليمون والفراولة والتفاح.'
        },
        long_description: {
            tr: 'Özyürek Şekerleme\'nin renkli ve lezzetli ürünü olan Karışık Meyve Aromalı Lokum, dört farklı meyve aromasını bir araya getirir. Portakal, limon, çilek ve elma aromaları ile hazırlanan bu lokumlar, hem görsel bir şölen hem de damakta patlayan meyve tatları sunar. Her bir parça, doğal meyve özleri ve renklendirici kullanılarak üretilir. Çocukların da çok sevdiği bu özel lezzet, misafirlerinize ikram etmek için ideal bir seçimdir.',
            en: 'Mixed Fruit Flavored Turkish Delight, a colorful and delicious product of Özyürek Şekerleme, combines four different fruit flavors. These delights, prepared with orange, lemon, strawberry and apple flavors, offer both a visual feast and fruit flavors that burst on the palate. Each piece is produced using natural fruit extracts and coloring. This special flavor, which is also very popular with children, is an ideal choice to serve to your guests.',
            ar: 'راحة الترك بنكهة الفواكه المشكلة، وهي منتج ملون ولذيذ من أوزيورك شيكيرليمه، تجمع بين أربع نكهات فواكه مختلفة. هذه الحلويات، المحضرة بنكهات البرتقال والليمون والفراولة والتفاح، تقدم وليمة بصرية ونكهات فواكه تنفجر على الحنك. يتم إنتاج كل قطعة باستخدام مستخلصات الفاكهة الطبيعية والتلوين. هذه النكهة الخاصة، التي تحظى أيضًا بشعبية كبيرة لدى الأطفال، هي خيار مثالي لتقديمه لضيوفك.'
        },
        category: 'lokum',
        categoryName: {
            tr: 'Türk Lokumu',
            en: 'Turkish Delight',
            ar: 'راحة الترك'
        },
        price: 90.00,
        old_price: 110.00,
        discount_percentage: 18,
        weight_options: [
            { weight: 250, price: 90.00, old_price: 110.00 },
            { weight: 500, price: 170.00, old_price: 210.00 },
            { weight: 1000, price: 320.00, old_price: 390.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '340 kcal', en: '340 kcal', ar: '340 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '0.5g', en: '0.5g', ar: '0.5 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '83g', en: '83g', ar: '83 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '75g', en: '75g', ar: '75 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '0.2g', en: '0.2g', ar: '0.2 غرام' } }
        ],
        features: [
            { tr: 'Dört farklı meyve aroması', en: 'Four different fruit flavors', ar: 'أربع نكهات فواكه مختلفة' },
            { tr: 'Doğal meyve özleri', en: 'Natural fruit extracts', ar: 'مستخلصات الفاكهة الطبيعية' },
            { tr: 'Canlı renkler', en: 'Vibrant colors', ar: 'ألوان نابضة بالحياة' },
            { tr: 'Çocuklar için ideal', en: 'Ideal for children', ar: 'مثالي للأطفال' }
        ],
        images: [
            'img/products/meyve-aromali-lokum-1.jpg',
            'img/products/meyve-aromali-lokum-2.jpg',
            'img/products/meyve-aromali-lokum-3.jpg'
        ],
        rating: 4.5,
        reviews_count: 112,
        stock: 90,
        sku: 'LKM-004',
        is_new: false,
        is_featured: false,
        related_products: [2, 5, 7, 8]
    },
    {
        id: 5,
        name: {
            tr: 'Çifte Kavrulmuş Lokum',
            en: 'Double Roasted Turkish Delight',
            ar: 'راحة الترك المحمصة مرتين'
        },
        slug: 'cifte-kavrulmus-lokum',
        description: {
            tr: 'İki kez kavrularak özel bir aroma kazanan geleneksel Türk lokumu.',
            en: 'Traditional Turkish delight with a special aroma gained by double roasting.',
            ar: 'راحة الترك التقليدية بنكهة خاصة مكتسبة من التحميص المزدوج.'
        },
        long_description: {
            tr: 'Özyürek Şekerleme\'nin ustalıkla hazırladığı Çifte Kavrulmuş Lokum, özel kavurma tekniği sayesinde eşsiz bir aroma ve lezzete sahiptir. Geleneksel Türk lokumunun hazırlanışında şeker iki aşamada kavrularak daha derin ve zengin bir tat elde edilir. Bu özel işlem, lokumun dokusunu da mükemmelleştirir, daha yumuşak ve ağızda eriyen bir yapı kazandırır. Sade lokum severlerin vazgeçilmezi olacak bu ürün, kahve yanında ikram edilmek için ideal bir seçimdir.',
            en: 'Double Roasted Turkish Delight, skillfully prepared by Özyürek Şekerleme, has a unique aroma and flavor thanks to its special roasting technique. In the preparation of traditional Turkish delight, sugar is roasted in two stages to obtain a deeper and richer taste. This special process also perfects the texture of the delight, giving it a softer and more melt-in-mouth structure. This product, which will be indispensable for plain delight lovers, is an ideal choice to be served with coffee.',
            ar: 'راحة الترك المحمصة مرتين، التي أعدتها أوزيورك شيكيرليمه بمهارة، تتمتع برائحة ونكهة فريدة بفضل تقنية التحميص الخاصة. في إعداد راحة الترك التقليدية، يتم تحميص السكر على مرحلتين للحصول على طعم أعمق وأغنى. هذه العملية الخاصة تكمل أيضًا قوام الحلوى، مما يمنحها بنية أكثر نعومة وذوبانًا في الفم. هذا المنتج، الذي سيكون لا غنى عنه لمحبي الحلوى العادية، هو خيار مثالي ليتم تقديمه مع القهوة.'
        },
        category: 'lokum',
        categoryName: {
            tr: 'Türk Lokumu',
            en: 'Turkish Delight',
            ar: 'راحة الترك'
        },
        price: 80.00,
        old_price: 95.00,
        discount_percentage: 16,
        weight_options: [
            { weight: 250, price: 80.00, old_price: 95.00 },
            { weight: 500, price: 150.00, old_price: 180.00 },
            { weight: 1000, price: 280.00, old_price: 330.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '330 kcal', en: '330 kcal', ar: '330 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '0.2g', en: '0.2g', ar: '0.2 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '85g', en: '85g', ar: '85 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '82g', en: '82g', ar: '82 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '0.1g', en: '0.1g', ar: '0.1 غرام' } }
        ],
        features: [
            { tr: 'İki aşamalı kavurma tekniği', en: 'Two-stage roasting technique', ar: 'تقنية التحميص على مرحلتين' },
            { tr: 'Zengin aroma', en: 'Rich aroma', ar: 'رائحة غنية' },
            { tr: 'Yumuşak doku', en: 'Soft texture', ar: 'قوام ناعم' },
            { tr: 'Kahve ile mükemmel uyum', en: 'Perfect with coffee', ar: 'مثالي مع القهوة' }
        ],
        images: [
            'img/products/cifte-kavrulmus-lokum-1.jpg',
            'img/products/cifte-kavrulmus-lokum-2.jpg',
            'img/products/cifte-kavrulmus-lokum-3.jpg'
        ],
        rating: 4.4,
        reviews_count: 78,
        stock: 120,
        sku: 'LKM-005',
        is_new: false,
        is_featured: false,
        related_products: [1, 3, 6, 7]
    },
    {
        id: 6,
        name: {
            tr: 'Akide Şekeri',
            en: 'Hard Candy',
            ar: 'حلوى صلبة'
        },
        slug: 'akide-sekeri',
        description: {
            tr: 'Geleneksel Türk şekerlemesi, çeşitli meyve aromalarıyla.',
            en: 'Traditional Turkish hard candy with various fruit flavors.',
            ar: 'حلوى تركية تقليدية صلبة بنكهات فواكه متنوعة.'
        },
        long_description: {
            tr: 'Akide Şekeri, Osmanlı saraylarından günümüze ulaşan geleneksel bir Türk şekerlemesidir. Özyürek Şekerleme\'nin özenle hazırladığı bu özel ürün, portakal, limon, çilek, nane ve gül gibi çeşitli doğal aromaları içerir. Sert yapısı ve uzun süre ağızda eriyen özelliği ile tanınır. Her bir parça, el yapımı olarak üretilir ve parlak renkleriyle göz alıcıdır. Misafirlerinize ikram etmek veya nostaljik bir lezzet deneyimi yaşamak için idealdir.',
            en: 'Hard Candy is a traditional Turkish confectionery that has reached the present day from Ottoman palaces. This special product, carefully prepared by Özyürek Şekerleme, contains various natural flavors such as orange, lemon, strawberry, mint and rose. It is known for its hard structure and for dissolving in the mouth for a long time. Each piece is handmade and eye-catching with its bright colors. It is ideal for serving to your guests or experiencing a nostalgic taste.',
            ar: 'الحلوى الصلبة هي حلوى تركية تقليدية وصلت إلى يومنا هذا من قصور العثمانيين. يحتوي هذا المنتج الخاص، الذي تم إعداده بعناية من قبل أوزيورك شيكيرليمه، على نكهات طبيعية متنوعة مثل البرتقال والليمون والفراولة والنعناع والورد. تشتهر ببنيتها الصلبة والذوبان في الفم لفترة طويلة. كل قطعة مصنوعة يدويًا وجذابة بألوانها الزاهية. مثالية لتقديمها لضيوفك أو تجربة مذاق حنين.'
        },
        category: 'sekerleme',
        categoryName: {
            tr: 'Şekerleme',
            en: 'Candy',
            ar: 'حلويات'
        },
        price: 70.00,
        old_price: 85.00,
        discount_percentage: 18,
        weight_options: [
            { weight: 250, price: 70.00, old_price: 85.00 },
            { weight: 500, price: 130.00, old_price: 160.00 },
            { weight: 1000, price: 250.00, old_price: 300.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '390 kcal', en: '390 kcal', ar: '390 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '0g', en: '0g', ar: '0 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '98g', en: '98g', ar: '98 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '98g', en: '98g', ar: '98 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '0g', en: '0g', ar: '0 غرام' } }
        ],
        features: [
            { tr: 'Geleneksel Osmanlı tatlısı', en: 'Traditional Ottoman sweet', ar: 'حلوى عثمانية تقليدية' },
            { tr: 'Çeşitli doğal aromalar', en: 'Various natural flavors', ar: 'نكهات طبيعية متنوعة' },
            { tr: 'El yapımı üretim', en: 'Handmade production', ar: 'إنتاج يدوي' },
            { tr: 'Parlak renkler', en: 'Bright colors', ar: 'ألوان زاهية' }
        ],
        images: [
            'img/products/akide-sekeri-1.jpg',
            'img/products/akide-sekeri-2.jpg',
            'img/products/akide-sekeri-3.jpg'
        ],
        rating: 4.3,
        reviews_count: 64,
        stock: 150,
        sku: 'SKR-001',
        is_new: false,
        is_featured: true,
        related_products: [7, 8, 9, 10]
    },
    {
        id: 7,
        name: {
            tr: 'Tarçınlı Lokum',
            en: 'Cinnamon Turkish Delight',
            ar: 'راحة الترك بالقرفة'
        },
        slug: 'tarcinli-lokum',
        description: {
            tr: 'Tarçının sıcak ve aromalı tadıyla buluşan özel lokum.',
            en: 'Special Turkish delight with the warm and aromatic taste of cinnamon.',
            ar: 'راحة الترك خاصة بالمذاق الدافئ والعطري للقرفة.'
        },
        long_description: {
            tr: 'Özyürek Şekerleme\'nin özel tariflerinden olan Tarçınlı Lokum, geleneksel Türk lokumuna aromalı bir yorum katıyor. Seylon tarçınının sıcak ve baharatlı aroması, lokumun tatlılığıyla mükemmel bir uyum içindedir. Her bir parça, el yapımı olarak üretilir ve lokumun içinde tarçın parçacıkları görülebilir. Kış aylarında özellikle tercih edilen bu lezzet, sıcak içeceklerle harika bir uyum sağlar. Hem farklı bir tat arayanlar hem de tarçın sevenler için mükemmel bir tercih.',
            en: 'Cinnamon Turkish Delight, one of the special recipes of Özyürek Şekerleme, adds a flavorful interpretation to traditional Turkish delight. The warm and spicy aroma of Ceylon cinnamon is in perfect harmony with the sweetness of Turkish delight. Each piece is handmade and cinnamon particles can be seen in the delight. This flavor, which is especially preferred in winter months, pairs beautifully with hot drinks. A perfect choice for both those looking for a different taste and cinnamon lovers.',
            ar: 'راحة الترك بالقرفة، إحدى الوصفات الخاصة لأوزيورك شيكيرليمه، تضيف تفسيرًا مليئًا بالنكهة لراحة الترك التقليدية. الرائحة الدافئة والحارة لقرفة سيلان في تناغم تام مع حلاوة راحة الترك. كل قطعة مصنوعة يدويًا ويمكن رؤية جزيئات القرفة في الحلوى. هذه النكهة، التي يفضلها خاصة في أشهر الشتاء، تتزاوج بشكل جميل مع المشروبات الساخنة. خيار مثالي لكل من يبحث عن مذاق مختلف وعشاق القرفة.'
        },
        category: 'lokum',
        categoryName: {
            tr: 'Türk Lokumu',
            en: 'Turkish Delight',
            ar: 'راحة الترك'
        },
        price: 85.00,
        old_price: 100.00,
        discount_percentage: 15,
        weight_options: [
            { weight: 250, price: 85.00, old_price: 100.00 },
            { weight: 500, price: 160.00, old_price: 190.00 },
            { weight: 1000, price: 300.00, old_price: 350.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '345 kcal', en: '345 kcal', ar: '345 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '0.3g', en: '0.3g', ar: '0.3 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '84g', en: '84g', ar: '84 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '78g', en: '78g', ar: '78 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '0.2g', en: '0.2g', ar: '0.2 غرام' } }
        ],
        features: [
            { tr: 'Seylon tarçını', en: 'Ceylon cinnamon', ar: 'قرفة سيلانية' },
            { tr: 'Doğal aroma', en: 'Natural aroma', ar: 'نكهة طبيعية' },
            { tr: 'Sıcak içeceklerle uyumlu', en: 'Pairs well with hot drinks', ar: 'يتناسب جيدًا مع المشروبات الساخنة' },
            { tr: 'Kış mevsimi favorisi', en: 'Winter season favorite', ar: 'المفضل في موسم الشتاء' }
        ],
        images: [
            'img/products/tarcinli-lokum-1.jpg',
            'img/products/tarcinli-lokum-2.jpg',
            'img/products/tarcinli-lokum-3.jpg'
        ],
        rating: 4.5,
        reviews_count: 86,
        stock: 70,
        sku: 'LKM-007',
        is_new: true,
        is_featured: false,
        related_products: [3, 5, 8, 10]
    },
    {
        id: 8,
        name: {
            tr: 'Karamelli Lokum',
            en: 'Caramel Turkish Delight',
            ar: 'راحة الترك بالكراميل'
        },
        slug: 'karamelli-lokum',
        description: {
            tr: 'Özel karamel sosu ile hazırlanan, zengin aromalı lokum.',
            en: 'Rich flavored Turkish delight prepared with special caramel sauce.',
            ar: 'راحة الترك غنية النكهة محضرة بصلصة الكراميل الخاصة.'
        },
        long_description: {
            tr: 'Özyürek Şekerleme\'nin en yeni lezzetlerinden biri olan Karamelli Lokum, geleneksel Türk lokumuna modern bir dokunuş katıyor. Özel karamel sosu, uzun süre kaynatılarak hazırlanır ve lokuma zengin, tatlı bir aroma verir. Her bir parça, karamel dolgulu olarak üretilir ve ağızda eriyen dokusuyla unutulmaz bir tat sunar. Hafif tuzlu karamel kullanımı, lokumun tatlılığını dengeler ve daha sofistike bir lezzet profili yaratır. Karamel sevenler için vazgeçilmez bir lezzet.',
            en: 'Caramel Turkish Delight, one of the newest flavors of Özyürek Şekerleme, adds a modern touch to traditional Turkish delight. The special caramel sauce is prepared by boiling for a long time and gives the delight a rich, sweet aroma. Each piece is produced with caramel filling and offers an unforgettable taste with its melt-in-mouth texture. The use of slightly salted caramel balances the sweetness of the delight and creates a more sophisticated flavor profile. An indispensable flavor for caramel lovers.',
            ar: 'راحة الترك بالكراميل، إحدى أحدث نكهات أوزيورك شيكيرليمه، تضيف لمسة حديثة إلى راحة الترك التقليدية. يتم تحضير صلصة الكراميل الخاصة عن طريق الغليان لفترة طويلة وتعطي الحلوى رائحة غنية وحلوة. يتم إنتاج كل قطعة بحشوة الكراميل وتقدم طعمًا لا يُنسى بقوامها الذي يذوب في الفم. استخدام الكراميل المملح قليلاً يوازن حلاوة الحلوى ويخلق ملف نكهة أكثر تطوراً. نكهة لا غنى عنها لعشاق الكراميل.'
        },
        category: 'lokum',
        categoryName: {
            tr: 'Türk Lokumu',
            en: 'Turkish Delight',
            ar: 'راحة الترك'
        },
        price: 110.00,
        old_price: 140.00,
        discount_percentage: 21,
        weight_options: [
            { weight: 250, price: 110.00, old_price: 140.00 },
            { weight: 500, price: 200.00, old_price: 250.00 },
            { weight: 1000, price: 380.00, old_price: 480.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '360 kcal', en: '360 kcal', ar: '360 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '0.4g', en: '0.4g', ar: '0.4 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '86g', en: '86g', ar: '86 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '80g', en: '80g', ar: '80 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '2.5g', en: '2.5g', ar: '2.5 غرام' } }
        ],
        features: [
            { tr: 'Özel karamel sosu', en: 'Special caramel sauce', ar: 'صلصة الكراميل الخاصة' },
            { tr: 'Dolgulu yapı', en: 'Filled structure', ar: 'هيكل محشو' },
            { tr: 'Hafif tuzlu not', en: 'Slightly salty note', ar: 'نوتة مالحة قليلاً' },
            { tr: 'Modern yorum', en: 'Modern interpretation', ar: 'تفسير حديث' }
        ],
        images: [
            'img/products/karamelli-lokum-1.jpg',
            'img/products/karamelli-lokum-2.jpg',
            'img/products/karamelli-lokum-3.jpg'
        ],
        rating: 4.7,
        reviews_count: 92,
        stock: 85,
        sku: 'LKM-008',
        is_new: true,
        is_featured: true,
        related_products: [1, 3, 5, 7]
    },
    {
        id: 9,
        name: {
            tr: 'Karışık Baharatlı Lokum',
            en: 'Mixed Spice Turkish Delight',
            ar: 'راحة الترك بالتوابل المشكلة'
        },
        slug: 'karisik-baharatli-lokum',
        description: {
            tr: 'Tarçın, karanfil, zencefil ve kakule ile zenginleştirilmiş özel lokum.',
            en: 'Special Turkish delight enriched with cinnamon, clove, ginger and cardamom.',
            ar: 'راحة الترك خاصة غنية بالقرفة والقرنفل والزنجبيل والهال.'
        },
        long_description: {
            tr: 'Özyürek Şekerleme\'nin cesur lezzetlerinden biri olan Karışık Baharatlı Lokum, Doğu\'nun zengin baharat kültürünü geleneksel Türk lokumu ile buluşturuyor. Tarçın, karanfil, zencefil ve kakule gibi dört farklı baharatın harmonisi, eşsiz bir aroma profili yaratır. Her bir baharat özenle seçilir ve lokum hamuruna eklenmeden önce özel olarak hazırlanır. Baharatlı ve sıcak karakteri ile kış aylarının vazgeçilmez lezzeti olan bu ürün, çay ve kahve yanında mükemmel bir ikramdır.',
            en: 'Mixed Spice Turkish Delight, one of the bold flavors of Özyürek Şekerleme, combines the rich spice culture of the East with traditional Turkish delight. The harmony of four different spices such as cinnamon, clove, ginger and cardamom creates a unique aroma profile. Each spice is carefully selected and specially prepared before being added to the delight dough. This product, which is an indispensable flavor of winter months with its spicy and warm character, is a perfect treat with tea and coffee.',
            ar: 'راحة الترك بالتوابل المشكلة، إحدى النكهات الجريئة لأوزيورك شيكيرليمه، تجمع بين ثقافة التوابل الغنية في الشرق وراحة الترك التقليدية. تناغم أربعة توابل مختلفة مثل القرفة والقرنفل والزنجبيل والهال يخلق ملف عطري فريد. يتم اختيار كل بهار بعناية وتحضيره خصيصًا قبل إضافته إلى عجينة الحلوى. هذا المنتج، الذي يعد نكهة لا غنى عنها في أشهر الشتاء بطابعه الحار والدافئ، هو علاج مثالي مع الشاي والقهوة.'
        },
        category: 'lokum',
        categoryName: {
            tr: 'Türk Lokumu',
            en: 'Turkish Delight',
            ar: 'راحة الترك'
        },
        price: 95.00,
        old_price: 115.00,
        discount_percentage: 17,
        weight_options: [
            { weight: 250, price: 95.00, old_price: 115.00 },
            { weight: 500, price: 180.00, old_price: 220.00 },
            { weight: 1000, price: 340.00, old_price: 410.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '340 kcal', en: '340 kcal', ar: '340 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '0.3g', en: '0.3g', ar: '0.3 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '84g', en: '84g', ar: '84 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '76g', en: '76g', ar: '76 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '0.4g', en: '0.4g', ar: '0.4 غرام' } }
        ],
        features: [
            { tr: 'Dört farklı baharat', en: 'Four different spices', ar: 'أربعة توابل مختلفة' },
            { tr: 'Sıcak ve aromatik', en: 'Warm and aromatic', ar: 'دافئ وعطري' },
            { tr: 'Çay ve kahve ile uyumlu', en: 'Pairs well with tea and coffee', ar: 'يتناسب جيدًا مع الشاي والقهوة' },
            { tr: 'Kış mevsimi için ideal', en: 'Ideal for winter season', ar: 'مثالي لموسم الشتاء' }
        ],
        images: [
            'img/products/baharatli-lokum-1.jpg',
            'img/products/baharatli-lokum-2.jpg',
            'img/products/baharatli-lokum-3.jpg'
        ],
        rating: 4.2,
        reviews_count: 58,
        stock: 65,
        sku: 'LKM-009',
        is_new: false,
        is_featured: false,
        related_products: [5, 7, 8, 10]
    },
    {
        id: 10,
        name: {
            tr: 'Meyveli Akide Şekeri',
            en: 'Fruit Flavored Hard Candy',
            ar: 'حلوى صلبة بنكهة الفواكه'
        },
        slug: 'meyveli-akide-sekeri',
        description: {
            tr: 'Doğal meyve özleri ile tatlandırılmış geleneksel Türk akide şekeri.',
            en: 'Traditional Turkish hard candy flavored with natural fruit extracts.',
            ar: 'حلوى تركية تقليدية صلبة منكهة بخلاصات الفواكه الطبيعية.'
        },
        long_description: {
            tr: 'Özyürek Şekerleme\'nin renkli ve lezzetli ürünü Meyveli Akide Şekeri, geleneksel Türk şekerlemesinin modern bir yorumudur. Portakal, çilek, limon, elma ve böğürtlen gibi beş farklı meyvenin doğal özleriyle tatlandırılır. Her bir şeker, el yapımı olarak üretilir ve parlak renkleri ile göz alıcıdır. Sert yapısı sayesinde uzun süre ağızda kalır ve meyve aromaları yavaş yavaş açığa çıkar. Hem çocuklar hem de yetişkinler için ideal olan bu ürün, nostaljik bir lezzet arayanlar için mükemmel bir seçimdir.',
            en: 'Fruit Flavored Hard Candy, a colorful and delicious product of Özyürek Şekerleme, is a modern interpretation of traditional Turkish candy. It is flavored with natural extracts of five different fruits such as orange, strawberry, lemon, apple and blackberry. Each candy is handmade and eye-catching with its bright colors. Thanks to its hard structure, it stays in the mouth for a long time and fruit aromas are released slowly. This product, which is ideal for both children and adults, is a perfect choice for those looking for a nostalgic flavor.',
            ar: 'الحلوى الصلبة بنكهة الفواكه، منتج ملون ولذيذ من أوزيورك شيكيرليمه، هو تفسير حديث للحلوى التركية التقليدية. إنها منكهة بمستخلصات طبيعية من خمسة فواكه مختلفة مثل البرتقال والفراولة والليمون والتفاح والتوت الأسود. كل حلوى مصنوعة يدويًا وجذابة بألوانها الزاهية. بفضل بنيتها الصلبة، تبقى في الفم لفترة طويلة ويتم إطلاق نكهات الفاكهة ببطء. هذا المنتج، المثالي لكل من الأطفال والبالغين، هو خيار مثالي لأولئك الذين يبحثون عن نكهة حنين.'
        },
        category: 'sekerleme',
        categoryName: {
            tr: 'Şekerleme',
            en: 'Candy',
            ar: 'حلويات'
        },
        price: 75.00,
        old_price: 90.00,
        discount_percentage: 17,
        weight_options: [
            { weight: 250, price: 75.00, old_price: 90.00 },
            { weight: 500, price: 140.00, old_price: 170.00 },
            { weight: 1000, price: 260.00, old_price: 310.00 }
        ],
        weight: 250, // Default weight
        nutrition: [
            { name: { tr: 'Enerji', en: 'Energy', ar: 'الطاقة' }, value: { tr: '395 kcal', en: '395 kcal', ar: '395 سعرة حرارية' } },
            { name: { tr: 'Protein', en: 'Protein', ar: 'البروتين' }, value: { tr: '0g', en: '0g', ar: '0 غرام' } },
            { name: { tr: 'Karbonhidrat', en: 'Carbohydrate', ar: 'الكربوهيدرات' }, value: { tr: '99g', en: '99g', ar: '99 غرام' } },
            { name: { tr: 'Şeker', en: 'Sugar', ar: 'السكر' }, value: { tr: '99g', en: '99g', ar: '99 غرام' } },
            { name: { tr: 'Yağ', en: 'Fat', ar: 'الدهون' }, value: { tr: '0g', en: '0g', ar: '0 غرام' } }
        ],
        features: [
            { tr: 'Beş farklı meyve aroması', en: 'Five different fruit flavors', ar: 'خمس نكهات فواكه مختلفة' },
            { tr: 'Doğal meyve özleri', en: 'Natural fruit extracts', ar: 'مستخلصات الفاكهة الطبيعية' },
            { tr: 'El yapımı üretim', en: 'Handmade production', ar: 'إنتاج يدوي' },
            { tr: 'Parlak renkler', en: 'Bright colors', ar: 'ألوان زاهية' }
        ],
        images: [
            'img/products/meyveli-akide-sekeri-1.jpg',
            'img/products/meyveli-akide-sekeri-2.jpg',
            'img/products/meyveli-akide-sekeri-3.jpg'
        ],
        rating: 4.4,
        reviews_count: 72,
        stock: 110,
        sku: 'SKR-002',
        is_new: false,
        is_featured: true,
        related_products: [4, 6, 7, 9]
    }
];

// Örnek yorum verileri
const mockReviews = [
    {
        id: 1,
        product_id: 1,
        author: 'Ahmet Y.',
        date: '12.01.2025',
        rating: 5,
        comment: 'Gerçekten çok lezzetli, Antep fıstıkları taze ve bol. Kesinlikle tavsiye ederim.',
        comment_en: 'Really delicious, pistachios are fresh and plenty. I definitely recommend it.',
        comment_ar: 'لذيذ حقًا، الفستق طازج ووفير. أوصي به بالتأكيد.'
    },
    {
        id: 2,
        product_id: 1,
        author: 'Elif K.',
        date: '05.02.2025',
        rating: 4,
        comment: 'Lezzeti harika, tek eleştirim biraz daha yumuşak olabilirdi.',
        comment_en: 'The taste is great, my only criticism is that it could be a bit softer.',
        comment_ar: 'الطعم رائع، انتقادي الوحيد هو أنه كان يمكن أن يكون أكثر نعومة قليلاً.'
    },
    {
        id: 3,
        product_id: 1,
        author: 'Mehmet B.',
        date: '20.02.2025',
        rating: 5,
        comment: 'Bu lokum için teşekkürler, ailece bayıldık. Kesinlikle tekrar sipariş vereceğim.',
        comment_en: 'Thank you for this delight, my family loved it. I will definitely order again.',
        comment_ar: 'شكرًا لكم على هذه الحلوى، عائلتي أحبتها. سأطلب مرة أخرى بالتأكيد.'
    }
];

/**
 * Sayfanın ilk yüklenişinde çalışacak fonksiyon
 */
document.addEventListener('DOMContentLoaded', () => {
    // Sayfa türüne göre ilgili fonksiyonları çağır
    const currentPage = window.location.pathname;
    
    // Anasayfa: Öne çıkan ürünleri yükle
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        loadFeaturedProducts();
    }
    
    // Ürün listeleme sayfası
    if (currentPage.includes('products.html')) {
        initProductsPage();
    }
    
    // Ürün detay sayfası
    if (currentPage.includes('product.html')) {
        initProductDetailPage();
    }
    
    // Ağırlık seçenekleri - tüm sayfalarda çalışır
    initWeightOptions();
    
    // Sepete ekleme butonu
    initAddToCartButtons();
});

/**
 * Öne çıkan ürünleri yükleme
 */
function loadFeaturedProducts() {
    const featuredProductsContainer = document.querySelector('.featured-products .products-grid');
    
    if (featuredProductsContainer) {
        // Yükleme göstergesini göster
        featuredProductsContainer.innerHTML = '<div class="product-loader"><i class="fas fa-spinner fa-spin"></i></div>';
        
        // Öne çıkan ürünleri filtrele
        const featuredProducts = mockProducts.filter(product => product.is_featured);
        
        // Biraz gecikme ile yükleniyor efekti ver (gerçek uygulamada API çağrısı olacak)
        setTimeout(() => {
            // Ürünleri içeren HTML'i oluştur
            let productsHTML = '';
            
            featuredProducts.forEach(product => {
                productsHTML += createProductCard(product);
            });
            
            // HTML'i sayfaya ekle
            featuredProductsContainer.innerHTML = productsHTML;
            
            // Sayfa çevirisini güncelle
            if (window.translatePage) {
                window.translatePage();
            }
        }, 800);
    }
}

/**
 * Ürün listeleme sayfası işlevselliği
 */
function initProductsPage() {
    // URL parametreleriyle kategori filtresi kontrolü
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Kategori başlığını güncelle
    updateCategoryTitle(categoryParam);
    
    // Kategori filtresini seç
    selectCategoryFilter(categoryParam);
    
    // Ürünleri yükle
    loadProducts(categoryParam);
    
    // Fiyat filtresi olay dinleyicisi
    const applyPriceButton = document.getElementById('apply-price');
    if (applyPriceButton) {
        applyPriceButton.addEventListener('click', applyPriceFilter);
    }
    
    // Sıralama olay dinleyicisi
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProducts);
    }
}

/**
 * Kategori başlığını güncelleme
 * @param {string|null} category - Seçilen kategori
 */
function updateCategoryTitle(category) {
    const categoryTitle = document.getElementById('category-title');
    const currentCategory = document.getElementById('current-category');
    
    if (categoryTitle && currentCategory) {
        let titleText = '';
        let titleKey = '';
        
        // Kategori adını belirle
        if (category) {
            // Kategoriyi bul
            const categoryProduct = mockProducts.find(product => product.category === category);
            if (categoryProduct) {
                const currentLang = localStorage.getItem('language') || 'tr';
                titleText = categoryProduct.categoryName[currentLang];
                titleKey = `categories.${category}`;
            } else {
                titleText = 'Ürünlerimiz';
                titleKey = 'products.all_products';
            }
        } else {
            titleText = 'Tüm Ürünlerimiz';
            titleKey = 'products.all_products';
        }
        
        // Başlığı güncelle
        categoryTitle.textContent = titleText;
        categoryTitle.setAttribute('data-i18n', titleKey);
        
        currentCategory.textContent = titleText;
        currentCategory.setAttribute('data-i18n', titleKey);
    }
}

/**
 * Kategori filtresini seçme
 * @param {string|null} category - Seçilen kategori
 */
function selectCategoryFilter(category) {
    // Tüm filtreleri temizle
    const categoryLinks = document.querySelectorAll('.category-filter a');
    categoryLinks.forEach(link => link.classList.remove('active'));
    
    // Seçilen filtreyi aktifleştir
    if (category) {
        const selectedFilter = document.querySelector(`.category-filter a[data-category="${category}"]`);
        if (selectedFilter) {
            selectedFilter.classList.add('active');
        }
    } else {
        const allProductsFilter = document.querySelector('.category-filter a[data-category="all"]');
        if (allProductsFilter) {
            allProductsFilter.classList.add('active');
        }
    }
}

/**
 * Ürünleri yükleme
 * @param {string|null} category - Filtre için kategori
 */
function loadProducts(category = null) {
    const productsContainer = document.getElementById('products-container');
    const productTotalElement = document.getElementById('product-total');
    
    if (productsContainer) {
        // Yükleme göstergesini göster
        productsContainer.innerHTML = '<div class="product-loader"><i class="fas fa-spinner fa-spin"></i></div>';
        
        // Ürünleri filtrele (eğer kategori seçilmişse)
        let filteredProducts = [...mockProducts];
        
        if (category) {
            filteredProducts = mockProducts.filter(product => product.category === category);
        }
        
        // Toplam ürün sayısını güncelle
        if (productTotalElement) {
            productTotalElement.textContent = filteredProducts.length;
        }
        
        // Varsayılan sıralama: Önerilen
        filteredProducts = sortProductsBy(filteredProducts, 'recommended');
        
        // Biraz gecikme ile yükleniyor efekti ver (gerçek uygulamada API çağrısı olacak)
        setTimeout(() => {
            // Ürünleri içeren HTML'i oluştur
            let productsHTML = '';
            
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    productsHTML += createProductCard(product);
                });
            } else {
                // Ürün bulunamadı mesajı
                const noProductsMessage = window.getTranslation ? 
                    window.getTranslation('products.no_products') : 
                    'Bu kategoride ürün bulunamadı.';
                    
                productsHTML = `<div class="no-products"><p>${noProductsMessage}</p></div>`;
            }
            
            // HTML'i sayfaya ekle
            productsContainer.innerHTML = productsHTML;
            
            // Sayfalama oluştur
            createPagination(filteredProducts.length);
            
            // Sayfa çevirisini güncelle
            if (window.translatePage) {
                window.translatePage();
            }
        }, 800);
    }
}

/**
 * Ürün kartı HTML'i oluşturma
 * @param {Object} product - Ürün verisi
 * @returns {string} - Ürün kartı HTML'i
 */
function createProductCard(product) {
    const currentLang = localStorage.getItem('language') || 'tr';
    const productName = product.name[currentLang];
    const productDescription = product.description[currentLang];
    const categoryName = product.categoryName[currentLang];
    
    // Fiyat bilgisini formato
    const price = window.formatCurrency ? 
        window.formatCurrency(product.price, currentLang) : 
        `₺${product.price.toFixed(2)}`;
    
    const oldPrice = product.old_price ? 
        (window.formatCurrency ? 
            window.formatCurrency(product.old_price, currentLang) : 
            `₺${product.old_price.toFixed(2)}`) : 
        '';
    
    // İndirim badge'i
    const discountBadge = product.discount_percentage ? 
        `<span class="discount-badge">%${product.discount_percentage}</span>` : 
        '';
    
    // Yeni ürün badge'i
    const newBadge = product.is_new ? 
        `<span class="new-badge" data-i18n="products.new">Yeni</span>` : 
        '';
    
    return `
    <div class="product-card" data-product-id="${product.id}">
        <div class="product-badges">
            ${newBadge}
            ${discountBadge}
        </div>
        <div class="product-image">
            <a href="product.html?id=${product.id}">
                <img src="${product.images[0]}" alt="${productName}">
            </a>
        </div>
        <div class="product-info">
            <div class="product-category" data-category-key="${product.category}">${categoryName}</div>
            <h3 class="product-title">
                <a href="product.html?id=${product.id}">${productName}</a>
            </h3>
            <div class="product-price">
                <span class="current-price">${price}</span>
                ${oldPrice ? `<span class="old-price">${oldPrice}</span>` : ''}
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

/**
 * Sayfalama oluşturma
 * @param {number} totalProducts - Toplam ürün sayısı
 * @param {number} perPage - Sayfa başına ürün sayısı
 */
function createPagination(totalProducts, perPage = 12) {
    const paginationContainer = document.getElementById('pagination');
    
    if (paginationContainer) {
        const totalPages = Math.ceil(totalProducts / perPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Önceki sayfa
        paginationHTML += `
        <div class="pagination-arrow prev ${currentPage === 1 ? 'disabled' : ''}">
            <i class="fas fa-chevron-left"></i>
        </div>
        `;
        
        // Sayfa numaraları
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
            <div class="pagination-item ${i === 1 ? 'active' : ''}" data-page="${i}">
                ${i}
            </div>
            `;
        }
        
        // Sonraki sayfa
        paginationHTML += `
        <div class="pagination-arrow next ${currentPage === totalPages ? 'disabled' : ''}">
            <i class="fas fa-chevron-right"></i>
        </div>
        `;
        
        paginationContainer.innerHTML = paginationHTML;
        
        // Sayfalama butonlarına olay dinleyicileri ekle
        const pageItems = document.querySelectorAll('.pagination-item');
        pageItems.forEach(item => {
            item.addEventListener('click', () => {
                const pageNum = parseInt(item.getAttribute('data-page'));
                changePage(pageNum);
            });
        });
        
        const prevButton = document.querySelector('.pagination-arrow.prev');
        const nextButton = document.querySelector('.pagination-arrow.next');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    changePage(currentPage - 1);
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    changePage(currentPage + 1);
                }
            });
        }
    }
}

/**
 * Sayfa değiştirme
 * @param {number} pageNum - Geçilecek sayfa numarası
 */
function changePage(pageNum) {
    // Sayfaları değiştirme işlevi
    // Bu projede sayfa değiştirme işlevi uygulanmayacak
    // Gerçek projede bu fonksiyon, seçilen sayfadaki ürünleri getirecek
    currentPage = pageNum;
    
    // Aktif sayfa butonunu güncelle
    const pageItems = document.querySelectorAll('.pagination-item');
    pageItems.forEach(item => {
        const itemPage = parseInt(item.getAttribute('data-page'));
        if (itemPage === pageNum) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Önceki/Sonraki butonlarını güncelle
    const prevButton = document.querySelector('.pagination-arrow.prev');
    const nextButton = document.querySelector('.pagination-arrow.next');
    
    if (prevButton) {
        if (currentPage === 1) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }
    }
    
    if (nextButton) {
        const totalPages = Math.ceil(mockProducts.length / 12);
        if (currentPage === totalPages) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }
    
    // Sayfayı kaydır
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Fiyat filtresini uygula
 */
function applyPriceFilter() {
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    let minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null;
    let maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null;
    
    // URL parametreleriyle kategori filtresi kontrolü
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Ürünleri filtrele
    let filteredProducts = [...mockProducts];
    
    if (categoryParam) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryParam);
    }
    
    if (minPrice !== null) {
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }
    
    if (maxPrice !== null) {
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }
    
    // Sıralama seçeneğini koru
    const sortSelect = document.getElementById('sort-by');
    let sortOption = 'recommended';
    
    if (sortSelect) {
        sortOption = sortSelect.value;
    }
    
    filteredProducts = sortProductsBy(filteredProducts, sortOption);
    
    // Ürünleri güncelle
    updateProductsList(filteredProducts);
}

/**
 * Ürünleri sırala
 */
function sortProducts() {
    const sortSelect = document.getElementById('sort-by');
    if (!sortSelect) return;
    
    const sortOption = sortSelect.value;
    
    // URL parametreleriyle kategori filtresi kontrolü
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Fiyat filtreleri
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    let minPrice = minPriceInput && minPriceInput.value ? parseFloat(minPriceInput.value) : null;
    let maxPrice = maxPriceInput && maxPriceInput.value ? parseFloat(maxPriceInput.value) : null;
    
    // Ürünleri filtrele
    let filteredProducts = [...mockProducts];
    
    if (categoryParam) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryParam);
    }
    
    if (minPrice !== null) {
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }
    
    if (maxPrice !== null) {
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }
    
    // Ürünleri sırala
    filteredProducts = sortProductsBy(filteredProducts, sortOption);
    
    // Ürünleri güncelle
    updateProductsList(filteredProducts);
}

/**
 * Ürünleri belirli bir kritere göre sıralama
 * @param {Array} products - Sıralanacak ürünler
 * @param {string} sortBy - Sıralama kriteri
 * @returns {Array} - Sıralanmış ürünler
 */
function sortProductsBy(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.is_new === a.is_new ? 0 : b.is_new ? 1 : -1);
            break;
        case 'recommended':
        default:
            // Önerilen sıralama (varsayılan): önce rating'e göre sonra featuered ürünlere öncelik ver
            sortedProducts.sort((a, b) => {
                if (a.is_featured !== b.is_featured) {
                    return a.is_featured ? -1 : 1;
                }
                return b.rating - a.rating;
            });
            break;
    }
    
    return sortedProducts;
}

/**
 * Ürün listesini güncelleme
 * @param {Array} products - Görüntülenecek ürünler
 */
function updateProductsList(products) {
    const productsContainer = document.getElementById('products-container');
    const productTotalElement = document.getElementById('product-total');
    
    if (productsContainer) {
        // Toplam ürün sayısını güncelle
        if (productTotalElement) {
            productTotalElement.textContent = products.length;
        }
        
        // Ürünleri içeren HTML'i oluştur
        let productsHTML = '';
        
        if (products.length > 0) {
            products.forEach(product => {
                productsHTML += createProductCard(product);
            });
        } else {
            // Ürün bulunamadı mesajı
            const noProductsMessage = window.getTranslation ? 
                window.getTranslation('products.no_products_found') : 
                'Arama kriterlerinize uygun ürün bulunamadı.';
                
            productsHTML = `<div class="no-products"><p>${noProductsMessage}</p></div>`;
        }
        
        // HTML'i sayfaya ekle
        productsContainer.innerHTML = productsHTML;
        
        // Sayfalama oluştur
        createPagination(products.length);
        
        // Sayfa çevirisini güncelle
        if (window.translatePage) {
            window.translatePage();
        }
    }
}

/**
 * Ürün detay sayfası işlevselliği
 */
function initProductDetailPage() {
    // URL'den ürün ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // Ürünü bul
        const product = mockProducts.find(p => p.id === parseInt(productId));
        
        if (product) {
            // Ürün detaylarını göster
            displayProductDetails(product);
            
            // Benzer ürünleri yükle
            loadRelatedProducts(product);
            
            // Tab işlevselliği
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Aktif tab'ı değiştir
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // İlgili içeriği göster
                    const tabId = button.getAttribute('data-tab');
                    const tabPanes = document.querySelectorAll('.tab-pane');
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    document.getElementById(tabId).classList.add('active');
                });
            });
        } else {
            // Ürün bulunamadı
            showProductNotFound();
        }
    } else {
        // Ürün ID'si bulunamadı
        showProductNotFound();
    }
}

/**
 * Ürün detaylarını gösterme
 * @param {Object} product - Görüntülenecek ürün
 */
function displayProductDetails(product) {
    const currentLang = localStorage.getItem('language') || 'tr';
    const productDetail = document.getElementById('product-detail');
    const productTemplate = document.getElementById('product-detail-template');
    
    if (productDetail && productTemplate) {
        // Yükleniyor göstergesi
        productDetail.innerHTML = '<div class="product-loader centered"><i class="fas fa-spinner fa-spin"></i></div>';
        
        // Biraz gecikme ekle
        setTimeout(() => {
            // Template klonla ve içeriğini doldur
            const template = productTemplate.content.cloneNode(true);
            
            // Ürün adı ve kategori
            document.getElementById('product-name').textContent = product.name[currentLang];
            document.getElementById('product-category').textContent = product.categoryName[currentLang];
            document.getElementById('product-category').setAttribute('data-i18n', `categories.${product.category}`);
            
            // Template içindeki elementleri güncelle
            template.getElementById('detail-product-name').textContent = product.name[currentLang];
            template.getElementById('product-sku').textContent = product.sku;
            template.getElementById('product-description').textContent = product.description[currentLang];
            
            // Fiyat bilgisi
            const price = window.formatCurrency ? window.formatCurrency(product.price, currentLang) : `₺${product.price.toFixed(2)}`;
            template.getElementById('product-price').textContent = price;
            
            if (product.old_price) {
                const oldPrice = window.formatCurrency ? window.formatCurrency(product.old_price, currentLang) : `₺${product.old_price.toFixed(2)}`;
                template.getElementById('product-old-price').textContent = oldPrice;
                
                if (product.discount_percentage) {
                    template.getElementById('product-discount').textContent = `%${product.discount_percentage}`;
                }
            }
            
            // Rating
            const ratingStars = template.querySelector('.stars');
            if (ratingStars) {
                ratingStars.innerHTML = generateRatingStars(product.rating);
            }
            
            const reviewCount = template.querySelector('.review-count');
            if (reviewCount) {
                reviewCount.textContent = `(${product.reviews_count})`;
            }
            
            // Ana görsel
            const mainImage = template.getElementById('product-main-image');
            if (mainImage) {
                mainImage.src = product.images[0];
                mainImage.alt = product.name[currentLang];
            }
            
            // Küçük görseller
            const thumbnailsContainer = template.getElementById('product-thumbnails');
            if (thumbnailsContainer && product.images.length > 1) {
                product.images.forEach((image, index) => {
                    const thumbnail = document.createElement('div');
                    thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
                    thumbnail.innerHTML = `<img src="${image}" alt="${product.name[currentLang]} ${index + 1}">`;
                    
                    // Küçük görsel tıklama olayı
                    thumbnail.addEventListener('click', () => {
                        // Aktif küçük görseli güncelle
                        const allThumbnails = document.querySelectorAll('.thumbnail');
                        allThumbnails.forEach(thumb => thumb.classList.remove('active'));
                        thumbnail.classList.add('active');
                        
                        // Ana görseli güncelle
                        const mainImg = document.getElementById('product-main-image');
                        if (mainImg) {
                            mainImg.src = image;
                        }
                    });
                    
                    thumbnailsContainer.appendChild(thumbnail);
                });
            }
            
            // Ağırlık seçenekleri
            const weightOptions = template.getElementById('weight-options');
            if (weightOptions && product.weight_options && product.weight_options.length > 0) {
                weightOptions.innerHTML = '';
                
                product.weight_options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = `weight-option ${option.weight === product.weight ? 'active' : ''}`;
                    button.setAttribute('data-weight', option.weight);
                    button.setAttribute('data-price', option.price);
                    button.setAttribute('data-old-price', option.old_price || '');
                    button.textContent = option.weight >= 1000 ? `${option.weight/1000}kg` : `${option.weight}g`;
                    
                    weightOptions.appendChild(button);
                });
            }
            
            // Detaylar tabındaki içeriği doldur
            const longDescription = document.getElementById('product-long-description');
            if (longDescription) {
                longDescription.textContent = product.long_description[currentLang];
            }
            
            // Ürün özellikleri
            const featuresContainer = document.getElementById('product-features');
            if (featuresContainer && product.features && product.features.length > 0) {
                featuresContainer.innerHTML = '';
                
                product.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature[currentLang];
                    featuresContainer.appendChild(li);
                });
            }
            
            // Beslenme değerleri
            const nutritionTable = document.getElementById('nutrition-table-body');
            if (nutritionTable && product.nutrition && product.nutrition.length > 0) {
                nutritionTable.innerHTML = '';
                
                product.nutrition.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.name[currentLang]}</td>
                        <td>${item.value[currentLang]}</td>
                    `;
                    nutritionTable.appendChild(row);
                });
            }
            
            // Ürün yorumları
            loadProductReviews(product.id);
            
            // Template'i sayfaya ekle
            productDetail.innerHTML = '';
            productDetail.appendChild(template);
            
            // Sayfa başlığını güncelle
            document.title = `${product.name[currentLang]} - Özyürek Şekerleme`;
        }, 800);
    }
}

/**
 * Ürün yorumlarını yükleme
 * @param {number} productId - Ürün ID'si
 */
function loadProductReviews(productId) {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    // Ürüne ait yorumları filtrele
    const productReviews = mockReviews.filter(review => review.product_id === productId);
    
    if (productReviews.length > 0) {
        const currentLang = localStorage.getItem('language') || 'tr';
        let reviewsHTML = '';
        
        productReviews.forEach(review => {
            // Yorum metni için dil kontrolü
            let commentText = review.comment;
            if (currentLang === 'en' && review.comment_en) {
                commentText = review.comment_en;
            } else if (currentLang === 'ar' && review.comment_ar) {
                commentText = review.comment_ar;
            }
            
            reviewsHTML += `
            <div class="review">
                <div class="review-header">
                    <div class="review-author">${review.author}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-rating">
                    ${generateRatingStars(review.rating)}
                </div>
                <div class="review-content">
                    <p>${commentText}</p>
                </div>
            </div>
            `;
        });
        
        reviewsList.innerHTML = reviewsHTML;
    } else {
        // Yorum bulunamadı mesajı
        const noReviewsMessage = window.getTranslation ? 
            window.getTranslation('product.no_reviews') : 
            'Bu ürün için henüz yorum yapılmamış.';
            
        reviewsList.innerHTML = `<div class="no-reviews"><p>${noReviewsMessage}</p></div>`;
    }
}

/**
 * Yıldız derecelendirmesi oluşturma
 * @param {number} rating - Derecelendirme puanı (0-5)
 * @returns {string} - Yıldız HTML'i
 */
function generateRatingStars(rating) {
    let starsHTML = '';
    
    // Tam yıldızlar
    for (let i = 1; i <= Math.floor(rating); i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Yarım yıldız
    if (rating % 1 >= 0.3 && rating % 1 <= 0.7) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    } else if (rating % 1 > 0.7) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Boş yıldızlar
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 1; i <= emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

/**
 * Benzer ürünleri yükleme
 * @param {Object} product - Mevcut ürün
 */
function loadRelatedProducts(product) {
    const relatedProductsContainer = document.getElementById('related-products');
    
    if (relatedProductsContainer && product.related_products && product.related_products.length > 0) {
        // Yükleme göstergesini göster
        relatedProductsContainer.innerHTML = '<div class="product-loader"><i class="fas fa-spinner fa-spin"></i></div>';
        
        // İlgili ürünleri filtrele
        const relatedProducts = mockProducts.filter(p => product.related_products.includes(p.id));
        
        // Biraz gecikme ile yükleniyor efekti ver
        setTimeout(() => {
            // Ürünleri içeren HTML'i oluştur
            let productsHTML = '';
            
            relatedProducts.forEach(relatedProduct => {
                productsHTML += createProductCard(relatedProduct);
            });
            
            // HTML'i sayfaya ekle
            relatedProductsContainer.innerHTML = productsHTML;
            
            // Sayfa çevirisini güncelle
            if (window.translatePage) {
                window.translatePage();
            }
        }, 800);
    }
}

/**
 * Ürün bulunamadı mesajını gösterme
 */
function showProductNotFound() {
    const productDetail = document.getElementById('product-detail');
    
    if (productDetail) {
        const currentLang = localStorage.getItem('language') || 'tr';
        
        let message = 'Ürün bulunamadı.';
        if (currentLang === 'en') {
            message = 'Product not found.';
        } else if (currentLang === 'ar') {
            message = 'المنتج غير موجود.';
        }
        
        productDetail.innerHTML = `
        <div class="product-not-found">
            <i class="fas fa-exclamation-circle"></i>
            <h2>${message}</h2>
            <a href="products.html" class="btn-primary">${currentLang === 'en' ? 'Browse Products' : (currentLang === 'ar' ? 'تصفح المنتجات' : 'Ürünleri İncele')}</a>
        </div>
        `;
    }
}

/**
 * Ağırlık seçenekleri işlevselliği
 */
function initWeightOptions() {
    // Sayfa yüklendikten sonra da çalışabilmek için event delegation kullanılıyor
    document.addEventListener('click', (event) => {
        const target = event.target;
        
        // Ağırlık seçeneği butonuna tıklandıysa
        if (target.classList.contains('weight-option')) {
            // Diğer ağırlık seçeneklerinden active sınıfını kaldır
            const weightOptions = target.parentElement.querySelectorAll('.weight-option');
            weightOptions.forEach(option => option.classList.remove('active'));
            
            // Tıklanan seçeneği aktifleştir
            target.classList.add('active');
            
            // Fiyatı güncelle
            updatePriceByWeight(target);
        }
    });
}

/**
 * Ağırlığa göre fiyatı güncelleme
 * @param {HTMLElement} selectedOption - Seçilen ağırlık seçeneği
 */
function updatePriceByWeight(selectedOption) {
    const weight = parseInt(selectedOption.getAttribute('data-weight'));
    const price = parseFloat(selectedOption.getAttribute('data-price'));
    const oldPrice = selectedOption.getAttribute('data-old-price') ? parseFloat(selectedOption.getAttribute('data-old-price')) : null;
    
    // Fiyat görüntüleme elementleri
    const priceElement = document.getElementById('product-price');
    const oldPriceElement = document.getElementById('product-old-price');
    
    if (priceElement) {
        const currentLang = localStorage.getItem('language') || 'tr';
        
        // Fiyatı güncelle
        priceElement.textContent = window.formatCurrency ? 
            window.formatCurrency(price, currentLang) : 
            `₺${price.toFixed(2)}`;
        
        // Eski fiyatı güncelle (varsa)
        if (oldPriceElement && oldPrice) {
            oldPriceElement.textContent = window.formatCurrency ? 
                window.formatCurrency(oldPrice, currentLang) : 
                `₺${oldPrice.toFixed(2)}`;
        }
    }
}

/**
 * Sepete ekle butonları işlevselliği
 */
function initAddToCartButtons() {
    // Sayfa yüklendikten sonra da çalışabilmek için event delegation kullanılıyor
    document.addEventListener('click', (event) => {
        const target = event.target;
        
        // Sepete ekle butonuna veya içindeki elemana tıklandıysa
        if (target.classList.contains('add-to-cart-btn') || 
            target.parentElement.classList.contains('add-to-cart-btn') || 
            target.parentElement.parentElement.classList.contains('add-to-cart-btn')) {
            
            const button = target.classList.contains('add-to-cart-btn') ? 
                target : 
                (target.parentElement.classList.contains('add-to-cart-btn') ? 
                    target.parentElement : 
                    target.parentElement.parentElement);
            
            // Ürün detay sayfasında mı yoksa listelemede mi kontrol et
            if (window.location.pathname.includes('product.html')) {
                addToCartFromDetail();
            } else {
                const productId = parseInt(button.getAttribute('data-product-id'));
                addToCartFromList(productId);
            }
        }
    });
}

/**
 * Ürün detay sayfasından sepete ekleme
 */
function addToCartFromDetail() {
    // URL'den ürün ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        // Miktar ve ağırlık bilgilerini al
        const quantityInput = document.getElementById('product-quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        
        // Seçili ağırlık seçeneğini bul
        const selectedWeightOption = document.querySelector('.weight-option.active');
        const weight = selectedWeightOption ? parseInt(selectedWeightOption.getAttribute('data-weight')) : 250;
        
        // Sepete ekle
        addToCart(productId, quantity, weight);
    }
}

/**
 * Ürün listesinden sepete ekleme
 * @param {number} productId - Ürün ID'si
 */
function addToCartFromList(productId) {
    // Varsayılan miktar ve ağırlık ile ekle
    addToCart(productId, 1, 250);
}

/**
 * Sepete ürün ekleme
 * @param {number} productId - Ürün ID'si
 * @param {number} quantity - Miktar
 * @param {number} weight - Ağırlık (gram)
 */
function addToCart(productId, quantity, weight) {
    // Ürünü bul
    const product = mockProducts.find(p => p.id === productId);
    
    if (product) {
        // Sepeti localStorage'dan al
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        
        // Ürünün seçilen ağırlık için fiyatını bul
        const weightOption = product.weight_options.find(opt => opt.weight === weight);
        const price = weightOption ? weightOption.price : product.price;
        
        // Sepette aynı ürün ve ağırlık kombinasyonu var mı kontrol et
        const existingItemIndex = cart.findIndex(item => item.id === productId && item.weight === weight);
        
        if (existingItemIndex !== -1) {
            // Ürün zaten sepette, miktarı güncelle
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Yeni ürün ekle
            cart.push({
                id: productId,
                name: product.name,
                price: price,
                old_price: weightOption ? weightOption.old_price : product.old_price,
                image: product.images[0],
                weight: weight,
                quantity: quantity,
                category: product.category,
                categoryName: product.categoryName,
                discount_percentage: product.discount_percentage
            });
        }
        
        // Sepeti güncelle
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Sepet sayacını güncelle
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        if (window.updateCartCount) {
            window.updateCartCount(cartCount);
        }
        
        // Bildirim göster
        showCartNotification(product);
    }
}

/**
 * Sepet bildirimini gösterme
 * @param {Object} product - Sepete eklenen ürün
 */
function showCartNotification(product) {
    const currentLang = localStorage.getItem('language') || 'tr';
    
    // Eğer bir önceki bildirim varsa kaldır
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        document.body.removeChild(existingNotification);
    }
    
    // Bildirim içeriği
    let notificationText = `${product.name[currentLang]} sepete eklendi.`;
    if (currentLang === 'en') {
        notificationText = `${product.name[currentLang]} added to cart.`;
    } else if (currentLang === 'ar') {
        notificationText = `تمت إضافة ${product.name[currentLang]} إلى سلة التسوق.`;
    }
    
    // Bildirim elementi oluştur
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
    <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <p>${notificationText}</p>
    </div>
    <div class="notification-actions">
        <a href="cart.html" class="btn-primary">${currentLang === 'en' ? 'View Cart' : (currentLang === 'ar' ? 'عرض السلة' : 'Sepeti Görüntüle')}</a>
    </div>
    `;
    
    // Bildirime kapat butonu ekle
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(notification);
    });
    
    notification.appendChild(closeButton);
    
    // Bildirimi sayfaya ekle
    document.body.appendChild(notification);
    
    // 5 saniye sonra bildirimi kaldır
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
}

// Dışa aktarılan fonksiyonlar ve değişkenler
window.loadFeaturedProducts = loadFeaturedProducts;
window.createProductCard = createProductCard;
window.generateRatingStars = generateRatingStars;
window.addToCart = addToCart;
window.updatePriceByWeight = updatePriceByWeight;
window.displayProductDetails = displayProductDetails;
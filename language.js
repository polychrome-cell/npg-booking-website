(() => {
  const picker = document.querySelector("#setting-language");
  if (!picker) return;
  const tags = { en: "en", id: "id", hi: "hi", bn: "bn", ja: "ja", es: "es" };
  const strings = {
    "Plan a journey": ["Rencanakan perjalanan", "यात्रा की योजना बनाएं", "ভ্রমণের পরিকল্পনা করুন", "旅程を計画", "Planifica un viaje"],
    "Our airlines": ["Maskapai kami", "हमारी एयरलाइंस", "আমাদের এয়ারলাইন", "当社の航空会社", "Nuestras aerolíneas"],
    "Discover Sora": ["Jelajahi Sora", "सोरा जानें", "সোরা আবিষ্কার করুন", "Soraを知る", "Descubre Sora"],
    "Tsuki: Journeys": ["Tsuki: Perjalanan", "त्सुकी: यात्राएँ", "Tsuki: ভ্রমণ", "Tsuki：旅", "Tsuki: Viajes"],
    "Routes": ["Rute", "मार्ग", "রুট", "路線", "Rutas"],
    "Fleet": ["Armada", "बेड़ा", "বিমানবহর", "機材", "Flota"],
    "Find a flight": ["Cari penerbangan", "उड़ान खोजें", "ফ্লাইট খুঁজুন", "フライトを検索", "Buscar vuelos"],
    "Find my flight": ["Cari penerbangan", "मेरी उड़ान खोजें", "আমার ফ্লাইট খুঁজুন", "フライトを検索", "Buscar mi vuelo"],
    "Explore journeys": ["Jelajahi perjalanan", "यात्राएँ देखें", "ভ্রমণ ঘুরে দেখুন", "旅を探す", "Explorar viajes"],
    "Open settings": ["Buka pengaturan", "सेटिंग खोलें", "সেটিংস খুলুন", "設定を開く", "Abrir ajustes"],
    "Close settings": ["Tutup pengaturan", "सेटिंग बंद करें", "সেটিংস বন্ধ করুন", "設定を閉じる", "Cerrar ajustes"],
    "A LITTLE PERSONAL COMFORT": ["KENYAMANAN PRIBADI", "आपकी पसंद की सुविधा", "আপনার পছন্দের আরাম", "自分らしい快適さ", "UN TOQUE PERSONAL"],
    "Make yourself at home.": ["Atur sesuai kenyamanan Anda.", "अपनी पसंद के अनुसार सेट करें।", "নিজের পছন্দমতো সাজান।", "お好みに合わせて設定しましょう。", "Personaliza tu experiencia."],
    "Your preferences stay in this browser.": ["Preferensi Anda tersimpan di browser ini.", "आपकी पसंद इसी ब्राउज़र में सहेजी जाएगी।", "আপনার পছন্দ এই ব্রাউজারেই সংরক্ষিত থাকবে।", "設定はこのブラウザーに保存されます。", "Tus preferencias se guardan en este navegador."],
    "Dark mode": ["Mode gelap", "डार्क मोड", "ডার্ক মোড", "ダークモード", "Modo oscuro"],
    "A softer, darker palette for every page.": ["Tampilan lebih lembut dan gelap di setiap halaman.", "हर पेज के लिए नरम और गहरा रंग रूप।", "প্রতিটি পাতায় কোমল, গাঢ় রঙের থিম।", "すべてのページを落ち着いた暗色にします。", "Un tema oscuro y suave para todas las páginas."],
    "Animations": ["Animasi", "एनिमेशन", "অ্যানিমেশন", "アニメーション", "Animaciones"],
    "Turn movement and transitions on or off.": ["Aktifkan atau nonaktifkan gerakan dan transisi.", "गतियों और बदलावों को चालू या बंद करें।", "মোশন ও ট্রানজিশন চালু বা বন্ধ করুন।", "動きや切り替えをオン・オフします。", "Activa o desactiva el movimiento y las transiciones."],
    "Language": ["Bahasa", "भाषा", "ভাষা", "言語", "Idioma"],
    "Choose the language used on this site.": ["Pilih bahasa untuk situs ini.", "इस साइट की भाषा चुनें।", "এই সাইটের ভাষা বেছে নিন।", "サイトで使う言語を選択します。", "Elige el idioma de este sitio."],
    "EXTREMELY IMPORTANT SETTING": ["PENGATURAN SANGAT PENTING", "अत्यंत महत्वपूर्ण सेटिंग", "অত্যন্ত গুরুত্বপূর্ণ সেটিং", "とても大切な設定", "AJUSTE EXTREMADAMENTE IMPORTANTE"],
    "Press for stress relief ✦": ["Tekan untuk meredakan stres ✦", "तनाव कम करने के लिए दबाएँ ✦", "মানসিক চাপ কমাতে চাপুন ✦", "ストレス解消はこちら ✦", "Pulsa para aliviar el estrés ✦"],
    "No practical effect. Vibes may improve.": ["Tidak ada efek praktis. Suasana hati mungkin membaik.", "कोई व्यावहारिक असर नहीं। मन थोड़ा बेहतर हो सकता है।", "বাস্তব কোনো প্রভাব নেই। মন ভালো হতে পারে।", "実用的な効果はありません。気分はよくなるかも。", "No tiene un efecto práctico. Quizá mejore tu ánimo."],
    "YOUR JOURNEY, IN GOOD COMPANY": ["PERJALANAN ANDA, DITEMANI DENGAN BAIK", "आपकी यात्रा, अच्छे साथ के साथ", "আপনার যাত্রায়, সুন্দর সঙ্গ", "旅を、心地よい仲間と", "TU VIAJE, EN BUENA COMPAÑÍA"],
    "A softer way": ["Cara yang lebih nyaman", "एक सहज तरीका", "আরও স্বচ্ছন্দ উপায়", "もっとやさしい旅を", "Una forma más tranquila"],
    "to see the": ["menjelajahi ", "देखने का", "দেখার", "世界を", "de ver el "],
    "world.": ["dunia.", "दुनिया।", "বিশ্ব।", "世界。", "mundo."],
    "Three distinct airlines. One considered journey. Discover a more personal way to travel across Japan, Asia and the Pacific.": ["Tiga maskapai dengan karakter berbeda. Satu perjalanan penuh perhatian. Nikmati cara bepergian yang lebih personal melintasi Jepang, Asia, dan Pasifik.", "तीन अलग-अलग एयरलाइंस। एक सोच-समझकर बनाई गई यात्रा। जापान, एशिया और प्रशांत में सफ़र का अधिक व्यक्तिगत अनुभव पाएँ।", "তিনটি স্বতন্ত্র এয়ারলাইন। যত্নে সাজানো এক যাত্রা। জাপান, এশিয়া ও প্রশান্ত মহাসাগর পেরিয়ে আরও ব্যক্তিগত ভ্রমণ উপভোগ করুন।", "個性の異なる3つの航空会社で、心を配ったひとつの旅を。日本、アジア、太平洋を自分らしく旅しませんか。", "Tres aerolíneas distintas. Un viaje pensado con cuidado. Descubre una forma más personal de viajar por Japón, Asia y el Pacífico."],
    "Plan your journey": ["Rencanakan perjalanan", "अपनी यात्रा की योजना बनाएं", "আপনার ভ্রমণের পরিকল্পনা করুন", "旅を計画する", "Planifica tu viaje"],
    "Meet the airlines": ["Kenali maskapai", "एयरलाइंस से मिलें", "এয়ারলাইনগুলোর সঙ্গে পরিচিত হন", "航空会社を見る", "Conoce las aerolíneas"],
    "Rooted in Japan. Connected to everywhere.": ["Berakar di Jepang. Terhubung ke seluruh dunia.", "जापान में जड़ें। दुनिया से जुड़ाव।", "জাপানে শিকড়, সারা বিশ্বের সঙ্গে সংযোগ।", "日本に根ざし、世界とつながる。", "Con raíces en Japón y conexiones en todo el mundo."],
    "THE PACIFIC, AT YOUR PACE": ["PASIFIK, DENGAN IRAMA ANDA", "प्रशांत महासागर, आपकी रफ़्तार से", "আপনার ছন্দে প্রশান্ত মহাসাগর", "あなたのペースで、太平洋へ", "EL PACÍFICO, A TU RITMO"],
    "A new perspective, every time.": ["Perspektif baru, setiap perjalanan.", "हर बार एक नया नज़रिया।", "প্রতিবার নতুন দৃষ্টিভঙ্গি।", "旅するたびに、新しい景色。", "Una nueva perspectiva en cada viaje."],
    "LET THE JOURNEY BEGIN": ["MARI MULAI PERJALANAN", "यात्रा शुरू करें", "যাত্রা শুরু হোক", "旅を始めましょう", "EMPIEZA EL VIAJE"],
    "Where to next?": ["Ke mana selanjutnya?", "अब कहाँ चलें?", "এরপর কোথায়?", "次はどこへ？", "¿A dónde vamos ahora?"],
    "Round trip": ["Pulang-pergi", "आना-जाना", "যাওয়া-আসা", "往復", "Ida y vuelta"],
    "One way": ["Sekali jalan", "एक तरफ़", "একমুখী", "片道", "Solo ida"],
    "FROM": ["DARI", "से", "থেকে", "出発地", "ORIGEN"], "TO": ["KE", "तक", "গন্তব্য", "目的地", "DESTINO"],
    "DEPART": ["BERANGKAT", "प्रस्थान", "যাত্রা", "出発", "SALIDA"], "RETURN": ["PULANG", "वापसी", "ফেরত", "帰り", "REGRESO"],
    "PASSENGERS": ["PENUMPANG", "यात्री", "যাত্রী", "搭乗者", "PASAJEROS"], "CABIN CLASS": ["KELAS KABIN", "केबिन श्रेणी", "কেবিন শ্রেণি", "客室クラス", "CLASE DE CABINA"],
    "Choose a departure date": ["Pilih tanggal keberangkatan", "प्रस्थान की तारीख चुनें", "যাত্রার তারিখ বেছে নিন", "出発日を選択", "Elige la fecha de salida"],
    "A little more time away": ["Luangkan sedikit waktu lagi", "थोड़ा और समय बाहर बिताएँ", "আরও কিছুটা সময় কাটান", "もう少し旅を楽しむ", "Un poco más de tiempo fuera"],
    "Choose who is traveling": ["Pilih siapa yang bepergian", "यात्रियों को चुनें", "কারা ভ্রমণ করবেন বেছে নিন", "搭乗者を選択", "Elige quién viaja"],
    "Adults": ["Dewasa", "वयस्क", "প্রাপ্তবয়স্ক", "大人", "Adultos"], "Children": ["Anak-anak", "बच्चे", "শিশু", "子ども", "Niños"], "Infants": ["Bayi", "शिशु", "কোলের শিশু", "幼児", "Bebés"],
    "Age 12 or over": ["Usia 12 tahun ke atas", "12 वर्ष या उससे अधिक", "১২ বছর বা তার বেশি", "12歳以上", "12 años o más"],
    "Age 1.5 to under 12": ["Usia 1,5 hingga di bawah 12 tahun", "1.5 से 12 वर्ष से कम", "১.৫ থেকে ১২ বছরের কম", "1.5歳以上12歳未満", "De 1,5 a menos de 12 años"],
    "Under 1.5 years old": ["Di bawah 1,5 tahun", "1.5 वर्ष से कम", "১.৫ বছরের কম", "1.5歳未満", "Menores de 1,5 años"],
    "Up to 8 passengers per booking": ["Maksimal 8 penumpang per pemesanan", "प्रति बुकिंग अधिकतम 8 यात्री", "প্রতি বুকিংয়ে সর্বোচ্চ ৮ জন", "1回の予約につき最大8名", "Hasta 8 pasajeros por reserva"],
    "Economy": ["Ekonomi", "इकोनॉमी", "ইকোনমি", "エコノミー", "Turista"], "Premium Economy": ["Premium Ekonomi", "प्रीमियम इकोनॉमी", "প্রিমিয়াম ইকোনমি", "プレミアムエコノミー", "Turista prémium"],
    "Class Silver · Business Class": ["Kelas Silver · Bisnis", "सिल्वर क्लास · बिज़नेस क्लास", "সিলভার ক্লাস · বিজনেস ক্লাস", "シルバークラス · ビジネスクラス", "Clase Silver · Business"],
    "Class Gold · First Class": ["Kelas Gold · First Class", "गोल्ड क्लास · फ़र्स्ट क्लास", "গোল্ড ক্লাস · ফার্স্ট ক্লাস", "ゴールドクラス · ファーストクラス", "Clase Gold · Primera"],
    "Choose your onboard experience": ["Pilih pengalaman selama penerbangan", "अपना उड़ान अनुभव चुनें", "আপনার অনবোর্ড অভিজ্ঞতা বেছে নিন", "機内での過ごし方を選択", "Elige tu experiencia a bordo"],
    "FLY WITH": ["TERBANG BERSAMA", "इनके साथ उड़ें", "যাদের সঙ্গে উড়বেন", "利用航空会社", "VUELA CON"],
    "All airlines": ["Semua maskapai", "सभी एयरलाइंस", "সব এয়ারলাইন", "すべての航空会社", "Todas las aerolíneas"],
    "Explore route maps": ["Jelajahi peta rute", "मार्ग मानचित्र देखें", "রুট মানচিত্র দেখুন", "路線図を探す", "Explora los mapas de rutas"],
    "Meet the fleet": ["Kenali armada", "बेड़े से मिलें", "বহরের সঙ্গে পরিচিত হন", "機材を見る", "Conoce la flota"],
    "Search city or airport code": ["Cari kota atau kode bandara", "शहर या हवाई अड्डे का कोड खोजें", "শহর বা বিমানবন্দরের কোড খুঁজুন", "都市名または空港コードを検索", "Buscar ciudad o código de aeropuerto"],
    "All departure airports": ["Semua bandara keberangkatan", "सभी प्रस्थान हवाई अड्डे", "সব প্রস্থান বিমানবন্দর", "すべての出発空港", "Todos los aeropuertos de salida"],
    "No routes match those filters.": ["Tidak ada rute yang cocok dengan filter tersebut.", "इन फ़िल्टर से कोई मार्ग मेल नहीं खाता।", "এই ফিল্টারগুলোর সঙ্গে কোনো রুট মেলে না।", "条件に一致する路線はありません。", "Ninguna ruta coincide con esos filtros."],
    "Choose an airline to see its aircraft and fleet counts.": ["Pilih maskapai untuk melihat pesawat dan jumlah armadanya.", "विमान और बेड़े की संख्या देखने के लिए एयरलाइन चुनें।", "বিমান ও বহরের সংখ্যা দেখতে একটি এয়ারলাইন বেছে নিন।", "航空会社を選ぶと機材と保有数を確認できます。", "Elige una aerolínea para ver sus aviones y el tamaño de su flota."],
    "Choose an airline to explore its network. Select a route or map marker to bring the two together.": ["Pilih maskapai untuk menjelajahi jaringannya. Pilih rute atau penanda peta untuk melihat keterkaitannya.", "नेटवर्क देखने के लिए एयरलाइन चुनें। दोनों को जोड़ने के लिए कोई मार्ग या नक्शे का चिह्न चुनें।", "নেটওয়ার্ক দেখতে একটি এয়ারলাইন বেছে নিন। রুট বা মানচিত্রের চিহ্নে চাপলে সংযোগ দেখা যাবে।", "航空会社を選んで路線網を確認できます。路線または地図上のマーカーを選ぶと連動します。", "Elige una aerolínea para explorar su red. Selecciona una ruta o un marcador para verlos relacionados."],
    "Schedules and seat availability are not live; reservations and payments are not processed here.": ["Jadwal dan ketersediaan kursi tidak diperbarui secara langsung; pemesanan dan pembayaran tidak diproses di sini.", "समय-सारणी और सीट उपलब्धता लाइव नहीं हैं; यहाँ आरक्षण या भुगतान नहीं होता।", "সময়সূচি ও আসনের প্রাপ্যতা লাইভ নয়; এখানে বুকিং বা পেমেন্ট করা হয় না।", "時刻表と座席状況はリアルタイムではありません。予約・決済は行えません。", "Los horarios y asientos no están actualizados en tiempo real; aquí no se procesan reservas ni pagos."],
    "Thoughtful journeys across Japan, the Pacific, and beyond.": ["Perjalanan penuh perhatian melintasi Jepang, Pasifik, dan sekitarnya.", "जापान, प्रशांत और उससे आगे तक सोच-समझकर बनाई गई यात्राएँ।", "জাপান, প্রশান্ত মহাসাগর ও তার বাইরেও যত্নে সাজানো ভ্রমণ।", "日本、太平洋、そしてその先へ。心を配った旅を。", "Viajes cuidados por Japón, el Pacífico y más allá."],
    "THE NPG NETWORK": ["JARINGAN NPG", "NPG नेटवर्क", "NPG নেটওয়ার্ক", "NPGのネットワーク", "LA RED NPG"],
    "One world.": ["Satu dunia.", "एक दुनिया।", "একটি পৃথিবী।", "ひとつの世界。", "Un mundo."],
    "Three ways to cross it.": ["Tiga cara untuk menjelajahinya.", "इसे पार करने के तीन तरीके।", "পাড়ি দেওয়ার তিনটি উপায়।", "3つの旅のかたち。", "Tres formas de recorrerlo."],
    "THE ROUTE BOOK": ["PANDUAN RUTE", "मार्ग सूची", "রুট তালিকা", "路線案内", "GUÍA DE RUTAS"],
    "From Kansai to the Pacific": ["Dari Kansai ke Pasifik", "कंसाई से प्रशांत तक", "কানসাই থেকে প্রশান্ত মহাসাগর", "関西から太平洋へ", "De Kansai al Pacífico"],
    "Route maps show the airline networks. Schedule frequencies are planning information and are not live.": ["Peta rute menunjukkan jaringan maskapai. Frekuensi jadwal adalah informasi perencanaan dan bukan data langsung.", "मार्ग मानचित्र एयरलाइन नेटवर्क दिखाते हैं। उड़ानों की आवृत्ति नियोजन जानकारी है, लाइव नहीं।", "রুট মানচিত্রে এয়ারলাইন নেটওয়ার্ক দেখানো হয়। ফ্লাইটের সংখ্যা পরিকল্পনামূলক, লাইভ নয়।", "路線図は航空会社のネットワークを示します。運航頻度は計画情報で、リアルタイムではありません。", "Los mapas muestran las redes. Las frecuencias son orientativas y no están actualizadas en tiempo real."],
    "THE AIRCRAFT": ["PESAWAT", "विमान", "বিমান", "航空機", "LOS AVIONES"],
    "Meet the fleet.": ["Kenali armada kami.", "हमारे बेड़े से मिलें।", "বহরের সঙ্গে পরিচিত হন।", "機材をご紹介します。", "Conoce nuestra flota."],
    "Made for the miles.": ["Dirancang untuk perjalanan jauh.", "लंबी दूरी के लिए तैयार।", "দীর্ঘ পথের জন্য তৈরি।", "長距離の旅のために。", "Hecha para recorrer distancias."],
    "A trip that feels": ["Perjalanan yang terasa", "ऐसी यात्रा जो लगे", "এমন ভ্রমণ যা মনে হয়", "自分らしく感じる旅", "Un viaje que se siente"],
    "like it was yours.": ["benar-benar milik Anda.", "सिर्फ़ आपकी अपनी।", "একান্তই আপনার।", "自分だけのもの。", "hecho para ti."],
    "Plan this journey": ["Rencanakan perjalanan ini", "इस यात्रा की योजना बनाएं", "এই ভ্রমণের পরিকল্পনা করুন", "この旅を計画する", "Planifica este viaje"],
    "Build your": ["Susun ", "बनाएं अपनी", "তৈরি করুন আপনার", "組み立てよう", "Diseña tu "],
    "journey.": ["perjalanan.", "यात्रा।", "ভ্রমণ।", "旅を。", "viaje."],
    "Choose Escape": ["Pilih Escape", "एस्केप चुनें", "Escape বেছে নিন", "Escapeを選択", "Elige Escape"],
    "Choose Signature": ["Pilih Signature", "सिग्नेचर चुनें", "Signature বেছে নিন", "Signatureを選択", "Elige Signature"],
    "Choose Grand Voyage": ["Pilih Grand Voyage", "ग्रैंड वॉयेज चुनें", "Grand Voyage বেছে নিন", "Grand Voyageを選択", "Elige Grand Voyage"],
    "Choose Elite Resort": ["Pilih Elite Resort", "एलीट रिज़ॉर्ट चुनें", "Elite Resort বেছে নিন", "Elite Resortを選択", "Elige Elite Resort"],
    "Choose your": ["Pilih ", "चुनें अपनी", "বেছে নিন আপনার", "選択", "Elige tu "],
    "chapter.": ["babak.", "अध्याय।", "অধ্যায়।", "章を。", "capítulo."],
    "Choose a subscription, earn status through flying, or buy Gold and Platinum with Sora Points. Sora Infinite is by invitation.": ["Pilih langganan, raih status dengan terbang, atau tukarkan Sora Points untuk Gold dan Platinum. Sora Infinite hanya melalui undangan.", "सब्सक्रिप्शन चुनें, उड़ान से स्टेटस कमाएँ, या सोरा पॉइंट्स से गोल्ड और प्लैटिनम लें। सोरा इनफिनिट केवल आमंत्रण से मिलता है।", "সাবস্ক্রিপশন নিন, উড়ে স্ট্যাটাস অর্জন করুন, অথবা Sora Points দিয়ে Gold ও Platinum নিন। Sora Infinite কেবল আমন্ত্রণে।", "サブスクリプション、搭乗によるステータス獲得、またはSora PointsでのGold・Platinum交換を選べます。Sora Infiniteは招待制です。", "Elige una suscripción, gana estatus al volar o canjea Sora Points por Gold y Platinum. Sora Infinite es solo por invitación."],
    "Find your place": ["Temukan tempat Anda", "अपनी जगह खोजें", "নিজের জায়গা খুঁজে নিন", "自分の居場所を見つけよう", "Encuentra tu lugar"],
    "in the sky.": ["di langit.", "आसमान में।", "আকাশে।", "空の中に。", "en el cielo."],
    "Create account": ["Buat akun", "खाता बनाएं", "অ্যাকাউন্ট তৈরি করুন", "アカウントを作成", "Crear cuenta"],
    "Sign in": ["Masuk", "साइन इन", "সাইন ইন", "ログイン", "Iniciar sesión"],
    "Your Sora account.": ["Akun Sora Anda.", "आपका सोरा खाता।", "আপনার Sora অ্যাকাউন্ট।", "Soraアカウント", "Tu cuenta Sora."],
    "Confirm your choice.": ["Konfirmasi pilihan Anda.", "अपनी पसंद की पुष्टि करें।", "আপনার পছন্দ নিশ্চিত করুন।", "選択を確認してください。", "Confirma tu elección."],
    "Confirm": ["Konfirmasi", "पुष्टि करें", "নিশ্চিত করুন", "確認", "Confirmar"],
    "Our routes from Kansai": ["Rute kami dari Kansai", "कंसाई से हमारे मार्ग", "কানসাই থেকে আমাদের রুট", "関西発の路線", "Nuestras rutas desde Kansai"],
    "Tsuki’s routes across the world": ["Rute Tsuki di seluruh dunia", "दुनिया भर में त्सुकी के मार्ग", "বিশ্বজুড়ে Tsuki-র রুট", "世界を結ぶTsukiの路線", "Rutas de Tsuki por el mundo"],
    "Tsuki Orbit routes across the world": ["Rute Tsuki Orbit di seluruh dunia", "दुनिया भर में त्सुकी ऑर्बिट के मार्ग", "বিশ্বজুড়ে Tsuki Orbit-এর রুট", "世界を結ぶTsuki Orbitの路線", "Rutas de Tsuki Orbit por el mundo"],
    "Tsuki Airways destinations": ["Destinasi Tsuki Airways", "त्सुकी एयरवेज़ के गंतव्य", "Tsuki Airways-এর গন্তব্য", "Tsuki Airwaysの就航地", "Destinos de Tsuki Airways"],
    "Tsuki Orbit destinations": ["Destinasi Tsuki Orbit", "त्सुकी ऑर्बिट के गंतव्य", "Tsuki Orbit-এর গন্তব্য", "Tsuki Orbitの就航地", "Destinos de Tsuki Orbit"],
    "Long-range aircraft connecting Japan with the Pacific and beyond.": ["Pesawat jarak jauh yang menghubungkan Jepang, Pasifik, dan wilayah lainnya.", "जापान को प्रशांत और उससे आगे जोड़ने वाले लंबी दूरी के विमान।", "জাপান, প্রশান্ত মহাসাগর ও তার বাইরের সঙ্গে সংযোগকারী দীর্ঘপাল্লার বিমান।", "日本と太平洋、その先を結ぶ長距離機材。", "Aviones de largo alcance que conectan Japón con el Pacífico y más allá."],
    "A long-haul fleet built around the Dreamliner and Boeing 777 family.": ["Armada jarak jauh yang berpusat pada Dreamliner dan keluarga Boeing 777.", "ड्रीमलाइनर और बोइंग 777 परिवार पर आधारित लंबी दूरी का बेड़ा।", "Dreamliner ও Boeing 777 পরিবারের দীর্ঘপাল্লার বহর।", "DreamlinerとBoeing 777を中心とした長距離機材。", "Una flota de largo alcance basada en el Dreamliner y la familia Boeing 777."],
    "A short and medium-haul fleet centered on the Airbus A321 family, with five ATR 72-600 turboprops.": ["Armada jarak pendek dan menengah yang berpusat pada Airbus A321, dengan lima ATR 72-600 turboprop.", "एयरबस A321 परिवार पर आधारित छोटी और मध्यम दूरी का बेड़ा, जिसमें पाँच ATR 72-600 टर्बोप्रॉप हैं।", "Airbus A321-কে কেন্দ্র করে স্বল্প ও মাঝারি দূরত্বের বহর, সঙ্গে পাঁচটি ATR 72-600 টার্বোপ্রপ।", "Airbus A321を中心に、ATR 72-600ターボプロップ5機を含む短・中距離機材。", "Una flota de corto y medio alcance centrada en Airbus A321, con cinco ATR 72-600 turbohélices."],
    "Choose two different airports to find flights.": ["Pilih dua bandara yang berbeda untuk mencari penerbangan.", "उड़ान खोजने के लिए दो अलग-अलग हवाई अड्डे चुनें।", "ফ্লাইট খুঁজতে দুটি আলাদা বিমানবন্দর বেছে নিন।", "フライト検索には異なる2つの空港を選んでください。", "Elige dos aeropuertos distintos para buscar vuelos."],
    "Your return date should be after your departure date.": ["Tanggal pulang harus setelah tanggal keberangkatan.", "वापसी की तारीख प्रस्थान की तारीख के बाद होनी चाहिए।", "ফেরার তারিখ যাত্রার তারিখের পরে হতে হবে।", "帰着日は出発日より後の日付にしてください。", "La fecha de regreso debe ser posterior a la salida."],
    "FIVE WAYS TO BELONG": ["LIMA CARA UNTUK MENJADI BAGIAN", "जुड़ने के पाँच तरीके", "অন্তর্ভুক্ত হওয়ার পাঁচটি উপায়", "5つのメンバーシップ", "CINCO FORMAS DE PERTENECER"],
    "The more you fly,": ["Semakin sering Anda terbang,", "जितना अधिक आप उड़ेंगे,", "আপনি যত বেশি উড়বেন,", "飛ぶほどに、", "Cuanto más vuelas,"],
    "the further you belong.": ["semakin luas rasa memiliki Anda.", "आपका जुड़ाव उतना गहरा होगा।", "আপনার অন্তর্ভুক্তি তত বাড়বে।", "つながりが深まります。", "más formas tienes de pertenecer."],
    "TWO IDEAS · ONE PROGRAMME": ["DUA GAGASAN · SATU PROGRAM", "दो विचार · एक कार्यक्रम", "দুটি ধারণা · একটি প্রোগ্রাম", "2つの考え方 · 1つのプログラム", "DOS IDEAS · UN PROGRAMA"],
    "Points are what you use.": ["Poin untuk digunakan.", "पॉइंट्स उपयोग के लिए हैं।", "পয়েন্ট খরচ করার জন্য।", "ポイントは使うもの。", "Los puntos son para usar."],
    "Status is yours to earn or redeem.": ["Status dapat diraih atau ditukar dengan poin.", "स्टेटस कमाएँ या पॉइंट्स से लें।", "স্ট্যাটাস অর্জন করুন বা পয়েন্ট দিয়ে নিন।", "ステータスは獲得または交換できます。", "El estatus se gana o se canjea."],
    "YOUR SORA POINTS": ["POIN SORA ANDA", "आपके सोरा पॉइंट्स", "আপনার Sora Points", "あなたのSora Points", "TUS SORA POINTS"],
    "A little further, with every flight.": ["Melangkah lebih jauh, di setiap penerbangan.", "हर उड़ान के साथ थोड़ा और आगे।", "প্রতিটি ফ্লাইটে আরও একটু এগিয়ে।", "飛ぶたびに、もう少し遠くへ。", "Un poco más lejos con cada vuelo."],
    "Eligible bookings add points to your balance.": ["Pemesanan yang memenuhi syarat menambah poin ke saldo Anda.", "योग्य बुकिंग से आपके बैलेंस में पॉइंट्स जुड़ते हैं।", "যোগ্য বুকিংয়ে আপনার ব্যালেন্সে পয়েন্ট যোগ হয়।", "対象の予約でポイントが残高に加算されます。", "Las reservas elegibles suman puntos a tu saldo."],
    "YOUR MEMBERSHIP TIER": ["TINGKAT KEANGGOTAAN ANDA", "आपका सदस्यता स्तर", "আপনার সদস্যতার স্তর", "あなたの会員ステータス", "TU NIVEL DE MEMBRESÍA"],
    "THE REWARD CURRENCY": ["MATA UANG HADIAH", "रिवॉर्ड पॉइंट्स", "পুরস্কারের পয়েন্ট", "特典ポイント", "LA MONEDA DE RECOMPENSA"],
    "Airlines": ["Maskapai", "एयरलाइंस", "এয়ারলাইন", "航空会社", "Aerolíneas"],
    "Back to top ↑": ["Kembali ke atas ↑", "ऊपर जाएँ ↑", "উপরে ফিরে যান ↑", "ページ上部へ ↑", "Volver arriba ↑"],
    "Back to top": ["Kembali ke atas", "ऊपर जाएँ", "উপরে ফিরে যান", "ページ上部へ", "Volver arriba"],
  };

  const languageOrder = ["id", "hi", "bn", "ja", "es"];
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const translatableAttributes = ["aria-label", "title", "placeholder"];

  function language() {
    try {
      const saved = localStorage.getItem("npg-language");
      return Object.hasOwn(tags, saved) ? saved : "en";
    } catch { return "en"; }
  }
  function translate(value, selectedLanguage) {
    const choices = strings[value.trim()];
    if (!choices || selectedLanguage === "en") return value;
    const index = languageOrder.indexOf(selectedLanguage);
    if (index < 0) return value;
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    return leading + choices[index] + trailing;
  }
  function translateTree(container, selectedLanguage) {
    if (!container) return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        return !parent || parent.closest("script,style,textarea,[data-no-translate]") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      node.nodeValue = translate(originalText.get(node), selectedLanguage);
    });
    container.querySelectorAll?.("[aria-label],[title],[placeholder]").forEach((element) => {
      let originals = originalAttributes.get(element);
      if (!originals) { originals = new Map(); originalAttributes.set(element, originals); }
      translatableAttributes.forEach((name) => {
        if (!element.hasAttribute(name)) return;
        if (!originals.has(name)) originals.set(name, element.getAttribute(name));
        element.setAttribute(name, translate(originals.get(name), selectedLanguage));
      });
    });
  }
  function setLanguage(selectedLanguage) {
    if (!Object.hasOwn(tags, selectedLanguage)) selectedLanguage = "en";
    document.documentElement.lang = tags[selectedLanguage];
    picker.value = selectedLanguage;
    try {
      if (selectedLanguage === "en") localStorage.removeItem("npg-language");
      else localStorage.setItem("npg-language", selectedLanguage);
    } catch { /* Keep the current page translated when storage is unavailable. */ }
    translateTree(document.body, selectedLanguage);
  }

  picker.addEventListener("change", () => setLanguage(picker.value));
  setLanguage(language());
  new MutationObserver((records) => {
    const selectedLanguage = language();
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!originalText.has(node)) originalText.set(node, node.nodeValue);
        node.nodeValue = translate(originalText.get(node), selectedLanguage);
      } else if (node.nodeType === Node.ELEMENT_NODE) translateTree(node, selectedLanguage);
    }));
  }).observe(document.body, { childList: true, subtree: true });
})();
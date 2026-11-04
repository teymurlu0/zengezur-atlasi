export type MonumentId = "khudafarin" | "mammadbayli" | "lalezar";

export type Monument = {
  id: MonumentId;
  title: string;
  location: string;
  period: string;
  type: string;
  dimensions: string;
  summary: string;
  description: string[];
  details: string[];
  modelPath: string;
  photo: string;
  photoPage: string;
  photoCredit: string;
  license: string;
  sources: { label: string; url: string }[];
};

const commonsImage = (filename: string, width = 1100) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=${width}`;

export const monuments: Monument[] = [
  {
    id: "khudafarin",
    title: "Xudafərin körpüsü",
    location: "Cəbrayıl rayonu · Araz çayı",
    period: "XI–XII əsrlər",
    type: "15 aşırımlı tarixi körpü",
    dimensions: "Təqribən 200 m uzunluq · 4,5 m en",
    summary: "Araz üzərində əsrlər boyu ticarət və gediş-gəlişə xidmət etmiş daş və bişmiş kərpic körpü.",
    description: [
      "Xudafərin ərazisində Araz çayı üzərində iki tarixi körpü yerləşir: 11 və 15 aşırımlı körpülər. Onlar təxminən 750 metr məsafədədir. Bu səhnədə daha böyük olan 15 aşırımlı körpünün memarlıq xüsusiyyətləri göstərilir.",
      "UNESCO-nun ilkin siyahısındakı təsvirə görə, 15 aşırımlı körpünün bugünkü memarlıq formasının əsas xüsusiyyətləri XI–XII əsrlərlə əlaqələndirilir. Körpünün dayaqları çayın içindəki təbii qayalar üzərində qurulub. Aşırımların ölçüləri eyni deyil; konstruksiyada çay daşı və bişmiş kərpicdən istifadə olunub.",
      "Abidə 2021-ci ildə UNESCO-nun Ümumdünya İrsi üçün ilkin siyahısına təqdim edilib. Bu, onun artıq Ümumdünya İrsi Siyahısında olduğu mənasına gəlmir.",
    ],
    details: ["15 tağ", "Çay daşı və bişmiş kərpic", "UNESCO ilkin siyahısı · 2021"],
    modelPath: "/models/khudafarin_15_arches.glb",
    photo: commonsImage("Xudafərin (Khudaferin) bridge.jpg"),
    photoPage: "https://commons.wikimedia.org/wiki/File:Xudaf%C9%99rin_(Khudaferin)_bridge.jpg",
    photoCredit: "Azərbaycan Respublikası Prezidentinin Mətbuat Xidməti",
    license: "CC BY 4.0",
    sources: [{ label: "UNESCO — Xudafərin körpüləri", url: "https://whc.unesco.org/en/tentativelists/6621" }],
  },
  {
    id: "mammadbayli",
    title: "Məmmədbəyli türbəsi",
    location: "Zəngilan rayonu · Məmmədbəyli",
    period: "1305-ci il",
    type: "Səkkizguşəli türbə",
    dimensions: "Səkkizbucaqlı gövdə · piramidal örtük",
    summary: "XIV əsrin əvvəlinə aid səkkizbucaqlı daş türbə; giriş kitabəsi tikinti tarixini qoruyur.",
    description: [
      "Məmmədbəyli türbəsi Zəngilan rayonunun Məmmədbəyli kəndində yerləşən orta əsr memarlıq abidəsidir. Səkkizbucaqlı gövdəsi və piramida formasında örtüyü ilə seçilir.",
      "Giriş üzərindəki ərəbdilli kitabə türbənin hicri 704-cü ildə — miladi 1305-ci ildə — Yəhya ibn Məhəmməd əl-Hac üçün tikildiyini bildirir. Kitabədə memar-bənna Əli Məcdəddinin adı qeyd olunur.",
      "Türbənin yeraltı sərdabəsi və yuxarı kamerası var. Modeldə daş üzlük, səkkizbucaqlı plan və dam forması göstərilib; kitabənin mətni və daxili məkan dəqiq surətdə təkrarlanmır.",
    ],
    details: ["Səkkizbucaqlı plan", "Əli Məcdəddin", "Kitabə · 1305"],
    modelPath: "/models/mammadbayli.glb",
    photo: commonsImage("View of the Mammadbayli mausoleum.jpg"),
    photoPage: "https://commons.wikimedia.org/wiki/File:View_of_the_Mammadbayli_mausoleum.jpg",
    photoCredit: "Golden",
    license: "CC BY-SA 4.0",
    sources: [
      { label: "Azərbaycan qəzeti — Məmmədbəyli türbəsi", url: "https://www.azerbaijan-news.az/az/posts/detail/memmedbeyli-turbesi-210449/225456" },
      { label: "Azərbaycan Milli Kitabxanası — memarlıq qeydi", url: "https://www.anl.az/down/meqale/525/2021/may/743813.htm" },
    ],
  },
  {
    id: "lalezar",
    title: "Laləzar körpüsü",
    location: "Qubadlı rayonu · Əliquluuşağı",
    period: "1867-ci il",
    type: "İki tağlı daş körpü",
    dimensions: "Daş hörgü · iki tağlı keçid",
    summary: "Bərgüşad çayı üzərində XIX əsrdə tikilmiş, iki tağı ilə seçilən daş körpü.",
    description: [
      "Laləzar körpüsü Qubadlı rayonunun Əliquluuşağı kəndi yaxınlığında, Bərgüşad çayı üzərində yerləşir. Tarixi mənbələrdə onun inşa tarixi 1867-ci il kimi göstərilir.",
      "Körpü iki tağlı daş konstruksiyaya malikdir. Buradakı 3D modeldə həmin əsas quruluş canlandırılır. Tarixi ölçülərlə bağlı mənbələr arasında fərqlər olduğu üçün təqdimat tam ölçülü mühəndislik rekonstruksiyası deyil.",
      "Laləzarın tikinti və bərpası ilə bağlı kitabələrin şərhinə dair mənbələrdə fərqli məlumatlar mövcuddur. Bu səhifə memarlıq baxımından təsdiqlənən cəhətlərə fokuslanır.",
    ],
    details: ["İki tağ", "Daş hörgü", "XIX əsr"],
    modelPath: "/models/lalezar_2_arches.glb",
    photo: commonsImage("Lalazar Bridge.jpg", 950),
    photoPage: "https://commons.wikimedia.org/wiki/File:Lalazar_Bridge.jpg",
    photoCredit: "Tzir-Katin",
    license: "CC BY-SA 4.0",
    sources: [
      { label: "AZƏRTAC — Laləzar körpüsü", url: "https://portal.azertag.az/az/node/28743" },
      { label: "Monument Watch — alternativ tarixi məlumat", url: "https://monumentwatch.org/en/monument/the-lalazar-bridge/" },
    ],
  },
];

export const historyChapters = [
  {
    label: "Xİ–XII əsrlər · memarlıq",
    title: "Arazın üzərində daş keçidlər",
    body: "Xudafərin körpüləri uzun əsrlər ərzində Araz üzərində ticarət və gediş-gəliş üçün mühüm keçid kimi istifadə edilib. Bu gün görünən 15 aşırımlı körpünün tarixi müxtəlif mərhələlərdən ibarətdir. Tağların müxtəlif ölçüsü və qayalara oturdulmuş dayaqlar konstruksiyanın çay şəraitinə uyğunlaşdırıldığını göstərir.",
    source: "https://whc.unesco.org/en/tentativelists/6621",
  },
  {
    label: "1305 · memarlıq kitabəsi",
    title: "Məmmədbəyli türbəsinin yazılı izi",
    body: "Məmmədbəyli türbəsinin giriş kitabəsi abidə barədə ən qiymətli ilkin məlumat mənbələrindəndir. Yazı türbənin h. 704 / m. 1305-ci ildə inşasını və memar Əli Məcdəddinin adını qeyd edir. Səkkizbucaqlı plan orta əsr türbə memarlığının bölgədəki nümunəsidir.",
    source: "https://www.azerbaijan-news.az/az/posts/detail/memmedbeyli-turbesi-210449/225456",
  },
  {
    label: "XIX əsr · nəqliyyat irsi",
    title: "Bərgüşad vadisində Laləzar",
    body: "Qubadlı rayonunun Əliquluuşağı kəndi yaxınlığındakı Laləzar körpüsü iki aşırımlı daş konstruksiya kimi tanınır. İnşa tarixi çox vaxt 1867-ci ilə aid edilir. Bəzi mənbələr ölçü və kitabələrin izahını fərqli verdiyinə görə 3D model təxmini memarlıq vizualizasiyasıdır.",
    source: "https://monumentwatch.org/en/monument/the-lalazar-bridge/",
  },
  {
    label: "1903 · tarixi coğrafiya",
    title: "Zəngəzur qəzasının köhnə xəritələri",
    body: "XX əsrin əvvəlində Zəngəzur Yelizavetpol quberniyasının inzibati qəzalarından biri kimi xəritələrdə göstərilirdi. Qəza anlayışı bugünkü Şərqi Zəngəzur iqtisadi rayonundan fərqlidir. Tarixi xəritələr dövrün inzibati bölgüsünü anlamağa kömək edir, müasir sərhədləri əvəz etmir.",
    source: "https://commons.wikimedia.org/wiki/File:Uyezd_of_Zangezur.JPG",
  },
];

export const timeline = [
  {
    date: "1992–1993",
    title: "Müharibə və məcburi köçkünlük",
    text: "Birinci Qarabağ müharibəsi dövründə bugünkü Şərqi Zəngəzur rayonları Ermənistan qüvvələrinin nəzarətinə keçdi. Bölgənin mülki əhalisinin böyük hissəsi yaşayış yerlərini tərk etdi.",
    source: "https://www.migration.gov.az/en/page_detail/881",
  },
  {
    date: "04.10.2020",
    title: "Cəbrayıl",
    text: "İkinci Qarabağ müharibəsi zamanı Cəbrayıl şəhəri Azərbaycan Silahlı Qüvvələrinin nəzarətinə keçdi.",
    source: "https://www.migration.gov.az/en/page_detail/881",
  },
  {
    date: "20.10.2020",
    title: "Zəngilan",
    text: "Zəngilan şəhərinin Azərbaycan Silahlı Qüvvələrinin nəzarətinə keçməsi elan edildi.",
    source: "https://www.migration.gov.az/en/page_detail/881",
  },
  {
    date: "25.10.2020",
    title: "Qubadlı",
    text: "Qubadlı şəhərinin Azərbaycan Silahlı Qüvvələrinin nəzarətinə keçməsi elan edildi.",
    source: "https://www.migration.gov.az/en/page_detail/881",
  },
  {
    date: "25.11–01.12.2020",
    title: "Kəlbəcər və Laçın",
    text: "10 noyabr bəyanatından sonra Kəlbəcər 25 noyabrda, Laçın rayonunun əsas hissəsi isə 1 dekabrda Azərbaycana qaytarıldı. O dövrdə Laçın dəhlizi ayrıca rejimdə idi.",
    source: "https://www.primeminister.am/en/press-release/item/2020/11/10/Announcement",
  },
  {
    date: "07.07.2021",
    title: "Şərqi Zəngəzur iqtisadi rayonu",
    text: "Cəbrayıl, Kəlbəcər, Qubadlı, Laçın və Zəngilan rayonlarının daxil olduğu Şərqi Zəngəzur iqtisadi rayonu yaradıldı.",
    source: "https://president.az/ru/articles/view/52389",
  },
  {
    date: "19–25.07.2022",
    title: "Ağalıya ilk qayıdış",
    text: "Zəngilanın Ağalı kəndinə keçmiş məcburi köçkünlərin ilk mərhələli qayıdışı başlandı. Sonrakı illərdə yaşayış və infrastruktur bərpası davam etdi.",
    source: "https://president.az/en/greatreturn",
  },
  {
    date: "08.08.2025",
    title: "Vaşinqton bəyannaməsi",
    text: "Azərbaycan və Ermənistan liderləri nəqliyyat əlaqələrinin açılması barədə birgə bəyannamə imzaladı; Ermənistan ərazisində TRIPP təşəbbüsü qeyd olundu.",
    source: "https://president.az/en/articles/view/69572/print",
  },
  {
    date: "28.10.2025",
    title: "Ağalı və Məmmədbəyli yaşayış layihələri",
    text: "Zəngilanda Ağalının ikinci mərhələsinə baxış keçirildi və Məmmədbəyli kəndinin açılışı barədə rəsmi məlumat yayımlandı.",
    source: "https://president.az/en/articles/view/70444",
  },
  {
    date: "11.08.2026",
    title: "Dəmir yolu infrastrukturunun vəziyyəti",
    text: "Rəsmi məlumatda Horadiz–Yuxarı Mərcanlı–Soltanlı hissəsində müvəqqəti istismardan və digər tikinti mərhələlərindən bəhs olunur. Bu məlumat bütün xəttin tamamlandığını göstərmir.",
    source: "https://president.az/en/articles/view/73251/print",
  },
];

export const districts = [
  { name: "Zəngilan", note: "Məmmədbəyli türbəsi · Ağalı kəndi" },
  { name: "Qubadlı", note: "Laləzar körpüsü · Bərgüşad vadisi" },
  { name: "Cəbrayıl", note: "Xudafərin körpüləri · Araz çayı" },
  { name: "Laçın", note: "Dağlıq landşaft · Zabuxçay" },
  { name: "Kəlbəcər", note: "Yüksək dağlar · təbii irs" },
];

export const editorialSources = [
  { name: "UNESCO — Xudafərin körpüləri (ilkin siyahı)", url: "https://whc.unesco.org/en/tentativelists/6621" },
  { name: "Azərbaycan qəzeti — Məmmədbəyli türbəsi", url: "https://www.azerbaijan-news.az/az/posts/detail/memmedbeyli-turbesi-210449/225456" },
  { name: "AZƏRTAC — Laləzar körpüsü", url: "https://portal.azertag.az/az/node/28743" },
  { name: "Monument Watch — Laləzar haqqında digər baxış", url: "https://monumentwatch.org/en/monument/the-lalazar-bridge/" },
  { name: "10 noyabr 2020-ci il bəyanatı", url: "https://www.primeminister.am/en/press-release/item/2020/11/10/Announcement" },
  { name: "Şərqi Zəngəzur iqtisadi rayonu — 2021", url: "https://president.az/ru/articles/view/52389" },
  { name: "Böyük Qayıdış — Ağalı", url: "https://president.az/en/greatreturn" },
  { name: "1903-cü il Zəngəzur qəzası xəritəsi — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Uyezd_of_Zangezur.JPG" },
  { name: "2025-ci il Vaşinqton bəyannaməsi — rəsmi sənəd", url: "https://mfa.gov.az/files/Birge%20Beyanname-ABS/JD_AZE_ARM_final_witness%20signature.pdf" },
  { name: "2026-cı il Horadiz–Ağbənd dəmir yolu məlumatı", url: "https://president.az/en/articles/view/73251/print" },
  { name: "2025-ci il Ağalı və Məmmədbəyli məlumatı", url: "https://president.az/en/articles/view/70444" },
];

// ZƏNGƏZURİUM — tam lokal məlumat bazası.
// Server, API route, API açarı və xarici AI xidməti tələb etmir.
// Bu fayl brauzerdə AtlasAssistant komponentindən çağırılır.

export type Source = {
  label: string;
  url: string;
};

type Knowledge = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  sources: Source[];
  related: string[];
};

export type ChatMessage = {
  role?: string;
  content?: string;
};
const knowledge: Knowledge[] = [
  {
    id: "zengezur",
    title: "Zəngəzurun tarixi",
    keywords: [
      "zengezur",
      "zangezur",
      "zəngəzur",
      "tarix",
      "bolge",
      "region",
      "umumi melumat",
      "haqqinda",
    ],
    answer: `Zəngəzur Cənubi Qafqazın mürəkkəb tarixi və zəngin mədəni irsi olan bölgələrindən biridir.

Tarixi Zəngəzur adı müxtəlif dövrlərdə fərqli inzibati və coğrafi mənalarda işlədilib. XIX əsrdə Rusiya imperiyasının inzibati sistemində Zəngəzur qəzası mövcud idi və Yelizavetpol quberniyasına daxil idi.

Bölgə dağlıq relyefi, çay vadiləri, qədim yaşayış məskənləri, körpüləri, türbələri və ticarət yolları ilə tanınır.

Tarixi sənədlərdə işlənən Zəngəzur coğrafiyası ilə müasir dövlət sərhədlərini eyniləşdirmək düzgün deyil. Bu səbəbdən tarixi xəritələr öz dövrünün inzibati bölgüsü əsasında izah edilməlidir.

Zəngəzurun tarixi irsini öyrənərkən arxeoloji materiallar, memarlıq abidələri, kitabələr, arxiv xəritələri və müxtəlif dövrlərə aid yazılı mənbələr xüsusi əhəmiyyət daşıyır.`,
    sources: [
      {
        label: "Encyclopaedia Britannica — Transcaucasia",
        url: "https://www.britannica.com/place/Transcaucasia",
      },
    ],
    related: ["xudafarin", "1903", "abideler"],
  },
  {
    id: "xudafarin",
    title: "Xudafərin körpüləri",
    keywords: [
      "xudafərin",
      "xudaferin",
      "khudafarin",
      "korpusu",
      "körpü",
      "15 tag",
      "on bes tag",
      "11 tag",
      "on bir tag",
      "aras",
      "araz",
    ],
    answer: `Xudafərin körpüləri Araz çayı üzərində yerləşən və orta əsr memarlıq irsinin mühüm nümunələri hesab edilən tarixi körpülərdir.

Ərazidə iki məşhur tarixi körpü mövcuddur: 15 tağlı və 11 tağlı Xudafərin körpüləri. Onlar müxtəlif dövrlərin tikinti və bərpa ənənələrini əks etdirir.

15 tağlı körpü müxtəlif ölçülü tağları və çayın təbii qayalıqlarından istifadə edən konstruksiyası ilə seçilir. Körpünün tikinti tarixinin ayrı-ayrı mərhələləri haqqında mənbələrdə fərqli fikirlər mövcuddur.

Bu körpülər yalnız nəqliyyat qurğusu deyildi. Onlar Araz boyunca hərəkət edən insanların, ticarət karvanlarının və bölgələrarası əlaqələrin tarixini əks etdirir.

Memarlıq baxımından daş və bişmiş kərpicdən istifadə, tağların qeyri-bərabər ölçüləri və çay yatağına uyğunlaşdırılmış dayaqlar diqqətəlayiqdir.

Xudafərin körpüləri Cənubi Qafqazın tarixi yollarını və orta əsr mühəndislik təcrübəsini öyrənmək üçün mühüm abidələrdir.`,
    sources: [
      {
        label: "UNESCO — World Heritage Centre",
        url: "https://whc.unesco.org/",
      },
    ],
    related: ["lalezar", "zengezur", "memarliq"],
  },
  {
    id: "mammadbayli",
    title: "Məmmədbəyli türbəsi",
    keywords: [
      "memmedbeyli",
      "məmmədbəyli",
      "mammadbayli",
      "türbə",
      "turbe",
      "1305",
      "qebir",
      "kitabe",
      "kitabə",
      "sekizbucaqli",
    ],
    answer: `Məmmədbəyli türbəsi Zəngilan rayonu ərazisində yerləşən orta əsr memarlıq abidəsidir.

Türbə XIV əsrin əvvəllərinə aid edilir. Abidənin kitabəsi 1305-ci il tarixi ilə əlaqələndirilir.

Tikili səkkizbucaqlı plan quruluşuna malikdir. Bu cür plan orta əsr Azərbaycan türbə memarlığında geniş yayılmış memarlıq ənənələrindən biridir.

Türbənin xarici görünüşündə həndəsi quruluş, daş hörgü və nisbətlərin tarazlığı mühüm rol oynayır.

Abidənin kitabəsi onun tarixinin öyrənilməsi üçün xüsusilə əhəmiyyətlidir. Kitabələr orta əsr tikililərinin tarixi, sifarişçiləri və bəzən memarları haqqında birbaşa məlumat verən ilkin mənbələrdir.

Məmmədbəyli türbəsi Zəngilanın orta əsr mədəni həyatını və bölgənin memarlıq əlaqələrini araşdırmaq baxımından qiymətli irs nümunəsidir.`,
    sources: [
      {
        label: "Azərbaycan Milli Kitabxanası",
        url: "https://www.anl.az/",
      },
    ],
    related: ["memarliq", "zengezur", "abideler"],
  },
  {
    id: "lalezar",
    title: "Laləzar körpüsü",
    keywords: [
      "lalezar",
      "laləzar",
      "lalazar",
      "iki tagli",
      "2 tag",
      "qacaran",
      "körpü",
    ],
    answer: `Laləzar körpüsü bölgənin tarixi körpü memarlığı ilə bağlı tanınan abidələrindən biridir.

Körpü iki tağlı quruluşu ilə seçilir. Daş körpülərin tikintisində çayın eni, axının gücü, sahillərin geoloji quruluşu və yolun istiqaməti nəzərə alınırdı.

Bu cür körpülər yaşayış məntəqələri arasında gündəlik hərəkəti, kənd təsərrüfatı məhsullarının daşınmasını və regional ticarəti asanlaşdırırdı.

Laləzar körpüsünün dəqiq tikilmə tarixi barədə məlumatları müqayisə edərkən abidə üzərindəki kitabələr, memarlıq xüsusiyyətləri və tarixi tədqiqatlar birlikdə nəzərdən keçirilməlidir.

Abidə bölgənin nəqliyyat və mühəndislik tarixinin öyrənilməsi baxımından maraqlı nümunədir.`,
    sources: [
      {
        label: "Azərbaycan Milli Kitabxanası",
        url: "https://www.anl.az/",
      },
    ],
    related: ["xudafarin", "memarliq"],
  },
  {
    id: "1903",
    title: "1903-cü il tarixi xəritəsi",
    keywords: [
      "1903",
      "xerite",
      "xəritə",
      "arxiv",
      "qəza",
      "qeza",
      "quberniya",
      "rus imperiyasi",
      "elizavetpol",
    ],
    answer: `1903-cü ilə aid tarixi xəritələr Rusiya imperiyası dövrünün inzibati bölgüsünü öyrənmək üçün mühüm mənbələrdir.

Həmin dövrdə Zəngəzur qəzası Yelizavetpol quberniyasının tərkibində idi.

Belə xəritələrdə yaşayış məntəqələrinin adları, yollar, çaylar, dağ silsilələri və inzibati sərhədlər göstərilə bilər.

Tarixi xəritəni düzgün oxumaq üçün onun nəşr ili, miqyası, tərtibçisi və hansı inzibati sistemi əks etdirdiyi nəzərə alınmalıdır.

1903-cü il xəritəsi bugünkü dövlət sərhədlərinin hüquqi təsviri kimi deyil, öz dövrünün tarixi-coğrafi sənədi kimi qiymətləndirilməlidir.`,
    sources: [
      {
        label: "Wikimedia Commons — tarixi xəritələr",
        url: "https://commons.wikimedia.org/",
      },
    ],
    related: ["zengezur", "abideler"],
  },
  {
    id: "2020",
    title: "2020-ci il hadisələri",
    keywords: [
      "2020",
      "muharibe",
      "müharibə",
      "qarabag",
      "qarabağ",
      "10 noyabr",
      "beyanati",
      "bəyanat",
      "ateskes",
    ],
    answer: `2020-ci ilin payızında Azərbaycan və Ermənistan arasında 44 gün davam edən müharibə baş verdi.

Müharibə 10 noyabr 2020-ci il tarixli üçtərəfli bəyanatın imzalanması ilə dayandırıldı. Sənədi Azərbaycan Prezidenti, Ermənistanın Baş naziri və Rusiya Prezidenti imzaladı.

Bəyanatda hərbi əməliyyatların dayandırılması, müəyyən ərazilərin qaytarılması, sülhməramlıların yerləşdirilməsi və regionda nəqliyyat əlaqələrinin açılması kimi məsələlər yer alırdı.

Sonrakı illərdə bölgədə infrastrukturun yenidən qurulması, yaşayış məntəqələrinin bərpası, mina təhlükəsinin aradan qaldırılması və əhalinin qayıdışı ilə bağlı işlər aparılıb.

Bu dövrün hadisələrini öyrənərkən rəsmi sənədləri, beynəlxalq təşkilatların hesabatlarını və müstəqil tədqiqatları müqayisə etmək vacibdir.`,
    sources: [
      {
        label: "Azərbaycan Prezidentinin rəsmi saytı",
        url: "https://president.az/",
      },
      {
        label: "BMT",
        url: "https://www.un.org/",
      },
    ],
    related: ["boyukqayidis", "neqliyyat"],
  },
  {
    id: "boyukqayidis",
    title: "Böyük Qayıdış",
    keywords: [
      "boyuk qayidis",
      "böyük qayıdış",
      "qayidis",
      "qayıdış",
      "agali",
      "ağalı",
      "koc",
      "köç",
      "berpa",
      "bərpa",
      "zengilan",
      "zəngilan",
    ],
    answer: `Böyük Qayıdış Azərbaycanın işğaldan azad edilmiş ərazilərinə əhalinin mərhələli şəkildə qayıtmasını və həmin ərazilərin bərpasını əhatə edən dövlət proqramıdır.

Proqram çərçivəsində yaşayış evləri, məktəblər, səhiyyə obyektləri, yollar, elektrik və su infrastrukturu inşa edilir və ya yenidən qurulur.

Zəngilan rayonunun Ağalı kəndi ağıllı kənd yanaşması ilə həyata keçirilən ilk tanınmış layihələrdən biridir.

Qayıdış prosesində yalnız binaların tikintisi deyil, iş yerlərinin yaradılması, ictimai xidmətlərin təşkili, ekoloji dayanıqlılıq və təhlükəsizlik də mühüm rol oynayır.

Mina və partlamamış sursat təhlükəsi bir çox ərazilərdə bərpa və məskunlaşma işlərinə təsir edən əsas amillərdəndir.`,
    sources: [
      {
        label: "Azərbaycan Prezidentinin rəsmi saytı",
        url: "https://president.az/",
      },
    ],
    related: ["2020", "neqliyyat"],
  },
  {
    id: "neqliyyat",
    title: "Nəqliyyat və dəmir yolu",
    keywords: [
      "neqliyyat",
      "demir yolu",
      "dəmir yolu",
      "qatar",
      "horadiz",
      "agband",
      "ağbənd",
      "yol",
      "dehliz",
      "dəhliz",
      "zengezur dehlizi",
      "zəngəzur dəhlizi",
      "infrastruktur",
    ],
    answer: `Regionun nəqliyyat infrastrukturu avtomobil yolları, dəmir yolu xətləri, körpülər və logistika əlaqələri baxımından mühüm əhəmiyyət daşıyır.

Horadiz–Ağbənd dəmir yolu layihəsi Azərbaycanın cənub-qərb hissəsində nəqliyyat əlaqələrinin inkişafı ilə bağlı əsas layihələrdən biridir.

Layihənin məqsədlərinə yük və sərnişin daşımalarının imkanlarını artırmaq, bölgədə iqtisadi fəaliyyəti dəstəkləmək və regional əlaqələri genişləndirmək daxildir.

Zəngəzur dəhlizi ifadəsi siyasi və nəqliyyat müzakirələrində işlədilir. Bu anlayışın hüquqi statusu, marşrutu və idarəetmə şərtləri barədə müxtəlif yanaşmalar mövcuddur.

Nəqliyyat layihələrini qiymətləndirərkən rəsmi təsdiqlənmiş marşrutlarla konseptual planları fərqləndirmək vacibdir.

Saytdakı animasiyada yolun və dəmir yolu infrastrukturunun qurulma mərhələləri vizual şəkildə təqdim olunur.`,
    sources: [
      {
        label: "Azərbaycan Dəmir Yolları",
        url: "https://ady.az/",
      },
      {
        label: "Azərbaycan Prezidentinin rəsmi saytı",
        url: "https://president.az/",
      },
    ],
    related: ["boyukqayidis", "2020"],
  },
  {
    id: "memarliq",
    title: "Orta əsr memarlığı",
    keywords: [
      "memarliq",
      "memarlıq",
      "das",
      "daş",
      "tag",
      "tağ",
      "tikinti",
      "ustalar",
      "muhendislik",
      "mühəndislik",
    ],
    answer: `Orta əsr Azərbaycan memarlığında daş hörgü, kərpic, tağ, günbəz və həndəsi ornamentlər geniş istifadə olunurdu.

Körpü memarlığında tağ konstruksiyası böyük yüklərin dayaqlara ötürülməsinə imkan verirdi. Tağların forması və ölçüsü keçidin eni, tikinti materialı və ərazinin relyefi ilə bağlı idi.

Türbə memarlığında isə kvadrat, dairəvi və çoxbucaqlı plan quruluşlarına rast gəlinir. Səkkizbucaqlı türbələr bu ənənənin tanınan nümunələrindəndir.

Kitabələr tikilinin tarixi haqqında məlumat verən mühüm ilkin mənbələrdir. Ornamentlər isə dövrün estetik düşüncəsini və sənətkarlıq bacarığını əks etdirir.

Memarlıq abidələrinin elmi bərpası zamanı tarixi materialların, ölçülərin və əvvəlki tədqiqatların nəzərə alınması vacibdir.`,
    sources: [
      {
        label: "UNESCO",
        url: "https://www.unesco.org/",
      },
    ],
    related: ["xudafarin", "mammadbayli", "lalezar"],
  },
  {
    id: "abideler",
    title: "Tarixi abidələr",
    keywords: [
      "abideler",
      "abidələr",
      "abide",
      "abidə",
      "hansi abideler",
      "ne var",
      "görməli",
    ],
    answer: `Zəngəzur Atlasında bir neçə tarixi abidə xüsusi olaraq təqdim edilir.

Xudafərin körpüləri Araz üzərindəki tarixi nəqliyyat və mühəndislik irsini əks etdirir.

Məmmədbəyli türbəsi XIV əsrin əvvəllərinə aid edilən səkkizbucaqlı türbə memarlığının nümunəsidir.

Laləzar körpüsü isə bölgənin tarixi daş körpü ənənəsinin nümunələrindəndir.

Bu abidələri öyrənərkən onların memarlıq quruluşuna, kitabələrinə, tikinti materiallarına və yerləşdikləri tarixi coğrafiyaya diqqət yetirmək faydalıdır.

İstəsən, hər bir abidə haqqında ayrıca daha geniş məlumat verə bilərəm.`,
    sources: [],
    related: ["xudafarin", "mammadbayli", "lalezar"],
  },
];

const byId = new Map(knowledge.map((item) => [item.id, item]));

function normalize(input: string): string {
  return input
    .toLocaleLowerCase("az")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsPhrase(text: string, phrase: string): boolean {
  const normalized = normalize(phrase);

  if (!normalized) return false;

  return ` ${text} `.includes(` ${normalized} `);
}

function isGreeting(text: string): boolean {
  return /^(salam|salamlar|sabahiniz xeyir|axshaminiz xeyir|axsaminiz xeyir|hey|hello|hi|salam aleykum|aleykum salam)(\s|$)/.test(
    text
  );
}

function isThanks(text: string): boolean {
  return /^(sag ol|sagol|tesekkur|tesekkurler|cox sag ol|cox sagol|thanks)(\s|$)/.test(
    text
  );
}

function isHowAreYou(text: string): boolean {
  return /^(necesen|necesiz|ne var ne yox|nece gedir|isler necedir)(\s|$)/.test(
    text
  );
}

function findTopic(text: string): Knowledge | null {
  let best: Knowledge | null = null;
  let bestScore = 0;

  for (const item of knowledge) {
    let score = 0;

    for (const keyword of item.keywords) {
      const key = normalize(keyword);

      if (containsPhrase(text, key)) {
        score += key.length >= 8 ? 5 : 3;
      }
    }

    if (containsPhrase(text, item.title)) {
      score += 8;
    }

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return bestScore > 0 ? best : null;
}

function findPreviousTopic(
  messages: ChatMessage[]
): Knowledge | null {
  const previous = [...messages].reverse();

  for (const message of previous) {
    if (message.role !== "user") continue;

    const text = normalize(message.content || "");
    const topic = findTopic(text);

    if (topic) return topic;
  }

  return null;
}

function formatRelated(item: Knowledge): string {
  const titles = item.related
    .map((id) => byId.get(id)?.title)
    .filter(Boolean);

  if (!titles.length) return "";

  return `\n\nƏlavə olaraq bu mövzuları da soruşa bilərsən: ${titles.join(", ")}.`;
}

export function buildAnswer(
  message: string,
  history: ChatMessage[]
) {
  const text = normalize(message);

  if (!text) {
    return {
      answer:
        "Salam! Mən Atlas Bələdçisiyəm. Zəngəzurun tarixi, Xudafərin körpüləri, Məmmədbəyli türbəsi, Laləzar körpüsü, arxiv xəritələri və nəqliyyat layihələri haqqında sual verə bilərsən.",
      sources: [] as Source[],
    };
  }

  if (isThanks(text)) {
    return {
      answer:
        "Məmnuniyyətlə! Zəngəzurun tarixi və mədəni irsi haqqında başqa sualın varsa, cavablandırmağa hazıram.",
      sources: [] as Source[],
    };
  }

  if (isHowAreYou(text)) {
    return {
      answer:
        "Çox sağ ol, yaxşıyam! Mən Atlas Bələdçisiyəm. Bu gün hansı tarixi mövzunu araşdırmaq istəyirsən? Xudafərin körpüləri, Məmmədbəyli türbəsi və ya Zəngəzurun tarixi ilə başlaya bilərik.",
      sources: [] as Source[],
    };
  }

  const directTopic = findTopic(text);

  if (directTopic) {
    return {
      answer: directTopic.answer + formatRelated(directTopic),
      sources: directTopic.sources,
    };
  }

  if (isGreeting(text)) {
    return {
      answer:
        "Salam! Zəngəzur Atlasına xoş gəlmisən. Mən Atlas Bələdçisiyəm.\n\nSənə tarixi abidələr, qədim xəritələr, bölgənin tarixi, memarlıq irsi və nəqliyyat layihələri haqqında ətraflı məlumat verə bilərəm.\n\nMəsələn, “Xudafərin körpüsü haqqında danış” və ya “1903-cü il xəritəsi nəyi göstərir?” yaza bilərsən.",
      sources: [] as Source[],
    };
  }

  const followUpWords = [
    "bes",
    "onun",
    "bunun",
    "daha",
    "etrafli",
    "biraz",
    "ne vaxt",
    "nece",
    "neden",
    "niye",
    "harada",
    "kim",
    "hansi",
    "ne ucun",
    "tarixi nedir",
  ];

  const isFollowUp = followUpWords.some((word) =>
    text.startsWith(word)
  );

  if (isFollowUp) {
    const previousTopic = findPreviousTopic(history);

    if (previousTopic) {
      return {
        answer:
          `${previousTopic.title} haqqında əlavə məlumat:\n\n` +
          previousTopic.answer +
          formatRelated(previousTopic),
        sources: previousTopic.sources,
      };
    }
  }

  if (
    containsPhrase(text, "sen kimsen") ||
    containsPhrase(text, "adin nedir") ||
    containsPhrase(text, "ne bacarirsan")
  ) {
    return {
      answer:
        "Mən Atlas Bələdçisiyəm — Zəngəzur Atlasının daxili məlumat köməkçisi.\n\nTarixi abidələr, memarlıq, arxiv xəritələri, bölgənin tarixi və infrastruktur mövzularında məlumat verirəm.\n\nCavablarım saytın daxilindəki məlumat bazasından hazırlanır. Xarici AI servislərinə qoşulmuram.",
      sources: [] as Source[],
    };
  }

  if (
    containsPhrase(text, "ne haqqinda danisaq") ||
    containsPhrase(text, "movzu teklif et")
  ) {
    return {
      answer:
        "Bu mövzulardan birini seçə bilərik:\n\n1. Xudafərin körpülərinin tarixi və memarlığı\n2. Məmmədbəyli türbəsinin 1305-ci il kitabəsi\n3. Laləzar körpüsü\n4. 1903-cü il Zəngəzur xəritəsi\n5. Böyük Qayıdış\n6. Horadiz–Ağbənd dəmir yolu\n\nMaraqlanan mövzunun adını yaz, ətraflı danışım.",
      sources: [] as Source[],
    };
  }

  return {
    answer:
      "Bu sual üzrə məlumat bazamda hələ kifayət qədər dəqiq məlumat yoxdur.\n\nAmma Zəngəzurun tarixi, Xudafərin körpüləri, Məmmədbəyli türbəsi, Laləzar körpüsü, tarixi xəritələr, Böyük Qayıdış və nəqliyyat layihələri haqqında ətraflı məlumat verə bilərəm.\n\nSualını bu mövzulardan biri ilə əlaqələndirib yenidən yaza bilərsən.",
    sources: [] as Source[],
  };
}


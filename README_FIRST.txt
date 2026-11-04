ZƏNGƏZUR — SON BÖYÜK YENİLƏMƏ
================================

QURAŞDIRMA (Windows / VS Code / PowerShell)

1) Mövcud C:\Users\USER\Projects\zengezur qovluğunun ehtiyat nüsxəsini al.
2) ZIP faylını aç.
3) Arxivdəki "app" VƏ "public" qovluqlarının içindəkiləri
   C:\Users\USER\Projects\zengezur\ altındakı müvafiq qovluqlara
   köçür (faylları əvəz et).
4) Əgər sayt artıq işləyirsə, terminalda Ctrl + C ilə dayandır.
5) Layihə qovluğunda:

   npm.cmd run dev

6) Brauzerdə http://localhost:3000 aç və Ctrl + F5 ilə yenilə.

Əlavə npm paketi tələb olunmur. Əvvəldən üç.js, @react-three/fiber,
@react-three/drei quraşdırılmış olmalıdır.

YENİLİKLƏR

- 3 tarixi abidənin 3D səhnəsi və orbit kamerası
- 'Kinematik baxış' / 'Dayandır' / kamera reset düymələri
- Səkkizbucaqlı türbə üçün çoxlu daş detalın GPU instancing optimizasiyası
- Körpü tağlarında birləşdirilmiş geometriya (draw-call azalması)
- Görünməyən 3D səhnələrin GPU renderinin dayanması (IntersectionObserver)
- Relyefin daha az poliqon və aşağı DPR ilə render edilməsi
- Yeni nəqliyyat simulyasiyası: ilkin landşaft / tikinti / gələcək konsept
- Genişləndirilmiş tarixi məlumatlar və mənbə keçidləri
- 1903-cü il arxiv xəritəsi (Wikimedia Commons, public domain)
- 2025-ci il birgə bəyannaməsinin orijinal rəsmi PDF baxışı
- 2025–2026 bərpa və infrastruktur məlumatları
- Responsiv dizayn və hərəkət məhdudiyyəti seçiminə hörmət

DƏQİQLİK QEYDİ

- Əsl 3D modellər memarlıq xüsusiyyətlərinin şərti rekonstruksiyasıdır.
  Fotogrammetrik skan / santimetr dəqiqliyində model deyil.
- Yeni infrastruktur səhnəsi sxematik olaraq hazırlanıb; 2026-cı ildə
  real dəmir yolunun harada tamamlandığını göstərmir.
- 1903-cü il Zəngəzur qəzasının xəritəsi o dövrün inzibati sərhədləridir;
  müasir dövlət sərhədləri ilə eyni deyil.
- 2025-ci il PDF kartındakı miniatür kağız qrafikası dizayn maketidir,
  orijinal sənədin fotokopiyası deyil. Sənədin özü 'Orijinal PDF-yə bax'
  düyməsi ilə göstərilir.
- Wikimedia foto və xəritələri, həmçinin PDF internet tələb edir.

PERFORMANS MƏSLƏHƏTLƏRİ

- Səhnələr yalnız görünən ərazinin yaxınlığında WebGL açır.
- Kameranı dayandırmaq üçün kinematik baxış düyməsini ikinci dəfə bas.
- Videokart zəifdirsə, iki 3D səhnəni eyni anda görünəcək şəkildə zoom-out etmə.
- Yoxlama üçün browser DevTools > Performance Monitor ilə FPS/GPU yükünü izləyə bilərsən.
- Brauzerdə 'WebGL context lost' olarsa, digər GPU-yüklü tabları bağla.

YOXLAMA

- TypeScript/TSX faylları sintaksis parserindən keçirilib.
- Həqiqi Next.js build və real brauzer GPU/FPS testi burada icra edilməyib;
  bunlar sənin Windows kompüterində yoxlanmalıdır.

ƏLAQƏLİ MƏNBƏLƏR

- HISTORICAL_SOURCES.md
- app/data/heritage.ts


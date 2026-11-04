# Zəngəzur Atlası — Son yeniləmə

Bu paket mövcud Next.js (App Router, TypeScript, Tailwind CSS, React Three Fiber) layihəsi üçün hazırlanıb. Əvvəlki `app/` və `public/` qovluqlarının məzmununu əvəz edir, digər Next.js fayllarını silmir.

## Quraşdırma

1. Mövcud `zengezur` layihənizin ehtiyat nüsxəsini alın.
2. ZIP-dən çıxardığınız `app` və `public` qovluqlarını mövcud layihənizin kökünə köçürüb faylları əvəz edin (yəni iç-içə `app/app` yaratmayın).
3. Terminalın layihənin kökündə olduğuna əmin olun:
   ```powershell
   cd C:\Users\USER\Projects\zengezur
   npm.cmd run dev
   ```
4. `http://localhost:3000` açın; `Ctrl + F5` ilə yeniləyin.

Əgər əvvəlki mərhələdə bütün kitabxanalar quraşdırılıbsa, əlavə `npm install` tələb olunmur. Əks halda:
```powershell
npm.cmd install three @react-three/fiber @react-three/drei gsap
npm.cmd install -D @types/three
```

## Sayta daxil olan funksiyalar

- Zəngəzur Atlası brendi, açıq və yüngül dizayn, Azərbaycan hərflərini dəstəkləyən Roboto mətni.
- Xudafərin körpüsü, Məmmədbəyli türbəsi və Laləzar körpüsü üçün interaktiv memarlıq səhnələri (əvvəlki GLB faylları da saxlanılıb).
- Beş mərhələli, avtomatik oynayan infrastruktur hekayəsi: landşaft, hazırlıq, körpü dayaqları, relslər, qatarla hərəkət. Mərhələlər seçilə, dayandırıla və yenidən başlana bilər.
- Mənbəli tarix xətti, arxiv xəritəsi və rəsmi sənəd keçidləri.
- Aşağı sağ küncdə Atlas bələdçisi: salamlaşma, tarixi suallar, mənbə linkləri və söhbət pəncərəsi.
- Görünən sahəyə görə 3D səhnələrin yüklənməsi, aşağı təsvir sıxlığı (DPR), instanced həndəsə, azaldılmış kölgə yükü, mobil uyğunlaşma, reduced-motion dəstəyi.

## Atlas bələdçisi — açarsız və real AI rejimləri

**Açarsız rejim:** `/api/assistant` öncədən hazırlanmış mənbəli məlumat bazasından cavab verir. Salam, tarix, abidələr, nəqliyyat, xəritələr və Ağalı haqqında sualları tanıyır; sərbəst sualları böyük dil modeli kimi həll etmir.

**Real AI rejimi:** layihənin kökündə `.env.local` faylı yaradın (`.env.local.example` faylını nümunə götürün):
```env
OPENAI_API_KEY=öz_API_açarınız
OPENAI_MODEL=gpt-4.1-mini
```
Sonra Next.js serverini dayandırıb yenidən başladın (`Ctrl+C`, sonra `npm.cmd run dev`). API açarı yalnız serverdə saxlanır. Açarı **heç vaxt** `NEXT_PUBLIC_...` dəyişənində və brauzer kodunda verməyin. Bu rejim OpenAI API-dən istifadə etdiyi üçün ödənişli API istifadəsi yarada bilər. İstehsalat yayımlanmasında API kvotası, əlavə təhlükəsizlik və paylaşılan rate-limit infrastrukturu məsləhətdir. Serverdə sadə dəqiqəlik limit artıq var; bu, çoxsaylı server instansiyasında tam təhlükəsizlik təmin etmir.

## Mənbə və doğruluq qeydləri

Saytın tarix və mənbələri `HISTORICAL_SOURCES.md` faylındadır. 3D abidələr fotogrammetrik, dəqiq ölçülü elmi bərpa deyil, memarlıq xüsusiyyətlərinə əsaslanan rekonstruksiyalardır. Nəqliyyat animasiyası konkret layihənin mühəndislik xəritəsi deyil. Bu iki fakt kiçik texniki qeydlərdə qorunur, reklamvari uzun izahlarda deyil.

## Sürətli yoxlama

1. Ana səhifədə `Z.` loqosu yox, `Zəngəzur ATLASI` görünür.
2. Abidə kartında `3D modeli aç` işləyir; səhnə açılır və kamera fırlanır.
3. `Dəyişən yollar. Yeni əlaqələr.` bölməsində 5 mərhələ avtomatik dəyişir, mətn və 3D elementlər hər mərhələni izləyir. `Dayandır`, `Davam et`, `Yenidən` işləyir.
4. Aşağı sağda `Atlas bələdçisi`ni açıb `Salam` və `Xudafərin niyə əhəmiyyətlidir?` göndərin. Cavab və mənbə keçidləri gəlməlidir.
5. Mobil genişlikdə chat pəncərəsinin ekrandan kənara çıxmadığını yoxlayın.
6. Brauzer Console-da xəta yoxdursa, kod əvvəlki layihəyə düzgün köçürülüb.
7. Ləngimə qalarsa: Chrome DevTools Performance panelində FPS və memory qeydini yoxlayın; GPU və brauzer fərqləri nəticəyə təsir edir.

## Texniki qeydlər

Bu paket Next.js layihəsinin `package.json` faylını əvəz etmir. Yalnız `app/`, `public/` və oxumaq üçün əlavə faylları gətirir. Bütün mətnlər saytda Azərbaycan dilindədir. 3D model faylları əvvəlki paketdən saxlanılıb. Tarixi materiallar dəyişdirilməmiş mənbələrə keçid verir.

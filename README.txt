ZƏNGƏZUR — ABİDƏLƏR VƏ 3D MEMARLIQ YENİLƏMƏSİ
=================================================

Bu yeniləmə əvvəlki işləyən Next.js layihən üçün hazırlanıb.

QURAŞDIRMA (Windows / VS Code)
1. Hazırda işləyən layihəni ehtiyat kimi saxla.
2. Bu ZIP-i çıxart.
3. ZIP-in içindəki app/ və public/ qovluqlarının İÇİNDƏKİLƏRİ layihə
   qovluğuna müvafiq olaraq app/ və public/ altına köçür.
   Layihənin ünvanı: C:\Users\USER\Projects\zengezur
4. Windows 'Replace' deyərsə, təsdiqlə.
5. `app/app` və ya `public/public` kimi iç-içə qovluqlar yaratma.
6. VS Code terminalında layihənin kökündən: npm.cmd run dev
   (hazırda işləyirsə, açıq saxlaya bilərsən).
7. http://localhost:3000 ünvanını açıb Ctrl+F5 ilə yenilə.

QURAŞDIRMA ÜÇÜN YENİ NPM PAKETİ LAZIM DEYİL:
- next, react, react-dom
- three, @react-three/fiber, @react-three/drei
- Tailwind və TypeScript
Bunlar əvvəlki mərhələlərdə quraşdırılıb.

NƏLƏR VAR
- Tarixi abidələrin fakt və foto kartları
- Xudafərin (15 tağ), Məmmədbəyli türbəsi və Laləzar üçün ayrıca interaktiv
  3D memarlıq səhnələri, kamera hərəkəti, fırlanma və kameranı sıfırlama
- Hər abidə üçün ayrıca məlumat pəncərəsi, orijinal foto və tarix mənbələri
- 1992–2022 tarix xətti və tarixi mənbələrə keçidlər
- Beş rayonun informasiya kartları
- Əvvəlki Mapzen/Terrarium 3D Zəngilan relyefi
- Her abidənin .GLB formatında müstəqil 3D faylı: public/models/
- Azərbaycan dilini dəstəkləyən Roboto fontu

GLB FAYLLARI
- public/models/khudafarin_15_arches.glb
- public/models/mammadbayli.glb
- public/models/lalezar_2_arches.glb
Bunlar Blender, Three.js GLTFLoader və glTF/GLB proqramlarına açıla bilər.
Səhnədəki canlandırma isə React Three Fiber-də daha zəngin daş, su və işıqlandırma
üçün eyni memarlıq quruluşu əsasında ayrıca prosedural qurulub.

DƏQİQLİK QEYDİ
Bunlar tam fotogrammetriya, lazer skan və ya ölçülmüş CAD/BIM
rekonstruksiyası deyil. Mənbələrdə təsdiqlənmiş memarlıq xüsusiyyətlərinə
əsaslanan, müəllifliklə hazırlanmış 3D memarlıq interpretasiyasıdır.
Xüsusilə tarixi tağ ölçüləri, daxili otaqlar, dəqiq tikinti daşları, həmçinin
Laləzarın rəqəmli ölçüləri üçün əlavə fotolar, planlar və ekspert təsdiqi lazımdır.

FOTOLAR
Foto kartları Wikimedia Commons-da yerləşdirilmiş şəkillərə bağlanır və internet
əlaqəsi tələb edir. Hər fotonun müəllif/lisenziya mənbəsi məlumat pəncərəsində
verilir. Laçın foto mənbəsi ayrıca ana səhifədə göstərilir.

PROBLEM OLARSA
- Əgər 'module not found' çıxsa, terminalda `npm.cmd install` işlə.
- Səhifədə heç nə görünmürsə `Ctrl+Shift+I` -> Console və Terminal xətasına bax.
- /models/mammadbayli.glb ünvanı işləmirsə, public/models qovluğu səhv kopyalanıb.
- /api/terrain xətası xarici xəritə serveri ilə əlaqəli ola bilər; abidə 3D
  səhnələri üçün ayrıca internet tələb olunmur.

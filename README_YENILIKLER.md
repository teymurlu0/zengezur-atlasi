# ZƏNGƏZURİUM — yeni bölmələr

Bu qovluq orijinal saytın **yenilənmə paketidir**; başqa layihəyə `node_modules` köçürməyin. Əsas faylları mövcud Next.js layihənizdə eyni yollarla əvəz edin. `app/components/AtlasAssistant.tsx` bir-fayllıq lokal köməkçidir, `/api/assistant` istifadə etmir.

## Quraşdırma

1. `app/`, `public/` qovluqlarını layihənizə əlavə edin (köhnələri əvəz edən fayllarla). `supabase/community.sql` SQL quruluşudur.
2. CMD: `npm.cmd install @supabase/supabase-js` (mövcud `package.json` və lockfile-də yenilənəcək).
3. Supabase-də **bu sayt üçün ayrıca layihə** yaradın. Dashboard → Authentication → Providers → **Anonymous Sign-Ins** aktiv edin. Bot/spam qorunması üçün CAPTCHA/Turnstile açmağınız tövsiyə edilir.
4. SQL Editor-də `supabase/community.sql`-in hamısını icra edin.
5. `.env.local.example` faylını `.env.local` kimi kopyalayın və həmin **sayt üçün** Supabase Project URL və publishable/anon key-ni daxil edin. `service_role`/secret açarı brauzerə ötürməyin.
6. Vercel Project → Settings → Environment Variables-də **eyni iki dəyişəni** Production üçün əlavə edib redeploy edin.
7. `npm.cmd run build`, sonra `git add app public package.json package-lock.json supabase README_YENILIKLER.md`, `git commit -m "Add community and travel planning"`, `git push origin main`.

## İmkanlar

- **İcma söhbəti:** ləqəb (2–24 simvol), mesajlar (maks. 500 simvol), Supabase Auth anonim istifadəçi, RLS öz ID-si ilə yazma, serverdə 10s fasilə, son 60 mesajı 12 saniyədən bir yeniləmə. Mesajlar cihazlar arasında görünür. Ləqəb **istifadəçi şəxsiyyətini təsdiqləmir**. Şərh silmə, moderasiya paneli və avtomatik filtr hələ yoxdur: ictimai istifadədən əvvəl moderator prosesi qurun.
- **Səfər planı:** Zəngilan, Cəbrayıl, Laçın üzrə nümunə məkanlar və dayanacaqlarda ayrılan vaxt. Səfər planı localStorage-da saxlanır; xəritə bağlantıları dayanacağı Google Maps axtarışında göstərir. **Yol vaxtı, təsdiqlənmiş istiqamət və giriş icazəsi deyil.** Mina təhlükəsi və giriş məhdudiyyətlərini mütləq rəsmi mənbədən yoxlayın.
- **Sürət:** ağır xəritə SDK-sı əlavə edilməyib, yeni bölmələr sadə React/CSS-dir, mesaj sorğuları yalnız görünən tabda vaxtaşırı göndərilir, maksimum 60 mesaj alınır. Mövcud 3D komponentlər olduğu kimi qalır.
- **Mətn:** süni/şablon etiketlər dəyişdirilib, yeni bölmələr daxil edilib.

## Yoxlama

- Chatbot: "Xudafərin" yaz; `Network`-də `/api/assistant` çağırışı olmamalıdır.
- İcma: iki ayrı brauzerdə iki fərqli ləqəblə giriş edib mesaj göndər; digər brauzerdə "Yenilə" bas.
- Səfər planı: bölgəni və tempi dəyiş; vaxtın yalnız dayanacaq hissələrini göstərdiyinə diqqət et.

## Təhlükəsizlik və mənbə

Rəsmi səfər qaydaları: https://my.gov.az/services/ishgaldan-azad-edilmish-erazilere-sefer-uchun-icaze?serviceLabel=TPLT
https://mincom.gov.az/en/media-en/news/joint-statement-by-ministry-of-digital-development-and-transport-and-the-state-tourism-agency

İcma üçün təhlükəsizlik: https://supabase.com/docs/guides/auth/auth-anonymous

"use client";

import { useMemo, useState } from "react";

type Stop = { name: string; detail: string; minutes: number; note: string; map: string };
type Route = { id: string; name: string; region: string; subtitle: string; description: string; stops: Stop[]; tips: string[] };

// Nümunə dayanacaqlar: real icazə, giriş və açıq olma vəziyyəti ayrıca yoxlanmalıdır.
const routes: Route[] = [
  {
    id: "zangilan", name: "Zəngilanın izləri", region: "ZƏNGİLAN", subtitle: "Tarix və yenidənqurma", description: "Şəhər, tarixi memarlıq və müasir kənd həyatının hekayəsi.",
    stops: [
      { name: "Zəngilan şəhəri", detail: "Bölgənin tarixi və yenidən qurulan şəhər mühiti", minutes: 50, note: "Şəhərdə ictimai girişə açıq məkanları seçin.", map: "Zangilan Azerbaijan" },
      { name: "Məmmədbəyli türbəsi", detail: "XIV əsrin əvvəllərinə aid memarlıq nümunəsi", minutes: 35, note: "Abidəyə faktiki girişin mümkünlüyünü öncədən dəqiqləşdirin.", map: "Mammadbayli mausoleum Zangilan" },
      { name: "Ağalı kəndi", detail: "Ağıllı kənd və Böyük Qayıdış haqqında müşahidələr", minutes: 45, note: "Yaşayış məntəqəsində sakinlərin şəxsi məkanına hörmət edin.", map: "Agali Zangilan Azerbaijan" },
    ],
    tips: ["Giriş qaydalarını və marşrut üzrə icazəni yoxlayın.", "Su, mobil enerji və hava şəraitinə uyğun geyim götürün."]
  },
  {
    id: "jabrayil", name: "Araz boyunca", region: "CƏBRAYIL", subtitle: "Körpülər və sərhəd tarixi", description: "Araz vadisi və Xudafərin körpüləri barədə tarixi baxış.",
    stops: [
      { name: "Cəbrayıl şəhəri", detail: "Şəhərin keçmişi və bərpa prosesi", minutes: 50, note: "Yalnız açıq və icazəli ərazilərdə gəzin.", map: "Jabrayil Azerbaijan" },
      { name: "Xudafərin körpüləri", detail: "Araz üzərində orta əsr mühəndislik irsi", minutes: 55, note: "Sərhəd zonasına giriş məhdudlaşdırıla bilər; məsafədən baxış da mümkün olmaya bilər.", map: "Khudafarin bridges Azerbaijan" },
    ],
    tips: ["Sərhəd bölgəsinə daxilolma qaydalarını mütləq əvvəlcədən yoxlayın.", "İcazəsiz çay sahilinə, tikililərə və yoldan kənara çıxmayın."]
  },
  {
    id: "lachin", name: "Laçının dağ yolları", region: "LAÇIN", subtitle: "Dağ mənzərələri və yaşayış", description: "Dağ şəhəri və Zabux istiqamətinin mənzərəli məkanları.",
    stops: [
      { name: "Laçın şəhəri", detail: "Dağlıq relyef və yenilənən şəhər mühiti", minutes: 70, note: "Yerli giriş məhdudiyyətlərinə əməl edin.", map: "Lachin Azerbaijan" },
      { name: "Zabux kəndi", detail: "Dağ vadisində yaşayış və təbiət", minutes: 45, note: "Yalnız rəsmi icazəli istiqamətdən istifadə edin.", map: "Zabukh Lachin Azerbaijan" },
    ],
    tips: ["Dağlıq ərazidə hava sürətlə dəyişə bilər.", "Yol və icazə məlumatlarını səfər ərəfəsində yenidən yoxlayın."]
  },
];

export default function RoutePlanner() {
  const [selected, setSelected] = useState(routes[0].id);
  const [pace, setPace] = useState<"sakit" | "normal">("normal");
  const [saved, setSaved] = useState(false);
  const route = routes.find((item) => item.id === selected) ?? routes[0];
  const visitMinutes = useMemo(() => Math.round(route.stops.reduce((a, s) => a + s.minutes, 0) * (pace === "sakit" ? 1.35 : 1)), [route, pace]);
  const duration = `${Math.floor(visitMinutes / 60) ? `${Math.floor(visitMinutes / 60)} saat ` : ""}${visitMinutes % 60 ? `${visitMinutes % 60} dəq` : ""}`.trim();
  const plan = [`${route.name} — şəxsi səfər qeydləri`, `Dayanacaqlara ayrılan vaxt: ${duration} (yol müddəti daxil deyil)`, ...route.stops.map((s, i) => `${i + 1}. ${s.name} — təqribən ${Math.round(s.minutes * (pace === "sakit" ? 1.35 : 1))} dəq. ${s.detail}`), "XƏBƏRDARLIQ: Bu plan təsdiqlənmiş hərəkət marşrutu deyil. Yalnız rəsmi icazəli yollarla hərəkət edin. Səfər, giriş və mina təhlükəsizliyi qaydalarını yoxlayın."].join("\n");
  function savePlan() {
    try { localStorage.setItem("zengezurium-route-plan", plan); setSaved(true); window.setTimeout(() => setSaved(false), 2400); }
    catch { window.print(); }
  }
  return (
    <section className="route-section" id="route-planner" aria-labelledby="route-title">
      <div className="section-intro"><div><span className="kicker">SƏFƏR BƏLƏDÇİSİ</span><h2 id="route-title">Yolunu əvvəlcədən planlaşdır.</h2></div><p>Getmək istədiyin bölgəni seç, dayanacaqları və hər məkana ayıracağın vaxtı gör.</p></div>
      <div className="route-shell">
        <div className="route-side">
          <span className="route-mini">MARŞRUT SEÇİMİ</span>
          <div className="route-picker" role="group" aria-label="Səfər bölgəsi">{routes.map((r) => <button type="button" key={r.id} aria-pressed={selected === r.id} className={selected === r.id ? "route-choice selected" : "route-choice"} onClick={() => setSelected(r.id)}><span>{r.region}</span><strong>{r.name}</strong><small>{r.subtitle}</small></button>)}</div>
          <label className="route-speed" htmlFor="route-pace">Gəzinti tempi <select id="route-pace" value={pace} onChange={e => setPace(e.target.value as "normal" | "sakit")}><option value="normal">Normal</option><option value="sakit">Rahat, fasilələrlə</option></select></label>
          <div className="route-estimate"><span>DAYANACAQLARA AYRILAN VAXT</span><strong>{duration}</strong><small>Yol vaxtı daxil deyil. Real məsafə və gediş müddəti nəqliyyat, icazə və yol şəraitindən asılıdır.</small></div>
        </div>
        <div className="route-main">
          <div className="route-main-top"><span>{route.region} / SƏFƏR QEYDLƏRİ</span><h3>{route.name}</h3><p>{route.description}</p></div>
          <ol className="route-timeline">{route.stops.map((s, i) => <li key={s.name}><span className="route-count">{String(i + 1).padStart(2, "0")}</span><div><div className="route-stop-head"><h4>{s.name}</h4><span>~{Math.round(s.minutes * (pace === "sakit" ? 1.35 : 1))} dəq</span></div><p>{s.detail}</p><small>{s.note}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.map)}`} target="_blank" rel="noopener noreferrer">Xəritədə yeri göstər ↗</a></div></li>)}</ol>
          <div className="route-tip"><strong>Səfərdən əvvəl</strong><ul>{route.tips.map(t => <li key={t}>{t}</li>)}</ul><p>Bu siyahı turizm ideyasıdır, təhlükəsiz sürüş marşrutu və ya giriş icazəsi deyil. Mina riski olan ərazilərdə təsdiqlənmiş yoldan çıxmayın.</p><a href="https://my.gov.az/services/ishgaldan-azad-edilmish-erazilere-sefer-uchun-icaze?serviceLabel=TPLT" target="_blank" rel="noopener noreferrer">Rəsmi səfər icazəsini yoxla ↗</a></div>
          <button type="button" className="route-save" onClick={savePlan}>{saved ? "Plan cihazında saxlanıldı ✓" : "Səfər planımı saxla ↗"}</button>
        </div>
      </div>
    </section>
  );
}

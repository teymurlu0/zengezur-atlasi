"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import RealTerrain from "./components/RealTerrain";
import ArchiveGallery from "./components/ArchiveGallery";
import ViewportScene from "./components/ViewportScene";
import AtlasAssistant from "./components/AtlasAssistant";
import RoutePlanner from "./components/RoutePlanner";
import CommunityChat from "./components/CommunityChat";
import { districts, editorialSources, historyChapters, monuments, timeline, type Monument, type MonumentId } from "./data/heritage";

const MonumentStudio = dynamic(() => import("./components/MonumentStudio"), {
  ssr: false,
  loading: () => <div className="studio-loading">3D memarlıq səhnəsi hazırlanır…</div>,
});

const InfrastructureScene = dynamic(() => import("./components/InfrastructureScene"), {
  ssr: false,
  loading: () => <div className="studio-loading">İnfrastruktur səhnəsi yüklənir…</div>,
});

const panorama = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent("Landscape of Laçın District with Zabuxçay on the left.jpg")}?width=1600`;

export default function Home() {
  const [active, setActive] = useState<MonumentId>("khudafarin");
  const [detail, setDetail] = useState<Monument | null>(null);
  const [photoError, setPhotoError] = useState(false);
  const chosen = monuments.find((monument) => monument.id === active)!;

  useEffect(() => {
    if (!detail) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetail(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [detail]);

  const openStudio = (id: MonumentId) => {
    setActive(id);
    document.getElementById("studio")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="site" id="top">
      <header className="header">
        <a className="brand brand-atlas" href="#top" aria-label="ZƏNGƏZURİUM · ana səhifə">
          <span className="brand-atlas-main">Zəngəzur</span>
          <span className="brand-atlas-side">İUM<span>EST. 2026</span></span>
        </a>
        <nav className="nav" aria-label="Əsas menyu">
          <a href="#heritage">Abidələr</a>
          <a href="#studio">3D baxış</a>
          <a href="#history">Tarix</a>
          <a href="#archive">Arxiv</a>
          <a href="#infrastructure">Gələcək</a>
          <a href="#map">Xəritə</a>
          <a href="#route-planner">Səfər planı</a>
          <a href="#community">Söhbət</a>
          <a href="#sources">Mənbələr</a>
        </nav>
        <a className="header-link" href="#studio">3D kəşf et <span>↗</span></a>
      </header>

      <section className="hero-v3">
        <div className="hero-v3-copy">
          <span className="eyebrow"><span className="dot" /> YERLƏRİN HEKAYƏSİ</span>
          <h1>Daşda qalan <em>izlər.</em><br />Zamanda yaşayan <em>məkanlar.</em></h1>
          <p className="hero-lead">
            Arazın daş körpüləri, əsrlər əvvəl tikilmiş türbələr, yenidən qurulan yaşayış məkanları. Zəngəzurun tarixini abidələr və sənədlər danışır.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#heritage">Abidələri kəşf et <span>↗</span></a>
            <a className="btn btn-secondary" href="#history">Tarixi oxu <span>→</span></a>
          </div>
          <div className="hero-facts">
            <div><strong>03</strong><span>3D abidə səhnəsi</span></div>
            <div><strong>05</strong><span>Şərqi Zəngəzur rayonu</span></div>
            <div><strong>1305</strong><span>Türbənin kitabə tarixi</span></div>
          </div>
        </div>
        <div className="hero-v3-visual">
          {!photoError ? (
            <img src={panorama} alt="Laçın rayonu, Zabuxçay vadisinin panoraması" onError={() => setPhotoError(true)} />
          ) : (
            <div className="image-fallback">Laçın · Zabuxçay vadisi</div>
          )}
          <div className="hero-v3-photo-overlay">
            <span className="hero-photo-kicker">LAÇIN · ZABUXÇAY VADİSİ</span>
            <div>
              <strong>Məkanları yaxından tanı.</strong>
              <p>Tarix, memarlıq və coğrafiya bir səhifədə.</p>
            </div>
          </div>
          <a className="hero-photo-credit" href="https://commons.wikimedia.org/wiki/File:Landscape_of_La%C3%A7%C4%B1n_District_with_Zabux%C3%A7ay_on_the_left.jpg" target="_blank" rel="noreferrer">Foto: Golden · CC BY 4.0 ↗</a>
        </div>
      </section>

      <section className="intro-band">
        <span>Xudafərin</span><span>Məmmədbəyli</span><span>Laləzar</span>
      </section>

      <section className="section-intro" id="heritage">
        <div>
          <span className="kicker">TARİXİ ABİDƏLƏR</span>
          <h2>Üç abidə. Üç fərqli dövr.</h2>
        </div>
        <p>Araz və Bərgüşad üzərindəki körpülər, Zəngilandakı XIV əsr türbəsi. Hər abidənin öz quruluşu və öz hekayəsi var.</p>
      </section>

      <section className="monument-cards" aria-label="Tarixi abidələr">
        {monuments.map((monument, index) => (
          <article className="monument-card" key={monument.id}>
            <button className="monument-image-button" type="button" aria-label={`${monument.title} — ətraflı məlumat`} onClick={() => setDetail(monument)}>
              <img src={monument.photo} alt={monument.title} loading="lazy" />
              <span className="card-index">0{index + 1} / 03</span>
              <span className="image-chip">{monument.period}</span>
            </button>
            <div className="monument-body">
              <span className="monument-location">{monument.location}</span>
              <h3>{monument.title}</h3>
              <p>{monument.summary}</p>
              <div className="monument-card-actions">
                <button className="card-main-action" type="button" onClick={() => openStudio(monument.id)}>3D modeli aç <span>↗</span></button>
                <button className="card-detail-action" type="button" onClick={() => setDetail(monument)}>Tarixini oxu →</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="studio-section" id="studio">
        <div className="section-intro studio-heading">
          <div>
            <span className="kicker">ABİDƏLƏRƏ YAXINDAN BAX</span>
            <h2>Memarlığa yaxından bax.</h2>
          </div>
          <p>Xudafərinin tağları, Məmmədbəylinin səkkizguşəli planı və Laləzarın daş keçidi. Hər abidəyə ayrıca 3D baxış.</p>
        </div>
        <ViewportScene title="Memarlıq modelləri">
          <MonumentStudio selected={active} onSelect={setActive} />
        </ViewportScene>
        <div className="studio-explainer">
          <div>
            <span className="kicker">SEÇİLMİŞ ABİDƏ</span>
            <h3>{chosen.title}</h3>
            <p>{chosen.description[0]}</p>
            <div className="feature-pills">
              {chosen.details.map((detailText) => <span key={detailText}>{detailText}</span>)}
            </div>
          </div>
          <div className="studio-explainer-aside">
            <span className="small-label">MEMARLIQ QEYDİ</span>
            <p>{chosen.dimensions}</p>
            <button className="text-button" type="button" onClick={() => setDetail(chosen)}>Tam tarix və mənbələr <span>↗</span></button>
          </div>
        </div>
      </section>

      <section className="history-chapters" id="deep-history">
        <div className="section-intro history-chapters-head">
          <div>
            <span className="kicker">KEÇMİŞDƏN SƏHİFƏLƏR</span>
            <h2>Əsrlərin yaddaşında qalan izlər.</h2>
          </div>
          <p>Daş keçidlər, kitabələr, çay vadiləri və köhnə xəritələr bölgənin müxtəlif əsrlərini bir araya gətirir.</p>
        </div>
        <div className="chapters-grid">
          {historyChapters.map((chapter, index) => (
            <article className="chapter-card" key={chapter.title}>
              <div className="chapter-top"><span>0{index + 1}</span><span>{chapter.label}</span></div>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
              <a href={chapter.source} target="_blank" rel="noopener noreferrer">Mənbəni aç ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section" id="history">
        <div className="story-title">
          <span className="kicker">TARİX BOYU</span>
          <h2>Keçmişdən bu günə.</h2>
          <p>
            Şərqi Zəngəzur bu gün Azərbaycanın beş rayonundan ibarət iqtisadi bölgəsidir.
            Tarixi Zəngəzur coğrafiyası isə daha geniş ərazini əhatə edir; onun bir hissəsi
            hazırda Ermənistanın Sünik vilayətindədir.
          </p>
          <a href="https://president.az/ru/articles/view/52389" target="_blank" rel="noreferrer">2021-ci il fərmanına bax ↗</a>
        </div>
        <div className="story-timeline">
          {timeline.map((event, index) => (
            <article className="timeline-entry" key={event.date}>
              <span className="timeline-dot">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <time>{event.date}</time>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
                <a href={event.source} target="_blank" rel="noopener noreferrer">Mənbəyə bax ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ArchiveGallery />

      <section className="infrastructure-section" id="infrastructure">
        <div className="section-intro infra-head">
          <div>
            <span className="kicker">YOLLAR VƏ İNKİŞAF</span>
            <h2>Dəyişən yollar. Yeni əlaqələr.</h2>
          </div>
          <p>
            Dağlıq ərazidə yeni nəqliyyat xətti necə yaranır? Landşaftdan tikintiyə, körpülərdən relslərə beş mərhələli vizual hekayə.
          </p>
        </div>
        <ViewportScene title="Nəqliyyat və infrastruktur simulyasiyası">
          <InfrastructureScene />
        </ViewportScene>
        <div className="infrastructure-facts">
          <article><span>2025</span><h3>Kəlbəcər–Laçın magistralı</h3><p>Rəsmi məlumatda 75,8 km yol və çoxsaylı tunellərdən bəhs edilir. Magistralın tunelləri və yol qovşaqları mərhələli inşa olunub.</p><a target="_blank" rel="noreferrer" href="https://president.az/en/articles/view/68997/print">Rəsmi məlumat ↗</a></article>
          <article><span>2026</span><h3>Horadiz–Ağbənd dəmir yolu</h3><p>Müxtəlif hissələr üzrə tikinti və müvəqqəti istismar mərhələləri var. Xəttin müxtəlif hissələrində işlər mərhələlərlə aparılır.</p><a target="_blank" rel="noreferrer" href="https://president.az/en/articles/view/73251/print">Rəsmi məlumat ↗</a></article>
          <article><span>2025</span><h3>TRIPP və regional əlaqələr</h3><p>2025-ci il bəyannaməsində Ermənistan ərazisindəki nəqliyyat təşəbbüsü qeyd olunur. Təşəbbüs Ermənistan ərazisindən keçən bağlantıya aiddir.</p><a target="_blank" rel="noreferrer" href="https://president.az/en/articles/view/69572/print">Bəyannamə ↗</a></article>
        </div>
      </section>

      <section className="district-section" id="districts">
        <div className="section-intro district-intro">
          <div>
            <span className="kicker">BÖLGƏNİ TANI</span>
            <h2>Şərqi Zəngəzurun beş rayonu.</h2>
          </div>
          <p>Cəbrayıldan Kəlbəcərə uzanan beş rayon — fərqli landşaftlar və tarixi məkanlar.</p>
        </div>
        <div className="district-list">
          {districts.map((district, index) => (
            <div className="district-item" key={district.name}>
              <span className="district-index">0{index + 1}</span>
              <div><h3>{district.name}</h3><p>{district.note}</p></div>
              <button type="button" aria-label={`${district.name} üzrə 3D səhnəyə keç`} onClick={() => district.name === "Laçın" || district.name === "Kəlbəcər" ? document.getElementById("map")?.scrollIntoView({ behavior: "smooth" }) : openStudio(district.name === "Cəbrayıl" ? "khudafarin" : district.name === "Qubadlı" ? "lalezar" : "mammadbayli")}>{district.name === "Laçın" || district.name === "Kəlbəcər" ? "Relyefə bax ↗" : "3D baxış ↗"}</button>
            </div>
          ))}
        </div>
        <p className="district-note">Relyef: Zəngilan ətrafından seçilmiş coğrafi fraqment.</p>
      </section>

      <section className="map-section" id="map">
        <div className="section-intro">
          <div>
            <span className="kicker">DAĞLAR VƏ VADİLƏR</span>
            <h2>Zəngilanın 3D ərazi görünüşü.</h2>
          </div>
          <p>Araz vadisinə yaxın yüksəkliklər və dağ silsilələri — Zəngilan ətrafından bir relyef fraqmenti.</p>
        </div>
        <div className="terrain-stage">
          <ViewportScene title="Zəngilan relyefi">
            <RealTerrain />
          </ViewportScene>
          <div className="terrain-caption"><span>RELYEF · ZƏNGİLAN ƏTRAFI</span><span>Siçanla döndər · yaxınlaş</span></div>
        </div>
      </section>

      <RoutePlanner />

      <CommunityChat />

      <section className="source-section" id="sources">
        <div>
          <span className="kicker">İSTİNADLAR</span>
          <h2>Məlumatlar haradandır?</h2>
          <p>Köhnə xəritələrdən rəsmi sənədlərə qədər bütün əsas istinadlar burada toplanıb.</p>
        </div>
        <div className="source-links">
          {editorialSources.map((source, i) => (
            <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.url}>
              <span>{String(i + 1).padStart(2, "0")}</span><strong>{source.name}</strong><span>↗</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div><strong>ZƏNGƏZURİUM</strong><span>Tarix · Memarlıq · Coğrafiya</span></div>
        <p>Arxiv, abidələr və memarlıq təsvirləri. <a href="#sources">Mənbələr və model qeydləri ↗</a></p>
        <a href="#top">Yuxarı ↑</a>
      </footer>

      <AtlasAssistant />

      {detail && (
        <div className="modal-backdrop" role="presentation" onClick={() => setDetail(null)}>
          <div className="modal-panel" role="dialog" aria-modal="true" aria-label={`${detail.title} haqqında məlumat`} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Pəncərəni bağla" onClick={() => setDetail(null)}>×</button>
            <div className="modal-image-wrap"><img src={detail.photo} alt={detail.title} /></div>
            <div className="modal-content">
              <span className="kicker">{detail.location} · {detail.period}</span>
              <h2>{detail.title}</h2>
              {detail.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="feature-pills">{detail.details.map((fact) => <span key={fact}>{fact}</span>)}</div>
              <div className="modal-sources">
                <strong>İstinadlar</strong>
                {detail.sources.map((source) => <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.url}>{source.label} ↗</a>)}
                <a href={detail.photoPage} target="_blank" rel="noopener noreferrer">Foto: {detail.photoCredit} · {detail.license} ↗</a>
              </div>
              <button type="button" className="btn btn-primary modal-action" onClick={() => { const id = detail.id; setDetail(null); requestAnimationFrame(() => openStudio(id)); }}>3D modelə keç ↗</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

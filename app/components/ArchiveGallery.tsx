"use client";

import { useState } from "react";

const mapSource = "https://commons.wikimedia.org/wiki/File:Uyezd_of_Zangezur.JPG";
const mapImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Uyezd_of_Zangezur.JPG";
const signedPdf = "https://mfa.gov.az/files/Birge%20Beyanname-ABS/JD_AZE_ARM_final_witness%20signature.pdf";

export default function ArchiveGallery() {
  const [showDocument, setShowDocument] = useState(false);
  const [mapError, setMapError] = useState(false);
  return (
    <section className="archive-section" id="archive">
      <div className="section-intro archive-head">
        <div>
          <span className="kicker">04 / ARXİV MATERIALI</span>
          <h2>Sənədlər və keçmişin izləri.</h2>
        </div>
        <p>
          1903-cü ilin Zəngəzur qəzası xəritəsi və 2025-ci il Vaşinqton bəyannaməsinin orijinalı.
        </p>
      </div>
      <div className="archive-grid">
        <article className="archive-card archive-map-card">
          <a href={mapSource} target="_blank" rel="noopener noreferrer" aria-label="1903-cü il xəritəsinin orijinalını aç">
            <div className="archive-image-wrap">
              {!mapError ? (
                <img src={mapImage} loading="lazy" width="672" height="722"
                  alt="1903-cü ildə Yelizavetpol quberniyasına daxil Zəngəzur qəzasını göstərən tarixi xəritə"
                  onError={() => setMapError(true)} />
              ) : (
                <div className="archive-image-fallback">1903 · ZƏNGƏZUR QƏZASI<br/>Orijinal xəritəni aç ↗</div>
              )}
              <span className="archive-archive-chip">ARXİV XƏRİTƏSİ · 1903</span>
            </div>
          </a>
          <div className="archive-copy">
            <span>RUSİYA İMPERİYASI DÖVRÜ · 1903</span>
            <h3>Zəngəzur qəzasının tarixi xəritəsi</h3>
            <p>
              Yelizavetpol quberniyası dövründəki inzibati bölgünü göstərir.
              Bugünkü Azərbaycan və Ermənistan sərhədləri ilə eyniləşdirilməməlidir.
            </p>
            <a href={mapSource} target="_blank" rel="noopener noreferrer">Wikimedia Commons · ictimai mülkiyyət ↗</a>
          </div>
        </article>
        <article className="archive-card archive-document-card">
          <div className="archive-document-preview" aria-label="2025-ci il orijinal bəyannaməsinə keçid">
            <span className="doc-overline">RƏSMİ MƏNBƏ · 08.08.2025</span>
            <div className="document-paper" aria-hidden="true">
              <span>JOINT DECLARATION</span>
              <strong>Washington D.C.</strong>
              <div className="paper-rule" />
              <i /> <i /> <i /> <i />
              <small>İlkin sənədin məzmununa yönləndirən dizayn maketi</small>
            </div>
            <span className="archive-archive-chip">SƏNƏD KEÇİDİ · 2025</span>
          </div>
          <div className="archive-copy">
            <span>AZƏRBAYCAN · ERMƏNİSTAN · ABŞ</span>
            <h3>2025-ci il Vaşinqton bəyannaməsi</h3>
            <p>
              Nəqliyyat əlaqələri və TRIPP layihəsi barədə rəsmi bəyannamə.
              Sənədin mətni və imza səhifəsi rəsmi PDF-də təqdim olunur.
            </p>
            <div className="archive-actions">
              <button type="button" onClick={() => setShowDocument((v) => !v)}>
                {showDocument ? "PDF baxışını bağla ↑" : "Orijinal PDF-yə bax ↓"}
              </button>
              <a href={signedPdf} target="_blank" rel="noopener noreferrer">Rəsmi mənbə ↗</a>
            </div>
          </div>
        </article>
      </div>
      {showDocument && (
        <div className="archive-pdf-panel">
          <div><strong>Rəsmi sənədin PDF baxışı</strong><a href={signedPdf} target="_blank" rel="noopener noreferrer">Yeni tabda aç ↗</a></div>
          <iframe src={signedPdf} title="2025-ci il rəsmi Vaşinqton bəyannaməsi" loading="lazy" />
          <p>PDF brauzerdə görünməzsə, yuxarıdakı “Yeni tabda aç” keçidindən istifadə et.</p>
        </div>
      )}
      <p className="archive-editorial-note">1903-cü il xəritəsi dövrün inzibati bölgüsünü göstərir; bugünkü sərhədlərin xəritəsi deyil.</p>
    </section>
  );
}

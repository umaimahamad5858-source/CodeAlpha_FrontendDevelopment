:root {
  --bg: #f1f3f7;
  --ink: #1d2433;
  --muted: #5d6a85;
  --brand: #3d5afe;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: "Segoe UI", system-ui, sans-serif;
  line-height: 1.5;
}

.top { text-align: center; padding: 40px 16px 24px; }
.top h1 { font-size: clamp(1.8rem, 5vw, 2.8rem); }
.top p { color: var(--muted); margin: 8px 0 22px; }

.filters { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
.filter {
  border: 2px solid var(--brand);
  background: transparent;
  color: var(--brand);
  padding: 8px 20px;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.25s, color 0.25s;
}
.filter:hover, .filter.active { background: var(--brand); color: #fff; }
.filter:focus-visible { outline: 3px solid #ffb300; outline-offset: 2px; }
.item:focus-visible { outline: 3px solid #ffb300; outline-offset: 3px; }

.gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 16px 48px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}

.item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 4 / 3;
  cursor: pointer;
  background: #dde2ec;
  box-shadow: 0 4px 14px rgba(29, 36, 51, 0.15);
  animation: fadeIn 0.45s ease;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.item figcaption {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 28px 14px 12px;
  color: #fff;
  font-weight: 600;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.item:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(29, 36, 51, 0.25); }
.item:hover img { transform: scale(1.08); }
.item:hover figcaption { transform: translateY(0); }
.item.hide { display: none; }

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

/* ---------- Lightbox ---------- */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(10, 14, 24, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.lightbox.open { opacity: 1; visibility: visible; }

.lb-content { max-width: 86vw; text-align: center; }
.lb-content img {
  max-width: 100%;
  max-height: 78vh;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
}
.lb-content figcaption { color: #fff; margin-top: 12px; font-size: 1.05rem; }

.lb-btn {
  position: absolute;
  border: none;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  cursor: pointer;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  transition: background 0.2s;
}
.lb-btn:hover { background: rgba(255, 255, 255, 0.3); }
.lb-btn:focus-visible { outline: 3px solid #ffb300; }
.lb-close { top: 18px; right: 18px; font-size: 2rem; line-height: 1; }
.lb-prev { left: 16px; top: 50%; transform: translateY(-50%); }
.lb-next { right: 16px; top: 50%; transform: translateY(-50%); }

@media (max-width: 600px) {
  .gallery { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 10px 10px 36px; }
  .lb-btn { width: 40px; height: 40px; }
  .lb-prev { left: 6px; }
  .lb-next { right: 6px; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

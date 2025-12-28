// header con sombra al hacer scroll
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () =>
  header.classList.toggle("scrolled", window.scrollY > 2)
);

// cerrar menú al click en móvil
document.querySelectorAll("#menu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.querySelector("#menu");
    if (!menu.classList.contains("show")) return;
    bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

// bigtype: mover letras con scroll
const bigTypeSection = document.querySelector("#bigType");
const bigTypeLines = document.querySelector("#bigTypeLines");
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function updateBigType() {
  if (!bigTypeSection || !bigTypeLines) return;

  const rect = bigTypeSection.getBoundingClientRect();
  const vh = window.innerHeight;

  const total = bigTypeSection.offsetHeight - vh;
  const scrolled = clamp(-rect.top, 0, total);
  const t = total > 0 ? scrolled / total : 0;

  bigTypeLines.style.setProperty("--ty", `${(0.5 - t) * (vh * 0.45)}px`);
}

window.addEventListener("scroll", updateBigType, { passive: true });
window.addEventListener("resize", updateBigType);
updateBigType();

document.addEventListener("DOMContentLoaded", () => {
  // --- modal posters (y también 3D porque comparte clase) ---
  const posterOverlay = document.getElementById("posterModalOverlay");
  const posterClose = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalImg = document.getElementById("modalImage");

  const openPoster = (el) => {
    modalTitle.innerHTML = el.getAttribute("data-title");
    modalDesc.innerHTML = el.getAttribute("data-description");
    modalImg.src = el.getAttribute("data-image");
    modalImg.alt = el.getAttribute("data-title");
    posterOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  const closePoster = () => {
    posterOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => (modalImg.src = ""), 300);
  };

  document
    .querySelectorAll(".js-open-modal")
    .forEach((item) => item.addEventListener("click", () => openPoster(item)));
  posterClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closePoster();
  });

  // --- modal albums ---
  const albumOverlay = document.getElementById("albumModalOverlay");
  const albumClose = document.getElementById("albumModalCloseBtn");
  const albTitle = document.getElementById("albModalTitle");
  const albMeta = document.getElementById("albModalMeta");
  const albDesc = document.getElementById("albModalDesc");
  const albImg = document.getElementById("albModalImg");

  const openAlbum = (el) => {
    albTitle.innerHTML = el.getAttribute("data-title");
    albMeta.textContent = el.getAttribute("data-meta");
    albDesc.innerHTML = el.getAttribute("data-desc");
    albImg.src = el.getAttribute("data-image");
    albumOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  const closeAlbum = () => {
    albumOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => (albImg.src = ""), 300);
  };

  document
    .querySelectorAll(".js-open-album")
    .forEach((item) => item.addEventListener("click", () => openAlbum(item)));
  albumClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAlbum();
  });

  // cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (posterOverlay.classList.contains("is-active")) closePoster();
    if (albumOverlay.classList.contains("is-active")) closeAlbum();
  });

  // --- gallery toggle ---
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const items = gallery.querySelectorAll("[data-gallery-item]");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const active = item.classList.contains("is-active");
        items.forEach((it) => it.classList.remove("is-active"));
        gallery.classList.remove("has-active");
        if (!active) {
          item.classList.add("is-active");
          gallery.classList.add("has-active");
        }
      });
    });
  });
});

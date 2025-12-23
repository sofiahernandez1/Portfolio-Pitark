// 1) Cambiar estilo del header al hacer scroll
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 2) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// 2) Cerrar el menú Bootstrap al clicar un enlace en móvil
document.querySelectorAll("#menu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menuEl = document.querySelector("#menu");
    if (menuEl.classList.contains("show")) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(menuEl);
      bsCollapse.hide();
    }
  });
});

// 3) Letras grandes suben con el scroll dentro de .bigtype
const bigTypeSection = document.querySelector("#bigType");
const bigTypeLines = document.querySelector("#bigTypeLines");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function updateBigType() {
  if (!bigTypeSection || !bigTypeLines) return;

  const rect = bigTypeSection.getBoundingClientRect();
  const vh = window.innerHeight;

  const total = bigTypeSection.offsetHeight - vh;
  const scrolled = clamp(-rect.top, 0, total);
  const t = total > 0 ? scrolled / total : 0;

  const maxMove = vh * 0.45;
  const ty = (0.5 - t) * maxMove;

  bigTypeLines.style.setProperty("--ty", `${ty}px`);
}

window.addEventListener("scroll", updateBigType, { passive: true });
window.addEventListener("resize", updateBigType);
updateBigType();

// ==========================================
// LÓGICA DE MODALES (POSTER + ALBUM)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Main.js loaded and DOM ready - Initializing Modals");

  // --- 1. MODAL POSTERS ---
  const posterItems = document.querySelectorAll(".js-open-modal");
  const modalOverlay = document.getElementById("posterModalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalImage = document.getElementById("modalImage");

  function openModal(e) {
    const clickedPoster = e.currentTarget;
    modalTitle.innerHTML = clickedPoster.getAttribute("data-title");
    modalDesc.innerHTML = clickedPoster.getAttribute("data-description");
    modalImage.src = clickedPoster.getAttribute("data-image");
    modalImage.alt = clickedPoster.getAttribute("data-title");

    if (modalOverlay) modalOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    if (modalImage) {
      setTimeout(() => {
        modalImage.src = "";
      }, 300);
    }
  }

  if (posterItems)
    posterItems.forEach((item) => item.addEventListener("click", openModal));
  if (modalCloseBtn)
    modalCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeModal();
    });

  // --- 2. MODAL ALBUMS ---
  const albumItems = document.querySelectorAll(".js-open-album");
  const albumOverlay = document.getElementById("albumModalOverlay");
  const albumCloseBtn = document.getElementById("albumModalCloseBtn");

  const albTitle = document.getElementById("albModalTitle");
  const albMeta = document.getElementById("albModalMeta");
  const albDesc = document.getElementById("albModalDesc");
  const albImg = document.getElementById("albModalImg");

  function openAlbumModal(e) {
    const item = e.currentTarget;

    // Inyectar datos
    albTitle.innerHTML = item.getAttribute("data-title");
    albMeta.textContent = item.getAttribute("data-meta");
    albDesc.innerHTML = item.getAttribute("data-desc");
    albImg.src = item.getAttribute("data-image");

    if (albumOverlay) albumOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeAlbumModal() {
    if (albumOverlay) albumOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (albImg) albImg.src = "";
    }, 300);
  }

  if (albumItems)
    albumItems.forEach((item) =>
      item.addEventListener("click", openAlbumModal)
    );
  if (albumCloseBtn)
    albumCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAlbumModal();
    });

  // --- 3. CERRAR AMBOS CON ESC ---
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (modalOverlay && modalOverlay.classList.contains("is-active"))
        closeModal();
      if (albumOverlay && albumOverlay.classList.contains("is-active"))
        closeAlbumModal();
    }
  });
});

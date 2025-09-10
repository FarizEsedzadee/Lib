export function initCategoryPopUp() {
  const catalogBtn = document.querySelector(".center button");
  const modal = document.getElementById("catalog-modal");
  const closeBtn = document.getElementById("close-modal");

  if (!catalogBtn || !modal || !closeBtn) return;

  catalogBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
}

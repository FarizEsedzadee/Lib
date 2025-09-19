import { getAllBooks } from "./service.js";

// =======================
// LocalStorage funksiyaları
// =======================
export function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

export function isInWishlist(id) {
  return getWishlist().includes(id.toString());
}

export function toggleWishlist(id) {
  const wishlist = getWishlist();
  const idStr = id.toString();

  const updated = wishlist.includes(idStr)
    ? wishlist.filter(item => item !== idStr)
    : [...wishlist, idStr];

  localStorage.setItem("wishlist", JSON.stringify(updated));
}

// =======================
// Wishlist səhifəsini render et
// =======================
const container = document.getElementById("wishlist-books");
const emptyMessage = document.getElementById("empty-message");

async function loadWishlistPage() {
  const allBooks = await getAllBooks();
  const wishlistIds = getWishlist();

  const wishlistBooks = allBooks.filter(book =>
    wishlistIds.includes(book.id.toString())
  );

  renderWishlistBooks(wishlistBooks);
}

function renderWishlistBooks(books) {
  container.innerHTML = "";

  if (books.length === 0) {
    emptyMessage.classList.remove("hidden");
    return;
  } else {
    emptyMessage.classList.add("hidden");
  }

  books.forEach(book => {
    const card = document.createElement("div");
    card.className =
      "relative w-full bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300";

    card.innerHTML = `
      <button class="wishlist-btn absolute top-3 right-3 text-xl ${
        isInWishlist(book.id) ? "text-red-500" : "text-gray-300"
      }" data-id="${book.id}">
        <i class="fas fa-heart"></i>
      </button>

      <a target="_blank" class="inline-block h-[340px] w-[226px]" href="assets/pages/detail.html?id=${book.id}">
        <img class="p-4 rounded-t-xl object-cover !rounded-[24px] h-full w-full" src="${book.book_img}" alt="${book.book_name}" />
      </a>

      <div class="px-4 pb-4 flex flex-col gap-2">
        <h5 class="text-[16px] font-bold text-[#0F172A] truncate">${book.book_name}</h5>
        <div class="flex items-center gap-2">
          <span class="text-[18px] font-semibold text-gray-900">${book.sale}₼</span>
          <span class="text-[14px] text-gray-500 line-through">${book.price}₼</span>
        </div>
      </div>
    `;

    const heartBtn = card.querySelector(".wishlist-btn");
    heartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleWishlist(book.id);
      card.remove();

      if (container.children.length === 0) {
        emptyMessage.classList.remove("hidden");
      }
    });

    container.appendChild(card);
  });
}

if (document.getElementById("wishlist-books")) {
  loadWishlistPage();
}

import { getAllBooks } from "./service.js";
import { toggleWishlist, isInWishlist } from "./wishlist.js";

const booksContainer = document.getElementById("books");
const searchInput = document.querySelector("#searchInp");

async function useFetch() {
  const data = await getAllBooks();
  renderBooks(data);
  searchInput.addEventListener("input", () => {
    const filtered = filterBooks(data, searchInput.value);
    renderBooks(filtered);
  });
}

function filterBooks(data, query) {
  return data.filter(item =>
    item.book_name.toLowerCase().includes(query.toLowerCase().trim())
  );
}

function renderBooks(data) {
  booksContainer.innerHTML = "";

  data.forEach(item => {
    const isWishlisted = isInWishlist(item.id);

    const card = document.createElement("div");
    card.className =
      "relative w-full bg-white border border-gray-200 rounded-xl hover:shadow-md hover:shadow-lg transition-shadow duration-300";

    card.innerHTML = `
      <button class="wishlist-btn absolute top-3 right-3 text-xl ${
        isWishlisted ? "text-red-500" : "text-gray-300"
      }" data-id="${item.id}">
        <i class="fas fa-heart"></i>
      </button>

      <a target="_blank" class="inline-block h-[340px] w-[226px]" href="assets/pages/detail.html?id=${item.id}">
        <img class="p-4 rounded-t-xl object-cover !rounded-[24px] h-full w-full" src="${item.book_img}" alt="${item.title}" />
      </a>

      <div class="px-4 pb-4 flex flex-col gap-2">
        <a href="#">
          <h5 class="text-[16px] font-bold text-[#0F172A] hover:text-blue-600 transition duration-200 leading-[1.25] truncate">
            ${item.book_name}
          </h5>
        </a>
        <div class="flex items-center justify-start gap-2">
          <span class="text-[18px] font-semibold text-gray-900 leading-[1.25]">${item.sale}₼</span>
          <span class="text-[14px] font-semibold text-gray-500 leading-[1.25] line-through">${item.price}₼</span>
        </div>

        ${renderRating(item.rating)}
      </div>
    `;

    const heartBtn = card.querySelector(".wishlist-btn");
    heartBtn.addEventListener("click", e => {
      e.preventDefault();
      toggleWishlist(item.id);
      heartBtn.classList.toggle("text-red-500");
      heartBtn.classList.toggle("text-gray-300");
    });

    booksContainer.appendChild(card);
  });
}

function renderRating(rating) {
  if (!rating) return "";
  const fullStars = "★".repeat(Math.floor(rating));
  const emptyStars = "★".repeat(5 - Math.floor(rating));
  return `
    <div class="flex items-center mt-4 mb-3">
      <div class="flex items-center space-x-1 text-yellow-400">
        <span>${fullStars}</span><span class="text-gray-300">${emptyStars}</span>
      </div>
      <span class="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">${rating}</span>
    </div>
  `;
}

useFetch();

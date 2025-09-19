import { getAllBooks } from "./service.js";

const books = document.getElementById('books');

async function useFetch() {
  const data = await getAllBooks()
  searchInp.addEventListener('input', () => {
    const filtered = filterBooks(data);
    books.innerHTML = "";
    printAllBooks(filtered);
  }); printAllBooks(data)
}

useFetch()

const searchInp = document.querySelector('#searchInp');

function filterBooks(data) {
  const value = searchInp.value.toLowerCase().trim();
  return data.filter(item => item.book_name.toLowerCase().includes(value));
}


function printAllBooks(data) {
  data.forEach(item => {
    books.innerHTML += `
<div class="w-full bg-white border border-gray-200 rounded-xl hover:shadow-md hover:shadow-lg transition-shadow duration-300">
  <a target="_blank" class="inline-block h-[340px] w-[226px]" href="assets/pages/detail.html?id=${item.id}">
    <img class="p-4 rounded-t-xl object-cover !rounded-[24px] h-full w-full" src="${item.book_img}" alt="${item.title}" />
  </a>
  <div class="px-4 pb-4 flex flex-col gap-2">
    <a href="#">
      <h5 class="text-[16px] font-bold text-[#0F172A] hover:text-blue-600 transition duration-200 leading-[1.25] truncate">${item.book_name}</h5>
    </a>
    <div class="flex items-center justify-start gap-2">
      <span class="text-[18px] font-semibold text-gray-900 leading-[1.25]">${item.sale}₼</span>
      <span class="text-[14px] font-semibold text-gray-500 leading-[1.25] line-through">${item.price}₼</span>
    </div>
  </div>
</div>`
  });
}

/* 
   <div class="flex items-center mt-4 mb-3">
      <div class="flex items-center space-x-1">
        ${'★'.repeat(Math.floor(item.rating))}<span class="text-gray-300">${'★'.repeat(5 - Math.floor(item.rating))}</span>
      </div>
      <span class="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">${item.rating}</span>
    </div>
*/
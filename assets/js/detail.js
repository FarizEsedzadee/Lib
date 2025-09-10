import { getBookById, getSimilarBooks } from "./service.js";

const query = location.search;
const id = new URLSearchParams(query).get("id")
console.log(id);

async function useFetch() {
    const book = await getBookById(id);
    printBookById(book)

    const similar = await getSimilarBooks(id);
    printSimilarBooks(similar);
}
useFetch()

const bookDetail = document.querySelector('#book-detail')
const bookDetail2 = document.querySelector('#book-detail-2')
const similarBooks = document.querySelector('#similar-books')
function printBookById(data) {
    bookDetail.innerHTML = `
        <div class="max-w-[1460px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
            <div class="flex justify-center item-start">
                <img src="${data.book_img}" alt="${data.book_name}"
                    class="w-[320px] h-auto rounded-lg shadow-md border">
            </div>

            <div class="space-y-3">
                <p class="text-sm text-gray-500">Kitab Kodu: <span class="font-medium text-gray-700">${data.id}</span></p>
                <h1 class="text-[32px] font-bold text-gray-900">${data.book_name}</h1>
                <p class="text-[16px] text-gray-600 italic">${data.author}</p>
                <p class="text-[28px] font-bold text-red-600">${data.price} ₼</p>

                <button
                    class="mb-[50px] bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 shadow">
                    <i class="fa-solid fa-cart-plus text-lg cursor-pointer"></i>
                    Səbətə əlavə et
                </button>

                <div class="flex items-center justify-between gap-6 text-sm text-gray-500">
                    <span class="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                        <i class="fa-regular fa-heart text-lg"></i> Seçilmiş
                    </span>
                    <span class="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                        <i class="fa-regular fa-circle-question text-lg"></i> Sizə necə kömək edə bilərik?
                    </span>
                </div>

                <div class="border-t pt-6 space-y-2 text-sm text-gray-700">
                    <h3 class="font-semibold text-base">Çatdırılma Məlumatı</h3>
                    <ul class="list-disc list-inside space-y-1">
                        <li><strong>Mağazadan təhvil alma:</strong> Pulsuz.</li>
                        <li><strong>Kuryer (Bakı):</strong> 24 saat. 30 ₼+ sifarişlərdə — pulsuz.</li>
                        <li><strong>Bölgələrə:</strong> 3-5 iş günü ərzində.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    bookDetail2.innerHTML = `
        <div class="max-w-[1460px] mx-auto px-4 mt-10">
            <div class="flex gap-6 border-b">
                <button class="py-2 font-semibold text-red-500 border-b-2 border-red-500 cursor-default">Təsvir</button>
                <button class="py-2 text-gray-600 hover:text-red-500 cursor-pointer">Xüsusiyyəti</button>
                <button class="py-2 text-gray-600 hover:text-red-500 cursor-pointer">İstifadəçi rəyləri</button>
            </div>
            <div class="py-6 text-gray-700 leading-relaxed text-[15px]">
                ${data.description}
            </div>
        </div>
    `;
}


function printSimilarBooks(data) {
    console.log(data);
    data.forEach(item => {
        similarBooks.innerHTML += `
     <div class="w-full bg-white border border-gray-200 rounded-xl hover:shadow-md hover:shadow-lg transition-shadow duration-300">
      <a target="_blank" class="inline-block h-[340px] w-[226px]" href="assets/pages/detail.html?id=${item.id}">
        <img class="p-4 rounded-t-xl object-cover !rounded-[24px] h-full w-full" src="${item.book_img}" alt="${item.title}" />
      </a>
      <div class="px-4 pb-4 flex flex-col gap-2">
        <a href="#">
          <h5 class="text-[16px] font-bold text-[#0F172A] hover:text-blue-600 transition duration-200 leading-[1.25] truncate">${item.book_name}</h5>
        </a>
        <div class="flex datas-center justify-start gap-2">
          <span class="text-[18px] font-semibold text-gray-900 leading-[1.25]">${item.sale}₼</span>
          <span class="text-[14px] font-semibold text-gray-500 leading-[1.25] line-through">${item.price}₼</span>
        </div>
      </div>
    </div>`
    });
}
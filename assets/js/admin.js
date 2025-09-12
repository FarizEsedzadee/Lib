import { getAllBooks } from './service.js'

const books = document.querySelector('#books')

async function useFetch() {
    const data = await getAllBooks();   
    printAllBooks(data)
}
useFetch()

function printAllBooks(data) {
    data.forEach(item => {
        books.innerHTML += `<tr class="hover:bg-gray-100">
                                <td class="px-4 py-2">${item.id}</td>
                                <td class="px-4 py-2">${item.book_name}</td>
                                <td class="px-4 py-2">${item.author}</td>
                                <td class="px-4 py-2"><img class="w-[50px] h-[60px] object-cover" src="${item.book_img}" /></td>
                                <td class="px-4 py-2 space-x-2">
                                    <button class="text-blue-600 hover:underline">Redaktə Et</button>
                                    <button class="text-red-600 hover:underline">Sil</button>
                                </td>
                            </tr>`
    });
}


function addBook(data) {
    
}
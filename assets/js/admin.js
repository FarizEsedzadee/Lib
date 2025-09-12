import { getAllBooks } from './service.js'

const books = document.querySelector('#books')

async function useFetch() {
    const data = await getAllBooks();
    console.log(data);
    
    printAllBooks(data)
}
useFetch()

function printAllBooks(data) {
    data.forEach(item => {
        books.innerHTML += `<tr class="hover:bg-gray-100">
                                <td class="px-4 py-2">1</td>
                                <td class="px-4 py-2">Cinayət və Cəza</td>
                                <td class="px-4 py-2">Dostoyevski</td>
                                <td class="px-4 py-2 space-x-2">
                                    <button class="text-blue-600 hover:underline">Redaktə</button>
                                    <button class="text-red-600 hover:underline">Sil</button>
                                </td>
                            </tr>`
    });
}
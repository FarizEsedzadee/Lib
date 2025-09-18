import { createNewBook, editBookById, deleteBookById, getAllBooks } from './service.js'
const deleteBookInp = document.querySelector('#deleteBookInp');
const books = document.querySelector('#books')
const booksCount = document.querySelector('#all-books-count');
const addForm = document.querySelector('.addForm');

async function useFetch() {
    const data = await getAllBooks();
    printAllBooks(data)
}
useFetch()


function printAllBooks(data) {  
    books.innerHTML = '';
    booksCount.innerHTML = data.length;
    data.forEach(item => {
        books.innerHTML += `
            <tr class="bg-white border-b hover:bg-red-50 odd:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 font-medium text-gray-900">${item.id}</td>
                <td class="px-6 py-4">${item.book_name}</td>
                <td class="px-6 py-4">${item.author}</td>
                <td class="px-6 py-4">
                    <img class="w-16 h-20 object-cover rounded-md shadow-sm" src="${item.book_img}" alt="${item.book_name} Qapağı" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap space-x-3">
                    <button class="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-transform duration-200"
                        onclick='openEditModal(${JSON.stringify(item)})' title="Redaktə Et">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7 1l4-4m-9 9l4-4m-1 5l-5 5m-1-5l5 5M12 4l3-3m-3 3l-3 3m10 5l-5-5m5 5l-5-5M12 4l-4 4" />
                        </svg>
                    </button>
                    <button onclick="handleDelete(${item.id})"
                        class="text-red-600 hover:text-red-800 transform hover:scale-110 transition-transform duration-200" title="Sil">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    });
}

const addInputs = document.querySelectorAll('.addInputs');
document.handleCreate = async (e) => {
    e.preventDefault();
    const obj = {
        book_name: addInputs[0].value,
        book_img: addInputs[1].value,
        price: Number(addInputs[2].value),
        sale: addInputs[3].value || 0,
        author: addInputs[4].value,
        genre: addInputs[5].value,
        category: addInputs[6].value,
        altCategory: addInputs[7].value,
        publisher: addInputs[8].value,
        description: addInputs[9].value,
        sellCount: 0,
        pageCount: 0,
        stockCount: 0
    }

    const fieldNames = {
        book_name: "Kitab adı",
        book_img: "Kitab şəkli",
        price: "Qiymət",
        sale: "Endirim",
        author: "Müəllif",
        genre: "Janr",
        category: "Kateqoriya",
        altCategory: "Alt kateqoriya",
        publisher: "Nəşriyyat",
        description: "Təsvir"
    };

    for (const [key, value] of Object.entries(obj)) {
        if (key === "sale") continue;
        if (key === "price") {
            if (value == null || isNaN(value)) {
                showAlert({
                    title: "Xəta!",
                    text: `${fieldNames[key]} düzgün daxil edilməyib!`,
                    icon: "error"
                });
                return;
            }
        } else {
            if (!String(value).trim()) {
                showAlert({
                    title: "Xəta!",
                    text: `${fieldNames[key]} boş ola bilməz!`,
                    icon: "error"
                });
                return;
            }
        }
    }

    await createNewBook(obj)
    await useFetch()
    addForm.reset();
    showAlert({
        title: "Uğurlu!",
        text: "Kitab uğurla əlavə olundu!",
        icon: "success"
    });
}

document.handleDelete = async (id) => {
    if (!id) id = deleteBookInp.value;
    if (!id) {
        showAlert({
            title: "Uğursuz",
            text: "ID boş ola bilməz!",
            icon: "error"
        });
        return;
    }
    showAlert({
        title: "Əminsən?",
        text: `ID ${id} olan kitab silinəcək`,
        icon: "warning",
        confirmText: "Bəli, sil!",
        cancelText: "İmtina",
        showCancel: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteBookById(id);
            await useFetch();
            showAlert({
                title: "Uğurlu!",
                text: "Kitab uğurla silindi!",
                icon: "success"
            });
        }
    });
}

document.handleEdit = async () => {
    const updatedBook = {
        book_name: document.querySelector('#editBookName').value,
        book_img: document.querySelector('#editBookImg').value,
        price: Number(document.querySelector('#editPrice').value),
        sale: Number(document.querySelector('#editSale').value) || 0,
        author: document.querySelector('#editAuthor').value,
        genre: document.querySelector('#editGenre').value,
        category: document.querySelector('#editCategory').value,
        altCategory: document.querySelector('#editAltCategory').value,
        publisher: document.querySelector('#editPublisher').value,
        description: document.querySelector('#editDescription').value
    };

    await editBookById(currentEditId, updatedBook);
    await useFetch();
    await closeEditModal();
    showAlert({
        title: "Uğurlu",
        text: "Uğurla dəyişdirildi!",
        icon: "success"
    });

}

let currentEditId = null;
document.openEditModal = (book) => {
    currentEditId = book.id;
    document.querySelector('#editBookName').value = book.book_name;
    document.querySelector('#editBookImg').value = book.book_img;
    document.querySelector('#editPrice').value = book.price;
    document.querySelector('#editSale').value = book.sale || 0;
    document.querySelector('#editAuthor').value = book.author;
    document.querySelector('#editGenre').value = book.genre;
    document.querySelector('#editCategory').value = book.category;
    document.querySelector('#editAltCategory').value = book.altCategory;
    document.querySelector('#editPublisher').value = book.publisher;
    document.querySelector('#editDescription').value = book.description;
    document.querySelector('#editModal').classList.remove('hidden');
}

window.closeEditModal = () => {
    document.querySelector('#editModal').classList.add('hidden');
    currentEditId = null;
};

function showAlert({
    title = "",
    text = "",
    icon = "info",
    confirmText = "OK",
    cancelText = null,
    showCancel = false
} = {}) {
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        showCancelButton: showCancel,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33"
    });
}
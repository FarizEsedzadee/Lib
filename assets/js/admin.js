import { getAllBooks } from './service.js'

const books = document.querySelector('#books')

async function useFetch() {
    const data = await getAllBooks();
    printAllBooks(data)
}
useFetch()

function printAllBooks(data) {
    books.innerHTML = ''
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


function handleAddForm() {
    const form = document.querySelector("#add form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const [title, author, category, description,] = form.querySelectorAll("input, textarea");

        const newBook = {
            title: title.value,
            author: author.value,
            category: category.value,
            description: description.value,
            cover: "https://via.placeholder.com/100x150"
        };

        await addBook(newBook);
        alert("✅ Kitab əlavə olundu!");
        form.reset();
        printAllBooks();
    });
}

function handleEditForm() {
    const form = document.querySelector("#edit form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const [id, title, author, category, description] = form.querySelectorAll("input, textarea");

        const updatedBook = {
            title: title.value,
            author: author.value,
            category: category.value,
            description: description.value
        };

        await updateBook(id.value, updatedBook);
        alert("✏️ Kitab redaktə olundu!");
        form.reset();
        printAllBooks();
    });
}

function handleDeleteForm() {
    const form = document.querySelector("#delete form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const input = form.querySelector("input");

        const confirmDelete = confirm("⚠️ Bu kitabı silmək istədiyinizə əminsiniz?");
        if (!confirmDelete) return;

        await deleteBook(input.value);
        alert("🗑️ Kitab silindi!");
        form.reset();
        printAllBooks();
    });
}
document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    handleAddForm();
    handleEditForm();
    handleDeleteForm();
});

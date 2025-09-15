const BASE_URL = "https://fatimas-libraff-data.onrender.com/books"

async function getAllBooks() {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data;
}

async function getBookById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    return data;
}

async function getSimilarBooks(id) {
    const currentBook = await getBookById(id);
    const allBooks = await getAllBooks();

    const category = currentBook.category;
    const similarBooks = allBooks.filter(book => book.category === category && book.id !== id);
    return similarBooks;
}

async function addBook(book) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    });

    const data = await res.json();
    return data;
}

async function updateBook(id, updatedBook) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedBook)
    });

    const data = await res.json();
    return data;
}

async function deleteBook(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    const data = await res.json();
    return data;
}

export {
    getAllBooks, getBookById, getSimilarBooks, addBook, updateBook, deleteBook
}
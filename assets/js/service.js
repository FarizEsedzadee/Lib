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

export { getAllBooks, getBookById, getSimilarBooks }
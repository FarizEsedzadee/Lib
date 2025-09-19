const BASE_URL = "https://libdata-3bf0.onrender.com"

async function getAllBooks() {
    try {
/*         showLoader();
 */        const res = await fetch(`${BASE_URL}/books`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Məlumatlar yüklənərkən xəta baş verdi:', error);
    }
    finally {
/*         hideLoader();
 */    }
}

async function getBookById(id) {
    const res = await fetch(`${BASE_URL}/books/${id}`);
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

async function createNewBook(newBook) {
    try {
        const res = await fetch(`${BASE_URL}/books`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook)
        }
        )
        if (!res.ok) throw new Error(`Error occured while creating. Status Code: ${res.status}`);
        return res;
    } catch (error) {
        console.error(error.message)
    }
}

async function editBookById(id, updatedBook) {
    if (!id) throw new Error("ID tələb olunur!");
    try {
        const res = await fetch(`${BASE_URL}/books/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBook)
        });
        if (!res.ok) throw new Error(`Error occured while editing. Status Code: ${res.status}`)
    } catch (error) {
        console.error(error.message)

    }
}

async function deleteBookById(id) {
    try {
        const res = await fetch(`${BASE_URL}/books/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error(`Error occured while deleting. Status Code: ${res.status}`)
    } catch (error) {
        console.error(error.message)
    }
}


export {
    getAllBooks,
    getBookById,
    getSimilarBooks,
    createNewBook,
    editBookById,
    deleteBookById
}
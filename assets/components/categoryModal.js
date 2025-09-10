export default function categoryModal() {
    return(
        `<!-- Modal -->
        <div id="catalog-modal"
            class="fixed inset-0 bg-black/50 bg-opacity-30 flex items-center justify-center z-50 hidden">
            <div class="bg-white w-[500px] max-w-[90%] rounded-lg shadow-lg p-6 relative">
                <button id="close-modal"
                    class="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <h2 class="text-lg font-semibold text-gray-800">Kataloq (Boş Modal)</h2>
                <p class="text-sm text-gray-600 mt-2">Burada kataloq siyahısı olacaq.</p>
            </div>
        </div>`
    )
}
export default function categoryModal() {
    return `
    <div id="catalog-modal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden">
      
      <div class="bg-white w-[500px] max-w-[90%] rounded-lg shadow-lg p-6 relative">
        
        <button id="close-modal"
          class="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="text-lg font-semibold text-gray-800 mb-4">Kataloq</h2>
        <a target="_blank" href="https://i.imgur.com/bTBnx1e.jpeg">Bidənə <span class="text-red-500 font-bold text-[24px]">MƏNƏ</span> bas</a>
      </div>
    </div>
  `;
}

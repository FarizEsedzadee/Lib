export default function getHeader() {
    return (
        `<header>
        <div class="top max-w-[1460px] mx-auto py-[40px] flex items-center justify-between">
            <a href="/" class="left">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRou1Y7DXkTURWrO-2ioBioMLw3WukijSZIzQ&s" alt="Libraff Logo" class="w-[175px]">
            </a>
            <div class="center w-[50%] flex items-center gap-[20px]">
                <button
                    class="flex items-center justify-center h-[44px] px-[25px] bg-[#EF3340] text-white text-base rounded-[24px] shadow-[inset_0_0_10px_rgba(0,0,0,0.05)]">
                    <i class="fa-solid fa-border-all"></i> <span class="font-bold ms-[5px]">Kataloq</span></button>
                <label class="relative block w-full">
                    <input type="text" id="searchInp" placeholder="Növbəti kitabınızı axtarın"
                        class="w-full border rounded-[24px] p-[7px_40px_7px_15px] border-2 border-[#cbd5e1] focus:shadow-lg outline-none">
                    <i
                        class="fa-solid fa-magnifying-glass absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                </label>
            </div>
            <div class="right flex items-center justify-center gap-4">
                <span>AZ <i class="fa-solid fa-angle-down"></i></span>
                <a target="_blank" href="/assets/pages/admin.html?#add" class="flex items-center gap-1 h-[44px] px-[15px] bg-[#F4F6FC] rounded-[24px] text-[14px]"><i
                        class="fa-solid fa-circle-user text-[25px]"></i> <span>Admin Panel</span> </a>
                <a href="/assets/pages/wishlist.html"><i class="fa-regular fa-heart text-[25px]"></i></a>
                <span><i class="fa-solid fa-cart-arrow-down text-[20px]"></i></span>
            </div>
        </div>
        <div class="bottom max-w-[1460px] mx-auto flex items-center justify-between">
            <div class="left">
                <ul class="flex items-center gap-3 font-bold text-[15px] text-[#334155]">
                    <li>Bestseller - İyul</li>
                    <li>Endirimlər</li>
                    <li>Müəlliflər</li>
                    <li><a href="/assets/pages/classics.html">Klassiklər</a></li>
                </ul>
            </div>
            <div class="right">
                <ul class="flex items-center gap-3 font-[300] text-[15px] text-[#334155]">
                    <li>Ödəniş və çatdırılma</li>
                    <li>Loyallıq kartı</li>
                    <li>FAQ</li>
                    <li>Əlaqə</li>
                </ul>
            </div>
        </div>
    </header>`
)
}
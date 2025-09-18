const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,

    speed: 1000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
})
const loader = document.getElementById('loader');

function showLoader() {
    loader.style.display = 'flex';
}

function hideLoader() {
    loader.style.display = 'none';
}

window.addEventListener('load', () => {
    hideLoader();
});


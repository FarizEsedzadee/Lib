import getHeader from "../components/header.js";
import categoryModal from '../components/categoryModal.js';
import { initCategoryPopUp } from '../utils/categoryPopUp.js';

const header = document.querySelector('#header');

header.innerHTML = getHeader();
document.body.insertAdjacentHTML('beforeend', categoryModal());
initCategoryPopUp();

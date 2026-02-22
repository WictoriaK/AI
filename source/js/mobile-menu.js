const body = document.querySelector('body')
const mainMenuElement = document.querySelector('.main-nav-list');
const toggleButtonElement = document.querySelector('.page-header__toggler');

mainMenuElement.classList.remove('main-nav-list--nojs');

const toggleMenu = () => {
  body.classList.toggle('menu-open');
  mainMenuElement.classList.toggle('main-nav-list--open');
  toggleButtonElement.classList.toggle('page-header__toggler--open');
  toggleButtonElement.classList.toggle('page-header__toggler--closed');
}

toggleButtonElement.addEventListener('click',  () => toggleMenu());

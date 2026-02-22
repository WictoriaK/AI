const menuItemElement= document.querySelector('.main-nav-list__link--advantages');
const bodyElement= document.querySelector('body');
const mainMenuElement= document.querySelector('.main-nav-list');
const toggleButtonElement= document.querySelector('.page-header__toggler');

const scrollToBlock= () => {
  bodyElement.classList.remove('menu-open');
  mainMenuElement.classList.remove('main-nav-list--open');
  mainMenuElement.classList.add('main-nav-list--closed');
  toggleButtonElement.classList.remove('page-header__toggler--open');
  toggleButtonElement.classList.add('page-header__toggler--closed')
};

menuItemElement.addEventListener('click',() => scrollToBlock());

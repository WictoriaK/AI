import {isEnterKey, isEscapeKey} from './utils.min.js';

const bodyElement = document.querySelector('body');
const openModalButtons = document.querySelectorAll('.modal-button');
const modalElement = document.querySelector('.modal-wrapper');
const closeModalButton = modalElement.querySelector('.modal__close');
const mainMenuElement = document.querySelector('.main-nav-list');
const pageHeaderToggler = document.querySelector('.page-header__toggler');


const onPopupEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal()
  }
};


const openModal = () => {
  bodyElement.classList.add('modal-open');
  bodyElement.classList.remove('menu-open');
  mainMenuElement.classList.remove('main-nav-list--open');
  mainMenuElement.classList.add('main-nav-list--closed');
  pageHeaderToggler.classList.remove('page-header__toggler--open');
  pageHeaderToggler.classList.add('page-header__toggler--closed');
  modalElement.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  modalElement.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => openModal());
});

openModalButtons.forEach((button) => {
  button.addEventListener('keydown', (evt) => {
    if(isEnterKey(evt)) {
      openModal();
    }
  });
});


closeModalButton.addEventListener('click', () => closeModal());
closeModalButton.addEventListener('keydown', (evt) => {
  if(isEnterKey(evt)) {
    closeModal();
  }
});

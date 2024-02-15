import { state } from './model.js';
import { generateReadElementMarkup } from './readElementView.js';
import { renderElementsMarkup } from './searchElementsView.js';
import { groupBlockColors } from './config.js';

const sidebar = document.querySelector('.sidebar');
const backgroundBlack = document.querySelector('.background-black');
const sidebarLeft = document.querySelector('.sidebar-left');

const searchElementsDiv = document.querySelector('.search-elements');
const searchElementsResults = document.querySelector(
  '.search-elements__results'
);

// let searchResults = [...state.elements];

// searchInput.addEventListener('keydown', event => {
//
//   const currentInputText = (searchInput.value + event.key).toLowerCase();
//   searchResults = [
//     ...elements.filter(el => el.name.toLowerCase().includes(currentInputText)),
//   ];
//   renderElementsMarkup(searchElementsResults, searchResults);
// });

export const searchForElementHandler = (event, searchResults) => {
  const searchInput = event.target.closest('.search-input');
  if (!searchInput) return;

  const previousInputText = searchInput.value;

  if (event.key === 'Backspace') {
    searchInput.value = '';
    renderElementsMarkup(searchElementsResults, searchResults);
    return;
  }

  if (event.key.length > 1) {
    // renderElementsMarkup(searchElementsResults, searchResults);
    return;
  }

  let currentInputText = (searchInput.value + event.key).toLowerCase();

  searchResults = [
    ...searchResults.filter(el =>
      el.name.toLowerCase().includes(currentInputText)
    ),
  ];
  renderElementsMarkup(searchElementsResults, searchResults);
};

// shows left sidebar with search element functionallyty
export const showSearchElementHandler = event => {
  const button = event.target.closest('.main-menu__item');
  if (!button) return;
  document.querySelector('.search-input').value = '';

  closeSidebarHandler(event);

  if (button.id === 'home-button') return;

  if (button.id === 'search-button') {
    renderElementsMarkup(searchElementsResults, state.elements);
    sidebar.classList.add('invisible');

    sidebarLeft.classList.add('sidebar-left--active');
    searchElementsDiv.classList.add('search-elements--active');
  } else {
    searchElementsDiv.classList.remove('search-elements--active');
  }

  sidebarLeft.classList.add('sidebar-left--active');
  backgroundBlack.classList.remove('invisible');
};

// shows sidebar when specific element is clicked
export const showSidebarHandler = event => {
  // const card = event.target.closest('.periodic-table__element');
  const card = event.target.closest('[data-element]');

  if (!card) return;

  sidebarLeft.classList.remove('sidebar-left--active');
  backgroundBlack.classList.remove('invisible');
  sidebar.classList.remove('invisible');
  sidebar.classList.add('sidebar--active');

  // every card has id that is symbol of element its represents
  //inner html of sidebar is generated with props of selected element
  generateReadElementMarkup(
    sidebar, // parent element
    state.elements.find(element => element.symbol === card.id)
  );
};

// closing sidebar
export const closeSidebarHandler = event => {
  if (event.target.getAttribute('data-category') === 'close-sidebar') {
    sidebarLeft.classList.add('invisible');
    sidebar.classList.add('invisible');
    backgroundBlack.classList.add('invisible');

    sidebarLeft.classList.remove('sidebar-left--active');
    searchElementsDiv.classList.remove('search-elements--active');
  }
};

// takes previous or next element on click and displat them in sidebar
export const navigateElementsInSidebar = event => {
  const left = event.target.closest('.sidebar__nav--left');
  const right = event.target.closest('.sidebar__nav--right');

  const navigateTo = left || right;

  if (navigateTo) {
    // sidebar gets new innerHTML with prev or next element
    // navigateTo id is name property of that element
    generateReadElementMarkup(
      sidebar,
      state.elements.find(el => el.name === navigateTo.id)
    );
  }
};

export const markGroupBlocksHandler = event => {
  const listItem = event.target.closest('.group-blocks__list-item');
  if (!listItem) return;

  const buttons = document.querySelectorAll('.group-blocks__list-item__btn');
  const tableCards = document.querySelectorAll('.periodic-table__element');

  // need function to set default view every time its called or if list item is already clicked

  const setDefaultView = () => {
    buttons.forEach(btn => {
      btn.style.removeProperty('background-color');
    });

    // buttons[buttons.length - 1].style.backgroundColor = '#fff';

    Array.from(tableCards).forEach(element => {
      element.classList.remove('periodic-table__element--excluded');
      element.style.borderColor =
        groupBlockColors[element.getAttribute('data-category')];
    });
  };

  // if element is already selected
  if (
    getComputedStyle(listItem.children[0]).backgroundColor !==
      'rgba(0, 0, 0, 0)' &&
    listItem.getAttribute('data-category') !== 'all items'
  ) {
    setDefaultView();
    buttons[buttons.length - 1].style.backgroundColor = '#fff';

    return;
  }

  setDefaultView();

  listItem.children[0].style.backgroundColor =
    listItem.children[0].style.borderColor;

  Array.from(tableCards).forEach(element => {
    if (
      element.getAttribute('data-category') !==
        listItem.getAttribute('data-category') &&
      listItem.getAttribute('data-category') !== 'all items'
    ) {
      element.style.removeProperty('border-color');
      element.classList.add('periodic-table__element--excluded');
    }
  });
};

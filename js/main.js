import { state, addElementPositions } from './model.js';
import {
  renderGroupBlocksList,
  renderPeriodNames,
  renderGroupNames,
  renderPeriodicTable,
} from './periodicTableView.js';
import { getData } from './helper.js';
import { groupBlockColors, currentProperty } from './config.js';
import {
  closeSidebarHandler,
  markGroupBlocksHandler,
  navigateElementsInSidebar,
  showSidebarHandler,
  showSearchElementHandler,
  searchForElementHandler,
  selectPropertyHandler,
} from './eventHandlers.js';

const body = document.querySelector('body');
const main = document.querySelector('.main');
const periodicTable = document.querySelector('.periodic-table');
const spinner = document.querySelector('.rotate');
const groupBlocksList = document.querySelector('.group-blocks');
const sidebar = document.querySelector('.sidebar');
const menuNavigation = document.querySelector('.main-menu');

// fetch data and adding positions (xpos and ypos for every element)
const controllPeriodicTableData = async () => {
  state.elements = await getData('./data.json');
  addElementPositions(state.elements, state.positions);
};

// adding div for each element in periodic table
// adding groups and periods numbers before each
const controllPeriodicTableView = () => {
  spinner.classList.add('invisible'); // hides spinner
  periodicTable.classList.remove('invisible'); // shows periodic table
  menuNavigation.classList.remove('invisible'); // shows menu navigation

  renderGroupBlocksList(groupBlocksList, Object.entries(groupBlockColors));

  renderPeriodicTable(periodicTable, state.elements); // add div for each element in periodic table and gives them position in css grid
  renderPeriodNames(periodicTable, state.periods); // add div  with period numbers to the left side
  renderGroupNames(periodicTable, state.groups, state.elements); // adds div whith group number at the top of each group
};

await controllPeriodicTableData();
controllPeriodicTableView();

// EVENT LISTENERS

// by clicking on item of specific group block only elements that belong to that block are colored
// clicked list item gets filled with its border color
main.addEventListener('click', markGroupBlocksHandler);

//show sidebar
body.addEventListener('click', showSidebarHandler);

// hide sidebar
body.addEventListener('click', closeSidebarHandler);

// navigate to previous or next element in sidebar
sidebar.addEventListener('click', navigateElementsInSidebar);

main.addEventListener('click', showSearchElementHandler);

main.addEventListener('keydown', event => {
  searchForElementHandler(event, state.elements);
});

main.addEventListener('click', event => {
  if (selectPropertyHandler(event)) {
    const elementsToRemove = periodicTable.querySelectorAll(
      '[data-element="yes"]'
    );
    elementsToRemove.forEach(element => {
      element.parentNode.removeChild(element);
    });
    renderPeriodicTable(periodicTable, state.elements);
  }
});

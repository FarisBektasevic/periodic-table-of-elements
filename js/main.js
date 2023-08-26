import { state, addElementPositions } from './model.js';
import {
  renderGroupBlocksList,
  renderPeriodNames,
  renderGroupNames,
  renderPeriodicTable,
} from './periodicTableView.js';
import { getData } from './helper.js';
import { url } from './config.js';
import { groupBlockColors } from './config.js';
import { generateReadElementMarkup } from './readElementView.js';

const main = document.querySelector('.main');
const periodicTable = document.querySelector('.periodic-table');
const spinner = document.querySelector('.rotate');
const groupBlocksList = document.querySelector('.group-blocks-list');
// const listItems = document.querySelectorAll('.list-item');

const sidebar = document.querySelector('.sidebar');
// fetch data and adding positions (xpos and ypos for every element)
const controllPeriodicTableData = async () => {
  state.elements = await getData(url);
  addElementPositions(state.elements, state.positions);
};

// adding div for each element in periodic table
// adding groups and periods numbers before each
const controllPeriodicTableView = () => {
  spinner.classList.add('invisible');
  periodicTable.classList.remove('invisible');

  renderGroupBlocksList(groupBlocksList, Object.entries(groupBlockColors));

  renderPeriodicTable(periodicTable, state.elements);
  renderPeriodNames(periodicTable, state.periods);
  renderGroupNames(periodicTable, state.groups, state.elements);
};

await controllPeriodicTableData();
controllPeriodicTableView();

// EVENT LISTENERS

main.addEventListener('click', event => {
  event.preventDefault();

  const card = event.target.closest('.element-card');
  if (!card) return;

  sidebar.classList.remove('invisible');
  sidebar.classList.add('sidebar-active');

  generateReadElementMarkup(
    sidebar,
    state.elements.find(element => element.symbol === card.id)
  );
});

main.addEventListener('click', e => {
  e.preventDefault();

  const listItem = e.target.closest('.list-item');
  if (!listItem) return;

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.style.removeProperty('background-color');
  });

  listItem.children[0].style.backgroundColor =
    listItem.children[0].style.borderColor;

  const tableCards = document.querySelectorAll('.element-card');

  Array.from(tableCards).forEach(element => {
    element.classList.remove('element-card-shadow');
    element.style.borderColor =
      groupBlockColors[element.getAttribute('data-category')];

    if (
      element.getAttribute('data-category') !==
        listItem.getAttribute('data-category') &&
      listItem.getAttribute('data-category') !== 'all items'
    ) {
      element.style.removeProperty('border-color');
      element.classList.add('element-card-shadow');
    }
  });
});

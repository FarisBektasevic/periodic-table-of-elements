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

const main = document.querySelector('.main');
const periodicTable = document.querySelector('.periodic-table');
const spinner = document.querySelector('.rotate');
const groupBlocksList = document.querySelector('.group-blocks-list');

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

// EVENT LISTENER FOR EACH ELEMENT CARD
// console.log === ELEMENT OBJECT

main.addEventListener('click', event => {
  event.preventDefault();

  const card = event.target.closest('.element-card');
  if (!card) return;
  console.log(state.elements.find(element => element.symbol === card.id));
});

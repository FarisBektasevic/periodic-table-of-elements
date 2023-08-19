import { state, addElementPositions } from './model.js';
import {
  renderPeriodNames,
  renderGroupNames,
  renderPeriodicTable,
} from './periodicTableView.js';
import { getData } from './helper.js';
import { url } from './config.js';

const main = document.querySelector('.main');
console.log(main);

// fetch data and adding positions (xpos and ypos for every element)
const controllPeriodicTableData = async () => {
  state.elements = await getData(url);
  addElementPositions(state.elements, state.positions);
};

// adding div for each element in periodic table
// adding groups and periods numbers before each
const controllPeriodicTableView = () => {
  renderPeriodicTable(main, state.elements);
  renderPeriodNames(main, state.periods);
  renderGroupNames(main, state.groups, state.elements);
};

console.time('everything');

await controllPeriodicTableData();
controllPeriodicTableView();

console.timeEnd('everything');

// EVENT LISTENER FOR EACH ELEMENT CARD
// console.log === ELEMENT OBJECT

main.addEventListener('click', event => {
  event.preventDefault();

  const card = event.target.closest('.element-card');
  if (!card) return;
  console.log(state.elements.find(element => element.symbol === card.id));
});

// search elements view logic

import { groupBlockColors } from './config.js';

const generateElementMarkup = element => {
  const { groupBlock, symbol, name, atomicMass } = element;
  return `
  <div data-element="yes" class="search-elements__results__element" id="${symbol}">
    <div  class="search-elements__results__element__symbol"  style="background-color: ${groupBlockColors[groupBlock]}">${symbol}</div>
    <div class="search-elements__results__element__properties">
        <p>${name}</p>
        <p>${atomicMass}</p>
    </div>
  </div>
  `;
};

export const renderElementsMarkup = (parentElement, elements) => {
  parentElement.innerHTML = elements.map(generateElementMarkup).join('');
};

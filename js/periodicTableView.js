import { groupBlockColors } from './config.js';

const generateElementCardMarkup = element => {
  const { groupBlock, symbol, xpos, ypos, atomicNumber, name } = element;

  return `
    <div data-element="yes" data-category="${groupBlock}" class="periodic-table__element" id="${symbol}" style="grid-column:${
    xpos + 1
  }; grid-row:${ypos + 1}; border-color:${groupBlockColors[groupBlock]}">
      <span>${atomicNumber}</span>
      <span class="periodic-table__element__symbol">${symbol}</span>
      <p class="periodic-table__element__p">${name}</p>
    </div>`;
};

const generatePeriodNameMarkup = period => {
  return `
<div class="periodic-table__period" id="${period}" style="grid-column:${1}; grid-row:${
    period + 1
  }; color: #fff">
<span>${period}</span>
</div>`;
};

const generateGroupNameMarkup = (group, ypos) => {
  return `
    <div class="periodic-table__group" style="grid-column:${
      group + 1
    }; grid-row:${ypos}; color: #fff">
    <span>${group}</span>
    </div>`;
};

const generateGroupBlocksListMarkup = (name, color) => {
  return `
  <div data-category="${name.toLowerCase()}" class="group-blocks__list-item" >
    <div class="group-blocks__list-item__btn" style="border-color: ${color}; background-color:${
    name === 'All items' ? '#fff' : ''
  }"></div>
    <p class="group-blocks__list-item__name">${name}</p>
  </div>`;
};

export const renderPeriodicTable = (parentElement, elements) => {
  parentElement.innerHTML += elements.map(generateElementCardMarkup).join('');
};

export const renderPeriodNames = (parentElement, periods) => {
  parentElement.innerHTML += periods.map(generatePeriodNameMarkup).join('');
};

export const renderGroupNames = (parentElement, groups, elements) => {
  parentElement.innerHTML += groups
    .map(group => {
      const firstElementInGroup = elements.find(el => el.xpos === group);
      const ypos = firstElementInGroup.ypos;

      return generateGroupNameMarkup(group, ypos);
    })
    .join('');
};

export const renderGroupBlocksList = (parentElement, groupBlocks) => {
  parentElement.innerHTML = groupBlocks
    .map(block => {
      const name = block[0][0].toUpperCase() + block[0].slice(1);
      const color = block[1];
      return generateGroupBlocksListMarkup(name, color);
    })
    .join('');
};

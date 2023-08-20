import { groupBlockColors } from './config.js';

const generateElementCardMarkup = element => {
  return `
    <div class="element-card" id="${element.symbol}" style="grid-column:${
    element.xpos + 1
  }; grid-row:${element.ypos + 1}; border-color:${
    groupBlockColors[element.groupBlock]
  }">
      <span>${element.atomicNumber}</span>
      <span class="element-card--symbol">${element.symbol}</span>
      <p>${element.name}</p>
    </div>`;
};

const generatePeriodNameMarkup = period => {
  return `
<div class="period-label" id="${period}" style="grid-column:${1}; grid-row:${
    period + 1
  }; color: #fff">
<span>${period}</span>
</div>`;
};

const generateGroupNameMarkup = (group, ypos) => {
  return `
    <div class="group-label" style="grid-column:${
      group + 1
    }; grid-row:${ypos}; color: #fff">
    <span>${group}</span>
    </div>`;
};

const generateGroupBlocksListMarkup = (name, color) => {
  return `
  <li class="list-item" >
    <div class="btn" style="border-color: ${color}"></div>
    <p>${name}</p>
  </li>`;
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

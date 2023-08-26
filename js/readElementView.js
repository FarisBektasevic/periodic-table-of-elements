import { groupBlockColors } from './config.js';

const readElementMarkup = element => {
  return `
    <div class="sidebar__header">
        <div class="header__buttons">
        <i class="fa-solid fa-chevron-left"></i>
        <i class="fa-brands fa-wikipedia-w"></i>
        </div>
        <div class="header__element">
            <div class="header__element--details">
                <p>${element.name}</p>
                <p><span class="element-symbol">${element.symbol}</span>26</p>
                <p>${
                  element.atomicMass
                } <span class="element-unit">(g/mol)</span></p>
            </div>
            <div class="header__element--block">
                <p>${
                  element.groupBlock[0].toUpperCase() +
                  element.groupBlock.slice(1)
                }</p>
            </div>
        </div>
    </div>`;
};

export const generateReadElementMarkup = (parentElement, currentElement) => {
  parentElement.innerHTML = readElementMarkup(currentElement);
};

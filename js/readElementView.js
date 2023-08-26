import { groupBlockColors, wikipediaURL } from './config.js';

const readElementMarkup = element => {
  return `
    <div class="sidebar__header" style="border-color:${
      groupBlockColors[element.groupBlock]
    }">
        <div class="header__buttons">
            <i class="fa-solid fa-chevron-left close-sidebar"></i>
            <div class="wiki-link">
                <a class="wiki-link" href="${wikipediaURL}${
    element.name
  }" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-wikipedia-w"></i>
                </a>
            </div>
            
       </div>
        <div class="header__element">
            <div class="header__element--details">
                <p>${element.name}</p>
                <p><span class="element-symbol">${element.symbol}</span>26</p>
                <p>${
                  element.atomicMass
                } <span class="element-unit">(g/mol)</span></p>
            </div>
            <div class="header__element--block" style="background-color:${
              groupBlockColors[element.groupBlock]
            }">
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
  console.log(document.querySelector('wiki-link'));
  console.log(parentElement.children);

  const url = wikipediaURL + currentElement.name;
};

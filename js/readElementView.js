import { groupBlockColors, wikipediaURL } from './config.js';
import { state } from './model.js';

const readElementMarkup = (element, prev, next) => {
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

        <header class="header__element">
            <div class="header__element--details">
                <p>${element.name}</p>
                <p><span class="element-symbol">${element.symbol}</span>${
    element.atomicNumber
  }</p>
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
        </header>
        
    </div>
    <nav class="sidebar__nav">
          ${
            prev
              ? `
              <div id="${prev.name}" class="sidebar__nav--left">
                <p>${prev.atomicNumber}</p>
                <span style="background-color: ${
                  groupBlockColors[prev.groupBlock]
                }"></span>
                <p>${prev.name}</p>
              </div>`
              : ''
          }
          
          ${
            next
              ? `
              <div id="${next.name}" class="sidebar__nav--right">
                <p>${next.atomicNumber}</p>
                <span style="background-color: ${
                  groupBlockColors[next.groupBlock]
                }"></span>
                <p>${next.name}</p>
              </div>`
              : ''
          }
      </nav>`;
};

export const generateReadElementMarkup = (parentElement, currentElement) => {
  const allElements = [...state.elements];

  const previousElement = allElements.find(
    el => el.atomicNumber === currentElement.atomicNumber - 1
  );

  const nextElement = allElements.find(
    el => el.atomicNumber === currentElement.atomicNumber + 1
  );

  parentElement.innerHTML = readElementMarkup(
    currentElement,
    previousElement,
    nextElement
  );
};

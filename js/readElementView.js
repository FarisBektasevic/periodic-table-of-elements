import { groupBlockColors, wikipediaURL } from './config.js';
import { state } from './model.js';

const readElementMarkup = (element, prev, next) => {
  const period = ypos => {
    if (ypos === 9) return 6;
    if (ypos === 10) return 7;
    return ypos;
  };

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
    <nav class="sidebar__field sidebar__nav">
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
      </nav>
      <div class="sidebar__field sidebar__field--label"></div>
      <div class="sidebar__field sidebar__field--details">
        <p>English name:</p>
        <p>${element.name}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Year discovered:</p>
        <p>${element.yearDiscovered}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Atomic number:</p>
        <p>${element.atomicNumber}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Period:</p>
        <p>${period(element.ypos)}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Group:</p>
        <p>${element.xpos}</p>
      </div>
      `;
};

export const generateReadElementMarkup = (
  parentElement,
  currentElementObject
) => {
  const allElements = [...state.elements];

  const previousElement = allElements.find(
    el => el.atomicNumber === currentElementObject.atomicNumber - 1
  );

  const nextElement = allElements.find(
    el => el.atomicNumber === currentElementObject.atomicNumber + 1
  );

  parentElement.innerHTML = readElementMarkup(
    currentElementObject,
    previousElement,
    nextElement
  );
};

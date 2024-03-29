import { groupBlockColors, wikipediaURL, elementProperties } from './config.js';
import { state } from './model.js';

const readElementMarkup = (element, prev, next) => {
  const elementPropertiesList = elementProperties(element);

  return `
    <div class="sidebar__header background-${element.groupBlock
      .split(' ')
      .join('-')}" style="border-color:${groupBlockColors[element.groupBlock]}">
        <div class="sidebar__header__buttons">
            <i data-category="close-sidebar" class="sidebar__header__buttons__i fa-solid fa-chevron-left"></i>
            <div class="wiki-link">
                <a class="wiki-link" href="${wikipediaURL}${
    element.name
  }" target="_blank" rel="noopener noreferrer">
                    <i class="sidebar__header__buttons__i fa-brands fa-wikipedia-w"></i>
                </a>
            </div>
            
       </div>

        <header class="sidebar__header__element">
            <div class="sidebar__header__element__details">
                <p class="sidebar__header__element__details__name">${
                  element.name
                }</p>
                <p><span class="sidebar__header__element__details__symbol">${
                  element.symbol
                }</span>${element.atomicNumber}</p>
                <p>${
                  element.atomicMass
                } <span class="sidebar__header__element__details__unit">(g/mol)</span></p>
            </div>
            <div class="sidebar__header__element__category sidebar__header__element__details" style="background-color:${
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
      ${elementPropertiesList.map(generateElementPropertiesMarkup).join('')}
      `;
};

const generateElementPropertiesMarkup = prop => {
  const { backgroundColor, icon, header, section } = prop;

  return `
  <div class="sidebar__field sidebar__field--label">
      <div class="sidebar__field__header" style="background-color: ${backgroundColor};">
        ${icon}
        ${header}
      </div>     
  </div>
  ${section
    .map(el => {
      return `
    <div class="sidebar__field sidebar__field--details">
      <p>${el[0]}</p>
      <p>${el[1] || '-'}</p>
    </div>
    `;
    })
    .join('')}
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

import { groupBlockColors, wikipediaURL } from './config.js';
import { state } from './model.js';

const readElementMarkup = (element, prev, next) => {
  const period = ypos => {
    if (ypos === 9) return 6;
    if (ypos === 10) return 7;
    return ypos;
  };

  return `
    <div class="sidebar__header background-${element.groupBlock
      .split(' ')
      .join('-')}" style="border-color:${groupBlockColors[element.groupBlock]}">
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
      <div class="sidebar__field sidebar__field--label">
        <div class="sidebar__field__header" style="background-color: #f6511d;">
              <i class="fa-regular fa-eye"></i>
              Overwiev
        </div>
      </div>
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
      <div class="sidebar__field sidebar__field--details">
        <p>Standard state:</p>
        <p>${element.standardState}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Bonding type:</p>
        <p>${element.bondingType}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Amtomic weight (Relative atomic mass):</p>
        <p>${element.atomicMass}</p>
      </div>
      <div class="sidebar__field sidebar__field--label">
        <div class="sidebar__field__header" style="background-color: #00A878;">
              <i class="fa-solid fa-t"></i>
              Properties
            </div>
        </div>
      </div>
      
      <div class="sidebar__field sidebar__field--details">
        <p>Density:</p>
        <p>${element.density ? element.density + ' g/cm3' : '-'}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Melting point:</p>
        <p>${element.meltingPoint || '-'}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Boiling point:</p>
        <p>${element.boilingPoint || '-'}</p>
      </div>
      <div class="sidebar__field sidebar__field--label">
        <div class="sidebar__field__header" style="background-color: #3F84E5;">
              <i class="fa-solid fa-atom"></i>
              Atomic properties
            </div>
        </div>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Electron configuration:</p>
        <p>${element.electronicConfiguration}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Oxidation states:</p>
        <p>${element.oxidationStates || '-'}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Ion radius:</p>
        <p>${element.ionRadius || '-'}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Van der Waals radius:</p>
        <p>${element.vanDerValsRadius || '-'}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Electron affinity:</p>
        <p>${element.electronAffinity || '-'}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Electronegativity:</p>
        <p>${element.electronegativity || '-'}</p>
      </div>
      <div class="sidebar__field sidebar__field--details">
        <p>Ionization energy:</p>
        <p>${element.ionizationEnergy || '-'}</p>
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

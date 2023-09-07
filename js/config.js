export const url = 'https://neelpatel05.pythonanywhere.com';
export const wikipediaURL = 'http://en.wikipedia.org/wiki/';

export const groupBlockColors = {
  nonmetal: '#F2F7A1',
  'noble gas': '#662E9B',
  'alkali metal': '#CE2D4F',
  'alkaline earth metal': '#20A4F3',
  halogen: '#43894E',
  'transition metal': '#FF8600',
  metal: '#006DA1',
  'post-transition metal': '#006DA1',
  metalloid: '#C41E3D',
  actinoid: '#52713F',
  lanthanoid: '#D84A05',
  'all items': '#fff',
};

export const elementProperties = element => {
  const {
    name,
    yearDiscovered,
    atomicNumber,
    xpos,
    ypos,
    standardState,
    bondingType,
    atomicMass,
  } = element;

  const { meltingPoint, boilingPoint, density } = element;
  const {
    electronicConfiguration,
    electronAffinity,
    electronegativity,
    vanDerValsRadius,
    ionRadius,
    ionizationEnergy,
    oxidationStates,
  } = element;

  const period = ypos => {
    if (ypos === 9) return 6;
    if (ypos === 10) return 7;
    return ypos;
  };

  const convertKelvinsToCelsius = K => Number(K - 273.15).toFixed(3);
  const convertKelvinsToFarenheits = K =>
    Number(1.8 * (K - 273.15) + 32).toFixed(2);

  return [
    {
      icon: '<i class="fa-regular fa-eye"></i>',
      backgroundColor: '#f6511d',
      header: 'Overview',
      section: Object.entries({
        'English name': name,
        'Year discovered': `${yearDiscovered}`,
        'Atomic number': atomicNumber,
        Group: xpos,
        Period: period(ypos),
        'Standard state': standardState,
        'Bonding type': bondingType,
        'Atomic weight (Relative atomic mass)': `${atomicMass} (g/mol)`,
      }),
    },
    {
      icon: '<i class="fa-solid fa-t"></i>',
      backgroundColor: '#00A878',
      header: 'Properties',
      section: Object.entries({
        Density: density && `${density} (g/cm<sup>3</sup>)`,
        'Melting point':
          meltingPoint &&
          `${meltingPoint}K = ${convertKelvinsToCelsius(
            meltingPoint
          )}°C = ${convertKelvinsToFarenheits(meltingPoint)}°F`,

        'Boiling point':
          boilingPoint &&
          `${boilingPoint}K = ${convertKelvinsToCelsius(
            boilingPoint
          )}°C = ${convertKelvinsToFarenheits(boilingPoint)}°F`,
      }),
    },
    {
      icon: '<i class="fa-solid fa-atom"></i>',
      backgroundColor: '#3F84E5',
      header: 'Atomic properties',
      section: Object.entries({
        'Electron configuration': electronicConfiguration,
        'Oxidation states': oxidationStates,
        'Ion radius': ionRadius && `${ionRadius} (pm)`,
        'Van der Waals radius': vanDerValsRadius && `${vanDerValsRadius} (pm)`,
        'Electron effinity': electronAffinity && `${electronAffinity} (kJ/mol)`,
        Electronegativity: electronegativity,
        'Ionization energy': ionizationEnergy && `${ionizationEnergy} (kj/mol)`,
      }),
    },
  ];
};

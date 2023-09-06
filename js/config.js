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
  const period = ypos => {
    if (ypos === 9) return 6;
    if (ypos === 10) return 7;
    return ypos;
  };

  return [
    {
      icon: '<i class="fa-regular fa-eye"></i>',
      backgroundColor: '#f6511d',
      header: 'Overview',
      section: Object.entries({
        'English name': element.name,
        'Year discovered': `${element.yearDiscovered}<sup>3</sup>`,
        'Atomic number': element.symbol + 'g/mol',
        Group: element.xpos,
        Period: period(element.ypos),
        'Standard state': element.standardState,
        'Bonding type': element.bondingType,
        'Atomic weight (Relative atomic mass)': element.atomicMass,
      }),
    },
    {
      icon: '<i class="fa-solid fa-t"></i>',
      backgroundColor: '#00A878',
      header: 'Properties',
      section: Object.entries({
        Density: element.density,
        'Melting point': element.meltingPoint,
        'Boiling point': element.boilingPoint,
      }),
    },
    {
      icon: '<i class="fa-solid fa-atom"></i>',
      backgroundColor: '#3F84E5',
      header: 'Atomic properties',
      section: Object.entries({
        'Electron configuration': element.electronicConfiguration,
        'Oxidation states': element.oxidationStates,
        'Ion radius': element.ionRadius,
        'Van der Waals radius': element.vanDerValsRadius,
        'Electron effinity': element.electronAffinity,
        Electronegativity: element.electronegativity,
        'Ionization energy': element.ionizationEnergy,
      }),
    },
  ];
};

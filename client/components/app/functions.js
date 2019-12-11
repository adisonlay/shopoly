function sortImageData(imagesArray) {
  let sortedArray = [...imagesArray].sort();
  const mortImageIndex = sortedArray.findIndex(url => url.includes('mort'));
  sortedArray.push(sortedArray.splice(mortImageIndex, 1)[0]);

  return sortedArray;
}

function formatItemData(itemDataObject) {
  let formattedData = JSON.parse(JSON.stringify(itemDataObject));

  if (formattedData.lotNumber > 0) {
    formattedData.lotNumber = '#' + formattedData.lotNumber;
  } else {
    formattedData.lotNumber = 'N/A';
  }

  if (!isNaN(parseInt(formattedData.rent))) {
    formattedData.rent = '$' + formattedData.rent;
  }

  formattedData.price = '$' + formattedData.price;
  formattedData.images = sortImageData(formattedData.images).map(url => url.substring(13));

  return formattedData;
}

function countMonopolies(itemsData) {
  let monopolies = 0;

  const countedGroups = itemsData.reduce((groupCount, currentItem) => {
    if (currentItem.itemGroup in groupCount) {
      groupCount[currentItem.itemGroup]++;
    } else {
      groupCount[currentItem.itemGroup] = 1;
    }
    return groupCount;
  }, {});

  for (let group in countedGroups) {
    if (!['Utility', 'Railroad', 'Other', 'Building'].includes(group)) {
      if (group === 'Purple/Brown' || group === 'Dark Blue') {
        if (countedGroups[group] >= 2) {
          monopolies++;
        }
      } else {
        if (countedGroups[group] >= 3) {
          monopolies++;
        }
      }
    }
  }

  return monopolies;
}

function getHouseUnlockStatus(itemsData) {
  if (countMonopolies(itemsData)) {
    return true;
  } else {
    return false;
  }
}

function getHotelUnlockStatus(itemsData) {
  let houseCount = 0;
  itemsData.forEach(currentItem => {
    if (currentItem.name === 'House') {
      houseCount += currentItem.quantity;
    }
  });

  if (houseCount >= 4) {
    return true;
  } else {
    return false;
  }
}

function getStatesData(country) {
  switch (country) {
    case 'Canada':
      return [
        ['AB', 'Alberta'],
        ['BC', 'British Columbia'],
        ['MB', 'Manitoba'],
        ['NB', 'New Brunswick'],
        ['NL', 'Newfoundland and Labrador'],
        ['NS', 'Nova Scotia'],
        ['ON', 'Ontario'],
        ['PE', 'Prince Edward Island'],
        ['QC', 'Quebec'],
        ['SK', 'Saskatchewan'],
        ['NT', 'Northwest Territories'],
        ['NU', 'Nunavut'],
        ['YT', 'Yukon']
      ];
    case 'Mexico':
      return [
        ['AG', 'Aguascalientes'],
        ['BC', 'Baja California'],
        ['BS', 'Baja California Sur'],
        ['CH', 'Chihuahua'],
        ['CL', 'Colima'],
        ['CM', 'Campeche'],
        ['CO', 'Coahuila'],
        ['CS', 'Chiapas'],
        ['DF', 'Federal District'],
        ['DG', 'Durango'],
        ['GR', 'Guerrero'],
        ['GT', 'Guanajuato'],
        ['HG', 'Hidalgo'],
        ['JA', 'Jalisco'],
        ['ME', 'México State'],
        ['MI', 'Michoacán'],
        ['MO', 'Morelos'],
        ['NA', 'Nayarit'],
        ['NL', 'Nuevo León'],
        ['OA', 'Oaxaca'],
        ['PB', 'Puebla'],
        ['QE', 'Querétaro'],
        ['QR', 'Quintana Roo'],
        ['SI', 'Sinaloa'],
        ['SL', 'San Luis Potosí'],
        ['SO', 'Sonora'],
        ['TB', 'Tabasco'],
        ['TL', 'Tlaxcala'],
        ['TM', 'Tamaulipas'],
        ['VE', 'Veracruz'],
        ['YU', 'Yucatán'],
        ['ZA', 'Zacatecas']
      ];
    case 'United States':
      return [
        ['AL', 'Alabama'],
        ['AK', 'Alaska'],
        ['AZ', 'Arizona'],
        ['AR', 'Arkansas'],
        ['CA', 'California'],
        ['CO', 'Colorado'],
        ['CT', 'Connecticut'],
        ['DE', 'Delaware'],
        ['FL', 'Florida'],
        ['GA', 'Georgia'],
        ['HI', 'Hawaii'],
        ['ID', 'Idaho'],
        ['IL', 'Illinois'],
        ['IN', 'Indiana'],
        ['IA', 'Iowa'],
        ['KS', 'Kansas'],
        ['KY', 'Kentucky'],
        ['LA', 'Louisiana'],
        ['ME', 'Maine'],
        ['MD', 'Maryland'],
        ['MA', 'Massachusetts'],
        ['MI', 'Michigan'],
        ['MN', 'Minnesota'],
        ['MS', 'Mississippi'],
        ['MO', 'Missouri'],
        ['MT', 'Montana'],
        ['NE', 'Nebraska'],
        ['NV', 'Nevada'],
        ['NH', 'New Hampshire'],
        ['NJ', 'New Jersey'],
        ['NM', 'New Mexico'],
        ['NY', 'New York'],
        ['NC', 'North Carolina'],
        ['ND', 'North Dakota'],
        ['OH', 'Ohio'],
        ['OK', 'Oklahoma'],
        ['OR', 'Oregon'],
        ['PA', 'Pennsylvania'],
        ['RI', 'Rhode Island'],
        ['SC', 'South Carolina'],
        ['SD', 'South Dakota'],
        ['TN', 'Tennessee'],
        ['TX', 'Texas'],
        ['UT', 'Utah'],
        ['VT', 'Vermont'],
        ['VA', 'Virginia'],
        ['WA', 'Washington'],
        ['WV', 'West Virginia'],
        ['WI', 'Wisconsin'],
        ['WY', 'Wyoming'],
        ['DC', 'District of Columbia'],
        ['AS', 'American Samoa'],
        ['GU', 'Guam'],
        ['MP', 'Northern Mariana Islands'],
        ['PR', 'Puerto Rico'],
        ['UM', 'United States Minor Outlying Islands'],
        ['VI', 'Virgin Islands, U.S.']
      ];
    default:
      return [];
  }
}

export { formatItemData, countMonopolies, getHouseUnlockStatus, getHotelUnlockStatus, getStatesData };

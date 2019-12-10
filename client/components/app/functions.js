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

function getStatesData() {
  return {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
  };
}

export { formatItemData, countMonopolies, getHouseUnlockStatus, getHotelUnlockStatus, getStatesData };

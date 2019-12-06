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
  const groupCount = itemsData.reduce((runningGroupCount, currentItemObject) => {
    if (!runningGroupCount[currentItemObject.itemGroup]) {
      runningGroupCount[currentItemObject.itemGroup] = 1;
    } else {
      ++runningGroupCount[currentItemObject.itemGroup];
    }
    return runningGroupCount;
  }, {});
}

function getHouseUnlockStatus(itemsData) {

}

function getHotelUnlockStatus(itemsData) {

}

export { formatItemData };

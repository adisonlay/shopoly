function sortImageData(imagesArray) {
  let sortedArray = [...imagesArray].sort();
  const mortImageIndex = sortedArray.findIndex(url => url.includes('mort'));
  sortedArray.push(sortedArray.splice(mortImageIndex, 1)[0])

  // for (let i = 0; i < sortedArray.length; i++) {
  //   if (sortedArray[i].includes('mort')) {
  //     sortedArray.push(sortedArray.splice(i, 1)[0])
  //   }
  //   break;
  // }

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

function calculateCartTotal(cartItems) {
  let cartTotal = null;
  cartItems.forEach(item => {
    cartTotal += parseInt(item.finalPrice);
  });
  if (!cartTotal) {
    cartTotal = 0;
  }
  return '$' + cartTotal;
}

export { formatItemData, calculateCartTotal };

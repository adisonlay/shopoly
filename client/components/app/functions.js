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

export { sortImageData };

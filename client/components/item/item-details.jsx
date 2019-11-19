import React, { useState, useEffect } from 'react'
import { Container, Typography } from '@material-ui/core';

export default function ItemDetails({ setAppView, viewParams, addToCartCallback }) {
  const [itemDetailData, setItemDetailData] = useState({});

  const getItemDetailData = itemID => {
    fetch(`api/helper/items.php?id=${itemID}`)
      .then(response => response.json())
      .then(itemsData => setItemDetailData(itemsData))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getItemDetailData(viewParams.itemID);
  });

  const handleAddToCart = () => {};

  if (Object.keys(itemDetailData).length === 0) {
    return (<Typography variant="h5" color="textSecondary">Item details unavailable.</Typography>);
  } else {
    return (
      <Container>

      </Container>
    );
  }
}

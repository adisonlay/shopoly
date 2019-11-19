import React, { useState, useEffect } from 'react'
import { sortImageData } from '../app/functions'
import { Container, Grid, Paper, Box, Typography, Button } from '@material-ui/core';

export default function ItemDetails({ setAppView, viewParams, addToCartCallback }) {
  const [itemDetailData, setItemDetailData] = useState({});

  const getItemDetailData = itemID => {
    fetch(`api/helper/items.php?id=${itemID}`)
      .then(response => response.json())
      .then(itemDetailData => setItemDetailData(itemDetailData))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getItemDetailData(viewParams.itemID);
  });

  const handleAddToCart = () => {};

  if (Object.keys(itemDetailData).length === 0) {
    return (<Typography variant="h5" color="textSecondary">Item details unavailable.</Typography>);
  } else {
    const {
      id: itemID,
      name,
      price,
      lot_number: lotNumber,
      rent: baseRent,
      item_group: itemGroup,
      description1,
      description2,
      images
    } = itemDetailData;

    const sortedImages = sortImageData(images);

    return (
      <Container fixed>
        <Paper>
          <Grid container>
            <Grid item xs={12} md={6} lg={4}>
              <Box
                width={1}
                height="16rem"
                style={{
                  backgroundImage: `url("${sortedImages[1].substring(13)}")`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography gutterBottom variant="h5">{name}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary">{`Price: $${price}`}</Typography>
              <Typography>Lot Number: {lotNumber > 0 ? lotNumber : 'N/A'}</Typography>
              <Typography>Base Rent: {isNaN(parseInt(baseRent)) ? baseRent : `$${baseRent}`}</Typography>
              <Typography>Color Group: {itemGroup}</Typography>
              <Button variant="contained" color="primary">Add to Cart</Button>
            </Grid>
          </Grid>
          <Typography paragraph>{description1}</Typography>
          <Typography paragraph>{description2}</Typography>
        </Paper>
      </Container>
    );
  }
}

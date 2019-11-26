import React, { useState, useEffect } from 'react';
import AddToCart from './add-to-cart';
import { formatItemData } from '../app/functions';
import { Container, Grid, Paper, Box, Typography } from '@material-ui/core';

export default function ItemDetails({ setAppView, viewParams, addToCartCallback }) {
  const [itemDetailData, setItemDetailData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`api/helper/items.php?id=${viewParams.itemID}`, { signal })
      .then(response => response.json())
      .then(itemDetailData => setItemDetailData(itemDetailData))
      .catch(error => console.error(error));

    return function cleanup() {
      abortController.abort();
    };
  }, [itemDetailData]);

  if (Object.keys(itemDetailData).length === 0) {
    return (<Typography variant="h5" color="textSecondary">Item details unavailable.</Typography>);
  } else {
    const formattedData = formatItemData(itemDetailData);
    const {
      itemID,
      name,
      price,
      lotNumber,
      rent,
      itemGroup,
      description1,
      description2,
      images
    } = formattedData;

    return (
      <Container fixed>
        <Paper>
          <Box p="2rem">
            <Grid container>

              <Grid item xs={12} md={6}>
                <Box
                  mb="1rem"
                  width={1}
                  height="16rem"
                  style={{
                    backgroundImage: `url("${images[1]}")`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box mb="1rem">
                  <Typography gutterBottom variant="h5">{name}</Typography>
                  <Typography gutterBottom variant="h6" color="textSecondary">{price}</Typography>
                  <Typography>Lot Number: {lotNumber}</Typography>
                  <Typography>Base Rent: {rent}</Typography>
                  <Typography gutterBottom>Color Group: {itemGroup}</Typography>
                  <AddToCart itemDetailData={itemDetailData} addToCartCallback={addToCartCallback} />
                </Box>
              </Grid>

            </Grid>

            <Typography paragraph>{description1}</Typography>
            <Typography paragraph>{description2}</Typography>

          </Box>
        </Paper>
      </Container>
    );
  }
}

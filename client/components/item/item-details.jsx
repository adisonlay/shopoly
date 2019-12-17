import React, { useState, useEffect } from 'react';
import ItemGallery from './item-gallery';
import ItemAddToCart from './item-add-to-cart';
import { formatItemData } from '../app/functions';
import { Container, Box, CircularProgress, Typography, Fade, Paper, Grid } from '@material-ui/core';

export default function ItemDetails({ setAppView, viewParams, addToCartCallback, unlockStatus }) {
  const [pageLoading, setPageLoading] = useState(true);
  const [itemDetailData, setItemDetailData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`api/helper/items.php?id=${viewParams.itemID}`, { signal })
      .then(response => response.json())
      .then(itemDetailData => setItemDetailData(itemDetailData))
      .then(() => setPageLoading(false))
      .catch(error => console.error(error));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  if (pageLoading) {
    return (
      <Container fixed>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size="10%" />
        </Box>
      </Container>
    );

  } else if (Object.keys(itemDetailData).length === 0) {
    return (
      <Container fixed>
        <Typography variant="h6" color="textSecondary">Item details unavailable.</Typography>
      </Container>
    );

  } else {
    const formattedData = formatItemData(itemDetailData);
    const { itemID, name, price, lotNumber, rent, itemGroup, description1, description2, images } = formattedData;

    return (
      <Fade in>
        <Container fixed>
          <Paper>
            <Box p="2rem">
              <Grid container spacing={3}>

                <Grid item xs={12} md={6}>
                  <ItemGallery images={images} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box mb="1rem">
                    <Typography gutterBottom variant="h5">{name}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary">{price}</Typography>
                    <Typography>Lot Number: {lotNumber}</Typography>
                    <Typography>Base Rent: {rent}</Typography>
                    <Typography gutterBottom>Color Group: {itemGroup}</Typography>
                    <ItemAddToCart
                      setAppView={setAppView}
                      itemDetailData={itemDetailData}
                      addToCartCallback={addToCartCallback}
                      unlockStatus={unlockStatus}
                    />
                  </Box>
                </Grid>

              </Grid>

              <Typography paragraph>{description1}</Typography>
              <Typography paragraph>{description2}</Typography>

            </Box>
          </Paper>
        </Container>
      </Fade>
    );
  }
}

import React, { useState, useEffect } from 'react';
import ItemCard from './item-card';
import { Container, Box, CircularProgress, Typography, Grid, Fade } from '@material-ui/core';

export default function ItemCardsList({ setAppView, unlockStatus }) {
  const [pageLoading, setPageLoading] = useState(true);
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch('api/helper/items.php', { signal })
      .then(response => response.json())
      .then(itemsData => setItemsData(itemsData))
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

  } else if (itemsData.length === 0) {
    return (
      <Container fixed>
        <Typography variant="h6" color="textSecondary">Item data unavailable.</Typography>
      </Container>
    );

  } else {
    return (
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {itemsData.map(item => (
            <Fade in key={item.itemID}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ItemCard itemData={item} setAppView={setAppView} unlockStatus={unlockStatus} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Container>
    );
  }
}

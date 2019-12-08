import React, { useState, useEffect } from 'react';
import ItemCard from './item-card';
import { Container, Grid, Typography } from '@material-ui/core';

export default function ItemCardsList({ setAppView }) {
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch('api/helper/items.php', { signal })
      .then(response => response.json())
      .then(itemsData => setItemsData(itemsData))
      .catch(error => console.error(error));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  if (itemsData.length === 0) {
    return (<Typography variant="h5" color="textSecondary">Items data unavailable.</Typography>);
  } else {
    return (
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {itemsData.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.itemID}>
              <ItemCard itemData={item} setAppView={setAppView} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

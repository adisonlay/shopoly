import React, { useState, useEffect } from 'react';
import ItemCard from './item-card';
import { Container, Grid, Typography } from '@material-ui/core';

export default function ItemCardsList({ setAppView }) {
  const [itemsData, setItemsData] = useState([]);

  const getItemsData = () => {
    fetch('api/helper/items.php')
      .then(response => response.json())
      .then(itemsData => setItemsData(itemsData))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getItemsData();
  });

  if (itemsData.length === 0) {
    return (<Typography variant="h5" color="textSecondary">Items data unavailable.</Typography>);
  } else {
    return (
      <Container>
        <Grid container spacing={3}>
          {itemsData.map(item => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={item.id}>
              <ItemCard itemData={item} setAppView={setAppView} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

import React, { useState, useEffect } from 'react';
import ItemCard from './item-card';
import { Container, Grid } from '@material-ui/core';

export default function ItemCardsList({ setAppView }) {
  const [itemsData, setItemsData] = useState([]);

  const getItemsData = () => {
    fetch('/api/helper/items.php')
      .then(response => response.json())
      .then(itemsData => setItemsData(itemsData))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getItemsData();
  });

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

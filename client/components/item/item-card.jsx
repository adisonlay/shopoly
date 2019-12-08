import React from 'react';
import { formatItemData } from '../app/functions'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Box, Typography, Button } from '@material-ui/core';

export default function ItemCard({ itemData, setAppView }) {
  itemData = formatItemData(itemData);
  const {
    itemID,
    name,
    price,
    lotNumber,
    rent,
    itemGroup,
    images
  } = itemData;

  const handleDetailsClick = () => setAppView('details', { itemID, itemName: name });

  return (
    <Card>
      <CardActionArea onClick={handleDetailsClick}>
        <CardMedia
          style={{ height: '16rem', backgroundSize: 'contain' }}
          image={images[0]}
          title={name}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" style={{ fontWeight: 400 }} gutterBottom>{name}</Typography>
            <Typography variant="h6" color="textSecondary" style={{ fontWeight: 400 }} gutterBottom>{price}</Typography>
          </Box>
          <Typography variant="body2">Lot Number: {lotNumber}</Typography>
          <Typography variant="body2">Base Rent: {rent}</Typography>
          <Typography variant="body2">Color Group: {itemGroup}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleDetailsClick}>View Product Details</Button>
      </CardActions>
    </Card>
  );
}

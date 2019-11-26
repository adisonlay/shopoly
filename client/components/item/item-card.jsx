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
      <CardActionArea>
        <CardMedia
          style={{ height: '16rem', backgroundSize: 'contain' }}
          image={images[0]}
          title={name}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom variant="h5">{name}</Typography>
            <Typography gutterBottom variant="h5" color="textSecondary">{price}</Typography>
          </Box>
          <Typography>Lot Number: {lotNumber}</Typography>
          <Typography>Base Rent: {rent}</Typography>
          <Typography>Color Group: {itemGroup}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleDetailsClick}>View Product Details</Button>
      </CardActions>
    </Card>
  );
}

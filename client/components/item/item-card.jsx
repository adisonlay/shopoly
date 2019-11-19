import React from 'react';
import { sortImageData } from '../app/functions'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Box, Typography, Button } from '@material-ui/core';

export default function ItemCard({ itemData, setAppView }) {
  const {
    id,
    name,
    price,
    lot_number: lotNumber,
    rent: baseRent,
    item_group: itemGroup,
    images
  } = itemData;

  const sortedImages = sortImageData(images);
  const handleDetailsClick = () => props.setAppView('details', { itemID: id });

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          style={{ height: '16rem', backgroundSize: 'contain' }}
          image={sortedImages[0].substring(13)}
          title={name}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom variant="h5">
              {name}
            </Typography>
            <Typography gutterBottom variant="h5" color="textSecondary">
              {`$${price}`}
            </Typography>
          </Box>
          <Typography>Lot Number: {lotNumber > 0 ? lotNumber : 'N/A'}</Typography>
          <Typography>Base Rent: {isNaN(parseInt(baseRent)) ? baseRent :`$${baseRent}`}</Typography>
          <Typography>Color Group: {itemGroup}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={handleDetailsClick}>
          View Product Details
        </Button>
      </CardActions>
    </Card>
  );
}

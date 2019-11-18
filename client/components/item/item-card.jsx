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

  images = sortImageData(images);
  const handleDetailsClick = () => props.setAppView('details', { itemID: id });

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image={`../../${images[0]}`}
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
          <Typography>Lot Number: {lotNumber}</Typography>
          <Typography>Base Rent: {`$${baseRent}`}</Typography>
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

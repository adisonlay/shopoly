import React from 'react';
import { formatItemData } from '../app/functions';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Box, Typography, Button } from '@material-ui/core';

export default function ItemCard({ itemData, setAppView, unlockStatus }) {
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

  let textColor = 'initial';
  let lockedItemImageOverlay = null;

  if ((name === 'House' && !unlockStatus.house) || (name === 'Hotel' && !unlockStatus.hotel)) {
    textColor = 'textSecondary';
    lockedItemImageOverlay = (
      <Box
        width={1}
        height="16rem"
        className="image-box"
        style={{
          backgroundImage: 'url("/assets/images/helper/locked.png")',
          position: 'absolute'
        }}
      />
    );
  }

  const handleDetailsClick = () => setAppView('details', { itemID, itemName: name });

  return (
    <Card>
      <CardActionArea onClick={handleDetailsClick}>
        <CardMedia
          image={images[0]}
          title={name}
          style={{
            height: '16rem',
            backgroundSize: 'contain',
            position: 'relative'
          }}
        >
          {lockedItemImageOverlay}
        </CardMedia>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color={textColor} style={{ fontWeight: 400 }} gutterBottom>{name}</Typography>
            <Typography variant="h6" color="textSecondary" style={{ fontWeight: 400 }} gutterBottom>{price}</Typography>
          </Box>
          <Typography variant="body2" color={textColor}>Lot Number: {lotNumber}</Typography>
          <Typography variant="body2" color={textColor}>Base Rent: {rent}</Typography>
          <Typography variant="body2" color={textColor}>Color Group: {itemGroup}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleDetailsClick}>View Product Details</Button>
      </CardActions>
    </Card>
  );
}

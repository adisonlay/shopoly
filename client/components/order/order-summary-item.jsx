import React from 'react';
import { formatItemData } from '../app/functions';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Box, Typography } from '@material-ui/core';

export default function OrderSummaryItem({ itemData, setAppView }) {
  const formattedData = formatItemData(itemData);
  const {
    cartID,
    finalPrice,
    quantity,
    itemID,
    name,
    price,
    lotNumber,
    rent,
    itemGroup,
    images
  } = formattedData;

  const handleItemClick = () => setAppView('details', { itemID, itemName: name });

  return (
    <ListItem button onClick={handleItemClick}>
      <ListItemAvatar style={{ marginRight: '0.5rem' }}>
        <Box
          width={1}
          minHeight="4rem"
          className="image-box"
          style={{ backgroundImage: `url("${images[1]}")` }}
        />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={'Quantity: ' + quantity} />
      <ListItemSecondaryAction>
        <Typography>${finalPrice * quantity}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

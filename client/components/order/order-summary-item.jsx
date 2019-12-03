import React from 'react';
import { formatItemData } from '../app/functions';
import { Box, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core';

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
          style={{
            backgroundImage: `url("${images[1]}")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={'Quantity: ' + quantity} />
      <ListItemSecondaryAction>
        <Typography>${finalPrice * quantity}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

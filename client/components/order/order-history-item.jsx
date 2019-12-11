import React, { useState } from 'react';
import { formatItemData } from '../app/functions';
import { Box, Divider, Grid, Typography, Link, Popper } from '@material-ui/core';

export default function OrderHistoryItem({ itemData, setAppView }) {
  const [popperAnchor, setPopperAnchor] = useState(null);

  const formattedData = formatItemData(itemData);
  const { cartID, finalPrice, quantity, itemID, name, price, lotNumber, rent, itemGroup, images, ordered } = formattedData;
  const orderDate = new Date(ordered);

  const handleItemClick = event => {
    if (name === 'Free Parking') {
      setPopperAnchor(popperAnchor ? null : event.currentTarget)
      return;
    }
    setAppView('details', { itemID, itemName: name });
  };

  return (
    <>
      <Box my="1rem">
        <Divider />
      </Box>

      <Grid container>
        <Grid item xs={6} md={3}>
          <Box
            width={1}
            minHeight="6rem"
            className="cursor image-box"
            style={{ backgroundImage: `url("${images[1]}")` }}
            onClick={handleItemClick}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography gutterBottom>
            <Link className="cursor" onClick={handleItemClick}>{name}</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">Lot Number: {lotNumber}</Typography>
          <Typography variant="body2" color="textSecondary">Base Rent: {rent}</Typography>
          <Typography variant="body2" color="textSecondary">Color Group: {itemGroup}</Typography>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography gutterBottom><br /></Typography>
          <Typography variant="body2" color="textSecondary">Order Number: #{cartID}</Typography>
          <Typography variant="body2" color="textSecondary">Order Date: {orderDate.toLocaleDateString('en-US')}</Typography>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography gutterBottom><br /></Typography>
          <Typography variant="body2" color="textSecondary">Price: ${finalPrice}</Typography>
          <Typography variant="body2" color="textSecondary">Quantity: {quantity}</Typography>
          <Typography variant="body2" color="textSecondary">Subtotal: ${finalPrice * quantity}</Typography>
        </Grid>
      </Grid>

      <Popper open={!!popperAnchor} anchorEl={popperAnchor}>
        <img src="assets/images/helper/bill.png" alt="$500 Bill" style={{ height: '8rem' }} />
      </Popper>
    </>
  );
}

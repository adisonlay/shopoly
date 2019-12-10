import React from 'react';
import { formatItemData } from '../app/functions';
import { Box, Divider, Grid, Typography, Link } from '@material-ui/core';

export default function OrderHistoryItem({ itemData, setAppView }) {
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
    images,
    ordered
  } = formattedData;

  const orderDate = new Date(ordered);

  const handleItemClick = () => setAppView('details', { itemID, itemName: name });

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
    </>
  );
}

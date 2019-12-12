import React from 'react';
import { formatItemData } from '../app/functions';
import { Box, Paper, Grid, Typography, Link } from '@material-ui/core';

export default function CartSummaryItem({ itemData, setAppView }) {
  const formattedData = formatItemData(itemData);
  const { cartID, finalPrice, quantity, itemID, name, price, lotNumber, rent, itemGroup, images } = formattedData;

  const handleItemClick = () => setAppView('details', { itemID, itemName: name });
  const handleQuantityUpdate = () => {};
  const handleRemoveFromCart = () => {};

  return (
    <Box mb="0.5rem">
      <Paper>
        <Box p="1rem">

          <Grid container>
            <Grid item xs={6} md={2}>
              <Box
                width={1}
                minHeight="6rem"
                className="cursor image-box"
                style={{ backgroundImage: `url("${images[1]}")` }}
                onClick={handleItemClick}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <Box>
                <Typography gutterBottom>
                  <Link className="cursor" onClick={handleItemClick}>{name}</Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">Lot Number: {lotNumber}</Typography>
                <Typography variant="body2" color="textSecondary">Base Rent: {rent}</Typography>
                <Typography variant="body2" color="textSecondary">Color Group: {itemGroup}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box p="0.5rem" display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="body2" color="textSecondary">Price: ${finalPrice}</Typography>
                <Typography variant="body2" color="textSecondary">Quantity: {quantity}</Typography>
                <Typography>Subtotal: ${finalPrice * quantity}</Typography>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Paper>
    </Box>
  );
}

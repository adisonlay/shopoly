import React from 'react';
import { formatItemData } from '../app/functions';
import { Box, Paper, Grid, Typography, Link } from '@material-ui/core';

export default function CartSummaryItem({ itemData, setAppView }) {
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
    <Box mb="1rem">
      <Paper>
        <Box p="1rem">

          <Grid container>
            <Grid item xs={6} md={3}>
              <Box
                width={1}
                height="12rem"
                style={{
                  backgroundImage: `url("${images[1]}")`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                onClick={handleItemClick}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <Box>
                <Typography gutterBottom variant="h5" >
                  <Link onClick={handleItemClick}>{name}</Link>
                </Typography>
                <Typography>Lot Number: {lotNumber}</Typography>
                <Typography>Base Rent: {rent}</Typography>
                <Typography>Color Group: {itemGroup}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box p="0.5rem" display="flex" flexDirection="column" alignItems="flex-end">
                <Typography>Price: ${finalPrice}</Typography>
                <Typography>Quantity: {quantity}</Typography>
                <Typography variant="h6">Subtotal: ${finalPrice * quantity}</Typography>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Paper>
    </Box>
  );
}

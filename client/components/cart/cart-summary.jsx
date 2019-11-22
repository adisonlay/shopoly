import React from 'react';
import { formatItemData } from '../app/functions';
import { Container, Grid, Paper, Box, Typography, Button } from '@material-ui/core';

export default function CartSummary({ setAppView, cartItems }) {
  let cartItemListDisplay = null;
  let checkoutButtonDisplay = null;

  const handleCheckout = () => setAppView('checkout', { itemTotal: '' });

  if (!cartItems.length) {
    cartItemListDisplay = (<Typography variant="h5" color="textSecondary">There are no items in your cart.</Typography>);
  } else {
    cartItemListDisplay = (cartItems.map(cartItem => <CartSummaryItem key={cartItem.itemID} itemData={cartItem} />));
    checkoutButtonDisplay = (<Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>);
  }

  return (
    <Container fixed>
      <Paper>
        <Box p="2rem">
          <Grid container>
            <Grid item xs={12} md={6} lg={4}>

            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

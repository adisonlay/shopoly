import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Fade, Container, Box, Typography, Chip, Button, Paper } from '@material-ui/core';

export default function CartSummary({ setAppView, cartItems }) {
  const cartItemCount = cartItems.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, 0);
  const cartTotal = cartItems.reduce((runningTotal, currentItemObject) => runningTotal + currentItemObject.finalPrice * currentItemObject.quantity, 0);

  const handleContinue = () => setAppView('catalog', {});
  const handleCheckout = () => setAppView('checkout', { cartItemCount, cartTotal });

  let cartItemListDisplay = null;
  if (!cartItems.length) {
    cartItemListDisplay = (
      <Box mb="0.5rem">
        <Paper>
          <Box p="1rem">
            <Typography variant="h6" color="textSecondary">There are no items in your cart.</Typography>
          </Box>
        </Paper>
      </Box>
    );
  } else {
    cartItemListDisplay = (cartItems.map(cartItem => <CartSummaryItem key={cartItem.itemID} itemData={cartItem} setAppView={setAppView} />));
  }

  return (
    <Fade in>
      <Container fixed>
        <Box mb="0.5rem" display="flex" justifyContent="space-between">
          <Typography variant="h5">Shopping Cart</Typography>
          <Chip label={cartItemCount} />
        </Box>
        {cartItemListDisplay}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" color="textSecondary">Cart Total ({cartItemCount} Items): ${cartTotal}</Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={handleContinue}>Continue Shopping</Button>
            <Button variant="contained" color="primary" onClick={handleCheckout} disabled={!cartItems.length} style={{ marginLeft: '0.5rem' }}>Checkout</Button>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
}

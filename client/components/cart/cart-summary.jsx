import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Container, Typography, Box, Button } from '@material-ui/core';

export default function CartSummary({ setAppView, cartItems }) {
  let cartItemListDisplay = null;
  let checkoutButtonDisplay = null;

  const cartItemCount = cartItems.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, 0);
  const cartTotal = cartItems.reduce((runningTotal, currentItemObject) => runningTotal + currentItemObject.finalPrice * currentItemObject.quantity, 0);

  const handleCheckout = () => setAppView('checkout', { cartItemCount, cartTotal });

  if (!cartItems.length) {
    cartItemListDisplay = (<Typography variant="h5" color="textSecondary">There are no items in your cart.</Typography>);
  } else {
    cartItemListDisplay = (cartItems.map(cartItem => <CartSummaryItem key={cartItem.itemID} itemData={cartItem} setAppView={setAppView} />));
    checkoutButtonDisplay = (<Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>);
  }

  return (
    <Container fixed>
      <Typography variant="h5" gutterBottom>Shopping Cart</Typography>
      {cartItemListDisplay}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" color="textSecondary">Cart Total ({cartItemCount} Items): ${cartTotal}</Typography>
        {checkoutButtonDisplay}
      </Box>
    </Container>
  );
}

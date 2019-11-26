import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Container, Box, Typography, Button } from '@material-ui/core';

export default function CartSummary({ setAppView, cartItems }) {
  let cartItemListDisplay = null;
  let checkoutButtonDisplay = null;

  let initialCartItemCount = 0;
  const cartItemCount = cartItems.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, initialCartItemCount);

  let initialCartTotal = 0;
  const cartTotal = cartItems.reduce((runningTotal, currentItemObject) => runningTotal + currentItemObject.finalPrice * currentItemObject.quantity, initialCartTotal);

  const handleCheckout = () => setAppView('checkout', { cartTotal });

  if (!cartItems.length) {
    cartItemListDisplay = (<Typography variant="h5" color="textSecondary">There are no items in your cart.</Typography>);
  } else {
    cartItemListDisplay = (cartItems.map(cartItem => <CartSummaryItem key={cartItem.itemID} itemData={cartItem} setAppView={setAppView} />));
    checkoutButtonDisplay = (<Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>);
  }

  return (
    <Container fixed>
      {cartItemListDisplay}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Cart Total ({cartItemCount} Items): ${cartTotal}</Typography>
        {checkoutButtonDisplay}
      </Box>
    </Container>
  );
}

import React from 'react';
import OrderSummaryItem from './order-summary-item';
import { Container, Box, Typography, Button } from '@material-ui/core';

export default function OrderSummary({ setAppView, viewParams }) {
  const { orderItems, orderItemCount, orderTotal } = viewParams;

  let orderItemListDisplay = null;
  let continueButtonDisplay = null;

  const handleContinue = () => setAppView('catalog', {});

  if (!orderItems.length) {
    orderItemListDisplay = (<Typography variant="h5" color="textSecondary">No order data available.</Typography>);
  } else {
  //   cartItemListDisplay = (cartItems.map(cartItem => <CartSummaryItem key={cartItem.itemID} itemData={cartItem} setAppView={setAppView} />));
  //   checkoutButtonDisplay = (<Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>);
  }

  // return (
  //   <Container fixed>
  //     {cartItemListDisplay}
  //     <Box display="flex" justifyContent="space-between">
  //       <Typography variant="h5">Cart Total ({cartItemCount} Items): ${cartTotal}</Typography>
  //       {checkoutButtonDisplay}
  //     </Box>
  //   </Container>
  // );
}

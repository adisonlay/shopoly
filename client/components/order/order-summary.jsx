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
    orderItemListDisplay = (orderItems.map(orderItem => <OrderSummaryItem key={orderItem.itemID} itemData={orderItem} setAppView={setAppView} />));
    continueButtonDisplay = (<Button variant="contained" color="primary" onClick={handleContinue}>Continue Shopping</Button>);
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

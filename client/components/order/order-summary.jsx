import React from 'react';
import OrderSummaryItem from './order-summary-item';
import { Container, Grid, Box, Typography, Button, Divider } from '@material-ui/core';

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

  return (
    <Container fixed>
      <Typography variant="h5" gutterBottom>Order Summary</Typography>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" color="textSecondary" gutterBottom>Order #{orderItems[0].cartID}</Typography>

          <Typography>Payment Summary</Typography>
          <Grid container>
            <Grid item>
              <Typography variant="body2" color="textSecondary">Item Total</Typography>
              <Typography variant="body2" color="textSecondary">Taxes</Typography>
              <Typography variant="body2" color="textSecondary">Shipping</Typography>
              <Divider />
              <Typography variant="body2" gutterBottom>Order Total</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">{'$' + orderTotal}</Typography>
              <Typography variant="body2" color="textSecondary">$0</Typography>
              <Typography variant="body2" color="textSecondary">$0</Typography>
              <Divider />
              <Typography variant="body2" gutterBottom>{'$' + orderTotal}</Typography>
            </Grid>
          </Grid>

          <Typography>Shipping Address</Typography>
          <Typography variant="body2">Mr. Monopoly</Typography>
          <Typography variant="body2">200 Park Place</Typography>
          <Typography variant="body2">Atlantic City, NJ 34982</Typography>
          <Typography variant="body2">United States</Typography>
        </Grid>

        <Grid item xs={12} md={9}>
          <Typography variant="h6" color="textSecondary" gutterBottom>Your Items</Typography>
          {orderItemListDisplay}
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end">
        {continueButtonDisplay}
      </Box>
    </Container>
  );
}

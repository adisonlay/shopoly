import React from 'react';
import OrderSummaryItem from './order-summary-item';
import { Container, Typography, Grid, Paper, Box, Divider, Chip, List, Button } from '@material-ui/core';

export default function OrderSummary({ setAppView, viewParams }) {
  const { orderItems, orderItemCount, orderTotal, shippingAddress } = viewParams;

  const handleItemClick = itemClicked => setAppView('details', { itemID: itemClicked.itemID, itemName: itemClicked.name });
  const handleContinue = () => setAppView('catalog', {});
  const handleHistory = () => setAppView('orderHistory', {});

  const today = new Date();

  return (
    <Container fixed>
      <Typography variant="h5" gutterBottom>Order Summary</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper>
            <Box p="1rem">
              <Typography variant="h6" color="textSecondary">Order #{orderItems[0].cartID}</Typography>
              <Typography variant="body2" gutterBottom>Order Date: {today.toLocaleDateString('en-US')}</Typography>

              <br />

              <Typography>Payment Summary:</Typography>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="textSecondary">Item Total</Typography>
                  <Typography variant="body2" color="textSecondary">Taxes</Typography>
                  <Typography variant="body2" color="textSecondary">Shipping</Typography>
                  <Box my="0.25rem">
                    <Divider />
                  </Box>
                  <Typography variant="body2" gutterBottom>Order Total</Typography>
                </Box>
                <Box flexGrow={1}>
                  <Typography variant="body2" color="textSecondary">
                    <br />
                    <br />
                    <br />
                  </Typography>
                  <Box my="0.25rem">
                    <Divider />
                  </Box>
                  <Typography variant="body2" gutterBottom><br /></Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">${orderTotal}</Typography>
                  <Typography variant="body2" color="textSecondary">$0</Typography>
                  <Typography variant="body2" color="textSecondary">$0</Typography>
                  <Box my="0.25rem">
                    <Divider />
                  </Box>
                  <Typography variant="body2" gutterBottom>${orderTotal}</Typography>
                </Box>
              </Box>

              <br />

              <Typography>Shipping Address:</Typography>
              <Typography variant="body2">{shippingAddress.nameInput}</Typography>
              <Typography variant="body2">{shippingAddress.addressInput}</Typography>
              <Typography variant="body2">{shippingAddress.cityInput + ', ' + shippingAddress.stateInput + ' ' + shippingAddress.zipInput}</Typography>
              <Typography variant="body2">{shippingAddress.countryInput}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper>
            <Box p="1rem">
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" color="textSecondary" gutterBottom>Your Items</Typography>
                <Chip label={orderItemCount} />
              </Box>
              <List>
                {orderItems.map(orderItem => <OrderSummaryItem key={orderItem.itemID} itemData={orderItem} setAppView={setAppView} />)}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box mt="1rem" display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleContinue}>Continue Shopping</Button>
        <Button variant="contained" color="primary" onClick={handleHistory} style={{ marginLeft: '0.5rem' }}>View Order History</Button>
      </Box>
    </Container>
  );
}

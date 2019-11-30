import React from 'react';
import { Container, Grid, Box, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Divider, Chip } from '@material-ui/core';

export default function CartCheckoutForm({ setAppView, viewParams, cartItems, placeOrderCallback }) {
  const handleCartItemClick = (itemClicked) => setAppView('details', { itemID: itemClicked.itemID, itemName: itemClicked.name });
  const handlePlaceOrder = () => placeOrderCallback();

  return (
    <Container fixed>
      <Grid container>
        <Grid item xs={12} md={9}>

        </Grid>
        <Grid item xs={12} md={3}>
          <Box mb="0.5rem" display="flex" justifyContent="space-between">
            <Typography variant="h5">Cart</Typography>
            <Chip label={viewParams.cartItemCount} />
          </Box>
          <Paper>
            <List>
              {cartItems.map(cartItem => (
                <ListItem button onClick={() => handleCartItemClick(cartItem)}>
                  <ListItemText primary={cartItem.name} secondary={'Quantity: ' + cartItem.quantity} />
                  <ListItemSecondaryAction>
                    <Typography>{'$' + cartItem.finalPrice * cartItem.quantity}</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <Divider />
              <ListItem>
                <ListItemText primary="Total" />
                <ListItemSecondaryAction>
                  <Typography>{'$' + viewParams.cartTotal}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

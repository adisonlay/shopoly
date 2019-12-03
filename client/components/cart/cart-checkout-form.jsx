import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Grid, Box, Paper, Typography, Chip, Button,
  TextField, FormControl, InputLabel, Select, MenuItem,
  List, ListItem, ListItemText, ListItemSecondaryAction, Divider
} from '@material-ui/core';

export default function CartCheckoutForm({ setAppView, viewParams, cartItems, placeOrderCallback }) {
  const { cartItemCount, cartTotal } = viewParams;

  const [stateLabelWidth, setStateLabelWidth] = useState(0);
  const [countryLabelWidth, setCountryLabelWidth] = useState(0);
  const stateSelectLabel = useRef(null);
  const countrySelectLabel = useRef(null);
  useEffect(() => {
    setStateLabelWidth(stateSelectLabel.current.offsetWidth);
    setCountryLabelWidth(countrySelectLabel.current.offsetWidth);
  }, []);

  const placeholderNames = ['Battleship', 'Boot', 'Cat', 'Racecar', 'Scottie Dog', 'Thimble', 'Top Hat', 'Wheelbarrow', 'Mr. Monopoly', 'Jake the Jailbird'];
  const inputStyle = { margin: '1rem' };

  const handleCartItemClick = itemClicked => setAppView('details', { itemID: itemClicked.itemID, itemName: itemClicked.name });
  const handlePlaceOrder = () => {
    placeOrderCallback(cartItems[0].cartID);
    setAppView('orderSummary', { orderItems: cartItems, orderItemCount: cartItemCount, orderTotal: cartTotal });
  };

  return (
    <Container fixed>
      <Grid container spacing={3}>

        <Grid item xs={12} md={9}>
          <Box mb="0.5rem">
            <Typography variant="h5">Checkout</Typography>
          </Box>
          <Paper>
            <Box p="2rem">
              <form>

                <Typography variant="h6">Shipping Address</Typography>
                <TextField
                  fullWidth
                  id="name-input"
                  label="Full Name"
                  variant="outlined"
                  placeholder={'e.g. ' + placeholderNames[Math.floor(Math.random() * placeholderNames.length)]}
                  style={inputStyle}
                />
                <TextField
                  fullWidth
                  id="address-input"
                  label="Address"
                  variant="outlined"
                  placeholder="e.g. 200 Park Place"
                  style={inputStyle}
                />
                <TextField
                  id="city-input"
                  label="City"
                  variant="outlined"
                  placeholder="e.g. Atlantic City"
                  style={inputStyle}
                />
                <FormControl variant="outlined" style={{ margin: '1rem', width: '20%' }}>
                  <InputLabel ref={stateSelectLabel} id="state-select-label">State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="state-input"
                    labelWidth={stateLabelWidth}
                  >
                    <MenuItem value=""><em>Choose...</em></MenuItem>
                    <MenuItem value="NJ">New Jersey</MenuItem>
                    <MenuItem value="CA">California</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="zip-input"
                  label="Zip"
                  variant="outlined"
                  placeholder="e.g. 50200"
                  style={inputStyle}
                />
                <br />
                <FormControl variant="outlined" style={{ margin: '1rem', width: '35%' }}>
                  <InputLabel ref={countrySelectLabel} id="country-select-label">Country</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-input"
                    labelWidth={countryLabelWidth}
                  >
                    <MenuItem value=""><em>Choose...</em></MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                  </Select>
                </FormControl>

                <Box my="1rem">
                  <Divider />
                </Box>

                <Typography variant="h6">Payment</Typography>
                <TextField
                  id="card-name-input"
                  label="Name on Card"
                  variant="outlined"
                  placeholder={'e.g. ' + placeholderNames[Math.floor(Math.random() * placeholderNames.length)]}
                  style={{ margin: '1rem', width: '45%' }}
                />
                <TextField
                  id="card-number-input"
                  label="Credit Card Number"
                  variant="outlined"
                  placeholder="e.g. 1234-5555-6789-0000"
                  style={{ margin: '1rem', width: '45%' }}
                />
                <br />
                <TextField
                  id="card-expiration-input"
                  label="Expiration"
                  variant="outlined"
                  placeholder="e.g. 01/2020"
                  style={inputStyle}
                />
                <TextField
                  id="card-cvv-input"
                  label="CVV"
                  variant="outlined"
                  placeholder="e.g. 123"
                  style={inputStyle}
                />

              </form>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box mb="0.5rem" display="flex" justifyContent="space-between">
            <Typography variant="h5">Cart</Typography>
            <Chip label={cartItemCount} />
          </Box>

          <Paper>
            <List>
              {cartItems.map(cartItem => (
                <ListItem key={cartItem.itemID} button onClick={() => handleCartItemClick(cartItem)}>
                  <ListItemText primary={cartItem.name} secondary={'Quantity: ' + cartItem.quantity} />
                  <ListItemSecondaryAction>
                    <Typography>${cartItem.finalPrice * cartItem.quantity}</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <Divider />
              <ListItem>
                <ListItemText primary="Total" />
                <ListItemSecondaryAction>
                  <Typography>${cartTotal}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>

          <Box mt="1rem" display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePlaceOrder}
            >
              Place Order
          </Button>
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
}

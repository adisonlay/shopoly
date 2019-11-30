import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Grid, Box, Paper, Typography, Chip,
  TextField, FormControl, InputLabel, Select, MenuItem,
  List, ListItem, ListItemText, ListItemSecondaryAction, Divider
} from '@material-ui/core';

export default function CartCheckoutForm({ setAppView, viewParams, cartItems, placeOrderCallback }) {
  const [stateLabelWidth, setStateLabelWidth] = useState(0);
  const [countryLabelWidth, setCountryLabelWidth] = useState(0);
  const stateSelectLabel = useRef(null);
  const countrySelectLabel = useRef(null);
  useEffect(() => {
    setStateLabelWidth(stateSelectLabel.current.offsetWidth);
    setCountryLabelWidth(countrySelectLabel.current.offsetWidth);
  }, []);

  const placeholderNames = ['Battleship', 'Boot', 'Cat', 'Racecar', 'Scottie Dog', 'Thimble', 'Top Hat', 'Wheelbarrow', 'Mr.Monopoly', 'Jake the Jailbird'];
  const inputStyle = { margin: '1rem' };
  // const selectStyle = { margin: '1rem', wid };

  const handleCartItemClick = itemClicked => setAppView('details', { itemID: itemClicked.itemID, itemName: itemClicked.name });
  const handlePlaceOrder = () => placeOrderCallback();

  return (
    <Container fixed>
      <Grid container spacing={2}>

        <Grid item xs={12} md={9}>
          <Box mb="0.25rem">
            <Typography variant="h5">Checkout</Typography>
          </Box>
          <Paper>
            <Box p="2rem">
              <form>
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
                {/* <TextField
                  id="state-input"
                  select
                  label="State"
                  value=""
                  variant="outlined"
                >
                  <MenuItem value=""><em>Choose...</em></MenuItem>
                  <MenuItem value="NJ">New Jersey</MenuItem>
                  <MenuItem value="CA">California</MenuItem>
                </TextField> */}
                <FormControl variant="outlined">
                  <InputLabel ref={stateSelectLabel} id="state-select-label">State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="state-input"
                    labelWidth={stateLabelWidth}
                    style={inputStyle}
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
                <FormControl variant="outlined">
                  <InputLabel ref={countrySelectLabel} id="country-select-label">Country</InputLabel>
                  <Select
                    fullWidth
                    labelId="country-select-label"
                    id="country-input"
                    margin="dense"
                    labelWidth={countryLabelWidth}
                    style={inputStyle}
                  >
                    <MenuItem value=""><em>Choose...</em></MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </Box>
          </Paper>
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

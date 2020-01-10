import React, { useState, useEffect, useRef } from 'react';
import { getStatesData } from '../app/functions';
import {
  Fade, Container, Grid, Box, Typography, Paper, Chip, Button,
  TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText,
  List, ListItem, ListItemText, ListItemSecondaryAction, Divider
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//Custom hook to handle input change
const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bindToInput: {
      value,
      onChange: event => setValue(event.target.value)
    }
  };
};

export default function CartCheckoutForm({ setAppView, viewParams, cartItems, placeOrderCallback }) {
  const { cartItemCount, cartTotal } = viewParams;
  const placeholderNames = ['Battleship', 'Boot', 'Cat', 'Racecar', 'Scottie Dog', 'Thimble', 'Top Hat', 'Wheelbarrow', 'Mr. Monopoly', 'Jake the Jailbird'];
  const screenNonMobile = useMediaQuery('(min-width: 600px)');
  const nonMobileInputStyle = { margin: '0.5rem 2.5%', width: '95%' };

  const { value: nameInput, bindToInput: bindToNameInput} = useInput('');
  const { value: addressInput, bindToInput: bindToAddressInput} = useInput('');
  const { value: cityInput, bindToInput: bindToCityInput } = useInput('');
  const { value: stateInput, setValue: setStateInput, bindToInput: bindToStateInput } = useInput('');
  const { value: zipInput, bindToInput: bindToZipInput } = useInput('');
  const { value: countryInput, setValue: setCountryInput } = useInput('');

  const { value: cardNameInput, bindToInput: bindToCardNameInput } = useInput('');
  const { value: cardNumberInput, bindToInput: bindToCardNumberInput } = useInput('');
  const { value: cardExpInput, bindToInput: bindToCardExpInput } = useInput('');
  const { value: cardCVVInput, bindToInput: bindToCardCVVInput } = useInput('');

  const [stateLabelWidth, setStateLabelWidth] = useState(0);
  const [countryLabelWidth, setCountryLabelWidth] = useState(0);
  const stateSelectLabel = useRef(null);
  const countrySelectLabel = useRef(null);
  useEffect(() => {
    setStateLabelWidth(stateSelectLabel.current.offsetWidth);
    setCountryLabelWidth(countrySelectLabel.current.offsetWidth);
  }, [countryInput]);

  const [inputErrorStatus, setInputErrorStatus] = useState({
    nameInput: false,
    addressInput: false,
    cityInput: false,
    stateInput: false,
    zipInput: false,
    countryInput: false,
    cardNameInput: false,
    cardNumberInput: false,
    cardExpInput: false,
    cardCVVInput: false
  });

  const validateInputs = () => {
    const newErrorStatus = {
      nameInput: false,
      addressInput: false,
      cityInput: false,
      stateInput: false,
      zipInput: false,
      countryInput: false,
      cardNameInput: false,
      cardNumberInput: false,
      cardExpInput: false,
      cardCVVInput: false
    };

    const alphaInputs = { nameInput, addressInput, cityInput, stateInput, countryInput, cardNameInput };
    for (let input in alphaInputs) {
      if (!alphaInputs[input]) {
        newErrorStatus[input] = true;
      }
    }

    const zipRegEx = /^[0-9]{5,}$/;
    const cardNumberRegEx = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    const cardExpRegEx = /^([1-9]|0[1-9]|1[0-2])\/(2019|20[2-9][0-9])$/;
    const cardCVVRegEx = /^[0-9]{3}$/;

    if (!zipRegEx.test(zipInput)) newErrorStatus.zipInput = true;
    if (!cardNumberRegEx.test(cardNumberInput)) newErrorStatus.cardNumberInput = true;
    if (!cardExpRegEx.test(cardExpInput)) newErrorStatus.cardExpInput = true;
    if (!cardCVVRegEx.test(cardCVVInput)) newErrorStatus.cardCVVInput = true;

    setInputErrorStatus(newErrorStatus);

    for (let status in newErrorStatus) {
      if (newErrorStatus[status]) {
        return false;
      }
    }
    return true;
  };

  const handleCountryChange = event => {
    setStateInput('');
    setCountryInput(event.target.value);
  };

  const handleCartItemClick = itemClicked => {
    setAppView('details', { itemID: itemClicked.itemID, itemName: itemClicked.name });
  };

  const handlePlaceOrder = () => {
    if (!validateInputs()) {
      return;
    } else {
      const shippingAddress = {
        nameInput,
        addressInput,
        cityInput,
        stateInput,
        zipInput,
        countryInput
      };

      placeOrderCallback(cartItems[0].cartID);
      setAppView('orderSummary', {
        orderItems: cartItems,
        orderItemCount: cartItemCount,
        orderTotal: cartTotal,
        shippingAddress
      });
    }
  };

  return (
    <Fade in>
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
                    id="name-input"
                    label="Full Name"
                    variant="outlined"
                    placeholder={'e.g. ' + placeholderNames[Math.floor(Math.random() * placeholderNames.length)]}
                    error={inputErrorStatus.nameInput}
                    helperText={inputErrorStatus.nameInput ? 'Please enter a name.' : ''}
                    style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '95%' } : nonMobileInputStyle}
                    {...bindToNameInput}
                  />
                  <TextField
                    id="address-input"
                    label="Address"
                    variant="outlined"
                    placeholder="e.g. 200 Park Place"
                    error={inputErrorStatus.addressInput}
                    helperText={inputErrorStatus.addressInput ? 'Please enter an address.' : ''}
                    style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '95%' } : nonMobileInputStyle}
                    {...bindToAddressInput}
                  />
                  <TextField
                    id="city-input"
                    label="City"
                    variant="outlined"
                    placeholder="e.g. Atlantic City"
                    error={inputErrorStatus.cityInput}
                    helperText={inputErrorStatus.cityInput ? 'Please enter a city.' : ''}
                    style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '40%' } : nonMobileInputStyle}
                    {...bindToCityInput}
                  />
                  <FormControl variant="outlined" error={inputErrorStatus.stateInput} style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '27.5%' } : nonMobileInputStyle}>
                    <InputLabel ref={stateSelectLabel} id="state-select-label">{countryInput === 'Canada' ? 'Province' : 'State'}</InputLabel>
                    <Select
                      labelId="state-select-label"
                      id="state-input"
                      labelWidth={stateLabelWidth}
                      {...bindToStateInput}
                    >
                      <MenuItem value="">{countryInput ? <em>Select...</em> : 'Select a country for options...'}</MenuItem>
                      {getStatesData(countryInput).map(stateArray => <MenuItem key={stateArray[0]} value={stateArray[0]}>{stateArray[1]}</MenuItem>)}
                    </Select>
                    {inputErrorStatus.stateInput && <FormHelperText>Please select a state/province.</FormHelperText>}
                  </FormControl>
                  <TextField
                    id="zip-input"
                    label="Zip"
                    variant="outlined"
                    placeholder="e.g. 50200"
                    error={inputErrorStatus.zipInput}
                    helperText={inputErrorStatus.zipInput ? 'Please enter a valid zip/postal code.' : ''}
                    style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '17.5%' } : nonMobileInputStyle}
                    {...bindToZipInput}
                  />
                  <FormControl variant="outlined" error={inputErrorStatus.countryInput} style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '35%' } : nonMobileInputStyle}>
                    <InputLabel ref={countrySelectLabel} id="country-select-label">Country</InputLabel>
                    <Select
                      labelId="country-select-label"
                      id="country-input"
                      labelWidth={countryLabelWidth}
                      value={countryInput}
                      onChange={handleCountryChange}
                    >
                      <MenuItem value=""><em>Select...</em></MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                      <MenuItem value="Mexico">Mexico</MenuItem>
                      <MenuItem value="United States">United States</MenuItem>
                    </Select>
                    {inputErrorStatus.countryInput && <FormHelperText>Please select a country.</FormHelperText>}
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
                    error={inputErrorStatus.cardNameInput}
                    helperText={inputErrorStatus.cardNameInput ? 'Enter full name as it appears on card.' : ''}
                    style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '45%' } : nonMobileInputStyle}
                    {...bindToCardNameInput}
                  />
                  <TextField
                    id="card-number-input"
                    label="Credit Card Number"
                    variant="outlined"
                    placeholder="e.g. 1234-5555-6789-0000"
                    error={inputErrorStatus.cardNumberInput}
                    helperText={inputErrorStatus.cardNumberInput ? 'Enter 16 digit card number (with dashes).' : ''}
                    style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '45%' } : nonMobileInputStyle}
                    {...bindToCardNumberInput}
                  />
                  <TextField
                    id="card-expiration-input"
                    label="Expiration"
                    variant="outlined"
                    placeholder="e.g. 01/2020"
                    error={inputErrorStatus.cardExpInput}
                    helperText={inputErrorStatus.cardExpInput ? 'Enter a valid expiration date (mm/yyyy).' : ''}
                    style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '25%' } : nonMobileInputStyle}
                    {...bindToCardExpInput}
                  />
                  <TextField
                    id="card-cvv-input"
                    label="CVV"
                    variant="outlined"
                    placeholder="e.g. 123"
                    error={inputErrorStatus.cardCVVInput}
                    helperText={inputErrorStatus.cardCVVInput ? 'Enter 3 digit card verification value.' : ''}
                    style={screenNonMobile ? { margin: '0.5rem 2.5%', width: '25%' } : nonMobileInputStyle}
                    {...bindToCardCVVInput}
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
              <Button variant="contained" color="primary" onClick={handlePlaceOrder}>Place Order</Button>
            </Box>
          </Grid>

        </Grid>

        <Box mt="2rem">
          <Typography variant="caption" color="textSecondary">
            Disclaimer: Shopoly is a web application built for demonstration purposes only and does not sell, provide, or distribute any product or service. Orders placed on Shopoly will not be charged payment. Always keep your personal information secure.
          </Typography>
        </Box>
      </Container>
    </Fade>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { formatItemData } from '../app/functions';
import { Box, Paper, Grid, Typography, Link, FormControl, InputLabel, Select, MenuItem, Tooltip, IconButton, Snackbar } from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import CloseIcon from '@material-ui/icons/Close';

export default function CartSummaryItem({ itemData, setAppView, updateQuantityCallback, removeFromCartCallback }) {
  const formattedData = formatItemData(itemData);
  const { cartID, finalPrice, quantity, itemID, name, price, lotNumber, rent, itemGroup, images } = formattedData;

  const [newQuantity, setNewQuantity] = useState(quantity);
  const [toastText, setToastText] = useState('');
  const [labelWidth, setLabelWidth] = useState(0);
  const selectLabel = useRef(null);
  useEffect(() => {
    setLabelWidth(selectLabel.current.offsetWidth);
  }, []);

  const handleItemClick = () => setAppView('details', { itemID, itemName: name });
  const handleQuantitySelect = event => setNewQuantity(event.target.value);

  const handleQuantityUpdate = () => {
    setToastText('Item quantity updated.');
    updateQuantityCallback(cartID, itemID, newQuantity);
  }

  const handleRemoveFromCart = () => {
    setToastText('Removing item from cart...');
    removeFromCartCallback(cartID, itemID);
  }

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToastText('');
  };

  return (
    <Box mb="0.5rem">
      <Paper>
        <Box p="1rem">

          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Box
                width={1}
                minHeight="6rem"
                className="cursor image-box"
                style={{ backgroundImage: `url("${images[1]}")` }}
                onClick={handleItemClick}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography gutterBottom>
                <Link className="cursor" onClick={handleItemClick}>{name}</Link>
              </Typography>
              <Typography variant="body2" color="textSecondary">Lot Number: {lotNumber}</Typography>
              <Typography variant="body2" color="textSecondary">Base Rent: {rent}</Typography>
              <Typography variant="body2" color="textSecondary">Color Group: {itemGroup}</Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="body2" gutterBottom>Item Quantity</Typography>
              <FormControl variant="outlined" margin="dense">
                <InputLabel ref={selectLabel} id="quantity-update-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-update-label"
                  id="quantity-update"
                  value={newQuantity}
                  onChange={handleQuantitySelect}
                  labelWidth={labelWidth}
                  style={{ minWidth: '5rem'}}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
              <Tooltip title="Update">
                <Box display="inline" ml="0.5rem">
                  <IconButton color="primary" onClick={handleQuantityUpdate} disabled={quantity === newQuantity}>
                    <CachedIcon />
                  </IconButton>
                </Box>
              </Tooltip>
              <Tooltip title="Remove">
                <Box display="inline">
                  <IconButton color="primary" onClick={handleRemoveFromCart}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Tooltip>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="body2" gutterBottom>Item Price</Typography>
              <Typography variant="body2" color="textSecondary">Unit Price: ${finalPrice}</Typography>
              <Typography variant="body2" color="textSecondary">Quantity: {quantity}</Typography>
              <Typography>Subtotal: ${finalPrice * quantity}</Typography>
            </Grid>
          </Grid>

        </Box>
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!!toastText}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        ContentProps={{ 'aria-describedby': 'quantity-toast-message' }}
        message={toastText}
        action={(
          <IconButton aria-label="close" color="inherit" onClick={handleCloseToast}>
            <CloseIcon />
          </IconButton>
        )}
      />
    </Box>
  );
}

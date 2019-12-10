import React, { useState, useEffect, useRef } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, Typography, Snackbar, IconButton } from '@material-ui/core';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import CloseIcon from '@material-ui/icons/Close';

export default function ItemAddToCart({ itemDetailData, addToCartCallback, unlockStatus }) {
  const itemLocked = (itemDetailData.name === 'House' && !unlockStatus.house) || (itemDetailData.name === 'Hotel' && !unlockStatus.hotel);

  const [quantity, setQuantity] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const selectLabel = useRef(null);
  useEffect(() => {
    setLabelWidth(selectLabel.current.offsetWidth);
  }, []);

  const handleSelect = event => setQuantity(event.target.value);

  const handleAddToCart = () => {
    if (!quantity) {
      return;
    }

    const cartAddBody = {
      itemID: itemDetailData.itemID,
      finalPrice: parseInt(itemDetailData.price),
      quantity
    };

    addToCartCallback(cartAddBody, itemDetailData);
    setToastOpen(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  return (
    <Box my="1rem">
      <FormControl variant="outlined" margin="dense" disabled={itemLocked} error={itemLocked}>
        <InputLabel ref={selectLabel} id="quantity-select-label">Quantity</InputLabel>
        <Select
          labelId="quantity-select-label"
          id="quantity-select"
          value={quantity}
          onChange={handleSelect}
          labelWidth={labelWidth}
          style={{ width: '75%' }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
        <FormHelperText style={{ margin: '0.5rem 0' }}>Maximum order quantity: 4</FormHelperText>
      </FormControl>

      <span style={itemLocked ? { cursor: 'not-allowed' } : {}}>
        <Button
          variant="contained"
          color="primary"
          disabled={!quantity || itemLocked}
          onClick={handleAddToCart}
          style={{ margin: '0.5rem 0.25rem' }}
        >
          Add to Cart
        </Button>
      </span>

      {itemLocked && (
        <Typography variant="caption" color="error" gutterBottom>
          <Box display="flex" alignItems="center">
            <WarningTwoToneIcon />&nbsp;Item access is restricted.
          </Box>
        </Typography>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        ContentProps={{ 'aria-describedby': 'cart-toast-message' }}
        message={<span id="cart-toast-message">{itemDetailData.name} Added to Cart</span>}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleCloseToast}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Box>
  );
}

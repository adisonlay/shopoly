import React, { useState, useEffect, useRef } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function AddToCart({ itemDetailData, addToCartCallback }) {
  const [quantity, setQuantity] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const selectLabel = useRef(null);

  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(selectLabel.current.offsetWidth);
  }, []);

  const handleSelect = event => setQuantity(event.target.value);
  const handleAddToCart = () => {
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
    setOpen(false);
  };

  return (
    <Box>
      <FormControl variant="outlined">
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
      <Button variant="contained" color="primary" disabled={!quantity} onClick={handleAddToCart}>Add to Cart</Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message={<span>{itemDetailData.name} added to cart</span>}
        action={
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleCloseToast} >
            <CloseIcon />
          </IconButton>
        }
      />
    </Box>
  );
}

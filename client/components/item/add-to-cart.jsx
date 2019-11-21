import React, { useState, useEffect, useRef } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@material-ui/core';

export default function AddToCart({ itemDetailData, addToCartCallback }) {
  const [quantity, setQuantity] = useState('');
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
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
        <FormHelperText>Maximum order quantity: 4</FormHelperText>
      </FormControl>
      <Button variant="contained" color="primary" disabled={!quantity} onClick={handleAddToCart}>Add to Cart</Button>
    </Box>
  );
}

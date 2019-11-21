import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

export default function AddToCart({ addToCartCallback }) {
  const [quantity, setQuantity] = useState(1);

  const handleSelect = event => setQuantity(event.target.value);
  const handleAddToCart = () => addToCartCallback();

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel ref={inputLabel} id="quantity-select-label">
          Age
        </InputLabel>

        <Select
          labelId="quantity-select-label"
          id="quantity-select"
          value={quantity}
          onChange={handleSelect}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>

        <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
      </FormControl>
    </div>
  );
}

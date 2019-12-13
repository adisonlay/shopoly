import React, { useState, useEffect, useRef } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, Typography, Snackbar, IconButton } from '@material-ui/core';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import CloseIcon from '@material-ui/icons/Close';

export default function ItemAddToCart({ setAppView, itemDetailData, addToCartCallback, unlockStatus }) {
  const itemLocked = (itemDetailData.name === 'House' && !unlockStatus.house) || (itemDetailData.name === 'Hotel' && !unlockStatus.hotel);

  const [buildingColor, setBuildingColor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [maxQuantityExceeded, setMaxQuantityExceeded] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const [buildingColorLabelWidth, setBuildingColorLabelWidth] = useState(0);
  const [quantityLabelWidth, setQuantityLabelWidth] = useState(0);
  const buildingColorSelectLabel = useRef(null);
  const quantitySelectLabel = useRef(null);
  useEffect(() => {
    setBuildingColorLabelWidth(buildingColorSelectLabel.current.offsetWidth);
    setQuantityLabelWidth(quantitySelectLabel.current.offsetWidth);
  }, []);

  const handleBuildingColorSelect = event => setBuildingColor(event.target.value);
  const handleQuantitySelect = event => setQuantity(event.target.value);
  const handleCartClick = () => setAppView('cart', {});

  const handleAddToCart = () => {
    if (itemLocked || !quantity || (itemDetailData.itemGroup === 'Building' && !buildingColor)) return;

    const cartAddBody = {
      itemID: itemDetailData.itemID,
      finalPrice: parseInt(itemDetailData.price),
      quantity
    };
    if (itemDetailData.itemGroup === 'Building') {
      cartAddBody.finalPrice = parseInt(buildingColor);
    }

    if (!addToCartCallback(cartAddBody, itemDetailData)) {
      setMaxQuantityExceeded(true);
      setQuantity('');
    } else {
      setToastOpen(true);
      setQuantity('');
    }
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToastOpen(false);
  };

  return (
    <Box my="1rem">
      <Box display={itemDetailData.itemGroup === 'Building' ? 'inherit' : 'none' }>
        <FormControl variant="outlined" margin="dense" disabled={itemLocked} error={itemLocked} style={{ width: '50%' }}>
          <InputLabel ref={buildingColorSelectLabel} id="color-select-label">Color Group</InputLabel>
          <Select
            labelId="color-select-label"
            id="color-select"
            value={buildingColor}
            onChange={handleBuildingColorSelect}
            labelWidth={buildingColorLabelWidth}
          >
            <MenuItem value={50}>Purple/Brown/Light Blue ($50)</MenuItem>
            <MenuItem value={100}>Pink/Orange ($100)</MenuItem>
            <MenuItem value={150}>Red/Yellow ($150)</MenuItem>
            <MenuItem value={200}>Green/Dark Blue ($200)</MenuItem>
          </Select>
        </FormControl>
        <br />
      </Box>

      <FormControl variant="outlined" margin="dense" disabled={itemLocked} error={itemLocked}>
        <InputLabel ref={quantitySelectLabel} id="quantity-select-label">Quantity</InputLabel>
        <Select
          labelId="quantity-select-label"
          id="quantity-select"
          value={quantity}
          onChange={handleQuantitySelect}
          labelWidth={quantityLabelWidth}
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
          disabled={itemLocked || !quantity || (itemDetailData.itemGroup === 'Building' && !buildingColor)}
          onClick={handleAddToCart}
          style={{ margin: '0.5rem 0.25rem' }}
        >
          Add to Cart
        </Button>
      </span>

      {(itemLocked || maxQuantityExceeded) && (
        <Typography variant="caption" color="error" gutterBottom>
          <Box display="flex" alignItems="center">
            <WarningTwoToneIcon />&nbsp;{itemLocked ? 'Item access is restricted.' : 'Maximum item quantity exceeded for this order.'}
          </Box>
        </Typography>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        ContentProps={{ 'aria-describedby': 'cart-toast-message' }}
        message={itemDetailData.name + ' added to cart.'}
        action={[
          (<Button key="cart" size="small" color="primary" onClick={handleCartClick}>View Cart</Button>),
          (<IconButton key="close" aria-label="close" color="inherit" onClick={handleCloseToast}>
            <CloseIcon />
          </IconButton>)
        ]}
      />
    </Box>
  );
}

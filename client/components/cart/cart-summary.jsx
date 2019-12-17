import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Fade, Container, Box, Typography, Chip, Button, Paper } from '@material-ui/core';

export default function CartSummary({ setAppView, cartItems, updateQuantityCallback, removeFromCartCallback }) {
  const cartItemCount = cartItems.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, 0);
  const cartTotal = cartItems.reduce((runningTotal, currentItemObject) => runningTotal + currentItemObject.finalPrice * currentItemObject.quantity, 0);

  const handleContinue = () => setAppView('catalog', {});
  const handleCheckout = () => setAppView('checkout', { cartItemCount, cartTotal });

  let cartItemListDisplay = null;
  if (!cartItems.length) {
    cartItemListDisplay = (
      <Box mb="0.5rem">
        <Paper>
          <Box p="1rem">
            <Typography variant="h6" color="textSecondary">There are no items in your cart.</Typography>
          </Box>
        </Paper>
      </Box>
    );
  } else {
    cartItemListDisplay = (cartItems.map(cartItem => (
      <CartSummaryItem
        key={cartItem.itemID}
        itemData={cartItem}
        setAppView={setAppView}
        updateQuantityCallback={updateQuantityCallback}
        removeFromCartCallback={removeFromCartCallback}
      />
    )));
  }

  return (
    <Fade in>
      <Container fixed>
        <Box mb="0.5rem" display="flex" justifyContent="space-between">
          <Typography variant="h5">Shopping Cart</Typography>
          <Chip label={cartItemCount} />
        </Box>
        {cartItemListDisplay}
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          <Typography variant="h6" color="textSecondary" style={{ margin: '0.5rem 0' }}>
            Cart Total ({cartItemCount === 1 ? '1 Item' : cartItemCount + ' Items'}): ${cartTotal}
          </Typography>
          <div>
            <Button variant="contained" color="primary" onClick={handleContinue} style={{ margin: '0.5rem 0.5rem 0.5rem 0' }}>Continue Shopping</Button>
            <Button variant="contained" color="primary" onClick={handleCheckout} disabled={!cartItems.length} style={{ margin: '0.5rem 0' }}>Checkout</Button>
          </div>
        </Box>
      </Container>
    </Fade>
  );
}

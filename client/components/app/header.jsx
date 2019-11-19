import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { ShoppingCartTwoTone } from '@material-ui/icons';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';

export default function Header({ setAppView, cartItemCount }) {
  const handleLogoClick = () => setAppView('catalog', {});
  const handleOrdersClick = () => setAppView('orderHistory', {});
  const handleCartClick = () => setAppView('cart', {});

  return (
    <Box mb="1rem">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" onClick={handleLogoClick}>Shopoly</Typography>
          <Box alignSelf="flex-end" ml="0.75rem" mb="0.25rem">
            <Typography variant="subtitle1">The Property Trading Shop</Typography>
          </Box>

          <Box ml="auto">
            <IconButton onClick={handleOrdersClick}>
              <LocalMallTwoToneIcon />
            </IconButton>
            <IconButton onClick={handleCartClick}>
              <Badge showZero color="secondary" badgeContent={cartItemCount}>
                <ShoppingCartTwoToneIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

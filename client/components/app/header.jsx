import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import { ShoppingCartTwoTone } from '@material-ui/icons';
// import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';

export default function Header({ setAppView, cartItemCount }) {
  const handleLogoClick = () => setAppView('catalog', {});
  const handleCartClick = () => setAppView('cart', {});

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3" onClick={handleLogoClick}>Shopoly</Typography>
        <Typography variant="subtitle1">The Property Trading Shop</Typography>

        <Box ml="auto">
          <IconButton onClick={handleCartClick}>
            <Badge showZero color="secondary" badgeContent={cartItemCount}>
              <ShoppingCartTwoTone />
            </Badge>
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

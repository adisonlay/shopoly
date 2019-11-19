import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Badge, Tooltip } from '@material-ui/core';
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
            <Tooltip title="Orders">
              <IconButton onClick={handleOrdersClick}>
                <LocalMallTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cart">
              <IconButton onClick={handleCartClick}>
                <Badge color="secondary" badgeContent={cartItemCount}>
                  <ShoppingCartTwoToneIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

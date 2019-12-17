import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Tooltip, Badge } from '@material-ui/core';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';

export default function Header({ setAppView, cartItemCount }) {
  const handleLogoClick = () => setAppView('catalog', {});
  const handleOrdersClick = () => setAppView('orderHistory', {});
  const handleCartClick = () => setAppView('cart', {});

  return (
    <Box mb="1rem">
      <AppBar position="static">
        <Toolbar>
          <Box className="cursor" p="0.25rem" my="0.5rem" bgcolor="error.main" borderRadius="1rem" onClick={handleLogoClick}>
            <Box
              pl="1.25rem"
              pr="1rem"
              fontWeight={700}
              fontSize="h4.fontSize"
              fontFamily="'KabaleMedium', 'KabobLight', 'Roboto', 'Helvetica', 'Arial', sans-serif"
              letterSpacing="0.25rem"
              border={3}
              borderRadius="1rem"
            >
              SHOPOLY
            </Box>
          </Box>
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
                <Badge color="error" badgeContent={cartItemCount}>
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

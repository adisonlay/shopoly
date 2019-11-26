import React from 'react';
import { Box, Paper, Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

export default function BreadcrumbBar({ setAppView, currentView, itemName }) {
  const handleCatalogClick = () => setAppView('catalog', {});
  const handleCartClick = () => setAppView('cart', {});
  const handleOrdersClick = () => setAppView('orderHistory', {});

  let crumbsToDisplay = null;

  switch (currentView) {
    case 'catalog':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="textSecondary" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link>
          <Typography color="textPrimary">
            Catalog
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'details':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="textSecondary" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link >
          <Link color="textSecondary" onClick={handleCatalogClick}>
            Catalog
          </Link>
          <Typography color="textPrimary">
            {itemName}
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'cart':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="textSecondary" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link>
          <Typography color="textPrimary">
            Cart
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'checkout':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="textSecondary" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link >
          <Link color="textSecondary" onClick={handleCartClick}>
            Cart
          </Link>
          <Typography color="textPrimary">
            Checkout
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'orderHistory':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="textSecondary" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link>
          <Typography color="textPrimary">
            Orders
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'orderSummary':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="textSecondary" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link >
          <Link color="textSecondary" onClick={handleOrdersClick}>
            Orders
          </Link>
          <Typography color="textPrimary">
            Checkout
          </Typography>
        </Breadcrumbs>
      );
      break;
  }

  return (
    <Box mb="1rem">
      <Paper elevation={0}>
        <Box ml="1rem">
          {crumbsToDisplay}
        </Box>
      </Paper>
    </Box>
  );
}

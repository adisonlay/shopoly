import React from 'react';
import { Box, Paper, Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

export default function BreadcrumbBar({ currentView, itemName }) {
  const handleCatalogClick = () => { };
  const handleCartClick = () => { };
  const handleOrdersClick = () => { };

  let crumbsToDisplay = null;

  switch (currentView) {
    case 'catalog':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="#" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link>
          <Typography>
            Catalog
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'details':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="#" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link >
          <Link color="inherit" href="#" onClick={handleCatalogClick}>
            Catalog
          </Link>
          <Typography>
            {itemName}
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'cart':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="#" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link>
          <Typography>
            Cart
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'checkout':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="#" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link >
          <Link color="inherit" href="#" onClick={handleCartClick}>
            Cart
          </Link>
          <Typography>
            Checkout
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'orderHistory':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="#" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link>
          <Typography>
            Orders
          </Typography>
        </Breadcrumbs>
      );
      break;
    case 'orderSummary':
      crumbsToDisplay = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" href="#" onClick={handleCatalogClick}>
            <Box display="flex" alignItems="center">
              <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
            </Box>
          </Link >
          <Link color="inherit" href="#" onClick={handleOrdersClick}>
            Orders
          </Link>
          <Typography>
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

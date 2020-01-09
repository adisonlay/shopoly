import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

export default function BreadcrumbBar({ setAppView, currentView, itemName }) {
  const handleCatalogClick = () => setAppView('catalog', {});
  const handleCartClick = () => setAppView('cart', {});
  const handleOrdersClick = () => setAppView('orderHistory', {});

  let crumbToDisplay1 = null;
  let crumbToDisplay2 = null;

  switch (currentView) {
    case 'catalog':
      crumbToDisplay1 = (<Typography color="textPrimary">Catalog</Typography>);
      break;
    case 'details':
      crumbToDisplay1 = (<Link className="cursor" color="textSecondary" onClick={handleCatalogClick}>Catalog</Link>);
      crumbToDisplay2 = (<Typography color="textPrimary">{itemName}</Typography>);
      break;
    case 'cart':
      crumbToDisplay1 = (<Typography color="textPrimary">Cart</Typography>);
      break;
    case 'checkout':
      crumbToDisplay1 = (<Link className="cursor" color="textSecondary" onClick={handleCartClick}>Cart</Link>);
      crumbToDisplay2 = (<Typography color="textPrimary">Checkout</Typography>);
      break;
    case 'orderHistory':
      crumbToDisplay1 = (<Typography color="textPrimary">Orders</Typography>);
      break;
    case 'orderSummary':
      crumbToDisplay1 = (<Link className="cursor" color="textSecondary" onClick={handleOrdersClick}>Orders</Link>);
      crumbToDisplay2 = (<Typography color="textPrimary">Summary</Typography>);
      break;
  }

  return (
    <Box m="1rem">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        <Link className="cursor" color="textSecondary" onClick={handleCatalogClick}>
          <Box display="flex" alignItems="center">
            <HomeTwoToneIcon fontSize="small" />
            <Box display="inline" ml={0.25}>Shopoly</Box>
          </Box>
        </Link>
        {crumbToDisplay1}
        {crumbToDisplay2}
      </Breadcrumbs>
    </Box>
  );
}

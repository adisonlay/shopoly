import React from 'react';
import { Box, Paper, Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

export default function BreadcrumbBar({ currentView, itemName }) {
  const handleClick = () => {};

  // let crumbsToDisplay = null;

  // switch (currentView) {
  //   case 'catalog':
  //     break;
  //   case 'details':
  //     break;
  //   case 'cart':
  //     break;
  //   case 'checkout':
  //     break;
  //   case 'orderHistory':
  //     break;
  //   case 'orderSummary':
  //     break;
  // }

  return (
    <Box mb="1rem">
      <Paper elevation={0}>
        <Box ml="1rem">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link color="inherit" href="#" onClick={handleClick}>
              <Box display="flex" alignItems="center">
                <HomeTwoToneIcon fontSize="small" />&nbsp;Shopoly
              </Box>
            </Link>
            <Typography>
              Catalog
            </Typography>
          </Breadcrumbs>
        </Box>
      </Paper>
    </Box>
  );
}

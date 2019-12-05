import React, { useState, useEffect } from 'react';
import OrderHistoryItem from './order-history-item';
import { formatItemData } from '../app/functions';
import { Container, Grid, Paper, Box, Typography, Divider } from '@material-ui/core';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';

export default function OrderHistory({ setAppView }) {
  // const [orderHistoryData, setOrderHistoryData] = useState([]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;

  //   fetch('api/order/order.php', { signal })
  //     .then(response => response.json())
  //     .then(orderHistoryData => setOrderHistoryData(orderHistoryData))
  //     .catch(error => console.error(error));

  //   return function cleanup() {
  //     abortController.abort();
  //   };
  // }, []);



  const [orderHistoryData, setOrderHistoryData] = useState([
    {
      "cartID": "8",
      "finalPrice": 150,
      "quantity": 1,
      "itemID": "24",
      "name": "Water Works",
      "lotNumber": 29,
      "price": "150",
      "rent": "Variable",
      "itemGroup": "Utility",
      "images": [
        "server/public/assets/images/properties/waterworks1.png",
        "server/public/assets/images/properties/waterworks2.png",
        "server/public/assets/images/properties/waterworks3.png"
      ],
      "ordered": "2019-12-01 18:19:19"
    },
    {
      "cartID": "9",
      "finalPrice": 60,
      "quantity": 1,
      "itemID": "1",
      "name": "Mediterranean Ave.",
      "lotNumber": 2,
      "price": "60",
      "rent": "2",
      "itemGroup": "Purple/Brown",
      "images": [
        "server/public/assets/images/properties/brownmort.png",
        "server/public/assets/images/properties/mediterranean1.png",
        "server/public/assets/images/properties/mediterranean2.png"
      ],
      "ordered": "2019-12-01 18:21:33"
    }
  ]);



  const orderIDsArray = [];
  const orderDates = [];
  orderHistoryData.forEach(orderedItem => {
    if (!orderIDsArray.includes(orderedItem.cartID)) {
      orderIDsArray.push(orderedItem.cartID);
      orderDates.push(new Date(orderedItem.ordered));
    }
  });
  const orderCount = orderIDsArray.length;

  let firstOrderDate = orderDates[0];
  orderDates.forEach(orderDate => {
    if (orderDate < firstOrderDate) {
      firstOrderDate = orderDate;
    }
  });

  let initialItemCount = 0;
  const totalItemCount = orderHistoryData.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, initialItemCount);


  console.log(orderHistoryData, orderCount, totalItemCount);


  if (orderHistoryData.length === 0) {
    return (<Typography variant="h5" color="textSecondary">Order history data unavailable.</Typography>);
  } else {
    return (
      <Container fixed>
        <Typography variant="h5" gutterBottom>Order History</Typography>

        <Box mb="1.5rem">
          <Paper>
            <Box p="1rem">

              <Box display="flex" alignItems="center">
                <PersonOutlineTwoToneIcon fontSize="large" />
                <Typography variant="h6" color="textSecondary" gutterBottom>&nbsp;Customer Since: {firstOrderDate.toLocaleDateString('en-US')}</Typography>
              </Box>

              <Box my="1rem">
                <Divider />
              </Box>

              <Box display="flex" justifyContent="space-between">

                  <Grid container spacing={6}>
                    <Grid item>
                      <Typography component="div" gutterBottom>
                        <Box display="flex" alignItems="center">
                          <LocalMallTwoToneIcon />&nbsp;Orders Placed:
                        </Box>
                        <Box display="flex" alignItems="center">
                          <LocalOfferTwoToneIcon />&nbsp;Total Items Purchased:
                        </Box>
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography>{orderCount}</Typography>
                      <Typography gutterBottom>{totalItemCount}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={6}>
                    <Grid item>
                      <Typography component="div" gutterBottom>
                        <Box display="flex" alignItems="center">
                          <HomeTwoToneIcon />&nbsp;Houses Unlocked?
                    </Box>
                        <Box display="flex" alignItems="center">
                          <HomeWorkTwoToneIcon />&nbsp;Hotels Unlocked?
                    </Box>
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography>Yes</Typography>
                      <Typography gutterBottom>No</Typography>
                    </Grid>
                  </Grid>

              </Box>

            </Box>
          </Paper>
        </Box>

        <Paper>
          <Box p="1rem">
            {/* {orderHistoryData.map(orderedItem => <OrderHistoryItem key={orderedItem.itemID} itemData={orderedItem} setAppView={setAppView} />)} */}
          </Box>
        </Paper>
      </Container>
    );
  }
}

import React, { useState, useEffect } from 'react';
import OrderHistoryItem from './order-history-item';
import { countMonopolies, getHouseUnlockStatus, getHotelUnlockStatus } from '../app/functions';
import { Container, Grid, Paper, Box, Typography, Divider, Chip } from '@material-ui/core';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import MoneyTwoToneIcon from '@material-ui/icons/MoneyTwoTone';
import GroupWorkTwoToneIcon from '@material-ui/icons/GroupWorkTwoTone';
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



  const orderStats = {
    firstOrderDate: '',
    orderCount: null,
    totalItemCount: null,
    aggRent: null,
    monopolies: null,
    housesUnlocked: false,
    hotelsUnlocked: false
  };

  const orderIDsArray = [];
  const orderDates = [];
  orderHistoryData.forEach(orderedItem => {
    if (!orderIDsArray.includes(orderedItem.cartID)) {
      orderIDsArray.push(orderedItem.cartID);
      orderDates.push(new Date(orderedItem.ordered));
    }
  });

  orderStats.firstOrderDate = orderDates[0];
  orderDates.forEach(currentOrderDate => {
    if (currentOrderDate < orderStats.firstOrderDate) {
      orderStats.firstOrderDate = currentOrderDate;
    }
  });

  orderStats.orderCount = orderIDsArray.length;

  orderStats.totalItemCount = orderHistoryData.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, 0);

  orderStats.aggRent = orderHistoryData.reduce((runningTotal, currentItemObject) => {
    if (!isNaN(parseInt(currentItemObject.rent))) {
      return runningTotal + currentItemObject.quantity * parseInt(currentItemObject.rent);
    } else {
      return runningTotal;
    }
  }, 0);

  orderStats.monopolies = countMonopolies(orderHistoryData);
  orderStats.housesUnlocked = getHouseUnlockStatus(orderHistoryData);
  orderStats.hotelsUnlocked = getHotelUnlockStatus(orderHistoryData);


  // const orderCount = orderIDsArray.length;

  // let firstOrderDate = orderDates[0];
  // orderDates.forEach(orderDate => {
  //   if (orderDate < firstOrderDate) {
  //     firstOrderDate = orderDate;
  //   }
  // });

  // let initialItemCount = 0;
  // const totalItemCount = orderHistoryData.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, initialItemCount);



  // console.log(orderHistoryData, orderCount, totalItemCount);
  console.log(orderHistoryData, orderStats);



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
                <Typography variant="h6" color="textSecondary" gutterBottom>&nbsp;Shopoly Customer Since: {orderStats.firstOrderDate.toLocaleDateString('en-US')}</Typography>
              </Box>

              <Box mt="0.5rem" mb="1rem">
                <Divider />
              </Box>

              <Grid container>

                <Grid item xs={3}>
                  <Typography component="div" variant="body2">
                    <Box display="flex" alignItems="center">
                      <LocalMallTwoToneIcon />&nbsp;Orders Placed:
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">{orderStats.orderCount}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography component="div" variant="body2">
                    <Box display="flex" alignItems="center">
                      <GroupWorkTwoToneIcon />&nbsp;Monopolies Controlled:
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">{orderStats.monopolies}</Typography>
                </Grid>


                <Grid item xs={3}>
                  <Typography component="div" variant="body2">
                    <Box display="flex" alignItems="center">
                      <LocalOfferTwoToneIcon />&nbsp;Total Items Purchased:
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">{orderStats.totalItemCount}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography component="div" variant="body2">
                    <Box display="flex" alignItems="center">
                      <HomeTwoToneIcon />&nbsp;Houses Unlocked?
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">{orderStats.housesUnlocked ? 'Yes' : 'No' }</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography component="div" variant="body2" gutterBottom>
                    <Box display="flex" alignItems="center">
                      <MoneyTwoToneIcon />&nbsp;Aggregate Base Rent:
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" gutterBottom>${orderStats.aggRent}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography component="div" variant="body2" gutterBottom>
                    <Box display="flex" alignItems="center">
                      <HomeWorkTwoToneIcon />&nbsp;Hotels Unlocked?
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" gutterBottom>{orderStats.hotelsUnlocked ? 'Yes' : 'No' }</Typography>
                </Grid>

              </Grid>

            </Box>
          </Paper>
        </Box>

        <Paper>
          <Box p="1rem">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" color="textSecondary" gutterBottom>Your Items</Typography>
              <Chip label={orderStats.totalItemCount} />
            </Box>

            {/* {orderHistoryData.map(orderedItem => <OrderHistoryItem key={orderedItem.itemID} itemData={orderedItem} setAppView={setAppView} />)} */}

          </Box>
        </Paper>
      </Container>
    );
  }
}

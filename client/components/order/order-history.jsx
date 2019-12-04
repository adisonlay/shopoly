import React, { useState, useEffect } from 'react';
import OrderHistoryItem from './order-history-item';
import { formatItemData } from '../app/functions';
import { Container, Grid, Paper, Box, Typography } from '@material-ui/core';

export default function OrderHistory({ setAppView }) {
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch('api/order/order.php', { signal })
      .then(response => response.json())
      .then(orderHistoryData => setOrderHistoryData(orderHistoryData))
      .catch(error => console.error(error));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

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
  const totalItemCount = orderHistoryData.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, initialCartItemCount);


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
              <Grid container spacing={3}>
                <Grid item>
                  <Typography>Orders Placed: </Typography>
                  <Typography>Items Purchased: </Typography>
                  <Typography>Customer Since: </Typography>
                  <Typography>Houses Unlocked?: </Typography>
                  <Typography gutterBottom>Hotels Unlocked?: </Typography>
                </Grid>

                <Grid item>
                  <Typography>{orderCount}</Typography>
                  <Typography>{totalItemCount}</Typography>
                  <Typography>{firstOrderDate.toLocaleDateString('en-US')}</Typography>
                  <Typography></Typography>
                  <Typography gutterBottom></Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>

        <Paper>
          <Box p="1rem">
            {orderHistoryData.map(orderedItem => <OrderHistoryItem key={orderedItem.itemID} itemData={orderedItem} setAppView={setAppView} />)}
          </Box>
        </Paper>
      </Container>
    );
  }
}

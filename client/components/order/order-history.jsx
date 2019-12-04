import React, { useState, useEffect } from 'react';
import OrderHistoryItem from './order-history-item';
import { formatItemData } from '../app/functions';
import { Container, Grid, Paper, Box, Typography } from '@material-ui/core';

export default function OrderHistory({ setAppView, viewParams }) {
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

  const ordersArray = [];
  orderHistoryData.forEach(orderedItem => {
    if (!ordersArray.includes(orderedItem.cartID)) {
      ordersArray.push(orderedItem.cartID);
    }
  })
  const orderCount = ordersArray.length;

  let initialItemCount = 0;
  const totalItemCount = orderHistoryData.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, initialCartItemCount);


  console.log(orderHistoryData, orderCount, totalItemCount);


  if (orderHistoryData.length === 0) {
    return (<Typography variant="h5" color="textSecondary">Order history data unavailable.</Typography>);
  } else {
    return (
      <Container fixed>
        <Typography variant="h5">Order History</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography>Orders Placed: {orderCount}</Typography>
          <Typography gutterBottom>Items Purchased: {totalItemCount}</Typography>
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

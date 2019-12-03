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

  if (orderHistoryData.length === 0) {
    return (<Typography variant="h5" color="textSecondary">Order history data unavailable.</Typography>);
  } else {
    return (
      <Container fixed>
        <Typography variant="h5" gutterBottom>Order History</Typography>
        <Paper>
          <Box p="1rem">

          </Box>
        </Paper>
      </Container>
    );
  }
}

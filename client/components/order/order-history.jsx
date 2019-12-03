import React, { useState, useEffect } from 'react';
import { formatItemData } from '../app/functions';
import { Container, Grid, Paper, Box, Typography } from '@material-ui/core';

export default function OrderHistory() {
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
    return (<Typography variant="h5" color="textSecondary">Items data unavailable.</Typography>);
  } else {
    return (
      <Container>
      </Container>
    );
  }
}

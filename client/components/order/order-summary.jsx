import React from 'react';
import {
  Container, Typography, Grid, Paper, Box, Divider, Button,
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction
} from '@material-ui/core';

export default function OrderSummary({ setAppView, viewParams }) {
  const { orderItems, orderItemCount, orderTotal } = viewParams;

  const handleItemClick = itemClicked => setAppView('details', { itemID: itemClicked.itemID, itemName: itemClicked.name });
  const handleContinue = () => setAppView('catalog', {});

  return (
    <Container fixed>
      <Typography variant="h5" gutterBottom>Order Summary</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper>
            <Box p="1rem">
              <Typography variant="h6" color="textSecondary" gutterBottom>Order #{orderItems[0].cartID}</Typography>

              <Typography>Payment Summary:</Typography>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="textSecondary">Item Total</Typography>
                  <Typography variant="body2" color="textSecondary">Taxes</Typography>
                  <Typography variant="body2" color="textSecondary">Shipping</Typography>
                  <Box my="0.25rem">
                    <Divider />
                  </Box>
                  <Typography variant="body2" gutterBottom>Order Total</Typography>
                </Box>
                <Box flexGrow={1}>
                  <Typography variant="body2" color="textSecondary">
                    <br />
                    <br />
                    <br />
                  </Typography>
                  <Box my="0.25rem">
                    <Divider />
                  </Box>
                  <Typography variant="body2" gutterBottom><br /></Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">${orderTotal}</Typography>
                  <Typography variant="body2" color="textSecondary">$0</Typography>
                  <Typography variant="body2" color="textSecondary">$0</Typography>
                  <Box my="0.25rem">
                    <Divider />
                  </Box>
                  <Typography variant="body2" gutterBottom>${orderTotal}</Typography>
                </Box>
              </Box>

              <br />

              <Typography>Shipping Address:</Typography>
              <Typography variant="body2">Mr. Monopoly</Typography>
              <Typography variant="body2">200 Park Place</Typography>
              <Typography variant="body2">Atlantic City, NJ 34982</Typography>
              <Typography variant="body2">United States</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper>
            <Box p="1rem">
              <Typography variant="h6" color="textSecondary" gutterBottom>Your Items</Typography>
              <List>
                {orderItems.map(orderItem => (
                  <ListItem key={orderItem.itemID} button onClick={() => handleItemClick(orderItem)}>
                    <ListItemAvatar style={{ marginRight: '0.5rem' }}>
                      <Box
                        width={1}
                        minHeight="4rem"
                        style={{
                          backgroundImage: `url("${orderItem.images[1].substring(13)}")`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={orderItem.name} secondary={'Quantity: ' + orderItem.quantity} />
                    <ListItemSecondaryAction>
                      <Typography>${orderItem.finalPrice * orderItem.quantity}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box mt="1rem" display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleContinue}>Continue Shopping</Button>
      </Box>
    </Container>
  );
}

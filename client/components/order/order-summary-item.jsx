import React from 'react';
import { formatItemData } from '../app/functions';
import { Box, Paper, Grid, Typography, Link } from '@material-ui/core';

export default function OrderSummaryItem({ itemData, setAppView }) {
  const formattedData = formatItemData(itemData);
  const {
    cartID,
    finalPrice,
    quantity,
    itemID,
    name,
    price,
    lotNumber,
    rent,
    itemGroup,
    images
  } = formattedData;

  const handleItemClick = () => setAppView('details', { itemID, itemName: name });

  return (
    <div>

    </div>
  );
}

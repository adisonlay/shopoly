import React from 'react';
import { sortImageData } from '../app/functions'

export default function ItemCard({ itemData, setAppView }) {
  const {
    id,
    name,
    price,
    lot_number: lotNumber,
    rent: baseRent,
    item_group: itemGroup,
    images
  } = itemData;

  images = sortImageData(images);

  return (
    <div>

    </div>
  );
}

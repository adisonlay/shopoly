import React from 'react';
import { Box, Link } from '@material-ui/core';

export default function ItemGallery({ images }) {
  return (
    <div>
      <Box
        mb="1rem"
        width={1}
        height="16rem"
        style={{
          backgroundImage: `url("${images[1]}")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
}

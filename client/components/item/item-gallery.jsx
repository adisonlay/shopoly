import React, { useState, useEffect } from 'react';
import { Grid, Box, Link } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function ItemGallery({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Grid container>
      <Grid item xs={3} direction="column">
        {images.map(url => (
          <Box
            key={url + 'thumbs'}
            width={1}
            height="6rem"
            style={{
              backgroundImage: `url("${url}")`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </Grid>

      <Grid item xs={9}>
        {images.map(url => (
          <Box
            key={url + 'slides'}
            width={1}
            height="16rem"
            style={{
              backgroundImage: `url("${url}")`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        <Link onClick={}><NavigateBeforeIcon /></Link>
        <Link onClick={}><NavigateNextIcon /></Link>
      </Grid>
    </Grid>
  );
}

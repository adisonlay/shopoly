import React, { useState, useEffect } from 'react';
import { Grid, Box, Link } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function ItemGallery({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => setCurrentSlide((currentSlide - 1) % images.length);
  const handleNext = () => setCurrentSlide((currentSlide + 1) % images.length);
  const handleThumbnailClick = index => setCurrentSlide(index);

  return (
    <Grid container>
      <Grid item xs={3} direction="column">
        {images.map((url, index) => (
          <Box
            key={url + 'thumbs'}
            mb="0.25rem"
            width={1}
            height="6rem"
            style={{
              backgroundImage: `url("${url}")`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </Grid>

      <Grid item xs={9}>
        {images.map(url => (
          <Box
            key={url + 'slides'}
            mb="1rem"
            width={1}
            height="20rem"
            style={{
              backgroundImage: `url("${url}")`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        <Link onClick={handlePrev}><NavigateBeforeIcon /></Link>
        <Link onClick={handleNext}><NavigateNextIcon /></Link>
      </Grid>
    </Grid>
  );
}

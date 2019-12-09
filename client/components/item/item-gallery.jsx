import React, { useState, useEffect } from 'react';
import { Grid, Box, IconButton } from '@material-ui/core';
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

      <Grid item xs={9} className="gallery-slide-container">
        <IconButton onClick={handlePrev}>
          <NavigateBeforeIcon />
        </IconButton>
        {images.map(url => (
          <Box
            key={url + 'slides'}
            mb="1rem"
            width={1}
            height="20rem"
            className="gallery-slides"
            style={{
              backgroundImage: `url("${url}")`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        <IconButton onClick={handleNext}>
          <NavigateNextIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

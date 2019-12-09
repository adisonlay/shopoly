import React, { useState, useEffect } from 'react';
import { Grid, Box, IconButton } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function ItemGallery({ images }) {
  const slideCount = images.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => setCurrentSlide((((currentSlide - 1) % slideCount) + slideCount) % slideCount);
  const handleNext = () => setCurrentSlide((((currentSlide + 1) % slideCount) + slideCount) % slideCount);
  const handleThumbnailClick = index => setCurrentSlide(index);

  return (
    <Grid container>
      <Grid item xs={3} container direction="column">
        {images.map((url, index) => (
          <Box
            key={url + 'thumbs'}
            my={slideCount > 3 ? '0.25rem' : '0.333rem'}
            width={1}
            height={slideCount > 3 ? '4.5rem' : '6rem'}
            className={'gallery-thumbnails cursor ' + (index === currentSlide ? 'gallery-thumb-active' : '')}
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
        <Box display="flex" alignItems="center">
          <IconButton  onClick={handlePrev}>
            <NavigateBeforeIcon />
          </IconButton>
          {images.map((url, index) => (
            <Box
              key={url + 'slides'}
              mb="1rem"
              width={1}
              height="20rem"
              className={'gallery-slides ' + (index === currentSlide ? 'gallery-slide-active' : '')}
              style={{
                backgroundImage: `url("${url}")`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
          <IconButton  onClick={handleNext}>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

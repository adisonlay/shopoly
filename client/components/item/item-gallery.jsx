import React, { useState } from 'react';
import { Box, Grid, IconButton } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function ItemGallery({ images }) {
  const slideCount = images.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => setCurrentSlide((((currentSlide - 1) % slideCount) + slideCount) % slideCount);
  const handleNext = () => setCurrentSlide((((currentSlide + 1) % slideCount) + slideCount) % slideCount);
  const handleThumbnailClick = index => setCurrentSlide(index);

  return (
    <Box mb="1rem">
      <Grid container>
        <Grid item xs={3} container direction="column" justify="space-between">
          {images.map((url, index) => (
            <Box
              key={url}
              width={1}
              height={slideCount > 3 ? '20%' : '30%'}
              className={'gallery-thumbnails image-box cursor ' + (index === currentSlide ? 'gallery-thumb-active' : '')}
              style={{ backgroundImage: `url("${url}")` }}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </Grid>

        <Grid item xs={9} container alignItems="center" wrap="nowrap">
          <IconButton onClick={handlePrev}>
            <NavigateBeforeIcon />
          </IconButton>
          <Box
            width={1}
            height="20rem"
            className="image-box"
            style={{ backgroundImage: `url("${images[currentSlide]}")` }}
          />
          <IconButton onClick={handleNext}>
            <NavigateNextIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

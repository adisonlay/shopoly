import React, { useState } from 'react';
import { Box, Grid, IconButton, Fade } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function ItemGallery({ images }) {
  const slideCount = images.length;
  const fadeAnimationDuration = 300;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeToggle, setFadeToggle] = useState(true);

  const handleSlideChange = slideIndex => {
    setFadeToggle(false);
    setTimeout(() => {
      setCurrentSlide(slideIndex);
      setFadeToggle(true);
    }, fadeAnimationDuration);
  };

  const handlePrev = () => handleSlideChange((((currentSlide - 1) % slideCount) + slideCount) % slideCount);
  const handleNext = () => handleSlideChange((((currentSlide + 1) % slideCount) + slideCount) % slideCount);

  return (
    <Box mb="1rem">
      <Grid container>
        <Grid item xs={1} md={3} container direction="column" justify="space-between">
          {images.map((url, index) => (
            <Box
              key={url}
              width={1}
              height={slideCount > 3 ? '20%' : '30%'}
              className={'gallery-thumbnails image-box cursor ' + (index === currentSlide ? 'gallery-thumb-active' : '')}
              style={{ backgroundImage: `url("${url}")` }}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </Grid>

        <Grid item xs={11} md={9} container alignItems="center" wrap="nowrap">
          <IconButton onClick={handlePrev}>
            <NavigateBeforeIcon />
          </IconButton>
          <Fade in={fadeToggle} timeout={fadeAnimationDuration}>
            <Box
              width={1}
              height="20rem"
              className="image-box"
              style={{ backgroundImage: `url("${images[currentSlide]}")` }}
            />
          </Fade>
          <IconButton onClick={handleNext}>
            <NavigateNextIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

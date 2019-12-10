import React, { useState } from 'react';
import { Box, Grid, IconButton, Fade } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function ItemGallery({ images }) {
  const slideCount = images.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeToggle, setFadeToggle] = useState(true);

  const handlePrev = () => {
    setFadeToggle(false);
    setTimeout(() => {
      setCurrentSlide(slideIndex => (((slideIndex - 1) % slideCount) + slideCount) % slideCount);
      setFadeToggle(true);
    }, 500);
  };
  const handleNext = () => {
    setFadeToggle(false);
    setTimeout(() => {
      setCurrentSlide(slideIndex => (((slideIndex + 1) % slideCount) + slideCount) % slideCount);
      setFadeToggle(true);
    }, 500);
  };
  const handleThumbnailClick = clickedSlideIndex => {
    setFadeToggle(false);
    setTimeout(() => {
      setCurrentSlide(clickedSlideIndex);
      setFadeToggle(true);
    }, 500);
  };

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
          <Fade in={fadeToggle} timeout={500}>
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

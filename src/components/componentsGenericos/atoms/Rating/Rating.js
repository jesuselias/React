import React from 'react';
import StarRating from 'react-native-star-rating';
import {useTheme} from 'styled-components';

function Rating({
  style,
  rating,
  disabled = true,
  maxStars = 5,
  startSize = 20,
}) {
  const theme = useTheme();
  return (
    <StarRating
      style={style}
      emptyStar={'star-border'}
      fullStar={'star'}
      halfStar={'star-half'}
      emptyStarColor={theme.primaryColor}
      fullStarColor={theme.primaryColor}
      halfStarColor={theme.primaryColor}
      iconSet={'MaterialIcons'}
      disabled={disabled}
      maxStars={maxStars}
      rating={rating}
      starSize={startSize}
      selectedStar={(rating) => {}}
    />
  );
}

export default Rating;

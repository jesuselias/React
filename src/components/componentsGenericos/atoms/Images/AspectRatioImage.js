import React from 'react';
import styled from 'styled-components';

const ImageView = styled.View`
  flexDirection: row;
  paddingVertical: 2%;
`;

const Image = styled.Image`
  flex: 1;
  resizeMode: ${({resizeMode}) => resizeMode};
  border-radius: ${({borderRadius}) => `${borderRadius}px`};
`;

function AspectRatioImage({
    imageSrc,
    top,
    bottom,
    resizeMode = 'contain', // 'cover'
    borderRadius
}) {
  return (
    <ImageView>
        <Image 
            source={imageSrc} 
            style={{ aspectRatio: top/bottom }} 
            resizeMode={resizeMode}
            borderRadius={borderRadius}
        />
    </ImageView>
  );
}

export default AspectRatioImage;

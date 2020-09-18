import React from 'react';
import styled from 'styled-components/native';
import {ExtraLargeText,ExtraExtraSmallText} from '../Texts/SizedText';

const StyledText = styled(ExtraLargeText)`
  font-family: ${({theme}) => theme.fontFamilyBold};
`;

const StyledTextSM = styled(ExtraExtraSmallText)`
  font-family: ${({theme}) => theme.fontFamilyBold};
  text-align: left;
`;

function ProductCardPrice({children,small = false}) {
  if (small) {
    return (
      <StyledTextSM adjustsFontSizeToFit={true} numberOfLines={2} allowFontScaling>
        {children}
      </StyledTextSM>
    );  
  }
  return (
    <StyledText adjustsFontSizeToFit={true} numberOfLines={1} allowFontScaling>
      {children}
    </StyledText>
  );
}

export default ProductCardPrice;

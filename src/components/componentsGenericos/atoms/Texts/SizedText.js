import styled from 'styled-components/native';
import Text from './Text';

export const ExtraExtraSmallText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeXXS};
`;

export const ExtraSmallText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeXS};
`;

export const SmallText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeSM};
`;

export const MediumText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeMD};
`;

export const LargeText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeLG};
`;

export const ExtraLargeText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeXL};
`;

export const ExtraExtraLargeText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeXXL};
`;

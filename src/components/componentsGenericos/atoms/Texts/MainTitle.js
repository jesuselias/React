import React from 'react';
import Text from './Text';
import styled from 'styled-components/native';

const MainTitleText = styled(Text)`
    font-family: ${({theme}) => theme.fontFamilyBold};
    font-size: ${({theme}) => theme.fontSizeLG};
    margin-bottom: 3.5%;
`;

function MainTitle({style, str}) {
  return <MainTitleText style={style}>{str}</MainTitleText>;
}

export default MainTitle;

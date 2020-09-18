import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const StyledTouchable = styled.TouchableOpacity``;

const StyledIcon = styled(Icon)`
  color: ${({theme}) => theme.darkgrayColor};
`;

function ShareButton({onPress = () => {}}) {
  return (
    <StyledTouchable onPress={onPress}>
      <StyledIcon name="share" size={30} />
    </StyledTouchable>
  );
}

export default ShareButton;

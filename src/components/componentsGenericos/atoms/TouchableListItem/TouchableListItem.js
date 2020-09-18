import React from 'react';
import styled from 'styled-components/native';
import Text from '../Texts/Text';

const StyledTouchableOpacity = styled.TouchableOpacity`
  padding: 5%;
`;

const StyledText = styled(Text)`
  color: ${(props) => (props.isActive ? '#A2BC31' : '#000')};
  font-size: ${({theme}) => theme.fontSizeSM};
`;

function TouchableListItem({children, isActive = false, onTouch = () => {}}) {
  return (
    <StyledTouchableOpacity onPress={onTouch}>
      <StyledText isActive={isActive}>{children}</StyledText>
    </StyledTouchableOpacity>
  );
}

export default TouchableListItem;

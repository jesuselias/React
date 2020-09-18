import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const StyledTouchable = styled.TouchableOpacity`
  padding: 2%;
`;

const StyledIcon = styled(Icon)`
  color: ${({theme}) => theme.primaryColor};
`;

function AddReviewButton({onPress = () => {}}) {
  return (
    <StyledTouchable onPress={onPress}>
      <StyledIcon name="add-comment" size={40} />
    </StyledTouchable>
  );
}

export default AddReviewButton;

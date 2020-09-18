import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const StyledTouchable = styled.TouchableOpacity`
  padding: 2%;
`;

const InactiveIcon = styled(Icon)`
  color: ${({theme}) => theme.darkgrayColor};
`;

const ActiveIcon = styled(Icon)`
  color: ${({theme}) => theme.primaryColor};
`;

function FavButton({
  active = false, 
  noAction = false,
  size = 30,
  onPress = () => {}
}) {
  const renderFavIcon = active ? (
    <ActiveIcon name="filled-heart" size={size} />
  ) : (
    <InactiveIcon name="heart" size={size} />
  );
  if (noAction) return renderFavIcon;
  return <StyledTouchable onPress={onPress}>{renderFavIcon}</StyledTouchable>;
}

export default FavButton;

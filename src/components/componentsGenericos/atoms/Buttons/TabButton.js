import React from 'react';
import styled from 'styled-components/native';
import Text from '../Texts/Text';
import Icon from '../Icon/Icon';

const StyledButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 5%;
  height: 20px;
`;

const StyledIcon = styled(Icon)`
  color: ${({theme,isCatScreen}) => isCatScreen ? theme.whiteColor : theme.primaryColor};
  font-size: ${({theme}) => theme.fontSizeXL};
  height: 25px;
`;

const StyledText = styled(Text)`
  color: ${({theme}) => theme.primaryColor};
  font-size: ${({theme}) => theme.fontSizeMD};
  height: 20px;
`;

function TabButton({style, icon, text = null, onPress = () => {}, isCatScreen = false, isShopsScreen = false}) {
  const renderText = () => {
    if (text) {
      return <StyledText>{text}</StyledText>
    }
    return;
  };

  return (
    <StyledButton style={style} onPress={onPress}>
      <StyledIcon name={icon} isCatScreen={isCatScreen} isShopsScreen={isShopsScreen} />
      {renderText()}      
    </StyledButton>
  );
}

export default TabButton;

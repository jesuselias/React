import React from 'react';
import {Icon,Text} from '_atoms';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex-direction: column;
  flex-basis: ${({isCatScreen}) => isCatScreen ? 'auto' : '27%'};
  align-items: center;
  margin-bottom: 5%;
  margin-left: 2.25%;
  margin-right: 2.25%;
`;

const ItemCard = styled.TouchableOpacity`
  width: 100%;
  max-width: ${({isCatScreen}) => isCatScreen ? '62px' : '100%'};
  padding: ${({isCatScreen}) => isCatScreen ? '2.5%' : '12%'};
  justify-content: center;
  background-color: ${({theme}) => theme.whiteColor};
  border-radius: 10px;
  elevation: 3;
  shadow-color: ${({theme}) => theme.grayColor};
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;
`;

const GridIcon = styled(Icon)`
  color: ${({theme}) => theme.primaryColor};
  font-size: ${({theme}) => theme.fontSizeXXL};
  text-align: center;
`;

const ItemName = styled(Text)`
  color: ${({theme}) => theme.whiteColor};
  font-size: ${({theme,isCatScreen}) => isCatScreen ? theme.fontSizeSM : theme.fontSizeSM};
  margin-top: ${({isCatScreen}) => isCatScreen ? '5%' : '0'};
`;

function ItemView({
  style = {},
  id,
  isCatScreen = false,
  name,
  icon,
  onPress = () => {},
  children = [],
}) {
  return (
    <StyledView isCatScreen={isCatScreen}>
        <ItemCard style={style} onPress={() => isCatScreen ? onPress({id,name,children}) : onPress()} isCatScreen={isCatScreen}>
            <GridIcon name={icon} />
        </ItemCard>
        <ItemName isCatScreen={isCatScreen}>{name}</ItemName>
    </StyledView>
  );
}

export default ItemView;

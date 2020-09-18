import React from 'react';
import styled from 'styled-components/native';

const StyledSafeAreaView = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledHeaderView = styled.View`
  background-color: ${({theme,isCatScreen}) => isCatScreen ? theme.primaryColor : theme.whiteColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({isCatScreen}) => isCatScreen ? '0' : '2% 5%'};
  width: 100%;
  min-height: ${({isCatScreen,isShopsScreen,heightAuto}) => isCatScreen || isShopsScreen || heightAuto ? '0' : '150px'};
  height: ${({isCatScreen,isShopsScreen,heightAuto}) => isCatScreen || isShopsScreen || heightAuto ? 'auto' : '150px'};
  elevation: 3;
  shadow-color: ${({theme}) => theme.lightgrayColor};
  shadow-offset: 1px 1px;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
`;

const StyledBodyView = styled.View`
  background-color: ${({theme}) => theme.lightgrayColor};
  flex: 1;
`;

function Screen({
  renderHeader = () => {}, 
  renderBody = () => {},
  isCatScreen = false,
  isShopsScreen =  false,
  heightAuto = false,
}) {
  return (
    <StyledSafeAreaView>
      <StyledHeaderView 
        isCatScreen={isCatScreen} 
        isShopsScreen={isShopsScreen}
        heightAuto={heightAuto}
      >{renderHeader()}</StyledHeaderView>
      <StyledBodyView>{renderBody()}</StyledBodyView>
    </StyledSafeAreaView>
  );
}

export default Screen;

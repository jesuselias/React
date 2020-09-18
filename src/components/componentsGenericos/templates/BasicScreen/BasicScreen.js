import React from 'react';
import styled from 'styled-components/native';

const StyledSafeAreaView = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledHeaderView = styled.View`
  background-color: ${({theme}) => theme.whiteColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2% 5%;
  width: 100%;
  height: auto;
`;

const ShadowedHeaderView = styled(StyledHeaderView)`
  elevation: 3;
  shadow-color: ${({theme}) => theme.lightgrayColor};
  shadow-offset: 1px 1px;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  background-color: ${({theme}) => theme.whiteColor};
`;

const StyledBodyView = styled.View`
  background-color: ${({theme}) => theme.whiteColor};
`;

function Screen({
  renderHeader = () => {}, 
  renderBody = () => {}, 
  isHome = false,
  shadowed = false,
  flexHeader =  false,
  flexBoth = false,
  headerSmall = false,
}) {
  const renderStyledHeader = () => {
    if (shadowed) {
      return <ShadowedHeaderView>{renderHeader()}</ShadowedHeaderView>;
    }
    return (
      <StyledHeaderView 
        isHome={isHome}
        style={flexHeader ? { flex: 1, ...(flexBoth ? { maxHeight: 150 } : { minHeight: (headerSmall ? 54 : 150) }) } : {}}
      >{renderHeader()}
      </StyledHeaderView>
    );
  };

  return (
    <StyledSafeAreaView>   
      {renderStyledHeader()}   
      <StyledBodyView style={flexHeader ? (flexBoth ? { flex: 1 } : {}) : { flex: 1 }}>
        {renderBody()}
      </StyledBodyView>
    </StyledSafeAreaView>
  );
}

export default Screen;

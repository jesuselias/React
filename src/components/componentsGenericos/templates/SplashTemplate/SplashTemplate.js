import React from 'react';
import styled from 'styled-components/native';
import theme from '../../../providers/ThemeProvider/theme';

const StyledSafeAreaView = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledHeaderView = styled.View`
  background-color: ${theme.whiteColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
  width: 100%;
  height: 100%;
`;

const StyledBodyView = styled.View`
  background-color: ${theme.whiteColor};
  display: flex;
  width: 100%;
  height: 100%;
`;

function Screen({
  renderHeader = () => {}, 
  renderBody = () => {},
  noBody = false,
  noHeader = false,
}) {
  return (
    <StyledSafeAreaView>   
      {!noHeader && <StyledHeaderView>
          {renderHeader()}
      </StyledHeaderView>}
      {!noBody && <StyledBodyView>
        {renderBody()}
      </StyledBodyView>}
    </StyledSafeAreaView>
  );
}

export default Screen;

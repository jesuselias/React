import React from 'react';
import styled from 'styled-components/native';
import {TabButton} from '_atoms';

const TabsView = styled.View`
  display: flex;
  flex-direction: ${({isShopsScreen}) => isShopsScreen ? 'column' : 'row'};;
  height: 40px;
`;

const StyledTabButton = styled(TabButton)`
  flex-basis: ${({isCatScreen,isShopsScreen}) => isCatScreen ? '10%' : isShopsScreen ? '100%' : '50%'};
  height: 40px;
`;

const StyledDivisor = styled.View`
  width: 2px;
  height: 100%;
  background-color: ${({theme}) => theme.grayColor};
`;

function FilterTabs({
  style,
  onPressFilterTab = () => {},
  onPressSortTab = () => {},
  isCatScreen = false,
  isShopsScreen = false,
  favsOpns = false,
}) {
  if (isCatScreen) {
    return (
      <TabsView style={style}>
        <StyledTabButton icon="sort" onPress={onPressSortTab} isCatScreen={isCatScreen} />
      </TabsView>
    );  
  }
  else if (isShopsScreen) {
    return (
      <TabsView isShopsScreen={isShopsScreen} style={style}>
        <StyledTabButton icon="filter" onPress={onPressFilterTab} isShopsScreen={isShopsScreen} />
      </TabsView>
    );
  }
  return (
    <TabsView style={style}>
      <StyledTabButton text={favsOpns ? "Favoritos" : "Filtro"} icon={favsOpns ? "heart" : "filter"} onPress={onPressFilterTab} />
      <StyledDivisor />
      <StyledTabButton text={favsOpns ? "Opiniones" : "Ordenar"} icon={favsOpns ? "comment" : "sort"} onPress={onPressSortTab} />
    </TabsView>
  );
}

export default FilterTabs;

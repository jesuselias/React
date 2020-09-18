import React from 'react';
import styled from 'styled-components';
import {SearchInput} from '_molecules';
import {Icon} from '_atoms';

const StyledView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3% 5% 0 2%; 
`;

const StyledSearchInput =  styled(SearchInput)`
    flex-basis: 78%;
`;

const StyledIcon = styled(Icon)`
  color: ${({theme}) => theme.whiteColor};
  font-size: ${({theme}) => theme.fontSizeXXL};  
`;

const TouchableIcon = styled.TouchableOpacity`
  flex-basis: 12%;
`;

function CategoryWithSubcategoriesHeader({
  navigation,
  onInnerSearchEndEditing = () => {},
}) {
  return (
    <StyledView>
      <TouchableIcon onPress={() => navigation.goBack()}>
        <StyledIcon name="arrow-left" />
      </TouchableIcon>      
      <StyledSearchInput 
        onEndEditing={onInnerSearchEndEditing} 
        isCatScreen={true} 
      />      
    </StyledView>
  );
}

export default CategoryWithSubcategoriesHeader;
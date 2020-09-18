import React from 'react';
import styled from 'styled-components/native';
import {TouchableListItem} from '_atoms';

const StyledView = styled.View`
  display: flex;
  flex-direction: column;
`;

const StyledDivisor = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.grayColor};
`;

function TouchableList({style, items = [], onSelectItem = () => {}}) {
  const renderItems = () => {
    const renderedItems = [];
    for (const item of items) {
      if (isValidItem(item)) {
        renderedItems.push(renderItem(item));
      }
    }
    return renderedItems;
  };

  const isValidItem = ({name, value}) => name && value;

  const renderItem = ({name, value, isSelected}) => {
    return (
      <StyledView key={value}>
        <TouchableListItem
          isActive={isSelected ? true : false}
          onTouch={() => onSelectItem({name, value, isSelected})}>
          {name}
        </TouchableListItem>
        <StyledDivisor />
      </StyledView>
    );
  };

  return <StyledView style={style}>{renderItems()}</StyledView>;
}

export default TouchableList;

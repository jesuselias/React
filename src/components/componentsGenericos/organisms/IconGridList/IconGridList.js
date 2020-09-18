import React from 'react';
import styled from 'styled-components';
import {Text} from '_atoms';
import {FlatList} from 'react-native';

const GridListView = styled.View`
  padding: 3% 0 0;
  background: ${({theme}) => theme.primaryColor};
  flex-direction: column;
  align-items: center;
`;

const TitleText = styled(Text)`
  color: ${({theme}) => theme.whiteColor};
  padding: 0 1% 1% 1%;
  border-bottom-width: 2px;
  border-bottom-color: ${({theme}) => theme.whiteColor};
  font-weight: bold;
  margin-bottom: 5%;
  font-size: ${({theme}) => theme.fontSizeMD};
`;

function IconGridList({
  title,
  renderComponent,
  dataKey,
  data
}) {
  const itemStyles = {
    marginTop: '2%',
    marginBottom: '5%',
    flexShrik: 0,
    flexGrow: 0,
  };

  const keyExtractor = (item) => {
    if (dataItemHasNotKey(item)) {
      throw new Error('IconGridList component must receive a dataKey prop');
    }
    return item[dataKey];
  };

  const dataItemHasNotKey = (dataItem) => {
    dataKey && dataItem.hasOwnProperty(dataKey);
  };

  const renderStyledComponent = ({item, index}) => {
    return renderComponent({item, style: itemStyles});
  };

  return (
    <GridListView>
      <TitleText>
          {title}
      </TitleText>
      <FlatList
        data={data}
        renderItem={renderStyledComponent}
        keyExtractor={keyExtractor}
        numColumns={3}
      />
    </GridListView>    
  );
}

export default IconGridList;
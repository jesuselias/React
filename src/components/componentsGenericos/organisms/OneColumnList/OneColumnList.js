import React from 'react';
import styled from 'styled-components';
import {FlatList, ActivityIndicator, RefreshControl} from 'react-native';

const Badge = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.primaryColor};
  padding: 2% 4%;
  margin: 5% auto;
  border-radius: 20px;
  width: auto;
  align-self: flex-start;
`;

const Text = styled.Text`
  font-family: ${({theme}) => theme.fontFamilyRegular};
  font-size: ${({theme}) => theme.fontSizeXS};
  color: ${({theme}) => theme.whiteColor};
  text-align: center;
  text-transform: uppercase;
`;

function OneColumnList({
  renderComponent,
  initialPage,
  data,
  dataKey,
  initialNumToRender,
  isEnded,
  refreshing = false,
  onRefresh = () => {},
  onEndReached = () => {},
  endThreshold = 0.2,
}) {
  const itemStyles = {
    marginVertical: '2%',
    flex: 1,
  };

  const renderStyledComponent = ({item}) => {
    return renderComponent({item, style: itemStyles});
  };

  const keyExtractor = (item) => {
    if (dataItemHasNotKey(item)) {
      throw new Error('TwoColumnsList component must receive a dataKey prop');
    }
    return item[dataKey];
  };

  const dataItemHasNotKey = (dataItem) => {
    dataKey && dataItem.hasOwnProperty(dataKey);
  };

  const handleEndReached = () => {
    if (isEnded) {
      return;
    }
    onEndReached();
  };

  const renderFooter = () => {
    if (data instanceof Array && data.length === 0) {
      return (
        <Badge>
          <Text>No hay resultados</Text>
        </Badge>
      );
    }
    if (isEnded) {
      return (
        <Badge>
          <Text>Has llegado al final</Text>
        </Badge>
      );
    }
    return <ActivityIndicator animating color={'#A2BC31'} size="large" />;
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          colors={['#A2BC31', '#A2BC31']}
          tintColor={['#A2BC31', '#A2BC31']}
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
        />
      }
      data={data}
      renderItem={renderStyledComponent}
      keyExtractor={keyExtractor}
      initialNumToRender={initialNumToRender}
      onEndReached={() => handleEndReached()}
      onEndReachedThreshold={endThreshold}
      ListFooterComponent={renderFooter}
    />
  );
}

export default OneColumnList;

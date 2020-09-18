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

function TwoColumnsList({
  renderComponent,
  initialPage,
  data,
  dataKey,
  initialNumToRender,
  isEnded,
  refreshing = false,
  shouldRefresh = true,
  onRefresh = () => {},
  onEndReached = () => {},
  endThreshold = 0.2,
}) {
  const itemStyles = {
    marginVertical: '2%',
    flexShrik: 0,
    flexGrow: 0,
    flexBasis: '45%',
  };

  const evenItemStyles = {
    ...itemStyles,
    marginLeft: '4%',
    marginRight: '1%',
  };

  const oddItemStyles = {
    ...itemStyles,
    marginLeft: '1%',
    marginRight: '4%',
  };

  const renderStyledComponent = ({item, index}) => {
    if (index % 2 === 0) {
      return renderComponent({item, style: evenItemStyles});
    } else {
      return renderComponent({item, style: oddItemStyles});
    }
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
    if (isEnded || !shouldRefresh) {
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
      refreshControl={shouldRefresh &&
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
      numColumns={2}
      initialNumToRender={initialNumToRender}
      onEndReached={() => handleEndReached()}
      onEndReachedThreshold={endThreshold}
      ListFooterComponent={renderFooter}
    />
  );
}

export default TwoColumnsList;

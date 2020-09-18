import React, { useState } from 'react';
import {View, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {
  ProductCardName,
  ProductCardBrand,
  ProductCardPrice,
  ProductCardShop,
  TouchableCard,
  FavButton,
} from '_atoms';
import {useTheme} from 'styled-components';

const Card = styled(TouchableCard)`
  padding: 3%;
  position: relative;
`;

const FavContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  padding: 4%;
  align-items: center;
  justify-content: center;
`;

const ImageView = styled.View`
  margin-top: ${({isShopsScreen}) => !isShopsScreen ? '0' : '12.5%'};
  margin-bottom: ${({isShopsScreen}) => !isShopsScreen ? '0' : '8%'};
  align-items: center;
`;

const ProductImage = styled.Image`
  width: ${({isShopsScreen}) => !isShopsScreen ? '150px' : '100px'};
  height: ${({isShopsScreen}) => !isShopsScreen ? '150px' : '100px'};
  resizeMode: contain;
`;

const ProductCardBrandStyled = styled(ProductCardBrand)`
  margin-top: ${({isShopsScreen}) => !isShopsScreen ? '0' : '3%'};
  margin-bottom: ${({isShopsScreen}) => !isShopsScreen ? '0' : '8%'};
`;

function ProductCard({
  style,
  id = null,
  name,
  brand,
  state,
  shop,
  price,
  image,
  isFav = false,
  isFaving = false,
  isShopsScreen = false,
  onPress = () => {},
  onAddFavorite = () => {},
}) {
  const [isFavorite, setFavorite] = useState(isFav);
  const [sendingFavorite, setSendingFavorite] = useState(false);

  const theme = useTheme();
  
  const imageSrc = image ? {uri: image} : require('./img/manguera300x300.png');

  const renderPrice = () => {
    if (price) {
      return <ProductCardPrice>{price}</ProductCardPrice>;
    }
    return;
  };

  const renderShop = () => {
    if (shop) {
      return <ProductCardShop>{shop}</ProductCardShop>;
    }
    return;
  };

  const addFavMeth = () => {
    if (!isFaving) {
      setSendingFavorite(true);
      setFavorite(!isFavorite);
      onAddFavorite(id); 
    }
  };

  return (
    <Card style={style} onPress={() => onPress()}>
      {isFav && <FavContainer>
        {sendingFavorite 
        ? <ActivityIndicator size="small" color={theme.primaryColor} />
        : <FavButton 
            active={isFavorite} 
            size={25} 
            noAction={false} 
            onPress={() => addFavMeth()}
            disabled={isFaving}
          />}
      </FavContainer>}
      <ImageView isShopsScreen={isShopsScreen}>
        <ProductImage 
          source={imageSrc} 
          height={!isShopsScreen ? 140 : 100} 
          width={!isShopsScreen ? 140 : 100} 
          isShopsScreen={isShopsScreen}
        />
      </ImageView>
      <View>
        <ProductCardName>{name}</ProductCardName>
        <ProductCardBrandStyled isShopsScreen={isShopsScreen}>
          {!isShopsScreen ? brand : state}
        </ProductCardBrandStyled>
        {renderPrice()}
        {renderShop()}
      </View>
    </Card>
  );
}

export default ProductCard;

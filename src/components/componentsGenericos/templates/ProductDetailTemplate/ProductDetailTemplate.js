import React, { useState } from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import styled, {useTheme} from 'styled-components';
import {
  Text,
  Icon,
  ShareButton,
  FavButton,
  AddReviewButton,
  HorizontalDivisor,
  Rating,
} from '_atoms';
import {ImageCarousel, ReviewCard} from '_molecules';
import {OneColumnList} from '_organisms';
import HTML from 'react-native-render-html';
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';

const ScrollView = styled.ScrollView`
  padding: 5%;
`;

const ContentView = styled.View`
  padding: 5% 0;
`;

const ProductHeadingView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 5% 0;
`;

const ProductContentView = styled.View`
  flex-basis: 75%;
`;

//justify-content: space-between;
const ActionButtonsView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  flex-basis: 22%;
`;

const FavoWrapper = styled.View`
  position: relative;
`;

const ProductName = styled(Text)`
  font-family: ${({theme}) => theme.fontFamilyBold};
  font-size: ${({theme}) => theme.fontSizeXL};
  text-align: left;
`;

const ProductPrice = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeLG};
  text-align: left;
`;

const ProductBrand = styled(ProductPrice)``;

const ProductDescriptionLabel = styled(Text)`
  font-family: ${({theme}) => theme.fontFamilyBold};
  font-size: ${({theme}) => theme.fontSizeMD};
  text-align: left;
`;

const ShopHeadingView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
`;

const ShopName = styled(Text)`
  font-family: ${({theme}) => theme.fontFamilyBold};
  font-size: ${({theme}) => theme.fontSizeMD};
  text-align: left;
`;

const ShopDataRowView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 1.5% 0;
`;

const ShopIcon = styled(Icon)`
  color: ${({theme}) => theme.primaryColor};
  font-size: ${({theme}) => theme.fontSizeLG};
  margin: 0 4%;
`;

const ShopData = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeSM};
  text-align: left;
  flex-basis: 90%;
  width: 100%;
`;

//const ShopTouchableData = styled(ShopData)`
//  color: ${({theme}) => theme.primaryColor};
//`;

const ReviewsHeadingView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
`;

const ReviewsTitle = styled(Text)`
  font-size: ${({theme}) => theme.fontFamilyBold};

  font-size: ${({theme}) => theme.fontSizeMD};
`;

function ProductDetailTemplate({
  product,
  isFaving = false,
  onShare = () => {},
  onAddFavorite = () => {},
  onAddReview = () => {},
  onPressEmail = () => {},
  onPressPhoneNumber = () => {},
  onPressWebsite = () => {},
  onPressWhatsapp = () => {},
  onPressTwitter = () => {},
  onPressInstagram = () => {},
}) {
  const theme = useTheme();

  const {name, id, description, images, price, brand, isFavorite} = product;
  const {
    name: shopName,
    rating: shopRating,
    state: shopState,
    city: shopCity,
    address: shopAddress,
    email: shopEmail,
    phone: shopPhone,
    whatsapp: shopWhatsapp,
    website: shopWebsite,
    twitter: shopTwitter,
    instagram: shopInstagram,
  } = product.shop;

  const [isFavorite_, setFavorite_] = useState(isFavorite);
  // const [sendingFavorite, setSendingFavorite] = useState(false);
  
  const shopValidAddress = shopAddress ? `${shopAddress},` : '';
  const shopValidCity = shopCity ? `${shopCity},` : '';
  const shopValidState = shopState ? `${shopState}` : '';
  const shopLocation = `${shopValidAddress} ${shopValidCity} ${shopValidState}`;

  const renderReview = ({item: review}) => {
    return <ReviewCard {...review} mVer={2.5} />;
  };

  const addFavMeth = () => {
    if (!isFaving) {
      // setSendingFavorite(true);
      setFavorite_(!isFavorite_);
      onAddFavorite(id,!isFavorite_);
    }
  };

  return (
    <ScrollView>
      <ContentView>
        <ImageCarousel images={images}></ImageCarousel>
        <ProductHeadingView>
          <ProductContentView>
            <ProductName>{name}</ProductName>
            <ProductPrice>Precio: {price}</ProductPrice>
            {brand ? <ProductBrand>Marca: {brand}</ProductBrand> : <></>}
          </ProductContentView>
          <ActionButtonsView>
            {/* <ShareButton onPress={onShare} /> */}
            <FavoWrapper>
              {isFaving 
                ? <ActivityIndicator size="small" color={theme.primaryColor} />
                : <FavButton 
                    active={isFavorite_}
                    onPress={() => addFavMeth()}
                    disabled={isFaving}
                  />}
            </FavoWrapper>
          </ActionButtonsView>
        </ProductHeadingView>
        <View>
          <ProductDescriptionLabel>Descripción</ProductDescriptionLabel>
          <HTML
            html={description}
            tagsStyles={{p: {margin: 0, padding: 0}}}
            ignoredTags={[...IGNORED_TAGS, 'br']}
          />
        </View>
      </ContentView>
      <HorizontalDivisor />
      <ContentView>
        <ShopHeadingView>
          <ShopName>
            {/* TIENDA */}
            {shopName}
          </ShopName>
          <Rating disabled={true} rating={shopRating} />
        </ShopHeadingView>
        <View>
          {shopLocation && (
            <ShopDataRowView>
              <ShopIcon name="location" />
              <ShopData>Dirección: {shopLocation}</ShopData>
            </ShopDataRowView>
          )}
          {shopEmail && (
            <ShopDataRowView>
              <ShopIcon name="mail" />
              <TouchableOpacity onPress={() => onPressEmail(shopEmail)}>
                <ShopData>Correo electrónico:</ShopData>
                <ShopData>{shopEmail}</ShopData>
              </TouchableOpacity>
            </ShopDataRowView>
          )}
          {shopPhone && (
            <ShopDataRowView>
              <ShopIcon name="phone" />
              <TouchableOpacity onPress={() => onPressPhoneNumber(shopPhone)}>
                <ShopData>Teléfono: {shopPhone}</ShopData>
              </TouchableOpacity>
            </ShopDataRowView>
          )}
          {shopWhatsapp && shopWhatsapp.length > 0 ? (
            <ShopDataRowView>
              <ShopIcon name="whatsapp" />
              <TouchableOpacity onPress={() => onPressWhatsapp(shopWhatsapp)}>
                <ShopData>Whatsapp: {shopWhatsapp}</ShopData>
              </TouchableOpacity>
            </ShopDataRowView>
          ) : (
            <></>
          )}
          {shopWebsite && shopWebsite.length > 0 ? (
            <ShopDataRowView>
              <ShopIcon name="web" />
              <TouchableOpacity onPress={() => onPressWebsite(shopWebsite)}>
                <ShopData>Sitio Web: {shopWebsite}</ShopData>
              </TouchableOpacity>
            </ShopDataRowView>
          ) : (
            <></>
          )}
          {shopTwitter && shopTwitter.user ? (
            <ShopDataRowView>
              <ShopIcon name="twitter" />
              <TouchableOpacity
                onPress={() => onPressTwitter(shopTwitter.user)}>
                <ShopData>Twitter: {shopTwitter.user}</ShopData>
              </TouchableOpacity>
            </ShopDataRowView>
          ) : (
            <></>
          )}
          {shopInstagram && shopTwitter.user ? (
            <ShopDataRowView>
              <ShopIcon name="instagram" />
              <TouchableOpacity
                onPress={() => onPressInstagram(shopInstagram.user)}>
                <ShopData>Instagram: {shopInstagram.user}</ShopData>
              </TouchableOpacity>
            </ShopDataRowView>
          ) : (
            <></>
          )}
        </View>
      </ContentView>
      <HorizontalDivisor />
      <ContentView>
        <ReviewsHeadingView>
          <ReviewsTitle>Opiniones ({product.reviews.length})</ReviewsTitle>
          <AddReviewButton onPress={onAddReview} />
        </ReviewsHeadingView>
        <View>
          <OneColumnList
            data={product.reviews}
            dataKey={name}
            initialNumToRender={5}
            isEnded={true}
            renderComponent={renderReview}
          />
        </View>
      </ContentView>
    </ScrollView>
  );
}

export default ProductDetailTemplate;

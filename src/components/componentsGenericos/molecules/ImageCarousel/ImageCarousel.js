import React, {useState} from 'react';
import styled, {useTheme} from 'styled-components';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ProductCardPrice,Text} from '_atoms';
import {ItemView} from '_molecules';
import { Platform } from 'react-native';

const IMAGE_HEIGHT = 200;
const IMAGE_WIDTH = 200;

const AllOfCarouselView = styled.View`
  padding-left: ${({type,centering,isIos}) => type === 'subcategories' ? (centering ? (isIos ? '9%' : '8%') : '5%') : type === 'default' ? '0' : '5%'};
  padding-right: ${({type}) => type === 'subcategories' ? '5%' : '0'};
  flex-direction: ${({type}) => type === 'subcategories' ? 'row' : 'column'};
  align-items: ${({type}) => type === 'default' ? 'center' : 'flex-start'};
`;

const CarouselView = styled.View`
  flex: 1;
  flex-direction: ${({type}) => type === 'default' ? 'column' : 'row'};
  justify-content: center;
  align-items: ${({type}) => type === 'subcategories' ? 'flex-start' : 'center'};
  width: ${({type}) => type === 'default' ? `${IMAGE_WIDTH}px` : 'auto'};
`;

const ImageView = styled.View`
  align-items: center;  
`;

const ImageCard = styled.TouchableOpacity`
  align-items: flex-start;
`;

const Image = styled.Image`
  height: ${({subsNum}) => `${IMAGE_HEIGHT-subsNum}px`};
  width: ${({subsNum}) => `${IMAGE_WIDTH-subsNum}px`};
  border-radius: ${({type}) => type === 'default' ? '10px' : '0'};
  margin-bottom: ${({type}) => type === 'default' ? '0' : type === 'featured' ? '15%' : '40px'};
  resizeMode: contain;
`;

const CarouselTitle = styled(Text)`
  font-family: ${({theme}) => theme.fontFamilyBold};
  font-size: ${({theme}) => theme.fontSizeMD};
  text-align: left;
  margin-bottom: 7%;
  margin-top: 2%;
`;

function ImageCarousel({
  images = [], 
  initialSlide = 0,
  type = 'default', // 'featured','brands', subcategories
  title = null,
  navigation,
  onSubCatPressed = () => {},
}) {
  const [activeSlide, setActiveSlide] = useState(initialSlide);
  const theme = useTheme();

  const subsNum = type === 'default' ? 0 : 90;

  const _renderTitle = () => {
    if (title) {
      return <CarouselTitle>{title}</CarouselTitle>;
    }
    return;
  };
  const _renderText = ({name}) => {
    if (type === 'featured' || type === 'subcategories') {
      return <ProductCardPrice small={true}>{name}</ProductCardPrice>;
    }
    return;
  };

  const _renderImage = ({item, index}) => {
    const imageSrc = {uri: type === 'default' ? item : item.picture};
    if (type !== 'default') {    
      const path_ = type === 'featured' ? 'ProductDetail' : 'PATH_TO_BRAND';  
      // onPress={() => navigation.navigate(path_, {id: item.id})}

      if (type === 'subcategories') {
        return (
          <ItemView 
            key={`${item.id}`} 
            isCatScreen={true}  
            // icon={item.icon}
            icon={'bag'}
            id={item.id}
            name={item.name}
            children={item.children}
            onPress={onSubCatPressed}
            style={{width: Platform.OS === 'ios' ? 104 : 102, height: 62}}
            // style={{width: 76, height: 62}}
          />
        );
      }
      return (
        <ImageCard onPress={() => navigation.navigate('ProductsList', {searchTerm: ''})}>
          <Image 
            source={imageSrc} 
            height={IMAGE_HEIGHT-subsNum} 
            width={IMAGE_WIDTH-subsNum} 
            subsNum={subsNum}
            type={type}
          />
          {_renderText(item)}
        </ImageCard>
      );
    }
    return (
      <ImageView>
        <Image
          source={imageSrc} 
          height={IMAGE_HEIGHT-subsNum} 
          width={IMAGE_WIDTH-subsNum} 
          subsNum={subsNum}
          type={type}
        />
      </ImageView>
    );
  };

  const _renderPagination = () => {
    if (type === 'default') {
      const dotStyle = {
        backgroundColor: theme.darkgrayColor,
        borderRadius: 5,
        height: 10,
        width: 10,
      };
      return (
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          dotStyle={dotStyle}
          inactiveDotStyle={dotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
        />
      );  
    }
    return;
  };

  return (
    <AllOfCarouselView type={type} centering={images.length < 4 ? true : false} isIos={Platform.OS === "ios"}>
      {_renderTitle()}
      <CarouselView type={type}>        
        <Carousel
          contentContainerCustomStyle={images.length < 4 && type === 'subcategories' ? { flex: 1, justifyContent:'center' } : {}}
          inactiveSlideOpacity={type === 'default' ? 0.7 : 1}
          inactiveSlideScale={type === 'default' ? 0.9 : 1}
          data={images}
          renderItem={_renderImage}
          itemHeight={type === 'subcategories' ? 62 : (IMAGE_HEIGHT-subsNum)}
          sliderHeight={type === 'subcategories' ? 62 : IMAGE_HEIGHT}
          itemWidth={type === 'subcategories' ? (Platform.OS === 'ios' ? 104 : 102) : (IMAGE_WIDTH-subsNum)}
          sliderWidth={type === 'subcategories' ? (Platform.OS === 'ios' ? 104 : 102) : (IMAGE_WIDTH-subsNum)}
          onSnapToItem={(index) => setActiveSlide(index)}
          slideStyle={{marginRight:(type === 'default' ? 0 : type === 'subcategories' ? 12 : 25)}}
        />        
      </CarouselView>
      {_renderPagination()}
    </AllOfCarouselView>    
  );
}

export default ImageCarousel;

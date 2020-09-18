import React from 'react';
import styled, {useTheme} from 'styled-components';
import {AppName, CurrencyButton, Icon, Text} from '_atoms';
import {Animated} from 'react-native';
import {name as appName} from '../../../../../app.json';

const StyledView = styled.View`
  flex-direction: ${({flexHeader}) => flexHeader ? 'column' : 'row'};
  justify-content: ${({flexHeader}) => flexHeader ? 'flex-start' : 'space-between'};
  align-items: ${({isHome,flexHeader}) => isHome || flexHeader ? 'flex-start' : 'center'};
`;

const MenuButtonView = styled.View`
  flex-basis: 10%;
`;

const TouchableIcon = styled.TouchableOpacity`
  flex-basis: ${({flexHeader}) => flexHeader ? '15%' : '10%'};
  margin-left: ${({flexHeader}) => flexHeader ? '-3%' : '0'};
`;

const MenuIcon = styled.TouchableOpacity``;

const StyledIcon = styled(Icon)`
  color: ${({theme}) => theme.blackColor};
  font-size: ${({theme}) => theme.fontSizeXXL};
`;

const AppNameView = styled.View`
  flex-basis: ${({flexHeader}) => flexHeader ? '100%' : '80%'};
  width: ${({flexHeader}) => flexHeader ? '100%' : 'auto'};
  align-items: center;
`;

const AppNameHeader = styled(AppName)`
  color: ${({theme}) => theme.primaryColor};
`;

const AppNameHeaderAuth = styled(Text)`
  font-family: ${({theme}) => theme.fontFamilyBold};
  font-size: ${({theme}) => theme.fontSizeMD};
`;

const CurrencyButtonView = styled.View`
  flex-basis: 10%;
`;

const IMAGE_HEIGHT = 88;
const IMAGE_WIDTH = 108;

const ImageView = styled.View`
  align-items: center;
`;

const Image = styled.Image`
  height: ${({flexHeader}) => flexHeader ? `${IMAGE_HEIGHT-22}px` : `${IMAGE_HEIGHT}px`};
  width: ${({flexHeader}) => flexHeader ? `${IMAGE_WIDTH-26}px` : `${IMAGE_WIDTH}px`};
  resizeMode: contain;
  position: relative;
  top: 0px;
`;

function Header({
  currencySymbol, 
  onCurrencyButtonPress = () => {}, 
  isHome = false,
  scrollY = null,
  showLeftArrow = false,
  navigation,
  flexHeader = false,
}) {
  const theme = useTheme();

  /**
   * when mid or outMid are optional both of them have to be too.
   * @param {number} from start animation at specified Y axis
   * @param {number} to end animation at specified Y axis
   * @param {any} out1 initial attribute value
   * @param {any} out2 final attribute value
   * @param {number} mid optional - animation at some range in between from...to Y axis
   * @param {any} outMid optional - middle attribute value
   */
  const interp = (from, to, out1, out2, mid = null, outMid = null) => {
    return scrollY ? scrollY.interpolate({
      inputRange: mid ? [from,mid,to] : [from,to],
      outputRange: outMid ? [out1, outMid, out2] : [out1, out2],
      extrapolate: "clamp"
    }) : out2;
  };

  const renderAppName = () => {
    const imageSrc = require('../../../assets/images/logoMegagropecuaria.png');

    if (isHome) {
      //? UNCOMMENT TO ADD ANIMATIONS
      // const color = interp(0, 250, theme.blackColor, theme.primaryColor, 200, theme.blackColor);
      // const height = interp(151, 337, IMAGE_HEIGHT, 8);
      // const top = interp(251, 400, 0, -80);
      // const paddTop = interp(0, 150, 40, 8);
      const paddTop = interp(0, 150, 40, 18);
      // const opacity = interp(180, 275, 1, 0);
      // const nameTop = interp(180, 335, 0, -5, 290, -8);
      const nameTop = interp(0, 150, 0, -5);

      const color = theme.blackColor;
      const height = IMAGE_HEIGHT;
      const top = 0;
      // const paddTop = 40;
      const opacity = 1;
      // const nameTop = 0;
      
      //? REPLACE IN RENDER TO ADD ANIMATIONS
      /* <AppNameView as={Animated.View} style={{paddingTop: paddTop}}> */
      /* <Image as={Animated.Image}  */
      /* <Animated.Text style={{ */
      /* }}>{appName}</Animated.Text> */
      return (
        <AppNameView as={Animated.View} style={{paddingTop: paddTop}}>          
            <ImageView>              
              <Image as={Animated.Image}
                source={imageSrc} 
                height={IMAGE_HEIGHT} 
                width={IMAGE_WIDTH}
                style={{
                  top,
                  height,
                  opacity
                }}
              />
            </ImageView>            
            <Animated.Text style={{
              color,
              fontSize: 20,
              fontFamily: theme.fontFamilyBold,
              textAlign: "center",  
              position: "relative", 
              top: nameTop           
            }}>{appName}</Animated.Text>
        </AppNameView>
      );
    }
    else if (flexHeader) {
      return (
        <AppNameView flexHeader={flexHeader}>
            <ImageView>              
              <Image
                source={imageSrc} 
                height={!flexHeader ? IMAGE_HEIGHT : (IMAGE_HEIGHT-22)} 
                width={!flexHeader ? IMAGE_WIDTH : (IMAGE_WIDTH-26)}
                flexHeader={flexHeader}
              />
            </ImageView>            
            <AppNameHeaderAuth>{appName}</AppNameHeaderAuth>
        </AppNameView>
      );
    }
    return (
          <AppNameView>
            <AppNameHeader />
          </AppNameView>
        );
  };

  //? UNCOMMENT TO ADD ANIMATIONS
  const paddingTop = interp(0, 90, 7, isHome ? 7 : 0);
  // const marginBottom = interp(0, 300, 22, isHome ? 8 : 0);
  const marginBottom = interp(0, 150, 16, isHome ? 4 : 0);

  // const paddingTop = isHome ? 7 : 0;
  // const marginBottom = isHome ? 22 : 0;

  //? REPLACE IN RENDER TO ADD ANIMATIONS
  /* <StyledView as={Animated.View} isHome={isHome} style={{marginBottom}}> */
  /* <MenuButtonView as={Animated.View} style={{paddingTop}}> */

  const returnLeftSideHeader = () => {
    if (showLeftArrow) {
      return (
        <TouchableIcon flexHeader={flexHeader} onPress={() => navigation.goBack()}>
          <StyledIcon name="arrow-left" />
        </TouchableIcon>  
      );
    }
    return (
      <MenuButtonView as={Animated.View} style={{paddingTop}}>
        <MenuIcon onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#000" />
        </MenuIcon>        
      </MenuButtonView>
    );
  };

  const renderCurrency = () => {
    if (!flexHeader) {
      return (
        <CurrencyButtonView>
          <CurrencyButton
            symbol={currencySymbol}
            onPress={onCurrencyButtonPress}
          />
        </CurrencyButtonView>
      );
    }
    return;
  };

  return (
    <StyledView 
      as={Animated.View} 
      isHome={isHome}
      flexHeader={flexHeader}
      style={{marginBottom}}
    >   
      {returnLeftSideHeader()}
      {renderAppName()}
      {renderCurrency()}
    </StyledView>
  );
}

export default Header;

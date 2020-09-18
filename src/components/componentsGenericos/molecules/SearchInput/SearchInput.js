import React, {useRef, useState} from 'react';
import styled, {useTheme} from 'styled-components';
import {Icon} from '_atoms';
import {Animated,TouchableWithoutFeedback} from 'react-native';

const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({isHome,smalled,theme,isCatScreen}) => isCatScreen? 'transparent' : (isHome && !smalled ? theme.whiteColor : theme.grayColor)};
  border: ${({isHome,smalled,theme,isCatScreen}) => isCatScreen ? `2px solid ${theme.whiteColor}` : (isHome && !smalled ? `2px solid ${theme.primaryColor}` : 'none')};
  border-radius: 10px;
  padding: ${({isCatScreen}) => isCatScreen ? '0 0 0 5%' : '0 5%'};
  height: 40px;
  margin-bottom: ${({isHome,smalled}) => isHome ? '1%' : smalled ? '2%' : '0'};
  margin-top: ${({smalled}) => smalled ? '2.25%' : '0'};
`;

const IconWrapper = styled.View`
  flex-basis: 10%;
  position: relative;
  right: -12px;
  flex-direction: row;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  color: ${({theme,isHome,isCatScreen}) => isHome ? theme.darkerGrayColor : isCatScreen ? theme.whiteColor : theme.darkgrayColor};
  font-size: ${({theme}) => theme.fontSizeLG};  
  flex-basis: ${({isCatScreen}) => isCatScreen ? '100%' : '10%'};
`;

const StyledTextInput = styled.TextInput`
  color: ${({theme,isCatScreen,isHome}) => isCatScreen ? theme.whiteColor : (isHome ? theme.blackColor : theme.darkgrayColor)};  
  font-family: ${({theme}) => theme.fontFamilyRegular};
  font-size: ${({theme}) => theme.fontSizeMD};
  flex-basis: 90%;
  height: 40px;
  width: 100%;
`;

function SearchInput({
  style,
  isHome = false,
  smalled = false,
  value,
  scrollY = null,
  isCatScreen = false,
  onEndEditing = () => {},
  onBlur = () => {},
  onChangeText = () => {},
}) {
  const theme = useTheme();
  
  const borderColor_ = useRef(new Animated.Value(0)).current;
  const [inputStates, setInputStates] = useState([theme.primaryColor,false]);

  const searchInput = useRef(null);

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

  //? UNCOMMENT TO ADD ANIMATIONS
  // const borderWidth = interp(0, 150, 2, 0);
  // const borderColor = interp(0, 150, theme.primaryColor, theme.grayColor);
  // const backgroundColor = interp(0, 300, theme.whiteColor, theme.grayColor);
  // const marginBottom = interp(0, 300, 12, isHome ? 2 : 0);
  const marginBottom = interp(0, 150, 6, isHome ? 2 : 0);
  
  const borderWidth = isHome ? 2 : 0;
  const borderColor = isHome ? theme.primaryColor : theme.grayColor;
  const backgroundColor = isHome ? theme.whiteColor : theme.grayColor;
  // const marginBottom = isHome ? 2 : 0;

  const animateFunc = (to,dur,obj,set1,set2) => {
    const objs = { borderColor: borderColor_ };
    Animated.timing(objs[obj], {
      toValue: to,
      duration: dur,
      useNativeDriver: false
    }).start(()=>{
      setInputStates([set1, set2]);
    });
  };

  const showSearchInput = () => {
    searchInput.current.focus()
    animateFunc(1,400,'borderColor',theme.whiteColor,true);
  };

  const resetSearchInput = () => {
    animateFunc(0,300,'borderColor',theme.primaryColor,false);
  };

  const bCIfunc = (out1, out2) => {
    return borderColor_.interpolate({
      inputRange: [0, 1],
      outputRange:[out1, out2]
    });
  };

  const borderC = bCIfunc(theme.primaryColor, theme.whiteColor);
  const iconRighted = bCIfunc(-12, 0);

  if (isCatScreen) {
    return (
      <StyledView 
        as={Animated.View} 
        isHome={isHome} 
        smalled={smalled} 
        isCatScreen={isCatScreen}
        style={{
          borderColor: borderC        
        }}
      >        
        <StyledTextInput
          ref={searchInput}
          style={[style,{color: inputStates[0]}]}
          placeholder={'Buscar'}
          placeholderTextColor={inputStates[0]}
          editable={inputStates[1]}
          value={value}
          onEndEditing={onEndEditing}
          onBlur={() => {resetSearchInput(),onBlur}}
          onChangeText={onChangeText}
          isCatScreen={isCatScreen}
        />
        <TouchableWithoutFeedback onPress={() => showSearchInput()}>
          <IconWrapper as={Animated.View} style={{right: iconRighted}}>
            <StyledIcon name="search" isHome={isHome} isCatScreen={isCatScreen} />
          </IconWrapper>          
        </TouchableWithoutFeedback>        
      </StyledView>
    ); 
  }
  return (
    <StyledView 
      as={Animated.View} 
      isHome={isHome} 
      smalled={smalled} 
      style={{
        borderWidth,
        borderColor,
        backgroundColor,
        marginBottom
      }}
    >
      <StyledIcon name="search" isHome={isHome} isCatScreen={isCatScreen} />
      <StyledTextInput
        style={style}
        placeholder={'Buscar'}
        placeholderTextColor={isHome ? theme.darkerGrayColor : theme.darkgrayColor}
        value={value}
        onEndEditing={onEndEditing}
        onBlur={onBlur}
        onChangeText={onChangeText}
        isHome={isHome}
      />
    </StyledView>
  );
}

export default SearchInput;

import React from 'react';
import {default as ReactNativeModal} from 'react-native-modal';
import styled from 'styled-components/native';

const StyledModal = styled(ReactNativeModal)`
  width: 100%;
  margin: 0;
  position: absolute;
  bottom: 0;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  elevation: 5;
  shadow-color: ${({theme}) => theme.grayColor};
  shadow-offset: 1px 1px;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledModalHeader = styled.View`
  align-items: center;
  background-color: ${({theme}) => theme.grayColor};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: ${({theme}) => theme.blackColor};
  display: flex;
  flex-basis: 15%;
  flex-direction: row;
  max-height: 50px;
  padding: 4%;
`;

const StyledModalBody = styled.ScrollView`
  flex-basis: 85%;
  height: 100%;
  padding: 0 5%;
`;

const StyledText = styled.Text`
  font-family: 'Lato-Regular';
  font-size: 16px;
`;

const StyledSmallText = styled.Text`
  font-size: 12px;
  text-align: center;
`;

const StyledClose = styled.Text`
  font-size: 30px;
  font-family: 'Lato-Light';
  font-weight: 100;
  text-align: center;
`;

const StyledModalTitle = styled(StyledText)`
  flex: 9;
  text-transform: uppercase;
  text-align: center;
`;

const StyledSideButton = styled.TouchableOpacity`
  flex: 1;
`;

function Modal({
  children,
  style,
  isVisible = false,
  title = '',
  headerColor = '#000000',
  headerBackgroundColor = '#CCC',
  extraButtonContent,
  extraButtonBehavior = () => {},
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
  onClose = () => {},
}) {
  const headerStyleProps = {
    headerColor,
    headerBackgroundColor,
  };
  return (
    <StyledModal
      style={style}
      isVisible={isVisible}
      animationIn={animationIn}
      animationOut={animationOut}
      backdropOpacity={0}
      animationInTiming={600}
      animationOutTiming={1000}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <StyledModalHeader {...headerStyleProps}>
        <StyledSideButton onPress={() => extraButtonBehavior()}>
          <StyledSmallText>{extraButtonContent}</StyledSmallText>
        </StyledSideButton>
        <StyledModalTitle>{title}</StyledModalTitle>
        <StyledSideButton onPress={() => onClose()}>
          <StyledClose>&times;</StyledClose>
        </StyledSideButton>
      </StyledModalHeader>
      <StyledModalBody>{children}</StyledModalBody>
    </StyledModal>
  );
}

export default Modal;

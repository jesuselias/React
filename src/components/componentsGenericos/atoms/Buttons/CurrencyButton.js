import React from 'react';
import styled from 'styled-components';
import RoundedButton from './RoundedButton';
import {SmallText} from '../Texts/SizedText';

const SymbolText = styled(SmallText)`
  color: ${({theme,isCatScreen}) => isCatScreen ? theme.primaryColor : theme.whiteColor};
`;

const CurrencyRoundedButton = styled(RoundedButton)`
  background-color: ${({theme,isCatScreen}) => isCatScreen ? theme.whiteColor : theme.blackColor};
  height: ${({isCatScreen}) => isCatScreen ? '30px' : '40px'};
  width: ${({isCatScreen}) => isCatScreen ? '30px' : '40px'};
`;

function CurrencyButton({style, symbol, onPress = () => {}, isCatScreen = false}) {
  return (
    <CurrencyRoundedButton style={style} onPress={onPress} isCatScreen={isCatScreen}>
      <SymbolText
        isCatScreen={isCatScreen}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        allowFontScaling>
        {symbol}
      </SymbolText>
    </CurrencyRoundedButton>
  );
}

export default CurrencyButton;

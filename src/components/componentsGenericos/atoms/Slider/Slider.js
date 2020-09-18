import React, {useState, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import RNCommunitySlider from '@react-native-community/slider';
import Text from '../Texts/Text';

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5% 0;
`;

const Label = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeMD};
  font-family: ${({theme}) => theme.fontFamilyBold};
  text-align: left;
`;

const StyledSlider = styled(RNCommunitySlider)`
  width: 100%;
  height: 40px;
`;

const ValuesWraper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ValueText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizeMD};
`;

const CurrentValueText = styled(ValueText)`
  background-color: ${({theme}) => theme.primaryColor};
  border-radius: 5px;
  color: ${({theme}) => theme.whiteColor};
  padding: 1% 3%;
`;

function Slider({
  label = '',
  value = 0,
  minValue = 0,
  maxValue = 1,
  valueLabel,
  minValueLabel,
  maxValueLabel,
  onValueChange = () => {},
  onSlidingComplete = () => {},
}) {
  const theme = useContext(ThemeContext);
  return (
    <Wrapper>
      <Label>{label}</Label>
      <ValuesWraper>
        <ValueText />
        <CurrentValueText>{valueLabel || value}</CurrentValueText>
        <ValueText />
      </ValuesWraper>
      <StyledSlider
        value={value}
        step={10}
        minimumValue={minValue}
        maximumValue={maxValue}
        thumbTintColor={theme.primaryColor}
        minimumTrackTintColor={theme.primaryColor}
        maximumTrackTintColor={theme.darkgrayColor}
        onValueChange={(changedValue) => onValueChange(changedValue)}
        onSlidingComplete={onSlidingComplete}
      />
      <ValuesWraper>
        <ValueText>{minValueLabel || minValue}</ValueText>
        <ValueText>{maxValueLabel || maxValue}</ValueText>
      </ValuesWraper>
    </Wrapper>
  );
}

export default Slider;

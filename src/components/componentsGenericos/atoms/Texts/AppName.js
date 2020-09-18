import React from 'react';
import {LargeText} from './SizedText';
import styled from 'styled-components/native';
import {name as appName} from '../../../../../app.json';

const AppNameText = styled(LargeText)`
  font-family: ${({theme}) => theme.fontFamilyBold}
  color: ${({theme}) => theme.primaryColor};
`;

function AppName({style}) {
  return <AppNameText style={style}>{appName}</AppNameText>;
}

export default AppName;

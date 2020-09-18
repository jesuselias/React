import styled from 'styled-components/native';

const TextInput = styled.TextInput`
  border-radius: 10px;
  color: ${({theme}) => theme.darkgrayColor};
  font-family: ${({theme}) => theme.fontFamilyRegular};
  font-size: ${({theme}) => theme.fontSizeMD};
`;

export default TextInput;

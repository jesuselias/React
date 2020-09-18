import styled from 'styled-components/native';

const RoundedButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.blackColor};
  border-radius: 100px;
  height: 40px;
  width: 40px;
  justify-content: center;
`;

export default RoundedButton;

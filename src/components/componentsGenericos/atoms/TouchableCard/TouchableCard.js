import styled from 'styled-components/native';

const TouchableCard = styled.TouchableOpacity`
  background-color: white;
  border-radius: 10px;
  elevation: 3;
  shadow-color: ${({theme}) => theme.grayColor};
  shadow-offset: 1px 1px;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
`;

export default TouchableCard;

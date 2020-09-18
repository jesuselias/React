import styled from 'styled-components/native';
import {MediumText} from '../Texts/SizedText';

const ProductCardName = styled(MediumText)`
  font-family: ${({theme}) => theme.fontFamilyBold};
`;

export default ProductCardName;

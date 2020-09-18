import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import { Dimensions } from 'react-native';

function ProductCardLoader(props) {
  const screenW = props.isReview ? (Dimensions.get('window').width - (Dimensions.get('window').width * 0.10)) : null;

  return (
    <ContentLoader
      style={props.style}
      speed={2}
      width={props.isReview ? screenW : 220}
      height={props.isReview ? 155 : 330}
      viewBox={props.isReview ? `0 0 ${screenW} 155` : "0 0 220 330"}
      backgroundColor="#f0f0f0"
      foregroundColor="#dcdcdc"
      {...props}>
        {props.isReview && <Rect x="0" y="0" rx="5" ry="5" width={screenW} height="150" />}
        {!props.isReview && <Rect x="10" y="0" rx="2" ry="2" width="200" height="200" />}
        {!props.isReview && <Rect x="10" y="220" rx="2" ry="2" width="200" height="15" />}
        {!props.isReview && <Rect x="10" y="250" rx="2" ry="2" width="200" height="15" />}
        {!props.isReview && <Rect x="40" y="280" rx="2" ry="2" width="150" height="30" />}
        {!props.isReview && <Rect x="10" y="325" rx="2" ry="2" width="200" height="15" />}
    </ContentLoader>
  );
}

export default ProductCardLoader;

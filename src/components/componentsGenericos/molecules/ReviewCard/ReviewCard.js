import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {
  Text,
  Rating,
  ProductCardName,
  ProductCardBrand,
  ProductCardPrice,
  ProductCardShop,
} from '_atoms';

const Card = styled.View`
  background-color: ${({theme}) => theme.grayColor};
  border-radius: 10px;
  padding: 5%;
  ${({mTop}) => `margin-top: ${mTop}%;`}
  ${({mVer}) => `marginVertical: ${mVer}%;`}
`;

const ReviewHeadingView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5%;
`;

const ImageView = styled.View`
  align-items: flex-start;
  flex-basis: 60px;
`;

const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const NameAndRatingView = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const ReviewText = styled(Text)`
  text-align: left;
  color: ${({theme}) => theme.blackColor};
`;

const ReviewTextJustify = styled(ReviewText)`
  text-align: justify;
`;

function ReviewCard({style, name, author, rating, date, createdAt, comment, image, mTop = 0, mVer = 0}) {
  const imageSrc = {uri: image};
  return (
    <Card style={style} mTop={mTop} mVer={mVer}>
      <View>
        <ReviewHeadingView>
          {image && <ImageView>
            <UserImage source={imageSrc} height={50} width={50} />
          </ImageView>}
          <NameAndRatingView>
            <ReviewText>{name ? name : author ? author : ''}</ReviewText>
            <Rating disabled={true} rating={rating} />
          </NameAndRatingView>
          <ReviewText>{date ? date : createdAt ? createdAt : ''}</ReviewText>
        </ReviewHeadingView>
        <ReviewTextJustify>{comment}</ReviewTextJustify>
      </View>
    </Card>
  );
}

export default ReviewCard;

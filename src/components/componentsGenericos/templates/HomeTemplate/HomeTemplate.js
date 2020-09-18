import React, {useState, useCallback, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {AspectRatioImage} from '_atoms';
import {IconGridList} from '_organisms';
import {ItemView,ImageCarousel} from '_molecules';
import {ScrollView,Animated} from 'react-native';

const HomeView = styled.View`
  padding: 0 0 5%;
`;

const ContentView = styled.View`
  padding: 5%;
`;

function HomeTemplate({
  categories,
  featured,
  advertising,
  brands,
  navigation,
  onScrollBeginDrag = () => {},
  onPress = () => {},
}) {
  const [advs, setAdvs] = useState([0,1])

  const fadeOpacity = useRef(new Animated.Value(0)).current;

  const intervalRef = useRef();
  const shuffleCounter = useRef(0);

  useEffect(
    () => {
      const intrvl = setInterval(() => {
        shuffleAds();   
        animateImg(1, 500);
      }, 5000);
      intervalRef.current = intrvl;

      return () => {
        clearInterval(intervalRef.current);
      };
    },
    [advertising],
  );

  const data = [];
  const categorIcons = [ 
    { name: 'Medicamentos', icon: 'bag', stores: false },
    { name: 'Pecuaria', icon: 'watering', stores: false },
    { name: 'Agrícola', icon: 'tractor', stores: false },
    { name: 'Animales y Agroinmuebles', icon: 'bag', stores: false },
    { name: 'Servicios', icon: 'watering', stores: false },
    { name: 'Agrotiendas oficiales', icon: 'tractor', stores: true },
  ];
  if (categories) {
    categories.map((cat,i) => {
      data.push({
        id: cat.id,
        name: cat.name,
        icon: categorIcons[i].icon,
        stores: categorIcons[i].stores,
        static: false,
      });
    });
    data.push({
      id: 'agrotiendas-oficiales-id',
      name: 'Agrotiendas oficiales',
      icon: categorIcons[categorIcons.length - 1].icon,
      stores: categorIcons[categorIcons.length - 1].stores,
      static: false,
    });
  } 
  else {    
    categorIcons.map((cat,i) => {
      data.push({
        id: `${i}-${Math.random().toString(36).substring(2)}`,
        name: cat.name,
        icon: cat.icon,
        stores: cat.stores,
        static: true,
      });
    });
  }

  const renderProduct = ({item, style}) => {
    return (
      <ItemView 
        style={style}  
        key={`${item.id}`}   
        icon={item.icon}
        name={item.name}
        onPress={() => { item.static ? null :
          ( item.stores 
            ? navigation.navigate('ShopsList', {searchTerm: ''}) 
            : navigation.navigate('AllOfCategories', {id: item.id, name: item.name}) ) 
          }}
      />
    );
  };

  const animateImg = (to,dur) => {
    Animated.timing(fadeOpacity, {
      toValue: to,
      duration: dur,
      useNativeDriver: false
    }).start();
  };

  const renderAd = (num_) => {    
    const num = advertising && num_ === 1 && advertising.length < 2 ? 0 : num_;    
    if (
      advertising && 
      advertising.length > 0 && 
      num >= 0 &&
      advertising[num] && 
      advertising[num].picture
    ) {
      const imageSrc = {uri: advertising[num].picture};
      animateImg(0, 500);

      return <AspectRatioImage
                as={Animated.View}
                imageSrc={imageSrc}
                top={8}
                bottom={5}
                borderRadius={10}
                style={{opacity: fadeOpacity}}
             />;
    }
    return;
  };

  const renderProductsCarousel = () => {
    if (featured && featured.length > 0) {
      return (
        <ImageCarousel 
          images={featured} 
          type={'featured'}
          title={'Productos destacados'}
          navigation={navigation}
        ></ImageCarousel>
      );
    }
    return;
  };
  
  const renderBrandsCarousel = () => {
    if (brands && brands.length > 0) {
      return (
        <ImageCarousel 
          images={brands} 
          type={'brands'}
          title={'Marcas'}
          navigation={navigation}
        ></ImageCarousel>
      );
    }
    return;
  };

  const getRand = (advertising, val = null) => {
    if (advertising && advertising.length > 0) {
      let rand = Math.floor(Math.random() * advertising.length);
      if (val && rand === val) {
        const ops = (rand + 1) > (advertising.length - 1) ? ( (rand - 1) < 0 ? 0 : -1 ) : 1;
        rand += ops;
        return rand;
      }
      else return rand;
    }
    else return -1;
  };

  const setAds = useCallback(() => {      
      const ad1 = getRand(advertising);
      const ad2 = getRand(advertising, ad1);
      setAdvs([ad1,ad2]);
    }, [advertising, shuffleCounter.current],
  );

  const shuffleAds = useCallback(() => {
        if (advertising && advertising.length > 0) {
          shuffleCounter.current += 1;
          setAds();
        }
    }, [advertising],
  );

  return (
    <ScrollView
      scrollEventThrottle={4}
      onScroll={onScrollBeginDrag}
    >
      <HomeView>
      <IconGridList
        title={'Categorías'}
        renderComponent={renderProduct}
        data={data}
        dataKey="id"
      />
      <ContentView>  
        {renderAd(advs[0])}
      </ContentView>
      {/* PRODUCTS CAROUSEL */}
      {renderProductsCarousel()}
      <ContentView>  
        {renderAd(advs[1])}
      </ContentView>
      {/* BRANDS CAROUSEL */}
      {renderBrandsCarousel()}
    </HomeView>
    </ScrollView>
  );
}

export default HomeTemplate;

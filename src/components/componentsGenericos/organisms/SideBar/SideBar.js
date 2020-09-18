import React from 'react';
import styled from 'styled-components';
import {FlatList,TouchableOpacity} from 'react-native';
import { Text } from '_atoms';

const PADDING_LATERAL = '8%';

const StyledMenuView = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledMenuHeader = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 25% 0 15% 0;
  align-items: flex-start;
`;

const StyledUserView = styled.View`
    flex-basis: 66%;
    margin-left: 4%;
    padding: 5px ${PADDING_LATERAL} 0 0;
    flex-direction: column;
`;

const StyledMenuHeaderTextView = styled.View`
    flex-direction: column;
`;

const StyledMenuHeaderText = styled.Text`    
    font-family: ${({theme}) => theme.fontFamilyBold};
    font-size: ${({theme}) => theme.fontSizeLG};  
`;

const StyledEdit = styled(Text)`
    margin-top: 2px;
    text-align: left;
`;

const ImageView = styled.View`
    flex-basis: 30%;
    padding-left: ${PADDING_LATERAL};
    align-items: center;
`;

const IMAGE_HEIGHT = 70;
const IMAGE_WIDTH = 70;

const Image = styled.Image`
  height: ${IMAGE_HEIGHT}px;
  width: ${IMAGE_WIDTH}px;
  resizeMode: contain;
`;

const StyledMenuItem = styled.TouchableOpacity`
    padding: 2% ${PADDING_LATERAL} 7% ${PADDING_LATERAL};
`;

const StyledMenuItemText = styled.Text`
    font-family: ${({theme,isActive}) => isActive ? theme.fontFamilyBold : theme.fontFamilyRegular};
    color: ${({theme,isActive}) => isActive ? theme.primaryColor : theme.blackColor};
    font-size: ${({theme,isActive}) => isActive ? `${(+theme.fontSizeMD.replace('px',''))+2}px`: theme.fontSizeMD};
`;

const StyledLastUpdate = styled.View`
    flex-direction: column;
    paddingHorizontal: ${PADDING_LATERAL};
    padding-top: 5%;
    padding-bottom: 15%;
`;
const StyledLastUpdateLabel = styled(Text)`
    text-align: left;
`;
const StyledLastUpdateDate = styled(StyledLastUpdateLabel)`
    font-family: ${({theme}) => theme.fontFamilyBold};
`;

function SideBar(props) {    
    const active = props.state.routes[props.state.index].key;

    const userLogged = typeof props.isLogged === "string" ? null : props.isLogged;

    const routes = props && props.state ? props.state.routes : [];
    const menuItems = routes.reduce((routes_,route,inx,arr) => {
        if (
            props.descriptors[route.key].options && 
            props.descriptors[route.key].options.visible
        ) routes_.push(route);
        if (userLogged && inx === arr.length - 1) 
            routes_.push({key: "sing-out-item-00", name: "Cerrar sesión", params: undefined});
        return routes_;
    }, []);

    //? TO OPEN DRAWER CONDITIONALLY BY SCREEN
    // useEffect(() => {
    //     const unsubscribe = props.descriptors[active].navigation.addListener('drawerOpen', (e) => {
    //         if (!props.descriptors[active].options.isSwipeable) {
    //             props.descriptors[active].navigation.setOptions({ swipeEnabled: true });   
    //         }            
    //     });
      
    //     return unsubscribe;
    //   }, [props.descriptors[active].navigation]);

    // useEffect(() => {
    //     const unsubscribe = props.descriptors[active].navigation.addListener('drawerClose', (e) => {
    //         if (!props.descriptors[active].options.isSwipeable) {
    //             props.descriptors[active].navigation.setOptions({ swipeEnabled: false });
    //         }
    //     });
      
    //     return unsubscribe;
    //   }, [props.descriptors[active].navigation]);

    const renderItem = ({ item }) => {
        const opts = props.descriptors[item.key] ? props.descriptors[item.key].options : null;
        const itemName = (opts && opts.title)
            ? opts.title.toUpperCase()
            : item.name.toUpperCase();

        return (
            <StyledMenuItem 
                onPress={() => props.descriptors[item.key] 
                    ? props.navigation.navigate(item.name, { 
                        ...(item.params 
                            ? { 
                                ...(item.params.userId ? { userId: (userLogged ? userLogged.id : null) } : {}),
                                ...(item.params.userPicture ? { userPicture: (userLogged ? userLogged.picture : null) } : {}),
                              } 
                            : {}) 
                        }) 
                    : (
                        item.key === "sing-out-item-00" 
                        ? handleLogOut() 
                        : {}
                      )}>
                <StyledMenuItemText isActive={item.key === active}>
                    {itemName}
                </StyledMenuItemText>                
            </StyledMenuItem>
        );
    };

    const handleLogOut = () => {        
        props.userLogout();
        props.navigation.closeDrawer();
        props.navigation.navigate("Home", { reset: true });
    };

    const renderProfileIg = () => {
        const imageSrc = userLogged && userLogged.picture ? { uri: userLogged.picture } : require('./img/profileguest.png');

        return (
            <ImageView>              
                <Image
                    source={imageSrc} 
                    height={IMAGE_HEIGHT} 
                    width={IMAGE_WIDTH}
                />
            </ImageView>  
        );
    };

    const renderUserName = () => {
        const user = userLogged ? userLogged.name : 'Invitado';
        const name_ = user.trim().split(' ');
        const nameItem = name_.map((name,i) => {
            return <StyledMenuHeaderText 
                    key={`${i}-${name}`}
                    adjustsFontSizeToFit={true} 
                    numberOfLines={1} 
                    allowFontScaling
                   >{name}</StyledMenuHeaderText>;
        });
        return <StyledMenuHeaderTextView>{nameItem}</StyledMenuHeaderTextView>
    };

    return (
        <StyledMenuView>
            <StyledMenuHeader>
                {renderProfileIg()}
                <StyledUserView>
                    {renderUserName()}
                    {userLogged && (
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Register', { user: userLogged })}}>
                            <StyledEdit>Editar</StyledEdit>
                        </TouchableOpacity>
                    )}
                </StyledUserView>                
            </StyledMenuHeader>
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
            {userLogged && (
                <StyledLastUpdate>
                    <StyledLastUpdateLabel>Última actualización</StyledLastUpdateLabel>
                    <StyledLastUpdateDate>30 de Junio del 2020</StyledLastUpdateDate>
                </StyledLastUpdate>
            )}
        </StyledMenuView>
    );
}

export default SideBar;

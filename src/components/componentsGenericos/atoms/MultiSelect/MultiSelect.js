import React, {useState, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import SectionedMultiSelect from '_gitmodules/react-native-multi-level-select';
import Icon from '../Icon/Icon';
import Text from '../Texts/Text';

const StyledIcon = styled(Icon)`
  font-size: ${({theme}) => theme.fontSizeLG};
  color: ${({theme}) => theme.darkgrayColor};
`;

const SelectedIcon = styled(StyledIcon)`
  color: ${({theme}) => theme.primaryColor};
`;

const CancelText = styled(Text)`
  color: ${({theme}) => theme.whiteColor};
  font-size: ${({theme}) => theme.fontSizeMD};
`;

const Close = styled(Text)`
  color: ${({theme}) => theme.whiteColor};
  font-size: ${({theme}) => theme.fontSizeLG};
`;

function MultiSelect({
  items,
  selectedItems,
  idKey,
  subKey,
  label,
  selectChildren = false,
  single = false,
  multiLevel = false,
  onSelectedItemsChange = () => {},
}) {
  const theme = useContext(ThemeContext);
  //const [selectedItems, setSelectedItems] = useState([]);
  const fontFamilyRegular = {fontFamily: theme.fontFamilyRegular};
  const fontFamilyBold = {fontFamily: theme.fontFamilyBold};

  const colors = {
    primary: theme.primaryColor,
    success: theme.primaryColor,
    cancel: theme.darkgrayColor,
    text: theme.blackColor,
    subText: theme.blackColor,
    selectToggleTextColor: theme.blackColor,
    searchPlaceholderTextColor: theme.darkgrayColor,
    chipColor: theme.whiteColor,
    disabled: theme.darkgrayColor,
  };

  const handleSelectItems = (newSelectedItems) => {
    onSelectedItemsChange(newSelectedItems);
  };

  return (
    <SectionedMultiSelect
      multiLevel={multiLevel}
      items={items}
      selectedItems={selectedItems}
      onSelectedItemsChange={handleSelectItems}
      single={single}
      colors={colors}
      confirmText="Aceptar"
      uniqueKey={idKey}
      subKey={subKey}
      selectText={label}
      showDropDowns={true}
      showCancelButton={true}
      showRemoveAll={true}
      removeAllText="Eliminar todos"
      readOnlyHeadings={false}
      searchPlaceholderText={'Buscar'}
      selectedText="Seleccionados"
      selectChildren={selectChildren}
      selectedIconOnLeft={true}
      alwaysShowSelectText={true}
      modalWithSafeAreaView={true}
      noResultsComponent={<Text>Lo sentimos, no hay resultados</Text>}
      noItemsComponent={<Text>Lo sentimos, no hay elementos</Text>}
      cancelIconComponent={<CancelText>Cancelar</CancelText>}
      selectToggleIconComponent={<Text>Seleccionar</Text>}
      chipRemoveIconComponent={
        <Close>
          {'   '}&times;{'  '}
        </Close>
      }
      dropDownToggleIconUpComponent={<StyledIcon name="arrow-up" />}
      dropDownToggleIconDownComponent={<StyledIcon name="arrow-down" />}
      selectedIconComponent={<SelectedIcon name="check-mark" />}
      unselectedIconComponent={<StyledIcon name="square" />}
      searchIconComponent={<StyledIcon name="search" />}
      itemFontFamily={fontFamilyBold}
      subItemFontFamily={fontFamilyRegular}
      searchTextFontFamily={fontFamilyRegular}
      confirmFontFamily={fontFamilyRegular}
      styles={{
        button: {
          borderRadius: 10,
          flexBasis: '45%',
          fontSize: 30,
          height: 40,
          maxHeight: 50,
          marginTop: '5%',
          marginLeft: '5%',
          width: '100%',
        },
        cancelButton: {
          borderRadius: 10,
          flexBasis: '45%',
          fontSize: 30,
          height: 40,
          maxHeight: 50,
          marginTop: '5%',
          marginRight: '5%',
          width: '70%',
        },
        chipContainer: {
          backgroundColor: theme.primaryColor,
          flexDirection: 'row-reverse',
        },
        chipsWrapper: {
          marginBottom: '5%',
        },
        confirmText: {
          fontSize: 16,
        },
        container: {
          padding: '4%',
          borderRadius: 10,
        },
        itemText: {
          marginLeft: 5,
        },
        scrollView: {
          flexBasis: '75%',
        },
        searchBar: {
          backgroundColor: theme.grayColor,
          borderRadius: 10,
          fontSize: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 40,
          paddingHorizontal: '4%',
          marginBottom: '5%',
        },
        searchTextInput: {
          justifyContent: 'center',
          fontSize: 14,
          height: 30,
        },

        selectToggle: {
          marginVertical: '5%',
        },
        selectToggleText: {
          ...fontFamilyBold,
        },
        /*
        subItem: {
          paddingHorizontal: 20,
        },
        seletedSubItem: {
          paddingHorizontal: 20,
        },
          fontSize: 16,
          flexDirection: 'row-reverse',
          backgroundColor: theme.grayColor,
          marginLeft: '5%',
        },
        subItemText: {
          fontSize: 16,
          marginLeft: 5,
        },
        */
      }}
    />
  );
}

export default MultiSelect;

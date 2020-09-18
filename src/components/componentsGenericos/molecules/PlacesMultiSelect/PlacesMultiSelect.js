import React from 'react';
import {MultiSelect} from '_atoms';

const places = [
  {
    name: 'Lara',
    children: [
      {
        name: 'Barquisimeto',
      },
      {
        name: 'Cabudare',
      },
      {
        name: 'El Tocuyo',
      },
      {
        name: 'Carora',
      },
      {
        name: 'Quibor',
      },
    ],
  },
  {
    name: 'Yaracuy',
    children: [
      {
        name: 'San Felipe',
      },
      {
        name: 'Cocorote',
      },
      {
        name: 'Yaritagua',
      },
      {
        name: 'Chivacoa',
      },
    ],
  },
  {
    name: 'Zulia',
    children: [
      {
        name: 'Maracaibo',
      },
      {
        name: 'Ciudad Ojeda',
      },
      {
        name: 'Cabimas',
      },
    ],
  },
];

function PlacesMultiSelect({places, selectedPlaces, onSelectedPlacesChange}) {
  return (
    <MultiSelect
      items={places}
      selectedItems={selectedPlaces}
      idKey="id"
      subKey="children"
      label="Lugar"
      onSelectedItemsChange={onSelectedPlacesChange}
    />
  );
}

export default PlacesMultiSelect;

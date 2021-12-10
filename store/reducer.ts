import { ADD_PHOTO, UPDATE_PHOTO, StateAction } from './actions';
import { MainState } from './types';

const initialState: MainState = {
  photoData: [
    {
      id: 23,
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Equus_asinus_Kadzid%C5%82owo_001.jpg/640px-Equus_asinus_Kadzid%C5%82owo_001.jpg',
      labelText: 'Ослик',
      xPosition: 0,
      yPosition: 0,
    },
  ],
};

export const reducer = (state = initialState, action: StateAction): MainState => {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...state,
        photoData: [
          ...state.photoData,
          {
            id: Date.now(),
            uri: action.payload.uri,
            labelText: action.payload.labelText,
          },
        ],
      };
    case UPDATE_PHOTO:
      return {
        ...state,
        photoData: [
          ...state.photoData.map((photo) =>
            photo.id === action.payload.id
              ? { ...photo, labelText: action.payload.labelText }
              : { ...photo },
          ),
        ],
      };
    default:
      return state;
  }
};

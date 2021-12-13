import { ADD_PHOTO, UPDATE_PHOTO, StateAction } from './actions';
import { MainState } from './types';

const initialState: MainState = {
  photoData: [],
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
            xPosition: action.payload.xPosition,
            yPosition: action.payload.yPosition,
          },
        ],
      };
    case UPDATE_PHOTO:
      const updatedPhotoData = state.photoData.map((photo) =>
        photo.id === action.payload.id
          ? {
              ...photo,
              labelText: action.payload.labelText,
              xPosition: action.payload.xPosition,
              yPosition: action.payload.yPosition,
            }
          : { ...photo },
      );

      return {
        ...state,
        photoData: updatedPhotoData,
      };
    default:
      return state;
  }
};

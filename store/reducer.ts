import { ADD_PHOTO, UPDATE_PHOTO, StateAction } from './actions';
import { MainState } from './types';

const initialState: MainState = {
  photoData: [],
};

export const reducer = (state = initialState, action: StateAction): MainState => {
  switch (action.type) {
    case ADD_PHOTO: {
      const { uri, labelText, xPosition, yPosition } = action.payload;

      return {
        ...state,
        photoData: [
          ...state.photoData,
          {
            id: Date.now(),
            uri,
            labelText,
            xPosition,
            yPosition,
          },
        ],
      };
    }
    case UPDATE_PHOTO: {
      const { id, labelText, xPosition, yPosition } = action.payload;

      const updatedPhotoData = state.photoData.map((photo) =>
        photo.id === id
          ? {
              ...photo,
              labelText,
              xPosition,
              yPosition,
            }
          : photo
      );

      return {
        ...state,
        photoData: updatedPhotoData,
      };
    }
    default:
      return state;
  }
};

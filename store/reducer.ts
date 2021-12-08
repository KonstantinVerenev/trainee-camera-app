import { ADD_PHOTO, addPhotoAction } from './actions';
import { MainState } from './types';

const initialState: MainState = {
  photoData: [],
};

export const reducer = (state = initialState, action: addPhotoAction): MainState => {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...state,
        photoData: [
          ...state.photoData,
          {
            id: Date.now(),
            uri: action.payload,
          },
        ],
      };
    default:
      return state;
  }
};

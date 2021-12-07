import { MainState, addPhotoAction } from '../src/types/typesData';
import { ADD_PHOTO } from './actionCreators';

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

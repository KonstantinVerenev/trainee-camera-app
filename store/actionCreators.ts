import { addPhotoAction } from '../src/types/typesData';

export const ADD_PHOTO = 'ADD_PHOTO';

export const addPhotoActionCreator = (uri: string): addPhotoAction => {
  return { type: ADD_PHOTO, payload: uri };
};

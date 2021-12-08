export const ADD_PHOTO = 'ADD_PHOTO';

export type addPhotoAction = {
  type: typeof ADD_PHOTO;
  payload: string;
};

export const addPhoto = (uri: string): addPhotoAction => {
  return { type: ADD_PHOTO, payload: uri };
};

export const ADD_PHOTO = 'ADD_PHOTO';

type addPhotoAction = {
  type: typeof ADD_PHOTO;
  payload: string;
};

export type StateAction = addPhotoAction;

export const addPhoto = (uri: string): addPhotoAction => {
  return { type: ADD_PHOTO, payload: uri };
};

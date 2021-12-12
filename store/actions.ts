export const UPDATE_PHOTO = 'UPDATE_PHOTO';
export const ADD_PHOTO = 'ADD_PHOTO';

type updatePhotoAction = {
  type: typeof UPDATE_PHOTO;
  payload: photoPayload;
};

type addPhotoAction = {
  type: typeof ADD_PHOTO;
  payload: photoPayload;
};

type photoPayload = {
  id?: number;
  uri: string;
  labelText?: string;
  xPosition?: number;
  yPosition?: number;
};

export type StateAction = updatePhotoAction | addPhotoAction;

export const updatePhoto = (payload: photoPayload): updatePhotoAction => {
  return { type: UPDATE_PHOTO, payload };
};

export const addPhoto = (payload: photoPayload): addPhotoAction => {
  return { type: ADD_PHOTO, payload };
};

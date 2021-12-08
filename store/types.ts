import { reducer } from './reducer';

export type PhotoData = {
  id: number;
  uri: string;
  labelText?: string;
  coordinates?: {
    x: number;
    y: number;
  };
};

export type MainState = {
  photoData: Array<PhotoData>;
};

// type removePhotoAction = {
//   type: typeof REMOVE_PHOTO;
//   payload: string;
// };

// // to add another action types trough pipe
// export type ActionType = addPhotoAction | another action

// type for useTypedSelector custom hook
export type StateType = ReturnType<typeof reducer>;

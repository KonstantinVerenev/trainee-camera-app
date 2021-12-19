import { MainState, PhotoData } from './types';

export const selectPhotoData = (state: MainState): PhotoData[] => state.photoData;

export const selectPhotoDataById =
  (id: number | undefined) =>
  (state: MainState): PhotoData | undefined => {
    return state.photoData.find((photo) => photo.id === id);
  };

import { MainState, PhotoData } from './types';

export const selectPhotoData = (state: MainState): PhotoData[] => state.photoData;

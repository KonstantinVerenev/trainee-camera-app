export type PhotoData = {
  id: number;
  uri: string;
  labelText?: string;
  xPosition?: number;
  yPosition?: number;
};

export type MainState = {
  photoData: Array<PhotoData>;
};

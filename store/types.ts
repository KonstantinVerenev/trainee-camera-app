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

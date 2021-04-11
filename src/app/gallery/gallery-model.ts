export interface Picture {
  id?: number;
  userId: number;
  note: string;
  date: string;
  image?: Blob;
}
export interface PicturesResponse {
  pictures: Picture[];
  error: Error;
}
export interface PictureResponse {
  image: Blob;
  error: Error;
}

export interface MetamorphosisImage {
  date: string;
  image: Blob;
}

export interface MetamorphosisResponse {
  images: MetamorphosisImage[];
  error: Error;
}

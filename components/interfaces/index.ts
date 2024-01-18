export interface IPhotoItem {
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface IFullPhotoItem extends IPhotoItem {
  url: string;
}

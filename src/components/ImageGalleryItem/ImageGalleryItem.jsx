import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webImg, largeImg, tags }) => {
  return (
    <GalleryItem>
      <GalleryItemImage src="{webImg}" alt="{tags}" />
    </GalleryItem>
  );
};

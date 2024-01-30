import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { favoritesActions } from "../../store/reducers/favoriteReducer";
import React, { useCallback } from "react";
import AnimatedIconsComponent, { AnimatedIconsComponentPartitionalProps } from "./AnimatedIconsComponent";
import { IPhotoItem } from "../interfaces";

interface FavoritesComponentProps extends AnimatedIconsComponentPartitionalProps {
  item: IPhotoItem;
}

function FavoritesComponent({
  item,
  style,
  size,
  animated = true,
}: FavoritesComponentProps) {
  const { favorites } = useAppSelector((state) => state.favoriteReducer);

  const isFavorite = favorites.findIndex((el) => el.id === item.id) > -1;

  const dispatch = useAppDispatch();
  const handleIconPress = useCallback(() => {
    isFavorite
      ? dispatch(favoritesActions.removeFromFavorites(item.id))
      : dispatch(favoritesActions.addToFavorites(item));
  }, [isFavorite]);

  console.log(`render heart with id ${item.id}`)
  return (
    <AnimatedIconsComponent
      onPress={handleIconPress}
      name={isFavorite ? "heart" : "heart-outline"}
      style={style}
      size={size}
      animated={animated} />
  )
}

export default FavoritesComponent;
// export default React.memo(FavoritesComponent);

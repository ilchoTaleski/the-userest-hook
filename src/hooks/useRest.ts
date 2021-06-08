import { useRestDispatcher } from "./useRestDispatcher";
import { actions as songsActions } from "slices/songs";
import { actions as productsActions } from "slices/products";
import { SONGS_API_ROUTE } from "api/routes";
import { Song } from "models/song";
import { Product } from "models/product";

export const useRest = () => {
  const songsDispatcher = useRestDispatcher<Song>(
    songsActions,
    SONGS_API_ROUTE
  );

  const productsDispatcher = useRestDispatcher<Product>(
    productsActions,
    SONGS_API_ROUTE
  );

  return {
    songs: songsDispatcher.methods,
    products: productsDispatcher.methods,
  };
};

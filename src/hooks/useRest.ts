import { useRestDispatcher } from "./useRestDispatcher";
import { actions as songsActions } from "slices/songs";
import { SONG_API_ROUTE } from "api/routes";
import { Song } from "models/song";

export const useRest = () => {
  const songsDispatcher = useRestDispatcher<Song>(songsActions, SONG_API_ROUTE);

  return {
    songs: songsDispatcher.methods,
  };
};

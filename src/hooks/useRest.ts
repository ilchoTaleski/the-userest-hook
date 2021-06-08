import { useRestDispatcher } from "./useRestDispatcher";
import { actions as songsActions } from "slices/songs";
import { actions as playlistsActions } from "slices/playlists";
import { PLAYLISTS_API_ROUTE, SONGS_API_ROUTE } from "api/routes";
import { Song } from "models/song";
import { Playlist } from "models/playlist";

export const useRest = () => {
  const songsDispatcher = useRestDispatcher<Song>(
    songsActions,
    SONGS_API_ROUTE
  );

  const playlistsDispatcher = useRestDispatcher<Playlist>(
    playlistsActions,
    PLAYLISTS_API_ROUTE
  );

  return {
    songs: songsDispatcher.methods,
    playlists: playlistsDispatcher.methods,
  };
};

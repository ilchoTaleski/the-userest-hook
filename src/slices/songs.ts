import type { AppThunk } from "app/store";
import { Song } from "models/songs";
import axios from "utils/axios";
import { createGenericSlice, GenericState } from "./generic";

interface SongsState {}

const initialState = {
  data: [],
};

const slice = createGenericSlice({
  name: "songs",
  initialState: initialState as GenericState<Song[], SongsState>,
  reducers: {},
});

export const reducer = slice.reducer;

export const getNotifications = (): AppThunk => async (dispatch) => {
  const response = await axios.get<{ songs: Song[] }>("/api/songs");

  dispatch(slice.actions.success(response.data.songs));
};

export default slice;

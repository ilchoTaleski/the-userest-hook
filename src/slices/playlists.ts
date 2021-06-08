import { Playlist } from "models/playlist";
import { createCombinedGenericSlice } from "./combinedGeneric";

const slice = createCombinedGenericSlice<Playlist>("playlists");

export const actions = slice.actions;
export const reducers = slice.reducers;

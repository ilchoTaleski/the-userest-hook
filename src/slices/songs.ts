import { Song } from "models/song";
import { createCombinedGenericSlice } from "./combinedGeneric";

const slice = createCombinedGenericSlice<Song>("songs");

export const actions = slice.actions;
export const reducers = slice.reducers;

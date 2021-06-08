import { combineReducers } from "redux";
import { createGenericSlice, GenericState } from "./generic";

const initialStateAll = {
  data: [],
};

const initialStateSingle = {
  data: {},
};

export const createCombinedGenericSlice = <T = {}>(name: string) => {
  const allSlice = createGenericSlice({
    name: `${name}/all`,
    initialState: initialStateAll as GenericState<T[]>,
    reducers: {},
  });
  const singleSlice = createGenericSlice({
    name: `${name}/single`,
    initialState: initialStateSingle as GenericState<T>,
    reducers: {},
  });

  return {
    actions: {
      all: allSlice.actions,
      single: singleSlice.actions,
    },
    reducers: combineReducers({
      all: allSlice.reducer,
      single: singleSlice.reducer,
    }),
  };
};

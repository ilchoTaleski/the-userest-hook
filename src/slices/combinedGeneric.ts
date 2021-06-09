import { SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { AnyAction, combineReducers, Reducer } from "redux";
import { createGenericSlice, GenericState } from "./generic";

const initialStateAll = {
  data: [],
};

const initialStateSingle = {
  data: {},
};

export const createCombinedGenericSlice = <T = {}>(name: string) => {
  const allSlice = createGenericSlice<
    T[],
    SliceCaseReducers<GenericState<T[]>>
  >({
    name: `${name}/all`,
    initialState: initialStateAll as GenericState<T[]>,
    reducers: {},
  });
  const singleSlice = createGenericSlice<T, SliceCaseReducers<GenericState<T>>>(
    {
      name: `${name}/single`,
      initialState: initialStateSingle as GenericState<T>,
      reducers: {},
    }
  );

  return {
    actions: {
      all: allSlice.actions,
      single: singleSlice.actions,
    },
    reducers: combineReducers<{
      all: Reducer<GenericState<T[]>, AnyAction>;
      single: Reducer<GenericState<T>, AnyAction>;
    }>({
      all: allSlice.reducer,
      single: singleSlice.reducer,
    }),
  };
};

import {
  ActionCreatorWithOptionalPayload,
  ActionCreatorWithoutPayload,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";

export enum StateStatus {
  Loading,
  Error,
  Done,
}

export interface GenericState<T, U> {
  data?: T;
  metadata?: U;
  status?: StateStatus;
  errors?: any;
}

export const createGenericSlice = <
  T,
  U,
  Reducers extends SliceCaseReducers<GenericState<T, U>>
>({
  name = "",
  initialState,
  reducers,
}: {
  name: string;
  initialState: GenericState<T, U>;
  reducers: ValidateSliceCaseReducers<GenericState<T, U>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      loading(state) {
        state.status = StateStatus.Loading;
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<T, U>, action: PayloadAction<T>) {
        state.data = action.payload;
        state.status = StateStatus.Done;
      },
      error(state: GenericState<T, U>, action: PayloadAction<any>) {
        state.errors = action.payload;
        state.status = StateStatus.Error;
      },
      ...reducers,
    },
  });
};

export type GenericActions<T> = {
  loading?: ActionCreatorWithoutPayload<string>;
  success: ActionCreatorWithOptionalPayload<T, string>;
  error: ActionCreatorWithOptionalPayload<any, string>;
  reset: ActionCreatorWithoutPayload;
};

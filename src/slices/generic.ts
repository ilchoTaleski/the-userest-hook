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

export interface GenericState<T> {
  data?: T;
  status?: StateStatus;
  errors?: any;
}

export const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
  name = "",
  initialState,
  reducers,
}: {
  name: string;
  initialState: GenericState<T>;
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      loading() {
        return { ...initialState, status: StateStatus.Loading };
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<T>, action: PayloadAction<T>) {
        return {
          ...state,
          data: action.payload,
          status: StateStatus.Done,
        };
      },
      error(state: GenericState<T>, action: PayloadAction<any>) {
        return {
          ...state,
          errors: action.payload,
          status: StateStatus.Error,
        };
      },
      reset() {
        return { ...initialState };
      },
      ...reducers,
    },
  });
};

export type GenericActions<T> = {
  loading?: ActionCreatorWithoutPayload<string>;
  success: ActionCreatorWithOptionalPayload<T, string>;
  error: ActionCreatorWithOptionalPayload<any, string>;
  reset: ActionCreatorWithOptionalPayload<any, string>;
};

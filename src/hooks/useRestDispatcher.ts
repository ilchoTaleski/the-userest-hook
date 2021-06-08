import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { GenericActions } from "slices/generic";
import { useExecutor } from "./useExecutor";
import { ExecutorResponse, QueryParameters } from "models/rest-api";

export type ActionMutator<P extends {}> = (data: P) => P;
export type MutatorMethod = "get" | "post" | "patch";

interface Actions<P> {
  all: GenericActions<P[]>;
  single: GenericActions<P>;
}

export const useRestDispatcher = <P extends {}>(
  actions: Actions<P>,
  api: string
) => {
  const dispatch = useDispatch();
  const executor = useExecutor(api);

  const mutators = useRef<Record<MutatorMethod, ActionMutator<P | Partial<P>>>>(
    {
      get: null,
      post: null,
      patch: null,
    }
  );

  useEffect(() => {
    return () => {
      dispatch(actions.all.reset());
      dispatch(actions.single.reset());
    };
  }, [actions, dispatch]);

  const dispatchResponse = (
    response: ExecutorResponse,
    currentActions: GenericActions<P | P[]>,
    mutator?: ActionMutator<P | Partial<P>>
  ) => {
    if (response.success) {
      const data = mutator ? mutator(response.data) : response.data;
      dispatch(currentActions.success(data));
    } else {
      dispatch(currentActions.error(response.message));
    }
  };

  return {
    addMutator: (method: MutatorMethod, mutator: ActionMutator<P>) => {
      mutators.current[method] = mutator;
    },
    methods: {
      getMany: async (params?: QueryParameters) => {
        dispatch(actions.all.loading());
        const response = await executor.get(params);
        dispatchResponse(response, actions.all, mutators.current.get);
      },
      getOne: async (id: string, params?: QueryParameters) => {
        dispatch(actions.single.loading());
        const response = await executor.get(params, id);
        dispatchResponse(response, actions.single, mutators.current.get);
      },
      post: async (data: P) => {
        const _data = mutators.current.post
          ? mutators.current.post(data)
          : data;
        await executor.post<P>(_data as P);
      },
      delete: async (id: string, params?: QueryParameters) => {
        await executor.delete(id);
        const response = await executor.get(params);
        dispatchResponse(response, actions.all, mutators.current.get);
      },
      patch: async (data: Partial<P>, id: string) => {
        const _data = mutators.current.patch
          ? mutators.current.patch(data)
          : data;
        await executor.patch<Partial<P>>(_data, id);
      },
    },
  };
};

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { GenericActions } from "slices/generic";
import { useExecutor } from "./useExecutor";
import { QueryParameters } from "models/rest-api";

export type actionMutator<P extends {}> = (data: P) => P;

export const useRestDispatcher = <P extends {}>(
  actions: GenericActions<P>,
  api: string
) => {
  const dispatch = useDispatch();
  const executor = useExecutor();

  const mutatorGet = useRef<actionMutator<P>>();
  const paramsRef = useRef<QueryParameters>();

  useEffect(() => {
    return () => {
      dispatch(actions.reset());
    };
  }, [actions, dispatch]);

  return {
    get: (mutator?: actionMutator<P>) => (params?: QueryParameters) => {
      dispatch(actions.loading());
      mutatorGet.current = mutator;
      paramsRef.current = params;
      executor
        .get(api, params || paramsRef.current)
        .then((response) => {
          const data = mutator ? mutator(response.data) : response.data;
          dispatch(actions.success(data));
        })
        .catch((e: Error) => {
          dispatch(actions.error(e.message));
        });
    },
    post: (mutator?: actionMutator<P>) => (data: P) => {
      dispatch(actions.loading());
      executor
        .post<P>(api, data)
        .then((response) => {
          const data = mutator ? mutator(response.data) : response.data;
          dispatch(actions.success(data));
        })
        .catch((e: Error) => {
          dispatch(actions.error(e.message));
        });
    },
    delete:
      (mutator?: actionMutator<P>) =>
      (id: string, params?: QueryParameters) => {
        executor.delete(api, id).then(() => {
          executor
            .get(api, params)
            .then((response) => {
              const data = mutator ? mutator(response.data) : response.data;
              dispatch(actions.success(data));
            })
            .catch((e: Error) => {
              dispatch(actions.error(e.message));
            });
        });
      },
    patch: (mutator?: actionMutator<P>) => (data: P, id: string) => {
      dispatch(actions.loading());
      executor
        .patch<P>(api, data, id)
        .then((response) => {
          const data = mutator ? mutator(response.data) : response.data;
          dispatch(actions.success(data));
        })
        .catch((e: Error) => {
          dispatch(actions.error(e.message));
        });
    },
  };
};

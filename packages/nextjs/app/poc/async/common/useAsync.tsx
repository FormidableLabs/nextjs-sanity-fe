import { useEffect, useState } from "react";

export function useAsync<T>(fn: () => Promise<T>): T {
  const [state, setState] = useState(() => ({
    loading: false,
    error: null,
    result: null as T | null,
    promise: null as null | Promise<void>,
  }));
  useEffect(() => {
    setState((s) => ({
      ...s,
      loading: true,
      promise: fn()
        .then((result) => {
          setState((s) => ({
            ...s,
            loading: false,
            error: null,
            result,
          }));
        })
        .catch((err) => {
          setState((s) => ({
            ...s,
            loading: false,
            error: err,
            result: null,
          }));
        }),
    }));
  }, [fn]);

  // Suspense:
  if (state.loading) {
    throw state.promise;
  }
  // Error boundary:
  if (state.error) {
    throw state.error;
  }
  return state.result!;
}

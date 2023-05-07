"use client";
import { Suspense, useEffect, useState } from "react";
import { BigHugeDependency } from "../common/big-huge-dependency";
import { fetchSlowData } from "../common/fetchSlowData";
import { ClientComponent } from "../common/client-component";

export default function Page() {
  return (
    <section>
      <h1>
        Async Demo <code>use-client</code>
      </h1>
      <Suspense fallback={<DataSkeleton />}>
        <DataComponent />
      </Suspense>
      <BigHugeDependency data={["Big Huge Dependency"]} />
      <ClientComponent />
    </section>
  );
}

function DataSkeleton() {
  return <section>Loading...</section>;
}

function DataComponent() {
  const data = useAsync(fetchSlowData);
  return <main>{data}</main>;
}

function useAsync<T>(fn: () => Promise<T>): T {
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

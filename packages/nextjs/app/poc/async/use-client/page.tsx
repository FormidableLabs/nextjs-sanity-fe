"use client";
import { Suspense } from "react";
import { BigHugeDependency } from "../common/big-huge-dependency";
import { fetchSlowData } from "../common/fetchSlowData";
import { ClientComponent } from "../common/client-component";
import { useAsync } from "../common/useAsync";

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

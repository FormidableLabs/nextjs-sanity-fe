"use server";
import { Suspense, use, useMemo } from "react";
import { BigHugeDependency } from "../../common/big-huge-dependency";
import { DataComponent } from "../DataComponent";
import { ClientComponent } from "../../common/client-component";

export default async function Page() {
  return (
    <section>
      <h1>
        Async Demo: <code>React.use</code> with <code>use server</code>
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
  return <p>Loading...</p>;
}

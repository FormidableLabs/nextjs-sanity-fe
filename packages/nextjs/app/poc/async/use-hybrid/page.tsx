"use server";
import { Suspense } from "react";
import { ClientComponent } from "../common/client-component";
import { BigHugeDependency } from "../common/big-huge-dependency";
import { fetchSlowData } from "../common/fetchSlowData";

export default async function Page() {
  return (
    <section>
      <h1>
        Async Demo: hybrid <code>use-server</code> and <code>use-client</code>
      </h1>
      <Suspense fallback={<DataSkeleton />}>
        {/* @ts-expect-error Server Component */}
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

async function DataComponent() {
  const data = await fetchSlowData({});
  return <p>{data}</p>;
}

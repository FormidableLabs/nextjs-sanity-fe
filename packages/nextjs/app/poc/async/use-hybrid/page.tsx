"use server";
import { Suspense, useState } from "react";
import { ClientComponent } from "./client-component";

export default async function Page() {
  return (
    <section>
      <h1>
        Async Demo: <code>use-server</code>
      </h1>
      <Suspense fallback={<DataSkeleton />}>
        <DataComponent />
      </Suspense>
      <ClientComponent />
    </section>
  );
}

function DataSkeleton() {
  return <p>Loading...</p>;
}

async function DataComponent() {
  const data = await getData();
  return <p>{data}</p>;
}

async function getData() {
  await new Promise((r) => setTimeout(r, 3000));
  return "This data was loaded async.  Refresh the page to try again.";
}

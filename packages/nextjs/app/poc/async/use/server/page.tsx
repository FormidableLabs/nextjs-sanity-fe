"use server";
import { Suspense, use } from "react";

export default async function Page() {
  return (
    <section>
      <h1>
        Async Demo: <code>React.use</code> with <code>{"use server"}</code>
      </h1>
      <Suspense fallback={<DataSkeleton />}>
        <DataComponent />
      </Suspense>
    </section>
  );
}

function DataSkeleton() {
  return <p>Loading...</p>;
}

function DataComponent() {
  const data = use(getData());
  return <p>{data || "NO DATA"}</p>;
}

async function getData() {
  await new Promise((r) => setTimeout(r, 3000));
  return "This data was loaded async.  Refresh the page to try again.";
}

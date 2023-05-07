"use client";

import { useState } from "react";

export function ClientComponent() {
  const [text, setText] = useState("This is a client component!");

  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <pre>{text}</pre>
    </>
  );
}

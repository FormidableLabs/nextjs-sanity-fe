"use client";

import { useEffect, useState } from "react";

export function ClientComponent() {
  const [text, setText] = useState("This is a client component!");
  useEffect(() => {
    setText((t) => t + " (mounted)");
  }, []);

  return (
    <>
      <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} />
      <pre>{text}</pre>
    </>
  );
}

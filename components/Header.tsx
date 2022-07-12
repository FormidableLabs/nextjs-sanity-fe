import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="h-20 flex items-center bg-white px-6 border-b shadow">
      <h2 className="text-2xl font-bold">
        <Link href="/">
          <a>NextJs Ecom</a>
        </Link>
      </h2>
    </div>
  );
};

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useRouterQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const current = new URLSearchParams(query ?? "");

  const add = (key: string, value: string) => {
    current.append(key, value);
    router.replace(`${pathname}?${current.toString()}`);
  };

  const replace = (args: Record<string, string>) => {
    const currentQuery = Object.fromEntries(current);
    const updatedEntries = {
      ...currentQuery,
      ...args,
    };
    const newQuery = new URLSearchParams(updatedEntries).toString();

    router.replace(`${pathname}?${newQuery}`);
  };

  const clear = (key: string) => {
    current.delete(key);
    router.replace(`${pathname}?${current.toString()}`);
  };

  const remove = (key: string, value: string) => {
    current.delete(key, value);
    router.replace(`${pathname}?${current.toString()}`);
  };

  return { add, replace, clear, remove, query };
};

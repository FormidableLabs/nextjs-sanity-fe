import { useRouter } from "next/router";

export const useRouterQueryParams = () => {
  const router = useRouter();

  const add = (key: string, value: string) => {
    const query = { ...router.query };
    const currentValue = query[key];
    if (currentValue) {
      if (typeof currentValue === "string" || currentValue instanceof String) {
        // Single existing, create and append to array
        query[key] = [currentValue as string, value];
      } else {
        // Multiple options, append to array
        (query[key] as string[]).push(value);
      }
    } else {
      // No existing options, sdd single option
      query[key] = value;
    }
    router.replace({ query });
  };

  const replace = (args: Record<string, string>) => {
    const query = { ...router.query, ...args };
    router.replace({ query });
  };

  const clear = (key: string) => {
    const query = { ...router.query };
    delete query[key];
    router.replace({ query });
  };

  const remove = (key: string, value: string) => {
    const query = { ...router.query };
    const currentValue = query[key];
    if (currentValue) {
      if (typeof currentValue === "string" || currentValue instanceof String) {
        // Single option, remove group and option
        delete query[key];
      } else {
        // Multiple options, only remove option
        query[key] = (query[key] as string[]).filter((curr) => curr !== value);
      }
    }
    router.replace({ query });
  };

  return { add, replace, clear, remove, query: router.query };
};

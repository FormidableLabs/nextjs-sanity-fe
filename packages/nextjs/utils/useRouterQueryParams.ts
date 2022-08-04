import { useRouter } from "next/router";

export const useRouterQueryParams = () => {
  const router = useRouter();

  const add = (key: string, value: string) => {
    const currentValue = router.query[key];
    if (currentValue) {
      if (typeof currentValue === "string" || currentValue instanceof String) {
        // Single existing, create and append to array
        router.query[key] = [currentValue as string, value];
      } else {
        // Multiple options, append to array
        (router.query[key] as string[]).push(value);
      }
    } else {
      // No existing options, sdd single option
      router.query[key] = value;
    }
    router.replace({ query: router.query });
  };

  const replace = (key: string, value: string) => {
    router.query[key] = value;
    router.replace({ query: router.query });
  };

  const clear = (key: string) => {
    delete router.query[key];
    router.replace({ query: router.query });
  };

  const remove = (key: string, value: string) => {
    const currentValue = router.query[key];
    if (currentValue) {
      if (typeof currentValue === "string" || currentValue instanceof String) {
        // Single option, remove group and option
        delete router.query[key];
      } else {
        // Multiple options, only remove option
        router.query[key] = (router.query[key] as string[]).filter((curr) => curr !== value);
      }
    }
    router.replace({ query: router.query });
  };

  return { add, replace, clear, remove, query: router.query };
};

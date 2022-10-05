import { Sdk } from "utils/generated/graphql-mock-types";
import { mock } from "mocks/factory";

export const ProductsQueries: Pick<Sdk, "getProducts" | "getProductAndRecommendations"> = {
  async getProducts(variables, requestHeaders) {
    return {
      allProduct: [mock.product({}), mock.product({})],
    };
  },
  async getProductAndRecommendations(variables, requestHeaders) {
    console.log(variables.slug);
    return {
      allProduct: [mock.product({})],
      recommendations: [mock.product({})],
    };
  },
};

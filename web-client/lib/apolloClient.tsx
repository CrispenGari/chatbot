import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { __ssrMode__, uri } from "./constants";
import { createHttpLink } from "@apollo/client/link/http";

let client: ApolloClient<any>;

const createApolloClient = (): ApolloClient<any> => {
  return new ApolloClient({
    credentials: "include",
    ssrMode: __ssrMode__,
    link: createHttpLink({
      uri,
      credentials: "include",
    }),
    cache: new InMemoryCache(),
  });
};
export const initializeApollo = (initialState = null) => {
  const apolloClient = client ?? createApolloClient();
  if (initialState) {
    const cache = apolloClient.extract();
    apolloClient.cache.restore({
      ...cache,
      ...initialState,
    });
  }
  if (typeof window === "undefined") return apolloClient;
  if (!client) client = apolloClient;
  return apolloClient;
};

export const useApollo = (initialState) => {
  return useMemo(() => initializeApollo(initialState), [initialState]);
};

export const apolloClient = client ?? createApolloClient();

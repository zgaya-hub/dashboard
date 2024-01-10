import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const graphqlEndpoint = "http://127.0.0.1:8083/graphql";
type Headers = Record<string, string>;

let authenticationHeaders: Headers = {};

export function setAuthenticationHeaders(value: Headers) {
  authenticationHeaders = value;
}

export const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...authenticationHeaders,
    },
  };
});

export const httpLink = createHttpLink({
  uri: graphqlEndpoint,
});

export const queryClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

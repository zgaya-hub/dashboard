import { GraphQLClient } from "graphql-request";

const graphqlEndpoint = "http://127.0.0.1:8080/graphql";

type Headers = Record<string, string>;
let authenticationHeaders: Headers = {};

export function setAuthenticationHeaders(value: Headers) {
  authenticationHeaders = value;
}

export const gqlRequest = async <Data,>(
  query: string,
  variables: Record<string, unknown>,
  customHeaders?: Headers // Optional parameter for custom headers
): Promise<Data> => {
  const client = new GraphQLClient(graphqlEndpoint, {
    headers: {
      ...authenticationHeaders,
      ...customHeaders,
    },
  });

  const data: Data = await client.request(query, variables);
  return data;
};

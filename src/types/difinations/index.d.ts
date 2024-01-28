type ServerErrorResponse = {
  name: string;
  graphQLErrors: [{ message: string }];
  protocolErrors: string[];
  clientErrors: string[];
  networkError: null | unknown;
  message: string;
};

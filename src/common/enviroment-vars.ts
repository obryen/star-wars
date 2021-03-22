export const swapi = {
  main: 'https://swapi.dev/api',
};

/* Caching works fastest with a local redis instance rather than a cloud/remote one
   In the case of a code sandbox, I have to use a remote set up as the sandbox does not avail one locally*/
export const redisConfigs = {
  // host: '127.0.0.1',  --local
  host: '3.139.2.178',
  port: '6379',
};

export const jwtCredentials = {
  hashingSecret: 'ABCDEIEF',
  jwtTtl: '100000',
};

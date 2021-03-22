export const swapi = {
  main: 'https://swapi.dev/api',
};

export const redisConfigs = {
  // Caching works fastest with a local redis instance rather than a cloud/remote one
  // host: '127.0.0.1',  --local
  host: '3.139.2.178',
  port: '6379',
};

export const jwtCredentials = {
  hashingSecret: 'ABCDEIEF',
  jwtTtl: '100000',
};

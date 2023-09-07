export const env = {
  application: {
    port: Number(process.env.PORT),
    environment: <string>process.env.ENVIRONMENT,
  },
};

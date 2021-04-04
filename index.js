const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "cats",
      url: "https://cats-federation.herokuapp.com"
    },
    {
      name: "dogs",
      url: "https://dogs-federation.herokuapp.com/"
    }
  ],
  debug: true
});

const PORT = process.env.PORT || 4000;

const start = async () => {
  const server = new ApolloServer({
    gateway,
    subscriptions: false
  });
  server.listen({ port: PORT }).then(({ port }) => {
    console.log(`🐩 Pet Gateway available at ${port}`);
  });
};

start();

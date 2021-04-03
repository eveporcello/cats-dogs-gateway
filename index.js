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
  ]
});

const PORT = process.env.PORT || 4000;

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ schema, executor });

  server.listen({ port: PORT }).then(({ port }) => {
    console.log(`🐩 Pet Gateway available at ${port}`);
  });
})();

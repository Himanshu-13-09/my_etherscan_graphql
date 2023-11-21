const { ApolloServer } = require("apollo-server"); //imports ApolloServer
const { importSchema } = require("graphql-import"); //imports schema.graphql file
const EtherDataSource = require("./datasource/ethDatasource");//imports EtherDataSource

const typeDefs = importSchema("./schema.graphql"); //imports schema.graphql file

require("dotenv").config(); //imports.env file
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => //imports EtherDataSource
      dataSources.ethDataSource.etherBalanceByAddress(), 

    totalSupplyOfEther: (root, _args, { dataSources }) => //imports EtherDataSource
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => //imports EtherDataSource
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => //imports EtherDataSource
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({ //creates ApolloServer
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), //creates EtherDataSource
  }), 
});

server.timeout = 0; 
server.listen("9000").then(({ url }) => { //starts ApolloServer
  console.log(`🚀 Server ready at ${url}`); 
});
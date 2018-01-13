//const { buildSchema } = require('graphql');
//const { makeExecutableSchema } = require('graphql-tools');


// Construct a schema, using GraphQL schema language
const schema = `
  scalar JSON
  scalar GraphQLDate

  type Work {
    id: Float!
    title: String!    
    createdOn: JSON
    serial: String!
    workImgUrl: String!
    isVisible: Boolean!
    showInFrontPage: Boolean!  
    workDesc: JSON!
    downloadInstruction: JSON!
  }

  type WorksConnection {
    remainingCoutForNext11Pages: Int!
    works: [Work!]
  }

  type Query {
    getWorks(
      keyWords: String, 
      sortBy: String,
      isDesc: Boolean,
      isVisible: Boolean, 
      showInFrontPage: Boolean, 
      page: Int, pageSize: Int
    ): WorksConnection    
  }  
`;  

module.exports = schema;
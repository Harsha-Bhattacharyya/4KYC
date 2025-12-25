import { createYoga, createSchema } from 'graphql-yoga'
import { verifyAgeWithUIDAI } from '@/lib/uidai-kyc'

const typeDefs = `
  type Query {
    status: String!
  }

  type Mutation {
    verifyAge(aadhaar: String!): VerificationResult!
  }

  type VerificationResult {
    success: Boolean!
    isAdult: Boolean
    message: String
  }
`

const resolvers = {
  Query: {
    status: () => '4KYC GraphQL API is running'
  },
  Mutation: {
    verifyAge: async (_: any, { aadhaar }: { aadhaar: string }) => {
      return await verifyAgeWithUIDAI(aadhaar)
    }
  }
}

const schema = createSchema({
  typeDefs,
  resolvers
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
})

export { yoga as GET, yoga as POST }

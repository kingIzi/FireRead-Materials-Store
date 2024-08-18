import { gql } from "apollo-server-express";

export const authorsSchema = gql`
  input AddNewAuthorForm {
    fullName: String!
    phoneNumber: String!
    email: String
    address: String
    dateOfBirth: String
    genres: [String!]!
  }

  input EditAuthorForm {
    fullName: String
    phoneNumber: String
    email: String
    address: String
    dateOfBirth: String
    genres: [String!]
    status: Boolean
  }

  type AuthorProfile {
    id: ID!
    fullName: String!
    phoneNumber: String!
    email: String
    address: String
    dateOfBirth: DateTime
    genres: [String!]!
    status: Boolean!
    dateCreated: String!
    dateModified: String!
  }
`;

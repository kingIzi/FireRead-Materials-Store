import { gql } from "apollo-server-express";

export const usersSchema = gql`
  input AddNewUserProfileForm {
    fullName: String!
    phoneNumber: String
    email: String!
    password: String!
    userType: String!
  }

  input EditUserProfileForm {
    fullName: String
    phoneNumber: String
    userType: String
    status: Boolean
  }

  type UserProfile {
    id: ID!
    fullName: String!
    phoneNumber: String
    email: String!
    userType: String!
    localId: String!
    status: Boolean!
    dateCreated: String!
    dateModified: String!
  }
`;

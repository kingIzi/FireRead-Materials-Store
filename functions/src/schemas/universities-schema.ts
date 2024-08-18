import { gql } from "apollo-server-express";

export const universitiesShema = gql`
  input AddNewUniversityForm {
    universityName: String!
    universityAddress: String!
    founded: String!
    acronym: String!
    phoneNumber: String!
    email: String
    faculties: [String]!
  }
  input EditUniversityForm {
    universityName: String
    universityAddress: String
    founded: String
    acronym: String
    email: String
    phoneNumber: String
    faculties: [String]
    status: Boolean
  }
  type UniversityProfile {
    id: ID!
    universityName: String!
    universityAddress: String!
    founded: String!
    acronym: String!
    phoneNumber: String!
    email: String
    faculties: [String]!
    status: Boolean!
    dateCreated: String!
    dateModified: String!
  }
`;

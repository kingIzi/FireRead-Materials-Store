import { gql } from "apollo-server-express";

export const materialsSchema = gql`
  input AddMaterialInput {
    materialName: String!
    materialAuthors: [String!]!
    summary: String!
    posters: [AddFileInput]!
    docs: [AddFileInput]!
  }

  input EditMaterialInput {
    materialName: String
    materialAuthors: [String]
    summary: String
    posters: [AddFileInput]
    docs: [AddFileInput]
  }

  type MaterialProfile {
    id: ID!
    materialName: String!
    materialAuthors: [String]!
    summary: String!
    posters: [UplodedFile]!
    docs: [UplodedFile!]!
  }
`;

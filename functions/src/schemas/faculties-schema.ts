import { gql } from "apollo-server-express";

export const facultiesSchema = gql`
  input AddFacultyForm {
    facultyName: String!
    description: String!
    courses: [String]!
    headLecturer: String!
    category: String!
  }
  input EditFacultyForm {
    facultyName: String
    description: String
    courses: [String]
    headLecturer: String
    category: String
    status: Boolean
  }
  type FacultyProfile {
    id: ID!
    facultyName: String!
    description: String!
    courses: [String]!
    headLecturer: String!
    category: String!
    status: Boolean!
    dateCreated: String!
    dateModified: String!
  }
`;

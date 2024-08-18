import { gql } from "apollo-server-express";

export const coursesSchema = gql`
  input AddCourseForm {
    courseName: String!
    description: String!
    level: String!
    lecturers: [String!]!
    materials: [String!]!
  }
  input EditCourseForm {
    courseName: String
    description: String
    level: String
    lecturers: [String]
    materials: [String]
  }
  type CourseProfile {
    id: ID!
    courseName: String!
    description: String!
    level: String!
    lecturers: [String!]!
    materials: [String!]!
    status: Boolean!
    dateCreated: String!
    dateModified: String!
  }
`;

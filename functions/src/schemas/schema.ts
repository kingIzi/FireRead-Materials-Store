import { gql } from "apollo-server-express";
import { usersSchema } from "./users-schema";
import { authorsSchema } from "./authors-schema";
import { universitiesShema } from "./universities-schema";
import { facultiesSchema } from "./faculties-schema";
import { materialsSchema } from "./materials-schema";

export const typeDefs = gql`
  scalar DateTime
  scalar JSON
  input AddFileInput {
    fileName: String!
    mimeType: String!
    file: String!
  }

  type UplodedFile {
    mediaLink: String!
    selfLink: String!
    name: String!
    downloadUrl: String!
    status: String!
  }

  ${usersSchema}
  ${authorsSchema}
  ${universitiesShema}
  ${facultiesSchema}
  ${materialsSchema}

  input FindWhere {
    key: String!
    operation: String!
    value: JSON!
  }

  type Query {
    findUserProfile(userId: ID!): UserProfile!
    getMatchingUsers(
      cursor: String!
      batchSize: Int!
      matcher: FindWhere!
    ): [UserProfile]!
    findAllUserProfiles(cursor: String!, batchSize: Int!): [UserProfile]!

    findAuthorProfileById(authorId: ID!): AuthorProfile!
    findMatchingAuthors(
      cursor: ID!
      batchSize: Int!
      matcher: FindWhere!
    ): [AuthorProfile]!
    findAllAuthorProfiles(cursor: ID!, batchSize: Int!): [AuthorProfile]!

    findUniversityById(universityId: ID!): UniversityProfile!
    getMatchingUniversities(
      cursor: String!
      batchSize: Int!
      matcher: FindWhere!
    ): [UniversityProfile]!
    findAllUniversities(cursor: String!, batchSize: Int!): [UniversityProfile]!

    findFacultyById(facultyId: ID!): FacultyProfile!
    getMatchingFaculties(
      cursor: String!
      batchSize: Int!
      matcher: FindWhere!
    ): [FacultyProfile]!
    findAllFaculties(cursor: String!, batchSize: Int!): [FacultyProfile]!

    findMaterialById(materialId: ID!): MaterialProfile
    findMatchingMaterials(
      cursor: String!
      batchSize: Int!
      matcher: FindWhere!
    ): [MaterialProfile]!
    findAllMaterials(cursor: String!, batchSize: Int!): [MaterialProfile]!
  }
  type Mutation {
    addNewUserProfile(user: AddNewUserProfileForm!): UserProfile!
    editUserProfile(user: EditUserProfileForm!, userId: ID!): UserProfile!

    addNewAuthor(author: AddNewAuthorForm!): AuthorProfile!
    editAuthorProfile(author: EditAuthorForm!, authorId: ID!): AuthorProfile!

    addNewUniversity(university: AddNewUniversityForm!): UniversityProfile!
    editUniversity(
      university: EditUniversityForm!
      universityId: ID!
    ): UniversityProfile!

    addNewFaculty(faculty: AddFacultyForm!): FacultyProfile!
    editFaculty(faculty: EditFacultyForm!, facultyId: ID!): FacultyProfile!

    addMaterial(material: AddMaterialInput!): MaterialProfile!
    editMaterial(
      materialId: ID!
      material: EditMaterialInput!
    ): MaterialProfile!
  }
`;

import { FindWhere } from "../../services/base-service";

export interface AddNewAuthorForm {
  fullName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  dateOfBirth?: string;
  genres: string[];
}

export interface EditAuthorForm {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  dateOfBirth?: string;
  genres?: string[];
  dateModified: string;
  status?: boolean;
}

export interface FindAllAuthorProfilesArgs {
  cursor: string;
  batchSize: number;
}

export interface FindMatchingAuthorsArgs extends FindAllAuthorProfilesArgs {
  matcher: FindWhere;
}

export interface FindAuthorProfileByIdArgs {
  authorId: string;
}

export interface AddNewAuthorArgs {
  author: AddNewAuthorForm;
}

export interface EditAuthorProfileArgs extends FindAuthorProfileByIdArgs {
  author: EditAuthorForm;
}

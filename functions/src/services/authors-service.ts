import {
  AddNewAuthorForm,
  EditAuthorForm,
} from "../entities/forms/authors-forms";
import { AuthorProfile } from "../entities/profiles";
import { BaseService } from "./base-service";

export class AuthorsService extends BaseService<
  AuthorProfile | AddNewAuthorForm | EditAuthorForm
> {
  constructor() {
    super("authors");
  }
}

export const getAuthorsService = () => {
  return new AuthorsService();
};

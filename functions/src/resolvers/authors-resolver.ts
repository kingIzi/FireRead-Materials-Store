import { AuthorsService, getAuthorsService } from "../services/authors-service";
import {
  FindMatchingAuthorsArgs,
  FindAllAuthorProfilesArgs,
  FindAuthorProfileByIdArgs,
  AddNewAuthorArgs,
  EditAuthorProfileArgs,
} from "../entities/forms/authors-forms";

export class AuthorsResolver {
  constructor(private authorsService: AuthorsService = getAuthorsService()) {}
  //Queries
  private async findAuthorProfileById(
    parent: any,
    args: FindAuthorProfileByIdArgs,
    context: any,
    info: any
  ) {
    return await this.authorsService.find(args.authorId);
  }
  private async findMatchingAuthors(
    parent: any,
    args: FindMatchingAuthorsArgs,
    context: any,
    info: any
  ) {
    return await this.authorsService.getMatchingDocuments(
      args.cursor,
      args.batchSize,
      args.matcher
    );
  }
  private async findAllAuthorProfiles(
    parent: any,
    args: FindAllAuthorProfilesArgs,
    context: any,
    info: any
  ) {
    return await this.authorsService.getAllDocuments(
      args.cursor,
      args.batchSize
    );
  }
  //Mutations
  private async addNewAuthor(
    parent: any,
    args: AddNewAuthorArgs,
    context: any,
    info: any
  ) {
    return await this.authorsService.insert(args.author);
  }
  private async editAuthorProfile(
    parent: any,
    args: EditAuthorProfileArgs,
    context: any,
    info: any
  ) {
    return await this.authorsService.update(args.author, args.authorId);
  }
  //Bindings
  getQueries() {
    let queries = {
      findAuthorProfileById: this.findAuthorProfileById.bind(this),
      findMatchingAuthors: this.findMatchingAuthors.bind(this),
      findAllAuthorProfiles: this.findAllAuthorProfiles.bind(this),
    };
    return queries;
  }
  getMutations() {
    let mutations = {
      addNewAuthor: this.addNewAuthor.bind(this),
      editAuthorProfile: this.editAuthorProfile.bind(this),
    };
    return mutations;
  }
}

export const getAuthorsResolvers = () => {
  return new AuthorsResolver();
};

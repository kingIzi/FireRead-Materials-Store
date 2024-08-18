import {
  AddNewUserProfileArgs,
  EditUserProfileArgs,
  FindAllUserProfilesArgs,
  FindUserProfileArgs,
  GetMatchingUsersArgs,
} from "../entities/forms/users-forms";
import { AuthServiceImpl, getAuthService } from "../services/auth-service";

export class UsersResolver {
  constructor(private authService: AuthServiceImpl = getAuthService()) {}
  //Queries
  private async findUserProfile(
    parent: any,
    args: FindUserProfileArgs,
    context: any,
    info: any
  ) {
    return await this.authService.find(args.userId);
  }
  private async getMatchingUsers(
    parent: any,
    args: GetMatchingUsersArgs,
    context: any,
    info: any
  ) {
    return await this.authService.getMatchingDocuments(
      args.cursor,
      args.batchSize,
      args.matcher
    );
  }
  private async findAllUserProfiles(
    parent: any,
    args: FindAllUserProfilesArgs,
    context: any,
    info: any
  ) {
    return await this.authService.getAllDocuments(args.cursor, args.batchSize);
  }
  //Mutations
  private async addNewUserProfile(
    parent: any,
    args: AddNewUserProfileArgs,
    context: any,
    info: any
  ) {
    return await this.authService.insert(args.user);
  }
  private async editUserProfile(
    parent: any,
    args: EditUserProfileArgs,
    context: any,
    info: any
  ) {
    return this.authService.update(args.user, args.userId);
  }
  //Bindings
  getQueries() {
    let queries = {
      findUserProfile: this.findUserProfile.bind(this),
      getMatchingUsers: this.getMatchingUsers.bind(this),
      findAllUserProfiles: this.findAllUserProfiles.bind(this),
    };
    return queries;
  }
  getMutations() {
    let mutations = {
      addNewUserProfile: this.addNewUserProfile.bind(this),
      editUserProfile: this.editUserProfile.bind(this),
    };
    return mutations;
  }
}

export const getAuthResolvers = () => {
  return new UsersResolver();
};

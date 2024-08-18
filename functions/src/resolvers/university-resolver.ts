import {
  AddNewUniversityArgs,
  EditUniversityArgs,
  FindActiveUniversitiesArgs,
  FindUniversityByIdArgs,
  GetMatchingUniversitiesArgs,
} from "../entities/forms/universities-forms";
import {
  getUniversityService,
  UniversityService,
} from "../services/university-service";

export class UniversityResolver {
  constructor(
    private universityService: UniversityService = getUniversityService()
  ) {}
  //Queries
  private async findUniversityById(
    parent: any,
    args: FindUniversityByIdArgs,
    context: any,
    info: any
  ) {
    return await this.universityService.find(args.universityId);
  }
  private async getMatchingUniversities(
    parent: any,
    args: GetMatchingUniversitiesArgs,
    context: any,
    info: any
  ) {
    return await this.universityService.getMatchingDocuments(
      args.cursor,
      args.batchSize,
      args.matcher
    );
  }
  private async findAllUniversities(
    parent: any,
    args: FindActiveUniversitiesArgs,
    context: any,
    info: any
  ) {
    return await this.universityService.getAllDocuments(
      args.cursor,
      args.batchSize
    );
  }
  //Mutations
  private async addNewUniversity(
    parent: any,
    args: AddNewUniversityArgs,
    context: any,
    info: any
  ) {
    args.university;
    return await this.universityService.insert(args.university);
  }
  private async editUniversity(
    parent: any,
    args: EditUniversityArgs,
    context: any,
    info: any
  ) {
    return await this.universityService.update(
      args.university,
      args.universityId
    );
  }
  //resolvers
  getQueries() {
    return {
      findUniversityById: this.findUniversityById.bind(this),
      getMatchingUniversities: this.getMatchingUniversities.bind(this),
      findAllUniversities: this.findAllUniversities.bind(this),
    };
  }
  getMutations() {
    return {
      addNewUniversity: this.addNewUniversity.bind(this),
      editUniversity: this.editUniversity.bind(this),
    };
  }
}

export const getUniversityResolver = () => {
  return new UniversityResolver();
};

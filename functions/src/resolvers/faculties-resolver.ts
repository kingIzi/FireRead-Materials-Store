import { ValidationError } from "apollo-server-express";
import {
  FacultiesService,
  getFacultiesService,
} from "../services/faculties-service";
import {
  AddNewFacultyArg,
  EditFacultyArgs,
  FindAllFacultiesArgs,
  FindFacultyByIdArgs,
  GetMatchingFacultiesArgs,
} from "../entities/forms/faculties-form";

export class FacultiesResolver {
  constructor(
    private facultiesService: FacultiesService = getFacultiesService()
  ) {}
  //Queries
  private async findFacultyById(
    parent: any,
    args: FindFacultyByIdArgs,
    context: any,
    info: any
  ) {
    try {
      return await this.facultiesService.find(args.facultyId);
    } catch (err) {
      return new ValidationError("Something went wrong");
    }
  }
  private async getMatchingFaculties(
    parent: any,
    args: GetMatchingFacultiesArgs,
    context: any,
    info: any
  ) {
    try {
      return await this.facultiesService.getMatchingDocuments(
        args.cursor,
        args.batchSize,
        args.matcher
      );
    } catch (error) {
      return new ValidationError("Something went wrong");
    }
  }
  private async findAllFaculties(
    parent: any,
    args: FindAllFacultiesArgs,
    context: any,
    info: any
  ) {
    try {
      return await this.facultiesService.getAllDocuments(
        args.cursor,
        args.batchSize
      );
    } catch (error) {
      return new ValidationError("Something went wrong");
    }
  }
  //Mutations
  private async addNewFaculty(
    parent: any,
    args: AddNewFacultyArg,
    context: any,
    info: any
  ) {
    try {
      return await this.facultiesService.insert(args.faculty);
    } catch (error) {
      return new ValidationError("Something went wrong");
    }
  }
  private async editFaculty(
    parent: any,
    args: EditFacultyArgs,
    context: any,
    info: any
  ) {
    try {
      return await this.facultiesService.update(args.faculty, args.facultyId);
    } catch (error) {
      return new ValidationError("Something went wrong");
    }
  }
  //resolvers
  getQueries() {
    return {
      findFacultyById: this.findFacultyById.bind(this),
      getMatchingFaculties: this.getMatchingFaculties.bind(this),
      findAllFaculties: this.findAllFaculties.bind(this),
    };
  }
  getMutations() {
    return {
      addNewFaculty: this.addNewFaculty.bind(this),
      editFaculty: this.editFaculty.bind(this),
    };
  }
}

export const getFacultiesResolver = () => {
  return new FacultiesResolver();
};

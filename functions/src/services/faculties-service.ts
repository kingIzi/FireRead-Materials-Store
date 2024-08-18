import {
  AddFacultyForm,
  EditFacultyForm,
} from "../entities/forms/faculties-form";
import { FacultyProfile } from "../entities/profiles";
import { BaseService } from "./base-service";

export class FacultiesService extends BaseService<
  FacultyProfile | AddFacultyForm | EditFacultyForm
> {
  constructor() {
    super("faculties");
  }
}

export const getFacultiesService = () => {
  return new FacultiesService();
};

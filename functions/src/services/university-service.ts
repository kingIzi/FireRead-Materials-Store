import {
  AddNewUniversityForm,
  EditUniversityForm,
} from "../entities/forms/universities-forms";
import { UniversityProfile } from "../entities/profiles";
import { BaseService } from "./base-service";

export class UniversityService extends BaseService<
  UniversityProfile | AddNewUniversityForm | EditUniversityForm
> {
  constructor() {
    super("universities");
  }
}

export const getUniversityService = () => {
  return new UniversityService();
};

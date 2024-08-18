import { FindWhere } from "../../services/base-service";
import { FindAllAuthorProfilesArgs } from "./authors-forms";

export interface AddNewUniversityForm {
  universityName: string;
  universityAddress: string;
  founded: string;
  acronym: string;
  phoneNumber: string;
  email?: string;
  faculties: string[];
}

export interface EditUniversityForm {
  universityName?: string;
  universityAddress?: string;
  founded?: string;
  acronym?: string;
  email?: string;
  phoneNumber?: string;
  faculties?: string[];
  status?: boolean;
  dateModified: string;
}
//FindAllAuthorProfilesArgs
export interface FindUniversityByIdArgs {
  universityId: string;
}

export interface FindActiveUniversitiesArgs extends FindAllAuthorProfilesArgs {}

export interface GetMatchingUniversitiesArgs extends FindAllAuthorProfilesArgs {
  matcher: FindWhere;
}

export interface AddNewUniversityArgs {
  university: AddNewUniversityForm;
}

export interface EditUniversityArgs extends FindUniversityByIdArgs {
  university: EditUniversityForm;
}

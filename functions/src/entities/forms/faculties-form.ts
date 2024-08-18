import { FindWhere } from "../../services/base-service";

export interface AddFacultyForm {
  facultyName: string;
  description: string;
  courses?: string[];
  headLecturer: string;
  category: string;
}

export interface EditFacultyForm {
  facultyName?: string;
  description?: string;
  courses?: string[];
  headLecturer?: string;
  category?: string;
  status?: boolean;
  dateModified: string;
}

export interface FindFacultyByIdArgs {
  facultyId: string;
}

export interface FindAllFacultiesArgs {
  cursor: string;
  batchSize: number;
}

export interface GetMatchingFacultiesArgs extends FindAllFacultiesArgs {
  matcher: FindWhere;
}

export interface AddNewFacultyArg {
  faculty: AddFacultyForm;
}

export interface EditFacultyArgs extends FindFacultyByIdArgs {
  faculty: EditFacultyForm;
}

import { FoundFile } from "../../collections/file-storage-collection";

export interface AddFileForm {
  fileName: string;
  mimeType: string;
  file: string;
}

export interface AddMaterialsForm {
  materialName: string;
  materialAuthors: string[];
  summary: string;
  posters?: AddFileForm[];
  docs: AddFileForm[];
}

export interface EditMaterialsForm {
  materialName?: string;
  materialAuthors?: string[];
  summary?: string;
  posters?: AddFileForm[] | FoundFile[];
  docs?: AddFileForm[] | FoundFile[];
}

export interface AddMaterialArgs {
  material: AddMaterialsForm | EditMaterialArgs;
}

export interface FindMaterialByIdArgs {
  materialId: string;
}

export interface EditMaterialArgs
  extends AddMaterialArgs,
    FindMaterialByIdArgs {}

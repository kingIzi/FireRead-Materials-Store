import {
  AddFileForm,
  AddMaterialsForm,
  EditMaterialsForm,
} from "../entities/forms/materials-forms";
import { MaterialProfile as MaterialsProfile } from "../entities/profiles";
import { BaseService } from "./base-service";
import { FoundFile as FileForm } from "../collections/file-storage-collection";

export class MaterialsService extends BaseService<
  MaterialsProfile | AddMaterialsForm
> {
  constructor() {
    super("materials");
  }
  private makeFileFormStatusTrue(founds: FileForm[]) {
    founds.forEach((found) => {
      found.status = true;
    });
    return founds;
  }
  //Mutations
  async addMaterial(material: AddMaterialsForm) {
    try {
      let posters = await this.insertFiles(
        `materials/doc-posters`,
        material.posters as AddFileForm[]
      );
      let docs = await this.insertFiles(
        `materials/doc`,
        material.docs as AddFileForm[]
      );
      let body = {
        ...material,
        posters: this.makeFileFormStatusTrue(posters),
        docs: this.makeFileFormStatusTrue(docs),
      } as EditMaterialsForm as any;
      return await this.insert(body);
    } catch (error) {
      throw error;
    }
  }
  async editMaterial(materialId: string, material: EditMaterialsForm) {
    try {
      let found = await this.find(materialId);
      let posters = await this.insertFiles(
        `materials/doc-posters`,
        material.posters as AddFileForm[]
      );
      let docs = await this.insertFiles(
        `materials/doc`,
        material.docs as AddFileForm[]
      );
      let modifiedPosters = [...(found.posters as FileForm[]), ...posters]; //this.appendFileForm(found.posters, posters);
      let modifiedDocs = [...found.docs, ...docs];
      let body = {
        ...material,
        posters: modifiedPosters,
        docs: modifiedDocs,
      } as EditMaterialsForm as any;
      return await this.update(body as any, materialId);
    } catch (error) {
      throw error;
    }
  }
}

export const getMaterialsService = () => {
  return new MaterialsService();
};

import {
  AddMaterialArgs,
  AddMaterialsForm,
  EditMaterialArgs,
  EditMaterialsForm,
  FindMaterialByIdArgs,
} from "../entities/forms/materials-forms";
import { getMaterialsService } from "../services/materials-service";

export class MaterialsResolver {
  constructor(private materialsService = getMaterialsService()) {}
  //Queries
  private async findMaterialById(
    parent: any,
    args: FindMaterialByIdArgs,
    context: any,
    info: any
  ) {
    return await this.materialsService.find(args.materialId);
  }
  private async findAllMaterials(
    parent: any,
    args: any,
    context: any,
    info: any
  ) {
    return await this.materialsService.getAllDocuments(
      args.cursor,
      args.batchSize
    );
  }
  //Mutations
  private async addMaterial(
    parent: any,
    args: AddMaterialArgs,
    context: any,
    info: any
  ) {
    return await this.materialsService.addMaterial(
      args.material as AddMaterialsForm
    );
  }
  private async editMaterial(
    parent: any,
    args: EditMaterialArgs,
    context: any,
    info: any
  ) {
    return await this.materialsService.editMaterial(
      args.materialId,
      args.material as EditMaterialsForm
    );
  }
  private async findMatchingMaterials(
    parent: any,
    args: any,
    context: any,
    info: any
  ) {
    return await this.materialsService.getMatchingDocuments(
      args.cursor,
      args.batchSize,
      args.matcher
    );
  }
  getQueries() {
    return {
      findMatchingMaterials: this.findMatchingMaterials.bind(this),
      findMaterialById: this.findMaterialById.bind(this),
      findAllMaterials: this.findAllMaterials.bind(this),
    };
  }
  //Resolvers
  getMutations() {
    return {
      addMaterial: this.addMaterial.bind(this),
      editMaterial: this.editMaterial.bind(this),
    };
  }
}

export const getMaterialsResolver = () => {
  return new MaterialsResolver();
};

import { CollectionsStore } from "../collections/collections";
import { WhereFilterOp } from "firebase-admin/firestore";
import {
  FileStorageCollection,
  FoundFile,
  getFileStorageCollection,
} from "../collections/file-storage-collection";
import { AddFileForm } from "../entities/forms/materials-forms";

export type FindWhere = { key: string; operation: WhereFilterOp; value: any };

export abstract class BaseService<T> extends CollectionsStore<T> {
  constructor(
    private collectionName: string,
    private store: FileStorageCollection = getFileStorageCollection()
  ) {
    super(collectionName);
  }
  printCollectionName() {
    console.log(`${this.collectionName}`);
  }
  getStorageService() {
    return this.store;
  }
  createInsertBody(body: any): T {
    let created = new Date();
    return {
      ...body,
      status: true,
      dateCreated: created.toISOString(),
      dateModified: created.toISOString(),
    } as T;
  }
  async addDocument(body: T) {
    try {
      return await this.insertDocument(body)
        .then((result) => result as T)
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
  async updateDocument(body: T, id: string) {
    try {
      let payload = {
        ...body,
        dateModified: new Date().toISOString(),
      };
      await this.modifyDocumentById(id, payload);
      return await this.findDocumentById(id)
        .then((doc) => doc as T)
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
  async listDocuments(cursor: string, batchSize: number) {
    try {
      return await this.listPaginatedDocuments(cursor, batchSize)
        .then((doc) => doc as T[])
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
  //queries
  async find(id: string) {
    try {
      return await this.findDocumentById(id)
        .then((result) => result as T)
        .catch((err) => {
          throw err;
        });
    } catch (err: any) {
      throw err;
    }
  }
  async getMatchingDocuments(
    cursor: string,
    batchSize: number,
    condition: FindWhere
  ) {
    try {
      return await this.findWherePaginated(cursor, batchSize, condition);
    } catch (err: any) {
      throw err;
    }
  }
  async getAllDocuments(cursor: string, batchSize: number) {
    try {
      return await this.listPaginatedDocuments(cursor, batchSize);
    } catch (err: any) {
      throw err;
    }
  }
  //mutations
  async insert(doc: T) {
    try {
      let body = this.createInsertBody(doc);
      return await this.addDocument(body);
    } catch (err: any) {
      throw err;
    }
  }
  async update(doc: T, id: string) {
    try {
      let current = (await this.findDocumentById(id)) as any;
      return await this.updateDocument(doc as T, current.id);
    } catch (err: any) {
      throw err;
    }
  }
  async insertFiles(prefix: string, forms?: AddFileForm[]) {
    try {
      let files: FoundFile[] = [];
      if (!forms) return files;
      for (let form of forms) {
        let name = `${prefix}/${form.fileName}`;
        let file = await this.getStorageService().addBase64FileToBucket(
          name,
          form.file,
          form.mimeType
        );
        files.push({ ...file, status: true } as FoundFile); //sets status true
      }
      return files;
    } catch (err) {
      throw err;
    }
  }
}

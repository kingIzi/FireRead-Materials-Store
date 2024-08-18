import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";

export type FoundFile = {
  mediaLink: string;
  selfLink: string;
  name: string;
  downloadUrl: string;
  status: boolean;
};

export class FileStorageCollection {
  constructor(private bucket = getStorage().bucket()) {}
  private generateUniqueFileName(prefix: string) {
    return `${prefix}-${uuidv4()}`;
  }
  private async getFileInfo(fileName: string) {
    try {
      let metadata = await this.getFileMetadata(fileName);
      let downloadUrl = await this.getFileDownloadUrl(fileName);
      let info = {
        mediaLink: metadata?.mediaLink,
        selfLink: metadata?.selfLink,
        name: metadata?.name,
        downloadUrl: downloadUrl,
      };
      return info as FoundFile;
    } catch (error) {
      throw error;
    }
  }
  private async saveFile(buffer: Buffer, mimeType: string, fileName: string) {
    try {
      await this.bucket.file(fileName).save(buffer, { contentType: mimeType });
      return await this.getFileInfo(fileName);
    } catch (error) {
      throw new GraphQLError("INTERNAL_SERVER_ERROR");
    }
  }
  async getFileMetadata(fileName: string) {
    try {
      let fileRef = this.bucket.file(fileName);
      if (!fileRef.exists) throw Error("Not found");
      return await fileRef
        .getMetadata()
        .then((result) => result[0])
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw new GraphQLError("NOT_FOUND");
    }
  }
  async getFileDownloadUrl(fileName: string) {
    try {
      let fileRef = this.bucket.file(fileName);
      if (!fileRef.exists) throw Error("Not found");
      return await getDownloadURL(fileRef)
        .then((result) => result)
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw new GraphQLError("NOT_FOUND");
    }
  }
  async addBase64FileToBucket(
    prefix: string,
    base64: string,
    mimeType: string
  ) {
    try {
      let buffer = Buffer.from(base64, "base64");
      let fileName = this.generateUniqueFileName(prefix);
      return await this.saveFile(buffer, mimeType, fileName);
    } catch (error) {
      throw error;
    }
  }
}

export const getFileStorageCollection = () => {
  return new FileStorageCollection();
};

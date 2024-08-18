import {
  CollectionReference,
  DocumentData,
  FieldPath,
  FirebaseFirestoreError,
  getFirestore,
  QuerySnapshot,
} from "firebase-admin/firestore";
import { FindWhere } from "../services/base-service";
import { DatabaseCommunicationException } from "../utilities/database-communication-exception";
import { handleErrorMessage } from "./helpers";
import { GraphQLError } from "graphql";

export type DocumentStatusToogle = { status: boolean; dateModified: string };

export abstract class CollectionsStore<T> {
  constructor(
    private name: string,
    private collection: CollectionReference = getFirestore().collection(name)
  ) {}
  private readyPaginationFindWhereQuery(
    cursor: string,
    batchSize: number,
    matcher: FindWhere
  ) {
    let query = this.collection.where(
      matcher.key,
      matcher.operation,
      matcher.value
    );
    query = query.orderBy(FieldPath.documentId());
    if (cursor) {
      let cursorDocRef = this.collection.doc(cursor);
      query = query.startAfter(cursorDocRef);
    }
    return query.limit(batchSize);
  }
  private readyPaginationQuery(cursor: string, batchSize: number) {
    let query = this.collection.orderBy(FieldPath.documentId());
    if (cursor) {
      const cursorDocRef = this.collection.doc(cursor);
      query = query.startAfter(cursorDocRef);
    }
    return query.limit(batchSize);
  }
  private createResponse(res: DocumentData) {
    let data = res.data();
    if (!data) throw new Error("Response is null.");
    return { id: res.id, ...data } as T;
  }
  printCollectionName(): void {
    console.log(`Collection name: ${this.name}`);
  }
  async insertDocument(document: any): Promise<T> {
    try {
      return (await this.collection.add(document))
        .get()
        .then((result) => this.createResponse(result))
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw new GraphQLError("INTERNAL_SERVER_ERROR");
    }
  }
  async findDocumentById(id: string) {
    try {
      return await this.collection
        .doc(id)
        .get()
        .then((result) => this.createResponse(result))
        .catch((err: FirebaseFirestoreError) => {
          throw err;
        });
    } catch (err: FirebaseFirestoreError | Error | any) {
      throw new GraphQLError("NOT_FOUND");
    }
  }
  async modifyDocumentById(id: string, item: any): Promise<void> {
    try {
      await this.collection
        .doc(id)
        .update(item)
        .then((result) => {})
        .catch((err) => {
          throw err;
        });
      //return await this.findById(id);
    } catch (error) {
      throw new GraphQLError("INTERNAL_SERVER_ERROR");
      //throw new Error("Failed to modify collection.");
    }
  }
  async findWherePaginated(
    cursor: string,
    batchSize: number,
    matcher: FindWhere
  ): Promise<T[]> {
    try {
      let query = this.readyPaginationFindWhereQuery(
        cursor,
        batchSize,
        matcher
      );
      return await query
        .get()
        .then((querySnapshot: QuerySnapshot) => {
          return querySnapshot.docs.map((doc) => this.createResponse(doc));
        })
        .catch((err: any) => {
          throw Error("Failed to read documents.");
        });
    } catch (error: any) {
      throw new GraphQLError("INTERNAL_SERVER_ERROR");
    }
  }
  async listPaginatedDocuments(
    cursor: string,
    batchSize: number
  ): Promise<T[]> {
    try {
      let query = this.readyPaginationQuery(cursor, batchSize);
      return await query
        .get()
        .then((snapshot: QuerySnapshot) => {
          return snapshot.docs.map((docRef) => this.createResponse(docRef));
        })
        .catch((err: any) => {
          throw err;
        });
    } catch (error) {
      throw new GraphQLError("INTERNAL_SERVER_ERROR");
    }
  }
}

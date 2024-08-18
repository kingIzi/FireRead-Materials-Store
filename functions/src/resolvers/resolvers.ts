import * as admin from "firebase-admin";
import {
  getAuthResolvers as getUsersResolvers,
  UsersResolver,
} from "./users-resolver";
import { AuthorsResolver, getAuthorsResolvers } from "./authors-resolver";
import {
  getUniversityResolver,
  UniversityResolver,
} from "./university-resolver";
import { FacultiesResolver, getFacultiesResolver } from "./faculties-resolver";
import { getMaterialsResolver, MaterialsResolver } from "./materials-resolver";
admin.initializeApp();

type Resolver = {
  Query: any;
  Mutation: any;
};

export class ResolversImpl {
  constructor(
    private authResolvers: UsersResolver = getUsersResolvers(),
    private authorsResolver: AuthorsResolver = getAuthorsResolvers(),
    private universityResolver: UniversityResolver = getUniversityResolver(),
    private facultiesResolver: FacultiesResolver = getFacultiesResolver(),
    private materialsResolver: MaterialsResolver = getMaterialsResolver()
  ) {}
  private getAllQueries() {
    const queries = {
      Query: {
        ...this.authResolvers.getQueries(),
        ...this.authorsResolver.getQueries(),
        ...this.universityResolver.getQueries(),
        ...this.facultiesResolver.getQueries(),
        ...this.materialsResolver.getQueries(),
      },
    };
    return queries;
  }
  private getAllMutations() {
    const mutations = {
      Mutation: {
        ...this.authResolvers.getMutations(),
        ...this.authorsResolver.getMutations(),
        ...this.universityResolver.getMutations(),
        ...this.facultiesResolver.getMutations(),
        ...this.materialsResolver.getMutations(),
      },
    };
    return mutations;
  }
  getResolvers(): Resolver {
    let queries = this.getAllQueries();
    let mutations = this.getAllMutations();
    return { ...queries, ...mutations };
  }
}

export const resolvers = () => {
  let resolve = new ResolversImpl();
  return resolve.getResolvers();
};

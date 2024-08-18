import {
  AddNewUserProfileForm,
  EditUserProfileForm,
} from "../entities/forms/users-forms";
import { Auth, getAuth, UserRecord } from "firebase-admin/auth";
import { UserProfile } from "../entities/profiles";
import { BaseService } from "./base-service";

type CreateFireUser = {
  email: string;
  password: string;
  displayName: string;
  phoneNumber?: string;
};

export class AuthServiceImpl extends BaseService<
  UserProfile | AddNewUserProfileForm | EditUserProfileForm
> {
  constructor(private auth: Auth = getAuth()) {
    super("users");
  }
  private getSignUpUserPayload(
    userProfile: AddNewUserProfileForm
  ): CreateFireUser {
    let body = {
      email: userProfile.email,
      password: userProfile.password,
      displayName: userProfile.fullName,
      phoneNumber: userProfile.phoneNumber,
    } as CreateFireUser;
    if (!userProfile.phoneNumber) {
      delete userProfile.phoneNumber;
    }
    return body;
  }
  private createUserProfile(
    userRecord: UserRecord,
    userType: string
  ): UserProfile {
    let userProfile = {
      fullName: userRecord.displayName,
      phoneNumber: userRecord.phoneNumber ?? "",
      email: userRecord.email,
      userType: userType,
      localId: userRecord.uid,
      status: true,
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    } as unknown as UserProfile;
    return userProfile;
  }
  private async createFireUser(
    userProfile: AddNewUserProfileForm
  ): Promise<UserRecord> {
    try {
      let body = this.getSignUpUserPayload(userProfile);
      return await this.auth
        .createUser(body)
        .then((result) => result)
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (error) {
      throw error;
    }
  }
  async createUser(userProfile: AddNewUserProfileForm) {
    try {
      let firebaseUser = await this.createFireUser(userProfile);
      return this.createUserProfile(firebaseUser, userProfile.userType);
    } catch (err: any) {
      throw err;
    }
  }
}

export const getAuthService = () => {
  return new AuthServiceImpl();
};

import { FindWhere } from "../../services/base-service";

export interface AddNewUserProfileForm {
  fullName: string;
  phoneNumber?: string;
  email: string;
  password: string;
  userType: string;
}

export interface EditUserProfileForm {
  fullName?: string;
  phoneNumber?: string;
  userType?: string;
  status?: boolean;
  dateModified?: string;
}

export interface FindUserProfileArgs {
  userId: string;
}

export interface FindAllUserProfilesArgs {
  cursor: string;
  batchSize: number;
}

export interface GetMatchingUsersArgs extends FindAllUserProfilesArgs {
  matcher: FindWhere;
}

export interface AddNewUserProfileArgs {
  user: AddNewUserProfileForm;
}

export interface EditUserProfileArgs extends FindUserProfileArgs {
  user: EditUserProfileForm;
}

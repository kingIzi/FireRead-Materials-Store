import { FoundFile } from "../collections/file-storage-collection";

export interface UserProfile {
  id?: string;
  fullName: string;
  phoneNumber?: string;
  email: string;
  userType: string;
  localId: string;
  status: boolean;
  dateCreated: string;
  dateModified: string;
}

export interface AuthorProfile {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  dateOfBirth?: string | null | undefined;
  genres?: string[];
  status: boolean;
  dateCreated: string;
  dateModified: string;
}

export interface UniversityProfile {
  id?: string;
  universityName: string;
  universityAddress: string;
  founded: string;
  acronym: string;
  phoneNumber: string;
  email?: string;
  faculties?: string[];
  status: boolean;
  dateCreated: string;
  dateModified: string;
}

export interface FacultyProfile {
  id?: string;
  facultyName: string;
  description: string;
  courses?: string[];
  category: string;
  headLecturer: string;
  status: boolean;
  dateCreated: string;
  dateModified: string;
}

export interface MaterialProfile {
  id?: string;
  materialName: string;
  materialAuthors: string[];
  summary: string;
  posters?: FoundFile[];
  docs: FoundFile[];
}

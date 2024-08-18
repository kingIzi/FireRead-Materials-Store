import { FirebaseFirestoreError } from "firebase-admin/firestore";

export const handleErrorMessage = (
  err: FirebaseFirestoreError | Error | any,
  message: string
) => {
  if (err instanceof FirebaseFirestoreError) {
    return `An error occured on the server.`;
  } else {
    return message;
  }
};

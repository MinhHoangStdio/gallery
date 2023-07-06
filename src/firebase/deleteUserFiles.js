import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import deleteDocument from "./db/deleteDocument";
import deleteFile from "./storage/deleteFile";

const deleteUserFiles = (collectionName, currentUser) => {
  return new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, collectionName),
      where("uid", "==", currentUser.uid)
    );
    try {
      const snapshot = await getDocs(q);
      const storePromises = [];
      const storagePromises = [];
      snapshot.forEach((document) => {
        storePromises.push(deleteDocument(collectionName, document.id));
        storagePromises.push(
          deleteFile(`${collectionName}/${currentUser.uid}/${document.id}`)
        );
      });

      // xóa song song khỏi đợi
      await Promise.all(storePromises);
      await Promise.all(storagePromises);

      if (currentUser?.photoURL) {
        const photoName = currentUser?.photoURL
          ?.split(`${currentUser.uid}%2F`)[1]
          ?.split("?")[0];
        if (photoName) {
          try {
            await deleteFile(`profile/${currentUser.uid}/${photoName}`);
          } catch (error) {
            console.log(error);
          }
        }
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export default deleteUserFiles;

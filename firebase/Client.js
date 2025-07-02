// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// Add the missing import statement for FirebaseFirestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrF5bg-g4JPQRHOqaM2fdr7klQVlEu0kc",
  authDomain: "kliv-agencia.firebaseapp.com",
  projectId: "kliv-agencia",
  storageBucket: "kliv-agencia.appspot.com",
  messagingSenderId: "953211828271",
  appId: "1:953211828271:web:e224a9571c34360fb1eeda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const billingCollection = "packagesBilling";
const partnersCollection = "playgroundPartners2";

//create a function to post a document to the firestore
const db = getFirestore(app);
const storage = getStorage(app);

export const getBackupPackagesBillingData = async () => {
  const docSnap = await getDoc(
    doc(db, "billingDataBackup", "packagesBillingDocument")
  );
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const getPackagesBillingData = async () => {
  const docSnap = await getDoc(
    doc(db, billingCollection, "packagesBillingDocument")
  );
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const updatePackagesBillingData = async (newData) => {
  await setDoc(doc(db, billingCollection, "packagesBillingDocument"), newData);
};

export const getPartnersImagesData = async () => {
  const docSnap = await getDoc(doc(db, partnersCollection, "PartnersImage"));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const uploadFile = (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    return task;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePartnersImagesData = async (newData) => {
  await setDoc(doc(db, partnersCollection, "PartnersImage"), newData);
};

/**
 * Elimina un archivo del Storage
 * @param {string} path Ruta en Storage, p.ej. "partners/2"
 */
export const deleteFile = async (path) => {
  const fileRef = ref(storage, path);
  try {
    await deleteObject(fileRef);
  } catch (err) {
    console.error("Error borrando Storage:", err);
    throw err;
  }
};

/**
 * Actualiza solo el campo links del documento (más seguro que setDoc completo)
 */
export const removePartnerImageLink = async (newLinks) => {
  const docRef = doc(db, partnersCollection, "PartnersImage");
  await updateDoc(docRef, { links: newLinks });
};

//FIREBASE START ***************************
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-xbrSD3n4ICdXY7OLhKaZpW8PupLwSzE",
  authDomain: "encolab-efbe9.firebaseapp.com",
  projectId: "encolab-efbe9",
  storageBucket: "encolab-efbe9.appspot.com",
  messagingSenderId: "735726589691",
  appId: "1:735726589691:web:53fdda2fe5d8601b13c25e",
 databaseURL: "https://encolab-efbe9-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const storage  = getStorage(app);
const storageRef = ref(storage);
export { storage }

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(app);

//FIREBASE END ****************


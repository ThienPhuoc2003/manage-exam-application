// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFcVGz6WEYofacKL1ggkMf1sRifbVHz74",
  authDomain: "utility-operand-418108.firebaseapp.com",
  projectId: "utility-operand-418108",
  storageBucket: "utility-operand-418108.appspot.com",
  messagingSenderId: "342482813717",
  appId: "1:342482813717:web:5931c46c4598a1d2fd5f1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
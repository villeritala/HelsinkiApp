// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBEdecoS6mUN5NTOBTJmLAau4oicrzWdjs",
  authDomain: "helsinkiapp-8897d.firebaseapp.com",
  projectId: "helsinkiapp-8897d",
  storageBucket: "helsinkiapp-8897d.appspot.com",
  messagingSenderId: "136604429956",
  appId: "1:136604429956:web:cc52a7ec2f7d8322665cd1"
};

const firebase = initializeApp(firebaseConfig)

export default firebase
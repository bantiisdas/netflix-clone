// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANekmUiOG6E-EB0_HtJf8fuGrQA_QbVro",
    authDomain: "netflix-clone--nextjs.firebaseapp.com",
    projectId: "netflix-clone--nextjs",
    storageBucket: "netflix-clone--nextjs.appspot.com",
    messagingSenderId: "805472355049",
    appId: "1:805472355049:web:cb81cceb92a2500a25e678"
};
  
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
//import * as firebase from 'firebase'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFBhPWNbPAwxf6rlmBOhZoTMcxxsJGlyU",
  authDomain: "fabter-e8af3.firebaseapp.com",
  projectId: "fabter-e8af3",
  storageBucket: "fabter-e8af3.appspot.com",
  messagingSenderId: "423254768084",
  appId: "1:423254768084:web:0b54a1834d62a208b3be41",
  measurementId: "G-Z5XCGGFZFJ"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig)
const provider = new GithubAuthProvider();
const auth = getAuth();

export const loginWithGitHub = () => {
  //const githubProvider = new firebase.auth.provider.GithubProvider()
  return signInWithPopup(auth, provider)
    .then(re => {
      const {user} = re
      const {reloadUserInfo} = user
      const {screenName, photoUrl} = reloadUserInfo

      return {
        avatar: photoUrl,
        username: screenName,
        url:'https://midu.dev/'
      }
    })
  
}
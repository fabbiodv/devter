import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFBhPWNbPAwxf6rlmBOhZoTMcxxsJGlyU",
  authDomain: "fabter-e8af3.firebaseapp.com",
  projectId: "fabter-e8af3",
  storageBucket: "fabter-e8af3.appspot.com",
  messagingSenderId: "423254768084",
  appId: "1:423254768084:web:0b54a1834d62a208b3be41",
  measurementId: "G-Z5XCGGFZFJ"
};

//si el numero de apps es cero, inicializa sino no
!firebase.apps.length &&
 firebase.initializeApp(firebaseConfig)



export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
  .then(user => {
    const {additionalUserInfo} = user
    const {username, profile} = additionalUserInfo
    const {avatar_url} = profile
    return {
      avatar: avatar_url,
      username,
      url: 'twitter.com/fabbiodv'

    }
  })
  
}
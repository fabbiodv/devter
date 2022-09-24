import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAFBhPWNbPAwxf6rlmBOhZoTMcxxsJGlyU',
  authDomain: 'fabter-e8af3.firebaseapp.com',
  projectId: 'fabter-e8af3',
  storageBucket: 'fabter-e8af3.appspot.com',
  messagingSenderId: '423254768084',
  appId: '1:423254768084:web:0b54a1834d62a208b3be41',
  measurementId: 'G-Z5XCGGFZFJ'
}

// si el numero de apps es cero, inicializa sino no
!firebase.apps.length &&
 firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = user
        ? mapUserFromFirebaseAuthToUser(user)
        : null
      onChange(normalizedUser)
    })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        console.log('aca', data)
        const id = doc.id
        const { createdAt } = data
        console.log(createdAt)

        const date = new Date(createdAt.seconds * 1000)
        const normalizedCreatedAt = new Intl.DateTimeFormat('es-ES').format(
          date
        )

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt
        }
      })
    })
}

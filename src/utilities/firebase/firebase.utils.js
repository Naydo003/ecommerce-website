import { initializeApp } from 'firebase/app'

import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgVInw0z52q0x5Di6txL1Hjo1mo04u92w",
  authDomain: "e-commerce-website-98d52.firebaseapp.com",
  projectId: "e-commerce-website-98d52",
  storageBucket: "e-commerce-website-98d52.appspot.com",
  messagingSenderId: "1092990598769",
  appId: "1:1092990598769:web:7d359d8d873bf55fc5e5d0",
  measurementId: "G-MNSY9MT2R9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()     // you only need one authentication function. Auth is the same throughout the whole app.

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)     // There may be times you want different popups depending were in the app the person is logging in from.
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {

  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid )
  const userSnapshot = await getDoc(userDocRef)



  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt  = new Date()

    // console.log("***************")
    // console.log()

    try {
      await setDoc(userDocRef, { 
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log("error creating the user" + error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return
  }
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const getUserDocumentFromAuth = async (userAuth) => {

  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid )
  const userSnapshot = await getDoc(userDocRef)



  if(!userSnapshot.exists()) {
    const userDoc = userSnapshot.data()

    // console.log("***************")
    console.log(userDoc)

  }

  return userDocRef
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return
  }
  return await signInWithEmailAndPassword(auth, email, password)
}


export const signOutUser = async () => {
  await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback )
}

// need to go into firebase and under build select Authentication then select enable + add your email



// In firestorm database go to rules and change allow read, write: if to true.   This allows us to modify data for dev.

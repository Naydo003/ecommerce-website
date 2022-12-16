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

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'
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

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

// front end dev/ javascript dev is susectible to changes in say firestore. We are protecting ourself against onerous code changes by isolating all firebase code in here. Minimising impact from changing 3rd party libraries.
// Apparently firebase have changed the way doc lookup has been done every major version renewal. You would think they would have made is simpler by now.

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')

  const q = query(collectionRef)                  // This horse shit is we create an object that represents our query, query(collectionRef, where("search criteria")), (so find all in collectionRef in our case), need to import where.
  const querySnapshot = await getDocs(q)          //  then we get a snapshot of the entire query which includes the docs as snapshots. This all contains a lot of shit. We just need to access .docs and then .data() for each doc.

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {     // acc - accumilator, for each docSnapshot grab the title and the items. Fuck everything else off (ie reduce)
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items           // Bracket notation for onjects. This is like acc.title but because title is a variable we need to use acc[]. accumilator at the title value will be equal to the items. This is wierd object structure. {hats: [], jackets: []}
    return acc
  }, {})                         // starting value of acc is {} empty object

  return categoryMap
}

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

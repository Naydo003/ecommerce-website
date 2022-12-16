import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utilities/firebase/firebase.utils";

// the actual context you want to access
// the initial state should be null as an empty string object will evaluate to true.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null

})

// The following uses setState and makes that state variable/value accessible to any children components wrapped by our UserProvider component.
// This is applied to the whole <App /> in the index.js file.
export const UserProvider = ({children}) => {

  const [ currentUser, setCurrentUser ] = useState(null)
  const value = { currentUser, setCurrentUser }
  

  // On mount, the listener will be activated and on unmount the listener will be cleaned up by running once more to log sign-out. Maybe????
  
  useEffect(() => { 
    // console.log("useEffect running")
    onAuthStateChangedListener((user) => {

      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
      // console.log("********* subscribe listener ran **********")
      // console.log(user)
    })

    return () => { 
      // console.log("return / cleanup running")
      onAuthStateChangedListener((user) => {

      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
      // console.log("********* unsubscribe listener ran **********")
      // console.log(user) 
    }) }                                               // when a return is provided in a useEffect function the return value is a cleanup function that runs once the component unmounts or stream is unsubscribed
  }, [  ])                                             // Effect will only run when what was inside [] changes. In this case none so only onMount.

 return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


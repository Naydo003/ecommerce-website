// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'

// import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utilities/firebase/firebase.utils'
// signInWithGoogleRedirect and auth not needed in above line as we are not using redirect.

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

import './authentication.styles.scss'

function Authentication() {


  //useEffect used to check whether components is loading after a redirect return. 
  // useEffect(() => {
  //   async function logInFromRedirectReturn() {                                  
  //   const response = await getRedirectResult(auth)

  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  //   }
  //   logInFromRedirectReturn()
  // }, [] )                              // inside [], are dependancies. The effect will run whenever what is inside the [] changes. In this case none, effect will only run on mount

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect()
  // }


  return (
    <div className='authentication-container'>

      {/* <button onClick={logGoogleRedirectUser}>Sign In With Google Redirect</button> */}

      <SignInForm />
      <SignUpForm />

    </div>
  )

}

export default Authentication
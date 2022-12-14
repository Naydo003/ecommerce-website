import { useState } from "react"
import { signInUserWithEmailAndPassword, signInWithGooglePopup } from '../../utilities/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component.jsx'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'

// import { UserContext } from '../../contexts/user.context'     // Moved to user.context.jsx
const defaultFormFields = {

  email: '',
  password: ''

}

const SignInForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields)

  const { email, password } = formFields

  // const { setCurrentUser } = useContext(UserContext)    // Deleted, sign in handled in user.context.jsx

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!password || !email) {
      alert("one or more fields not filled in properly")
      return 
    }
    try {
      const {user} = await signInUserWithEmailAndPassword(email, password)

      resetFormFields()

    } catch(error) {
      switch(error.code) {
        case "auth/wrong-password":
          alert("incorrect password")
          break
        case "auth/user-not-found":
          alert("no user with that email")
          break
        default:
          console.log(error)
      }
    }
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()

    // The below is changed as we are moving Doc creation to user.context.jsx
    // const { user } = await signInWithGooglePopup()
    // createUserDocumentFromAuth(user)
  }
  
  const handleChange = (event) => {
    const {name, value} = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign In with your Email and a Password</span>
      <form onSubmit={handleSubmit}>


        <FormInput label="Email" type="email" required onChange={ handleChange } name="email" value={ email } />

        <FormInput label="Password" type="password" required onChange={ handleChange } name="password" value={ password } />

        <div className="buttons-container">
        <Button type='submit'>Sign In</Button>
        <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>

  )
}


export default SignInForm 
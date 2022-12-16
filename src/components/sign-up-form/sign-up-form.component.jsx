import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utilities/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component.jsx'
import Button from '../button/button.component'
import './sign-up-form.styles.scss'
// import { UserContext } from '../../contexts/user.context'


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields)

  const { displayName, email, password, confirmPassword } = formFields

  // const { setCurrentUser } = useContext(UserContext)    //  Deleted as handled by user.context.jsx

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert("passwords do not match")
      return 
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password)
      // setCurrentUser(user)

      user.displayName = displayName
      await createUserDocumentFromAuth(user)
      resetFormFields()

    } catch(error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use")
      } else {
      console.log("problem creating user" + error)
      }
    }
  }
  
  const handleChange = (event) => {
    const {name, value} = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign Up with your Email and a Password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label="Display Name" type="text" required onChange={ handleChange } name="displayName" value={ displayName } />

        <FormInput label="Email" type="email" required onChange={ handleChange } name="email" value={ email } />

        <FormInput label="Password" type="password" required onChange={ handleChange } name="password" value={ password } />

        <FormInput label="Confirm Password" type="password" required onChange={ handleChange } name="confirmPassword" value={ confirmPassword } />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>

  )
}


export default SignUpForm 
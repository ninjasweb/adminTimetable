import Image from 'next/image'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextFieldUI from '../components/Form/TextFieldUI'
import Link from 'next/link'
import ButtonPrimary from '../components/Common/ButtonPrimary'
import { useUserContext } from '../context/userContext'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Login = () => {

  const { user, login, error } = useUserContext()
  const router = useRouter()

  // Initialize the formik state
  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
  }
  // Initialize the validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').required('Password is required'),
  })

  const handleSubmit = (values) => {
    login(values.email, values.password)
  }


  if (user) {
    router.push('/')
  }

  return (
    <>
      <Head><title>Login</title></Head>
      <div className="container">
        <div className="container__form">
          <div className="container__form__logo">
            <Image width={414} height={128} src="/logo.png" alt="Logo" />
          </div>
          <div className="container__form__login">
            <Formik
              initialValues={INITIAL_FORM_STATE}
              validationSchema={validationSchema}
              onSubmit={values =>{
                handleSubmit(values)
              }}
            >
              <Form>
                {/* Email */}
                <div className="single__input">
                  <TextFieldUI  
                    sx={{ 
                      input: { color: '#fff', borderColor: '#fff', borderRadius: '5px' },
                      label: { color: '#fff' },
                    }} 
                    variant="filled" 
                    label="Email" 
                    name="email"
                    IconAdornment="email" 
                    placeholder="Email"
                  />
                </div>
                {/* Password */}
                <div className="single__input">
                  <TextFieldUI
                    sx={{ 
                      input: { color: '#fff', borderColor: '#fff', borderRadius: '5px' },
                      label: { color: '#fff' },
                    }}
                    type="password"
                    label="Password" 
                    name={"password"} IconAdornment="password" placeholder="Password" />
                </div>
                {/* Login button */}
                <div className="single__input">
                  <ButtonPrimary>Login</ButtonPrimary>
                </div>
                {/* Error Message */}
                {error ? <div className="error">{error.message}</div> : null}
                {/* Forgot password */}
                <Link href="/forgot-password">
                  <a className="forgot-password">Forgot password?</a>
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: var(--dark);
        }

        .container__form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 400px;
          border: 1px solid #fff;
          border-radius: 10px;
          padding: 2rem 1rem;
        }
        
        .container__form__logo {
          width: 100%;
          max-width: 400px;
        }

        .container__form__login {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .single__input {
          margin: 1rem 0;
        }

        a {
          color: #fff;
          width: 100%;
          display: inline-block ;
          text-align: center ;
        }

        a:hover {
          color: var(--green);
        }

        .error {
          color: red;
        }
        `}</style>
    </> 
    
   )
}
 
export default Login
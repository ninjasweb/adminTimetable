import CloseIcon from '@mui/icons-material/Close'
import { Formik, Form } from 'formik'
import DatePickerUI from './DatePickerUI'
import ButtonPrimary from '../Common/ButtonPrimary'
import TextFieldUI from './TextFieldUI'
import * as Yup from 'yup'
import { useUserContext } from '../../context/userContext'

const NewStageForm = ({closeModal, userData , prevId}) => {

  const {createStage, updateStage} = useUserContext()
  const INITIAL_FORM_STATE = {
    name: userData.id === undefined ? "" : userData.name,
    desc: userData.id === undefined ? "" : userData.desc,
  }
  //Initialize the validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
  })

  //Create an unique id for the day  
  const randomID = Math.random().toString(36).substring(2, 5) + Math.random().toString(8).substring(2, 5)

  //OnSubmit handler
  const handleSubmit = async (values) => {
    const id = values.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/ /g, "-").concat(randomID)
    if(userData.id === undefined) {
      await createStage(values.name, values.desc, id, prevId)
    } else {
      await updateStage(values.name, values.desc, userData.id, prevId)
    }
    closeModal()
  }
  return ( 
    <>
    <div className="new__stage__form">
        <div onClick={closeModal} className="new__stage__form__close">
          <CloseIcon fontSize="large" />
        </div>
        <div className="new__stage__form__title">
          <h2>{userData.id === undefined ? "Crear un nuevo stage/locación" : "Editar Stage"}</h2>
          <p>{userData.id === undefined ? "" : `Nombre: ${userData.name}`}</p>
        </div>
        <div className="new__stage__form__inputs">
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={validationSchema}
            onSubmit={values =>{
              handleSubmit(values)
            }}
          >
            <Form>
              {/* Day Name */}
              <div className="single__input">
                <TextFieldUI label="name" name="name" placeholder="Nombre Stage/Locación"/>
              </div>
              {/* Day Description */}
              <div className="single__input">
                <TextFieldUI label="desc" name="desc" placeholder="Descripción del Stage"/>
              </div>
              {/* Create Day */}
              <div className="single__input">
                {userData && userData.id === undefined ? 
                  <ButtonPrimary>AGREGAR STAGE</ButtonPrimary> : 
                  <ButtonPrimary>ACTUALIZAR STAGE</ButtonPrimary>
                }
              </div>
            </Form>
          </Formik>
        </div>
    </div>
    <style jsx>{`
        .new__stage__form {
          width: 80%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
          padding: 2rem;
        }

        .new__stage__form__close {
          width: 60%;
          display: flex;
          justify-content: flex-end;
          cursor: pointer ;
        }

        .new__stage__form__title {
          width: 100% ;
          text-align: center ;
        }

        .new__stage__form__title h2 {
          margin: 0;
        }

        .new__stage__form__title p {
          margin: 0;
        }

        .single__input {
          width: 100%;
          margin: 1rem 0;
        }
        `}</style>
    </>
   )
}
 
export default NewStageForm
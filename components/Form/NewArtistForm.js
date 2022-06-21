import CloseIcon from '@mui/icons-material/Close'
import {Formik, Form} from 'formik'
import TextFieldUI from './TextFieldUI'
import ButtonPrimary from '../Common/ButtonPrimary'
import * as Yup from 'yup'
import TimePickerUI from './TimePickerUI'
import { useUserContext } from '../../context/userContext'


const NewArtistForm = ({userData, closeModal, prevId, dayId}) => {
  console.log(userData)
  const { createArtist, updateArtist } = useUserContext()

  const INITIAL_FORM_STATE = {
    name: "",
    perfomance: "",
    genre: "",
    startTime: "",
    endTime: "",
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    genre: Yup.string().required('El género es requerido'),
    startTime: Yup.string().required('La hora de inicio es requerida'),
    endTime: Yup.string().required('La hora de fin es requerida'),
  })

  //Create an unique id for the day  
  const randomId = Math.random().toString(36).substring(2, 5) + Math.random().toString(8).substring(2, 5)

  const handleSubmit = async (values) => {
    const newId = values.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/ /g, "-").concat(randomId)
    if (userData.id === undefined) {
      await createArtist({...values, id: newId}, prevId, dayId, newId)
    }
    else {
      await updateArtist({...values, id: userData.id}, prevId, dayId, userData.id)
    }
    closeModal()
  }
  return ( 
    <>
      <div className="new__Day__form">
        <div onClick={closeModal} className="new__Day__form__close">
          <CloseIcon fontSize="large" />
        </div>
        <div className="new__Day__form__title">
          <h2>{userData.id === undefined ? "Crear un nuevo Artista" : "Editar Artista"}</h2>
          <p>{userData.id === undefined ? "" : `Nombre: ${userData.values.name}`}</p>
        </div>
        <div className="new__Day__form__inputs">
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={validationSchema}
            onSubmit={values =>{
              handleSubmit(values)
            }}
          >
            <Form>
              {/* Artist's Name */}
              <div className="single__input">
                <TextFieldUI label="Nombre Artista" name="name" placeholder="Nombre del Artista o A.K.A"/>
              </div>
              {/* Perfomance */}
              <div className="single__input">
                <TextFieldUI label="Perfomance" name="perfomance" placeholder="(Live, DJ Set, Hybrid etc)"/>
              </div>
              {/* Genre */}
              <div className="single__input">
                <TextFieldUI label="Género" name="genre" placeholder="Género del Artista"/>
              </div>
              {/* Start Time */}
              <div className="single__input">
                <label htmlFor="startTime">Hora inicio</label>
                <TimePickerUI name="startTime" label="Hora de Inicio"/>
              </div>
              {/* End Time */}
              <div className="single__input">
                <label htmlFor="endTime">Hora fin</label>
                <TimePickerUI name="endTime" label="Hora de Finalización"/>
              </div>
              {/* Create Artist */}
              <div className="single__input">
                {userData && userData.id === undefined ? 
                  <ButtonPrimary>AGREGAR ARTISTA</ButtonPrimary> : 
                  <ButtonPrimary>ACTUALIZAR ARTISTA</ButtonPrimary>
                }
              </div>
            </Form>
          </Formik>
          
        </div>
      </div>
      <style jsx>{`
        .new__Day__form {
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
          z-index: 3;
        }

        @media (max-width: 768px) {
          .new__Day__form {
            width: 95%;
            padding: 0;
            margin-top: -3rem;
          }
        }

        .new__Day__form__close {
          width: 60%;
          display: flex;
          justify-content: flex-end;
          cursor: pointer ;
        }

        @media (max-width: 768px) {
          .new__Day__form__close {
            width: 100%;
          }
        }

        .new__Day__form__title {
          width: 100% ;
          text-align: center ;
        }

        .new__Day__form__title h2 {
          margin: 0;
        }

        @media (max-width: 768px) {
          .new__Day__form__title h2 {
            font-size: 1.1rem !important;
          }
        }

        .new__Day__form__title p {
          margin: 0;
        }

        .single__input {
          width: 100%;
          margin: 1rem 0;
          display: flex ;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .single__input {
            margin: 8px 0;
          }
        }
        `}</style>
    </>
   )
}
 
export default NewArtistForm
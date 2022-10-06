import CloseIcon from '@mui/icons-material/Close'
import {Formik, Form} from 'formik'
import TextFieldUI from './TextFieldUI'
import ButtonPrimary from '../Common/ButtonPrimary'
import * as Yup from 'yup'
import TimePickerUI from './TimePickerUI'
import { useUserContext } from '../../context/userContext'
import { useState } from 'react'
import {storage} from '../../firebase/initFirebase'
import { ref, uploadBytes } from 'firebase/storage'
import UploadIcon from '@mui/icons-material/Upload'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const NewArtistForm = ({userData, closeModal, prevId, dayId}) => {
  const { createArtist, updateArtist } = useUserContext()
  const [disabledButton, setDisabledButton] = useState(false)
  const [image, setImage] = useState(null)
  const [createObjectURL, setCreateObjectURL] = useState("")
  const [checkedEnd, setCheckedEnd] = useState(false)
  const [checkedStart, setCheckedStart] = useState(false)

  console.log(userData)

  const uploadToClient = (e) => {
    if(e.target.files && e.target.files[0]) {
      const i = e.target.files[0]
      console.log(i)
      setImage(i)
      setCreateObjectURL(URL.createObjectURL(i))
    }
  }

  const INITIAL_FORM_STATE = {
    name: userData.id === undefined ? "" : userData.values.name,
    perfomance: userData.id === undefined ? "" : userData.values.perfomance,
    genre: userData.id === undefined ? "" : userData.values.genre,
    startTime: userData.id === undefined ? "" : userData.values.startTime,
    endTime: userData.id === undefined ? "" : userData.values.endTime,
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    startTime: Yup.string().required('La hora de inicio es requerida'),
    endTime: Yup.string().required('La hora de fin es requerida'),
  })

  //Create an unique id for the day  
  const randomId = Math.random().toString(36).substring(2, 5) + Math.random().toString(8).substring(2, 5)

  const handleSubmit = async (values) => {
    setDisabledButton(true)
    
    const newId = values.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/ /g, "-").concat(randomId)
    if (userData.id === undefined) {
      await createArtist({...values, id: newId, nextDayEnd: checkedEnd, nextDayStart: checkedStart   }, prevId, dayId, newId)
      if(image) {
        const imageRef = ref(storage, `medellinstyle/${newId}`)
        await uploadBytes(imageRef, image)
      }
    }
    else {
      await updateArtist({...values, id: userData.id, nextDayEnd: checkedEnd, nextDayStart: checkedStart }, prevId, dayId, userData.id)
      if(image) {
        const imageRef = ref(storage, `medellinstyle/${userData.id}`)
        await uploadBytes(imageRef, image)
      }
    setDisabledButton(true)
    }
    
    closeModal()
  }
  const hanldeCheckBox = (e) => {
    setCheckedEnd(e.target.checked)
  }
  const handleCheckBoxStart = (e) => {
    setCheckedStart(e.target.checked)
  }
  return ( 
    <>
      <div className="new__Day__form">
        <div onClick={closeModal} className="new__Day__form__close">
          <CloseIcon fontSize="large" /> <b>CERRAR</b>
        </div>
        <div className="new__Day__form__title">
          <h2>{userData.id === undefined ? "Crear un nuevo Artista" : "Editar Artista"}</h2>
        </div>
        <div className="new__Day__form__inputs">
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={validationSchema}
            onSubmit={values =>{
              handleSubmit(values)
              console.log(values)
            }}
            //Show the values in the console
            validate={values => console.log(values)}
          >
            <Form className='form'>
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
                <TimePickerUI  name="startTime" label="Hora de Inicio"/>
              </div>
              {/* Next Day Start? */}
              <FormGroup>
                <FormControlLabel control={<Checkbox onChange={handleCheckBoxStart} />} label="¿Inicia el día siguiente?" />
              </FormGroup>
              {/* End Time */}
              <div className="single__input">
                <label htmlFor="endTime">Hora fin</label>
                <TimePickerUI name="endTime" label="Hora de Finalización"/>
              </div>
              {/* Next Day End? */}
              <div className="single__input">
              <FormGroup>
                <FormControlLabel control={<Checkbox onChange={hanldeCheckBox} />} label="¿Termina el día siguiente?" />
              </FormGroup>
              </div>
              {/* Add Image Profile picture */}
              <div className="single__input image_input">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {image === null ? null : <img src={createObjectURL} alt=""/>}
                <label className='uploadImageButton' htmlFor="image">
                  <div><UploadIcon/> Subir Imagen</div>
                </label>
                <input accept="image/*" type="file" name="image" id="image" onChange={uploadToClient}  />
              </div>
              {/* Create Artist */}
              <div className="single__input">
                {userData && userData.id === undefined ? 
                  <ButtonPrimary disabled={disabledButton}>AGREGAR ARTISTA</ButtonPrimary> : 
                  <ButtonPrimary>ACTUALIZAR ARTISTA</ButtonPrimary>
                }
              </div>
            </Form>
          </Formik> 
        </div>
      </div>
      <style jsx>{`
        .new__Day__form {
          width: max-content;
          min-width: 600px;
          height: 95%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
          padding: 2rem;
          z-index: 99;
          overflow-y: scroll;
        }

        @media (max-width: 768px) {
          .new__Day__form {
            width: 95%;
            padding: 0;
          }
        }

        .new__Day__form__close {
          width: 60%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          cursor: pointer ;
          margin-top: 8rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .new__Day__form__close {
            width: 50%;
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
            margin-bottom: 1rem;
          }
        }

        .new__Day__form__title p {
          margin: 0;
        }

        .single__input {
          width: 100%;
          max-width: 500px;
          margin: 1rem 0;
          display: flex ;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .single__input {
            width: 90%;
            margin: 0 auto;
          }
        }
        .image_input input {
          display: none;
        }

        .image_input img {
          width: 130px;
          margin: 0 auto;
          height: auto;
          margin-bottom: 1rem;
        }
        .image_input label {
          width: 100%;
          margin-bottom: 1rem;
        }
        .uploadImageButton > div {
          width: 100%;
          height: 40px;
          background: #000;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
        }
        `}</style>
    </>
   )
}
 
export default NewArtistForm
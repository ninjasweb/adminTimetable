import TextFieldUI from "./TextFieldUI"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import DatePickerUI from "./DatePickerUI"
import TimePickerUI from "./TimePickerUI"
import ButtonPrimary from "../Common/ButtonPrimary"
import CloseIcon from '@mui/icons-material/Close'
import { useUserContext } from "../../context/userContext"
import { useState } from "react"

const NewDayForm = ({closeModal, userData}) => {

  const { createDay, updateDay } = useUserContext()
  const [disabledButton , setDisabledButton] = useState(false)

  const INITIAL_FORM_STATE = {
    name: userData.dayId === undefined ? "" : userData.name,
    desc: userData.dayId === undefined ? "" : userData.desc,
    date: userData.dayId === undefined ? "" : userData.date,
    initialHour: userData.dayId === undefined ? "" : userData.initialHour,
    finalHour: userData.dayId === undefined ? "" : userData.finalHour,
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    date: Yup.date().typeError("La fecha es incorrecta").required('La fecha es obligatoria'),
    initialHour: Yup.string().required('La hora inicial es requerida'),
    finalHour: Yup.string().required('La hora final es requerida'),
  })
  //Create an unique id for the day  
  const id = Math.random().toString(36).substring(2, 5) + Math.random().toString(8).substring(2, 5)

  // OnSubmit handler  // Initialize the validation schema
  const handleSubmit = async (values) => {
    setDisabledButton(true)
    const dayId = values.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/ /g, "-").concat(id)
    if(userData.dayId === undefined) {
      await createDay(
        values.name, 
        values.date, 
        values.desc,
        values.initialHour,
        values.finalHour,
        dayId
        )
    } else {
      await updateDay(
        values.name, 
        values.date, 
        values.desc,
        values.initialHour,
        values.finalHour,
        userData.dayId
        )
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
          <h2>{userData.dayId === undefined ? "Crear un nuevo día/evento" : "Editar día"}</h2>
          <p>{userData.dayId === undefined ? "" : `Nombre: ${userData.name}`}</p>
          <p>{userData.dayId === undefined ? "" : `Fecha: ${userData.date}`}</p>
        </div>
        <div className="new__Day__form__inputs">
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={validationSchema}
            onSubmit={values =>{
              console.log(values)
              handleSubmit(values)
            }}
          >
            <Form>
              {/* Day Name */}
              <div className="single__input">
                <TextFieldUI label="Nombre" name="name" placeholder="Nombre del día/evento"/>
              </div>
              {/* Description Day */}
              <div className="single__input">
                <TextFieldUI label="Descripción" name="desc" placeholder="Descripción"/>
              </div>
              {/* Day Date */}
              <div className="single__input">
                <DatePickerUI label="Fecha (MM/DD/AAAA)" name="date"/>
              </div>
              {/* Day Initial Hour */}
              <div className="single__input">
                <TimePickerUI label="Hora de inicio" name="initialHour"/>
              </div>
              {/* Day Final Hour */}
              <div className="single__input">
                <TimePickerUI label="Hora finalización" name="finalHour"/>
              </div>
              {/* Create Day */}
              <div className="single__input">
                {userData && userData.dayId === undefined ? 
                  <ButtonPrimary disabled={disabledButton}>AGREGAR DÍA</ButtonPrimary> : 
                  <ButtonPrimary>ACTUALIZAR DÍA</ButtonPrimary>
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
        }

        .new__Day__form__close {
          width: 60%;
          display: flex;
          justify-content: flex-end;
          cursor: pointer ;
        }

        .new__Day__form__title {
          width: 100% ;
          text-align: center ;
        }

        .new__Day__form__title h2 {
          margin: 0;
        }

        .new__Day__form__title p {
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
 
export default NewDayForm
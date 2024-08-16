import { Formik, Form } from "formik"
import * as Yup from "yup"
import TextFieldUI from "./TextFieldUI"
import ButtonPrimary from "../Common/ButtonPrimary"
import { useUserContext } from "../../context/userContext"
import Loading from "../Loading"

const EventInfoForm = () => {
  const { eventInfo, updateEventInfo } = useUserContext()
  const INITIAL_FORM_STATE = {
    name: (eventInfo && eventInfo[0].name) || "",
    date: (eventInfo && eventInfo[0].date) || "",
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
  })

  const handleSubmit = async (values) => {
    console.log(values)
    updateEventInfo(values.name, values.date)
  }
  return (
    <div
      style={{
        padding: "20px",
        paddingBottom: "80px",
      }}
    >
      {eventInfo && eventInfo[0].name ? (
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Event Name */}
            <div>
              <label
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
                htmlFor="name"
              >
                Nombre del Evento
              </label>
              <TextFieldUI
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
                name="name"
                label=""
              />
            </div>
            {/* Event Date */}
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <label
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
                htmlFor="date"
              >
                Fecha del Evento
              </label>
              <TextFieldUI
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
                name="date"
                label=""
                placeholder="Agosto 2 & 3 de 2024"
              />
            </div>
            {/* Submit */}
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <ButtonPrimary>Guardar</ButtonPrimary>
            </div>
          </Form>
        </Formik>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      )}
    </div>
  )
}

export default EventInfoForm

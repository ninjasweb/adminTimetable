import { useState } from "react"
import { useUserContext } from "../../context/userContext"
import DayCard from "../Cards/DayCard"
import AddButton from "../Common/AddButton"
import DeleteAlert from "../Common/DeleteAlert"
import Modal from "../Common/Modal"
import NewDayForm from "../Form/NewDayForm"

const Home = () => {
  const { collectionGroup, deleteDay } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [eventId, setEventId] = useState(null)

  const handleModal = (name, date, desc, dayId, initialHour, finalHour) => {
    setIsModalOpen(!isModalOpen)
    setUserData({
      name: name,
      desc: desc,
      date: date,
      dayId: dayId,
      initialHour: initialHour,
      finalHour: finalHour,
    })
  }

  const handleDeleteModal = (e, dayId) => {
    e.stopPropagation()
    setEventId(dayId)
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  const handleDelete = () => {
    deleteDay(eventId)
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  return (
    <>
      <div className="home__container">
        {collectionGroup && collectionGroup.length > 0 ? (
          collectionGroup.map((event) => {
            return (
              <DayCard
                handleModal={handleModal}
                handleDeleteModal={handleDeleteModal}
                key={event.dayId}
                dayId={event.dayId}
                name={event.name}
                desc={event.desc}
                date={event.date}
                initialHour={event.initialHour}
                finalHour={event.finalHour}
              />
            )
          })
        ) : (
          <p>Aún no has agregado ningún evento.</p>
        )}
        {isModalOpen ? (
          <Modal>
            <NewDayForm userData={userData} closeModal={handleModal} />
          </Modal>
        ) : null}
        <AddButton onClick={handleModal} />

        {isDeleteModalOpen ? (
          <Modal>
            <DeleteAlert
              handleDeleteModal={handleDeleteModal}
              handleDelete={handleDelete}
            />
          </Modal>
        ) : null}
      </div>
      <style jsx>{`
        .home__container {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          grid-gap: 1rem;
          padding: 1rem;
          justify-items: center;
        }

        .home__container p {
          color: #fff;
        }
      `}</style>
    </>
  )
}

export default Home

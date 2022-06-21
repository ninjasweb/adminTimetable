import { useState } from "react"
import { useUserContext } from "../../context/userContext"
import DayCard from "../Cards/DayCard"
import AddButton from "../Common/AddButton"
import Modal from "../Common/Modal"
import NewDayForm from "../Form/NewDayForm"

const Home = () => {
  const {collectionGroup } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState({})

  const handleModal = (name, date, dayId) => {
    setIsModalOpen(!isModalOpen)
    setUserData({
      name: name,
      date: date,
      dayId: dayId,
    })
  }
  
  return (
    <>
      <div className="home__container">
        {collectionGroup && collectionGroup.length > 0 ? collectionGroup.map((event)=>{
          return (
            <DayCard 
              handleModal={handleModal} 
              key={event.dayId} 
              dayId={event.dayId} 
              name={event.name} 
              date={event.date}/>
          )
        }) : <p>Aún no has agregado ningún evento.</p>
      }
        {isModalOpen ? <Modal><NewDayForm userData={userData} closeModal={handleModal} /></Modal> : null}
        <AddButton onClick={handleModal}/>
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
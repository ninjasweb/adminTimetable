import { useEffect, useState } from "react"
import StageCards from "../../components/Cards/StageCards"
import AddButton from "../../components/Common/AddButton"
import Layout from "../../components/Common/Layout"
import Modal from "../../components/Common/Modal"
import NewStageForm from "../../components/Form/NewStageForm"
import { useUserContext } from "../../context/userContext"
import CircularProgress from '@mui/material/CircularProgress'

const SingleDay = ({id}) => {
  const {singleDay, stages} = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState({})

  const handleModal = (name, desc, uid) => {
    setIsModalOpen(!isModalOpen)
    setUserData({
      name: name,
      desc: desc,
      id: uid,
      prevId: id
    })
  }

  return (
    <>
      <Layout title={`Agrega los Stage a: ${singleDay && singleDay.name} (${singleDay && singleDay.date })`}>
        <div className="single__day">
          {stages && stages.length > 0 ? stages.map((stage)=>{
            return (
              <StageCards 
                handleModal={handleModal} 
                key={stage.id} 
                id={stage.id} 
                name={stage.name} 
                desc={stage.desc}
                prevId={id}
                />
            )
          }) :  <div className="loading"><CircularProgress color="success"/><p>Aún no has agregado ningún Stage.</p></div>}
        </div>
        {isModalOpen ? <Modal><NewStageForm prevId={id} userData={userData} closeModal={handleModal}  /></Modal> : null}
        <AddButton onClick={handleModal}/>
      </Layout>
      <style jsx>{`
        .single__day {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          grid-gap: 1rem;
          padding: 1rem;
          justify-items: center;
          text-align: center;
        }
        `}</style>
    </>
    
   )
}

SingleDay.getInitialProps = async ({query} ) => {
  return {
    id: query.id
  }
}
 
export default SingleDay
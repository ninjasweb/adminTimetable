import { useState } from "react"
import StageCards from "../../components/Cards/StageCards"
import AddButton from "../../components/Common/AddButton"
import Layout from "../../components/Common/Layout"
import Modal from "../../components/Common/Modal"
import NewStageForm from "../../components/Form/NewStageForm"
import { useUserContext } from "../../context/userContext"
import CircularProgress from '@mui/material/CircularProgress'
import DeleteAlert from "../../components/Common/DeleteAlert"

const SingleDay = ({id}) => {
  const {singleDay, stages, deleteStage} = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [stageData, setStageData] = useState({})

  const handleModal = (name, desc, uid) => {
    setIsModalOpen(!isModalOpen)
    setUserData({
      name: name,
      desc: desc,
      id: uid,
      prevId: id
    })
  }

  const handleDeleteModal = (e, id, prevId) => {
    e.stopPropagation()
    setStageData({
      id: id,
      prevId: prevId
    })
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  const handleDelete = () => {
    deleteStage(stageData.id, stageData.prevId)
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  return (
    <>
      <Layout title={`Agrega los Stage a: ${singleDay && singleDay.name} (${singleDay && singleDay.date })`}>
        <div className="single__day">
          {stages && stages.length > 0 ? stages.map((stage)=>{
            return (
              <StageCards 
                handleModal={handleModal}
                handleDeleteModal={handleDeleteModal}
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

        {isDeleteModalOpen ? <Modal><DeleteAlert handleDeleteModal={handleDeleteModal} handleDelete={handleDelete}/></Modal> : null} 

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
          padding-bottom: 4rem;
        }

        .loading p {
          color: #fff;
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
import { useState } from "react"
import AddButton from "../../components/Common/AddButton"
import Layout from "../../components/Common/Layout"
import Modal from "../../components/Common/Modal"
import NewArtistForm from "../../components/Form/NewArtistForm"
import { useUserContext } from "../../context/userContext"
import { useRouter } from "next/router"
import ArtistCard from "../../components/Cards/ArtistCard"

const SingleStage = ({id}) => {
  const router = useRouter()
  const dayId = router.query.prevId

  const {artists} = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState(null)


  const handleModal = (values, prevId, uid, id) => {
    console.log(values, prevId, uid, id)
    setIsModalOpen(!isModalOpen)
    setUserData({
      values: values,
      prevId: prevId,
      uid: uid,
      id: id
    })
  }

  return (
    <>
      <Layout title="Agrega los artistas a los Stage">
        <div className="stage__container">
          {
          artists && artists.length > 0 ? artists.map((artist, key)=>{
            return (
              <ArtistCard 
                key={key} 
                artist={artist.values} 
                prevId={artist.prevId} 
                uid={artist.uid}
                handleModal={handleModal}
              />
            )
          }) :  
          <div className="loading">
            <p>Aún no has agregado ningún artista.</p>
          </div>
          }
        </div>
        {isModalOpen ? <Modal><NewArtistForm prevId={id} dayId={dayId} userData={userData} closeModal={handleModal}/></Modal> : null}
        <AddButton onClick={handleModal}/>
      </Layout>

      <style jsx>{`
        .stage__container {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          grid-gap: 2rem;
          padding: 1rem 0.2rem 4rem 0.2rem;
        }
        `}</style>
    </>
    
   )
}

SingleStage.getInitialProps = async ({query}) => {
  return {
    id: query.id
  }
}
 
export default SingleStage
import { useState } from "react"
import AddButton from "../../components/Common/AddButton"
import Layout from "../../components/Common/Layout"
import Modal from "../../components/Common/Modal"
import NewArtistForm from "../../components/Form/NewArtistForm"
import { useUserContext } from "../../context/userContext"
import { useRouter } from "next/router"
import ArtistCard from "../../components/Cards/ArtistCard"
import CircularProgress from '@mui/material/CircularProgress'
import DeleteAlert from "../../components/Common/DeleteAlert"

const SingleStage = ({id}) => {
  const router = useRouter()
  const dayId = router.query.prevId

  const {artists, deleteArtist} = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const [artistData, setArtistData] = useState({})

  console.log(artists)


  const handleModal = (values, prevId, uid, id) => {
    setIsModalOpen(!isModalOpen)
    setUserData({
      values: values,
      prevId: prevId,
      uid: uid,
      id: id
    })
  }

  const handleDeleteModal = (e, artist, prevId, uid) => {
    e.stopPropagation()
    setArtistData({
      artistId: artist,
      prevId: prevId,
      uid: uid
    })
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  const handleDelete = () => {
    deleteArtist(artistData.artistId, artistData.prevId, artistData.uid)
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  return (
    <>
      <Layout title="Agrega los artistas a los Stage">
        <div className="stage__container">
          {
          artists && artists.length > 0 ? artists.map((artist, key)=>{
            console.log(key)
            return (
              <ArtistCard 
                key={key}
                index={key}
                artist={artist.values} 
                prevId={artist.prevId} 
                uid={artist.uid}
                handleModal={handleModal}
                handleDeleteModal={handleDeleteModal}
              />
            )
          }) :  
          <div className="loading">
            <CircularProgress color="success"/>
            <p>Aún no has agregado ningún artista.</p>
          </div>
          }
        </div>

        {isModalOpen ? <Modal><NewArtistForm prevId={id} dayId={dayId} userData={userData} closeModal={handleModal}/></Modal> : null}
        
        {isDeleteModalOpen ? <Modal><DeleteAlert handleDeleteModal={handleDeleteModal} handleDelete={handleDelete} /></Modal> : null}

        <AddButton onClick={handleModal}/>
      </Layout>

      <style jsx>{`
        .stage__container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0.2rem 4rem 0.2rem;
          padding-bottom: 4rem;
        }

        .loading {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .stage__container .loading p {
          color: #fff !important;
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
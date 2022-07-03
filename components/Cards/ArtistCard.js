import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ArtistCard = ({artist, prevId, uid, handleModal, handleDeleteModal}) => {
  //console.log(artist)
  // const {deleteArtist} = useUserContext()
  // const handleDelete = (e) => {
  //   e.stopPropagation()
  //   deleteArtist(artist.id, prevId, uid, e)
  // }
  return (
    <>
      <div className="artist__card">
        <div className="artist__card__title">
          <h2>{artist.name}</h2>
          <p>Perfomance: <b>{artist.perfomance}</b></p>
          <p>Genre: <b>{artist.genre}</b></p>
          <p>Start Time: <b>{artist.startTime}</b></p>
          <p>End Time: <b>{artist.endTime}</b></p>
        </div>
        <div className="artist__card__buttons">
          <button className="btn" onClick={()=> handleModal(artist, prevId, uid, artist.id)}><EditIcon/> Editar</button>
          <button className="btn delete" onClick={(e)=>handleDeleteModal(e, artist.id, prevId, uid)}><DeleteIcon/> Delete</button>
        </div>
      </div>
      <style jsx>{`
        .artist__card {
          width: 100%;
          height: 100%;
          max-width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
          padding: 1rem;
        }

        .artist__card__buttons {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .artist__card__buttons button {
          width: 100px;
          margin: 0 5px;
        }
        
        `}</style>
    </>
    
   )
}
 
export default ArtistCard
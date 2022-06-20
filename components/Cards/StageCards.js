import Link from 'next/link'
import { useUserContext } from "../../context/userContext"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const StageCards = ({name, desc, id, prevId, handleModal}) => {
  const {deleteStage} = useUserContext()
  const handleDelete = (e) => {
    e.stopPropagation()
    deleteStage(id, prevId, e)
  }

  return (
    <>
      <div className="card">
        <Link href={{
          pathname: `/stage/${id}`,
          query: {
            id: prevId,
            prevId: prevId
          }
        }}>
          <div className="card__title">
            <p>Stage: </p> 
            <h2>{name}</h2>
          </div>
        </Link>
        <div className="card__date">{desc}</div>
        <div className="card__controls">
          <button className="btn" onClick={()=> handleModal(name, desc, id)}><EditIcon/> Editar</button>
          <button className="btn delete" onClick={(e)=> handleDelete(e)} ><DeleteIcon/> Eliminar</button>
        </div>
      </div>
      <style jsx>{`
      .card {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, 
          rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, 
          rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
          border-radius: 15px;
          overflow: hidden ;                      
        }

        .card__title {
          width: 100%;
          height: 40%;
          background-color: var(--dark);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          text-align: center;
          border-radius: 15px 15px 0 0;
          cursor: pointer;
        }

        .card__title p {
          margin-right: 5px;
        }

        .card_title h2 {
          margin: 0;
        }


        .card__date {
          width: 100%;
          height: 25%;
          background-color: var(--purple);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }

        .card__controls {
          height: 25%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 5px;
          margin-bottom: 5px ;
        }

        .card__controls button {
          font-size: 1rem !important;
          margin: 0 5px;
        }

        `}</style>
    </> 
    
   )
}
 
export default StageCards
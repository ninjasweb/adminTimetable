import { useUserContext } from "../../context/userContext"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'

const DayCard = ({name, date, dayId, handleModal}) => { 
  const {deleteDay} = useUserContext()
  const handleDelete = (e) => {
    e.stopPropagation()
    deleteDay(dayId, e)
  }
  return ( 
    <>
      <div className="card">
        <Link href={`/single_day/${dayId}`}>
          <div className="card__title"><h2>{name}</h2></div>
        </Link>
        <div className="card__date">{date}</div>
        <div className="card__controls">
          <button className="btn" onClick={()=> handleModal(name, date, dayId)}><EditIcon/> Editar</button>
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
          background-color: var(--gray);
        }

        .card__title {
          width: 100%;
          height: 40%;
          background-color: var(--dark);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #000;
          text-align: center;
          border-radius: 15px 15px 0 0;
          cursor: pointer;
          background-color: var(--gray);
        }

        .card__date {
          width: 100%;
          height: 25%;
          background-color: var(--green);
          display: flex;
          justify-content: center;
          align-items: center;
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
   );
}
 
export default DayCard
import ButtonPrimary from "./ButtonPrimary"
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteAlert = ({handleDeleteModal, handleDelete}) => {
  return ( 
    <>
      <div className="delete__modal">
        <p>¿Estás seguro que deseas eliminar este elemento?</p>
        <div className="delete__buttons">
          <button className="btn" onClick={handleDeleteModal}>NO</button>
          <button type="submit" onClick={handleDelete} className="btn delete"><DeleteIcon/> SI</button>
        </div>
      </div>
      <style jsx>{`
        .delete__modal {
          background-color: #fff;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
        }

        .delete__buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          align-items: center;
        }

        .delete__buttons button {
          margin: 0 1rem;
        }
        `}</style>
    </>
   )
}
 
export default DeleteAlert
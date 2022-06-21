import AddIcon from '@mui/icons-material/Add'

const AddButton = ({onClick}) => {
  return ( 
    <>
      <button title="Agregar" onClick={onClick}><AddIcon fontSize='large'/></button>
      <style jsx>{`
        button {
          position: fixed;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background-color: var(--dark);
          color: var(--green);
          border: none;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
          margin-right: 2rem;
          margin-bottom: 2rem;
          z-index: 3 ;
        }

        button:hover {
          box-shadow: none;
        }
        `}</style>
    </>
   )
}
 
export default AddButton
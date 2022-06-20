import CircularProgress from '@mui/material/CircularProgress'

const Loading = () => {
  return (
    <>
      <div className="loading">
        <CircularProgress color="success" />
      </div>
      <style jsx>{`
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: var(--dark);
        }
        `}</style>
    </>
    
   )
}
 
export default Loading
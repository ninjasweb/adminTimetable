const Modal = ({children}) => {
  return ( 
    <>
      <div className="modal">
        {children}
      </div>
      <style jsx>{`
        .modal {
          width: 100vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #2D2D2DC4;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 4;
        }
        `}</style>
    </>
   )
}
 
export default Modal
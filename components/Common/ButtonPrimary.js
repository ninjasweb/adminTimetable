
const ButtonPrimary = ({children, disabled}) => {

  return (
    <>
      <button disabled={disabled} type="submit" className="btn btn__primary">{children}</button>
      <style jsx>{`
        .btn__primary:disabled {
          background-color: #ccc;
          color: #fff;
        }
        `}</style>
    </>
   )
}
 
export default ButtonPrimary
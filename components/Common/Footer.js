import { useUserContext } from "../../context/userContext"
import LogoutIcon from '@mui/icons-material/Logout'

const Footer = () => {
  const { logout} = useUserContext()
  return (
    <>
      <footer className="footer">
        <button className="btn" onClick={() => logout()}><LogoutIcon/> Logout</button>
      </footer>
      <style jsx>{`
        .footer {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          clear: both;    
          background-color: var(--dark);
          position: fixed;
          bottom: 0;
          left: 0;
          padding: 0 2rem;
          border-top: 1px solid #000 ;
        }
        .btn {
          width: max-content ;
        }
        `}</style>
    </>
    
   )
}
 
export default Footer
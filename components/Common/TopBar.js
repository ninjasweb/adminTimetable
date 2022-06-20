import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const TopBar = ({title}) => {
  const router = useRouter()
  const homePath = router.pathname === '/'
  return (
    <>
      <div className="top__bar">
          <Link href="/">
            <a className="top__bar__logo">
              <Image width={350} height={100} src="/logo.png" alt="Logo" />
            </a>
          </Link>
        <div className='top__title'>
          {/* Go Back */}
          {homePath ? null 
              : 
              <div className='goBack' onClick={()=> router.back()}>
                <p> <ArrowBackIosNewIcon/></p>
              </div>
          }
          
          <p>{title}</p>
        </div>
      </div>
      <style jsx>{`
        .top__bar {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: var(--dark);
        }

        .top__title {
          width: 100%;
          background-color: #000;
          color: #fff;
          text-align: center;
          padding: 10px;
          font-family: Deciso, sans-serif !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .goBack {
          border: 1px solid #fff;
          border-radius: 8px;
          padding: 5px 20px;
          cursor: pointer;
          display: flex ;
          justify-content: center;
          align-items: center;
          position: relative;
          margin-right: 1rem;
        }
        .goBack p {
          margin: 0;
        }
        
        `}</style>
    </>
    
   )
}
 
export default TopBar
import Loading from "../components/Loading"
import { useUserContext } from "../context/userContext"
import { useRouter } from "next/router"




const Error404 = () => {
  const { loading , user} = useUserContext()
  const router = useRouter() 
  if (loading) {
    return <Loading/>
  }
  
  if (user === null) {
   router.push('/login')
  }
  return ( 
    <p>Ups!!</p>
   );
}
 
export default Error404;
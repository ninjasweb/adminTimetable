import { createContext, useEffect, useState, useContext } from "react"
import {auth, db} from '../firebase/initFirebase'
import {useRouter} from 'next/router'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  } 
  from 'firebase/auth'
  import {doc, setDoc, onSnapshot, collection, query, orderBy, deleteDoc, updateDoc, getDoc, getDocs} from 'firebase/firestore'

  const UserContext = createContext({})

  export const useUserContext = () => useContext(UserContext)

  export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [collectionGroup, setCollectionGroup] = useState(null)
    const [singleDay, setSingleDay] = useState(null)
    const [stages, setStages] = useState(null)
    const [artists , setArtists] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()
    const queryId = router.query.id
    const queryPrevId = router.query.prevId


    // Keep track of the user
    useEffect(() => {
      setLoading(true)
          const unsuscribe = onAuthStateChanged(auth, (res)=>{
          res ? setUser(res) : setUser(null)
          setError("")
          setLoading(false)
      })
      return unsuscribe
      }, [])

    //Login
    const login = async (email, password) => {
      setLoading(true)
      try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        setUser(user)
        setLoading(false)
        router.push('/')
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }

    //Logout
    const logout = async () => {
      setLoading(true)
      try {
        await signOut(auth)
        setUser(null)
        setLoading(false)
        router.push('/login')
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  //Get all days from event
  useEffect(() => {
    if(user){
      const collectionRef = collection(db, 'evento')
      const queryRef = query(collectionRef, orderBy('date', 'asc'))
      const unsuscribe = onSnapshot(queryRef, (res)=>{
        setCollectionGroup(res.docs.map(doc => doc.data()))
      })
      return unsuscribe
    }
  }, [user])

// Get Single Day info from Firestore with ID
  useEffect(() => {
    if(queryId){
      const docRef = doc(db, `evento/${queryId}`)
      const unsuscribe = onSnapshot(docRef, (res)=>{
        setSingleDay(res.data())
      })
      return unsuscribe
    }
  }, [queryId])

  //Create new day
  const createDay = async (name, date, dayId) => {
    try {
      const collectionRef = collection(db, 'evento')
      const docRef = doc(collectionRef, dayId)
      await setDoc(docRef, {name, date, dayId})
  } catch (error) {
    setLoading(false)
    setError(error)
  }
}
  //Detele Day
const deleteDay = async (dayId) => {
  try {
    const collectionRef = collection(db, 'evento')
    const docRef = doc(collectionRef, dayId)
    await deleteDoc(docRef)
  } catch (error) {
    setLoading(false)
    setError(error)
  }
}
  //Update Day
  const updateDay = async (name, date, dayId) => {
    try {
      const collectionRef = collection(db, 'evento')
      const docRef = doc(collectionRef, dayId)
      await updateDoc(docRef, {name, date, dayId})
  } catch (error) {
    setLoading(false)
    setError(error)
  }
}
  //Create new Stage
  const createStage = async (name, desc, id, prevId) => {
    console.log(id, prevId)
    try {
      const collectionRef = collection(db, 'evento', `/${prevId}/stages`)
      const docRef = doc(collectionRef, id)
      await setDoc(docRef, {name, desc, id})
  } catch (error) {
    setLoading(false)
    setError(error)
  }
}
  //Delete Stage
  const deleteStage = async (id, prevId) => {
    try {
      const collectionRef = collection(db, 'evento', `/${prevId}/stages`)
      const docRef = doc(collectionRef, id)
      await deleteDoc(docRef)
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }
  //Update Stage
  const updateStage = async (name, desc, id, prevId) => {
    try {
      const collectionRef = collection(db, 'evento', `/${prevId}/stages`)
      const docRef = doc(collectionRef, id)
      await updateDoc(docRef, {name, desc, id})
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  //Get all Stages from Day
    useEffect(() => {
      if(user){
        const querySnapshot = (collection(db, 'evento', `/${queryId}/stages`))
        const unsuscribe = onSnapshot(querySnapshot, (res)=>{
          setStages(res.docs.map(doc => doc.data()))
        })
        return unsuscribe
        }
    }, [queryId, user])

  // Create new Artist
  const createArtist = async (values, prevId, uid , newId) => {
    try {
      const collectionRef = collection(db, 'evento', `/${uid}/stages/${prevId}/artist`)
      const docRef = doc(collectionRef, newId)
      await setDoc(docRef, {values, prevId, uid})
    } catch (error) {
      setLoading(false)
      setError(error)
  }
}

  //Delete Artist
  async function deleteArtist(id, prevId, uid) {
      try {
        const collectionRef = collection(db, 'evento', `/${uid}/stages/${prevId}/artist`)
        const docRef = doc(collectionRef, id)
        await deleteDoc(docRef)
      }
      catch (error) {
        setLoading(false)
        setError(error)
      }
    }

  //Update Artist
  const updateArtist = async (values, prevId, uid, id) => {
    console.log(values, prevId, uid, id)
    try {
      const collectionRef = collection(db, 'evento', `/${uid}/stages/${prevId}/artist`)
      const docRef = doc(collectionRef, id)
      await updateDoc(docRef, {values, prevId, uid})
  } catch (error) {
    setLoading(false)
    setError(error)
  }
}

  // Get all artist from Stage
  useEffect(() => {
    if(user){
      const querySnapshot = (collection(db, 'evento', `/${queryPrevId}/stages/${queryId}/artist`))
      const unsuscribe = onSnapshot(querySnapshot, (res)=>{
        setArtists(res.docs.map(doc => doc.data()))
    })
    return unsuscribe
    }
  }, [user, queryId, queryPrevId])

    const contextValue = {
      user,
      loading,
      error,
      login,
      logout,
      collectionGroup,
      singleDay,
      createDay,
      deleteDay,
      updateDay,
      createStage,
      deleteStage,
      updateStage,
      stages,
      createArtist,
      deleteArtist,
      updateArtist,
      artists,
    }

    return(
      <UserContext.Provider  value={contextValue}>
        {children}
      </UserContext.Provider>
    )
  }
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useUserContext } from '../context/userContext'
import { useRouter } from 'next/router'
import Layout from '../components/Common/Layout'
import Loading from '../components/Loading'
import Home from '../components/pages/Home'

export default function Index() {
  const { user, loading } = useUserContext()
  const router = useRouter()

  if (loading) {
    return <Loading/>
  }

 if (user === null) {
   router.push('/login')
 }

  return (
    <div className={styles.container}>
      <Head>
        <title>Timetable Medellinstyle</title>
        <meta name="description" content="Timetable Admin Medellinstyle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Agrega o edita los días">
        {user ? <Home/> : <Loading/>}
      </Layout>
    </div>
  )
}

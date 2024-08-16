import Footer from "./Footer"
import TopBar from "./TopBar"
import Head from "next/head"

const Layout = ({ children, title }) => {
  return (
    <>
      <div className="layout">
        <Head>
          <title>{title}</title>
        </Head>
        <TopBar title={title} />
        <div className="body__layout">{children}</div>
        <Footer />
      </div>
      <style jsx>{`
        .layout {
          width: 100%;
          height: 100%;
        }

        .body__layout {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </>
  )
}

export default Layout

import Meta from './Meta'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from '../../styles/Layout.module.css'

const layout = ({children, title}) => {
  return (
    <>
      <Meta title={title} />
      <Navbar />
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default layout

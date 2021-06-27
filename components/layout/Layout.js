import Meta from './Meta'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from '@/styles/Layout.module.css'
import Showcase from '@/components/Showcase'
import {useRouter} from 'next/router'



const Layout = ({children, title}) => {
  const router = useRouter();
  return (
    <>
      <Meta title={title} />
      <Navbar />
      {router.pathname==="/" && <Showcase />}
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout

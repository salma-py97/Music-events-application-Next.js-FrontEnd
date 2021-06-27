import Layout from '@/components/layout/Layout'
import styles from '@/styles/404.module.css'
import Link from 'next/link'
import { FaExclamationTriangle} from 'react-icons/fa'
import { FaArrowLeft} from 'react-icons/fa'

const NotFoundPage = () => {
  const {error} = styles
  return (
    <Layout title="DJ Events - Page Not Found">
      <div className={error}>
        <h1><FaExclamationTriangle /> 404</h1>
        <h2>Sorry, Page Not Found</h2><br />
        <Link href="/">
          <a>
            <FaArrowLeft />&nbsp;&nbsp;Back home
          </a>
          </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

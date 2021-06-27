import Link from 'next/link'
import styles from '../../styles/Footer.module.css'

const Footer = () => {
  const {footer, p} = styles
  return (
    <footer className={footer}>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  )
}

export default Footer

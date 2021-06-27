import Link from 'next/link'
import styles from '../../styles/Navbar.module.css'


const Navbar = () => {
  const {header, logo, } = styles;

  return (
    <header className={header}>
      <div className={logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

import Link from 'next/link'
import styles from '@/styles/Navbar.module.css'
import Search from '@/components/Search'


const Navbar = () => {
  const {header, logo, } = styles;

  return (
    <header className={header}>
      <div className={logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          <li>
            <Link href="/events/add">
              <a>Add Event</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

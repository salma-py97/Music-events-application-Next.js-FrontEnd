import styles from '@/styles/Search.module.css'
import {useState} from 'react'
import {useRouter} from 'next/router'


const Search = () => {
  const [term, setTerm] = useState('')
  const router = useRouter()

  const {search} = styles

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
    // clear the form
    setTerm('')
  }

  return (
    <div className={search}>
      <form onSubmit = {handleSubmit}>
        <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search Events..." />
      </form>
    </div>
  )
}





export default Search

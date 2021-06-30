import Layout from '@/components/layout/Layout'
import {API_URL} from '@/config/index'
import Link from 'next/link'
import qs from 'qs'

import {useRouter} from 'next/router'

import EventItem from '@/components/EventItem'



// catch the events fetched from getServerSideProps
const SearchPage = ({events}) => {
  // this runs server side first, then runs on the client side
  // see chrome console
  // console.log(events)

  const router = useRouter()
  return (
    <Layout title="DJ Events - Events">
      <Link href="/events"><a>{" < "} GO BACK </a></Link><br />
      <h1>Search Results for : {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
        ))}
    </Layout>
  )
}

export default SearchPage


// We are using getServerSideProps because we don't know what the user will search for so we can't generate paths on build time with getStaticPaths
export const getServerSideProps = async ({query: {term}}) => {
  // install qs package: npm i qs
  // now we will be searching not only for the name, but for the name, performers, description and venue
  const query = qs.stringify({
    _where: {
      _or: [
        {name_contains: term},
        {performers_contains: term},
        {description_contains: term},
        {venue_contains: term}
      ]
    }
  })
  const res = await fetch(`${API_URL}/events?${query}`)
  // http://localhost:3000/events/search?term=manny

  // https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters
  
  const events = await res.json()  
  
  return {
    props: {events}, // will be passed to the page component as props
  }
}


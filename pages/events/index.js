import Layout from '@/components/layout/Layout'
import Pagination from '@/components/Pagination'
import {API_URL, PER_PAGE} from '@/config/index'

import EventItem from '@/components/EventItem'


// catch the events fetched from getServerSideProps
const EventsPage = ({events, total, page}) => {

  // this runs server side first, then runs on the client side
  // see chrome console
  // console.log(events)
  return (
    <Layout title="DJ Events - Events">
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
        ))}

        <Pagination page={page} total={total} />
    
    </Layout>
  )
}

export default EventsPage


export const getServerSideProps = async ({query: { page = 1}}) => {

  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE


  //Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  
  const total = await totalRes.json()
 

  // Fetch events

  // const res = await fetch(`${API_URL}/api/events`)
  const eventsRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  
  const events = await eventsRes.json()
  
  // this runs server side first
  // see integrated console
  // console.log('PAGE', page)
  
  
  return {
    props: {events, page: +page, total}, // will be passed to the page component as props
    
  }
}

// the events get generated at build time one, but what if someone edit an event, they can't see the change, so we need to add a revalidate and set it to a certain amount of seconds
// revalidate: 1

// DO NOT USE REVALIDATE WITH GetServerSideProps()
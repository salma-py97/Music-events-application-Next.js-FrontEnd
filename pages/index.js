import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import {API_URL} from '@/config/index'

import EventItem from '@/components/EventItem'

// catch the events fetched from getServerSideProps
export default function HomePage({events}) {
  // this runs server side first, then runs on the client side
  // see chrome console
  console.log(events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`)

  const events = await res.json()

  // this runs server side first
  // see integrated console
  console.log(events)


  return {
    props: {events:events.slice(0, 3)}, // will be passed to the page component as props

    // the events get generated at build time one, but what if someone edit an event, they can't see the change, so we need to add a revalidate and set it to a certain amount of seconds
    revalidate: 1
  }
}
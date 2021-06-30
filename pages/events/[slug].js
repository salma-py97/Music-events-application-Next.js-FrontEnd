import {useRouter} from 'next/router'
import Layout from '@/components/layout/Layout'
import {API_URL} from '@/config/index'
import styles from '@/styles/Event.module.css'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EventPage = ({evt}) => {
  const router = useRouter();
  const {event, controls, img, back, remove} = styles
  const {name, description, slug, date, time, venue, performers, image, address, id} = evt

  const deleteEvent = async (e) => {
    e.preventDefault()
    if(confirm('Are you sure ?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events')
      }
    }
  }
  
  return (
    <Layout title={`DJ Events - ${router.query.slug}`}>
      <div className={event}>
        <div className={controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={remove} onClick={deleteEvent}><FaTimes /> Delete Event</a>
        </div>
        <span>
          {new Date(date).toLocaleDateString('en-US')} at {time}
        </span>
        <h1>{name}</h1>
        <ToastContainer />
        {image && 
          <div className={img}>
            {/* see localhost:1337/events, images is in a formats object */}
            <Image src={image.formats.medium.url} width={960} height={600} alt="" />
          </div>
        }
        <h3>Performers :</h3>
        <p>{performers}</p>
        <h3>Description :</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>
        <br />

        <Link href="/events">
          <a className={`btn-secondary ${back}`}>
           {'<'} Go Back
          </a>
        </Link>

        {/* redirecting using useRouter */}
        {/* <button className="btn-secondary" onClick={() => router.push('/')}>Go Home</button> */}
      </div>
    </Layout>
  )
}

export default EventPage

// getStaticProps() & StaticPaths()
  // getStaticPaths()
  export const getStaticPaths = async () => {
    // const res = await fetch(`${API_URL}/api/events`)
    const res = await fetch(`${API_URL}/events`)
    const events = await res.json()
    const paths = events.map(evt => ({params:{slug: evt.slug}}))
    return {
      paths,
      fallback: false,
    }
  }


  // getStaticProps()
  export const getStaticProps = async (context) => {
    // console.log(context)
    // with API Routes
    // const res = await fetch(`${API_URL}/api/events/${context.params.slug}`)
    // With Strapi, we use queries like : http://localhost:1337/events?slug=............
    const res = await fetch(`${API_URL}/events?slug=${context.params.slug}`)
    const events = await res.json()
    // console.log("EVENTS :", events)
    // EVENTS : [
      //   {
        //     id: '1',
        //     name: 'Throwback Thursdays with DJ Manny Duke',
        //     slug: 'throwback-thursdays-with-dj-manny-duke',
        //     venue: 'Horizon Club',
        //     address: '919 3rd Ave New York, New York(NY), 10022',
        //     performers: 'DJ Manny Duke',
        //     date: 'June 09, 2021',
        //     time: '10:00 PM EST',
        //     description: "Featuring deep cuts, party anthems and remixes nostalgic songs from two of the best decades of music with the very best music from the 90's and 2000's",
        //     image: '/images/sample/event1.jpg'
        //   }
        // ]

    // events is an array with one object thats why => evt: events[0]
    return {
      props :  {
        evt: events[0],
      },
      revalidate: 1
    }
  }






// getServerSideProps()

// export const getServerSideProps = async ({query:{slug}}) => {

//   const res = await fetch(`${API_URL}/api/events/${slug}`)

//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0]
//     }
//   }
// }

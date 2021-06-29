import {useRouter} from 'next/router'
import Layout from '@/components/layout/Layout'
import {API_URL} from '@/config/index'


const EventPage = ({evt}) => {
  const router = useRouter();
  
  return (
    <Layout title={`DJ Events - ${router.query.slug}`}>
      <div>
        <h1>My event</h1>
        <h3>{evt.name}</h3>
        <br />
        <button className="btn-secondary" onClick={() => router.push('/')}>Go Home</button>
      </div>
    </Layout>
  )
}

export default EventPage

// getStaticProps() & StaticPaths()
export const getStaticProps = async (context) => {

  console.log(context)

  const res = await fetch(`${API_URL}/api/events/${context.params.slug}`)

  const events = await res.json()

  return {
    props :  {
      evt: events[0],
    },
    revalidate: 1
  }
}
export const getStaticPaths = async () => {

  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()


  const paths = events.map(evt => ({params:{slug: evt.slug}}))

  return {
    paths,
    fallback: false,
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

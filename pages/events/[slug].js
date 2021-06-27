import {useRouter} from 'next/router'
import Layout from '@/components/layout/Layout'



const EventPage = () => {
  const router = useRouter();
  
  console.log(router)
  console.log(router.pathname)
  console.log(router.query)
  
  
  return (
    <Layout title={`DJ Events - ${router.query.slug}`}>
      <div>
        <h1>My event</h1>
        <h3>{router.pathname}</h3>
        <h3>{router.query.slug}</h3>
        <button onClick={() => router.push('/')}>Go Home</button>
      </div>
    </Layout>
  )
}

export default EventPage

import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.css'

const EventItem = ({evt}) => {
  const {event, img, info, link} = styles
  const {name, performers, slug, description, date, time, venue, address, image} = evt
  return (
    <div className={event}>
      <div className={img}>
        <Image 
          src={image ? image.formats.thumbnail.url : "/images/event-default.png"} 
          height={150} 
          width={170} 
          alt="..." 
        />
      </div>
      <div className={info}>
        <span>{new Date(date).toLocaleDateString('en-US')} at {time}</span>
        <h3>{name}</h3>
      </div>
      <div className={link}>
        <Link href={`/events/${slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}

export default EventItem

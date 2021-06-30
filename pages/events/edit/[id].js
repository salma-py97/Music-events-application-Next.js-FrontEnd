import Layout from '@/components/layout/Layout'
import Modal from '@/components/Modal'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {API_URL} from '@/config/index'
import styles from '@/styles/AddForm.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import Image from 'next/image'
import {FaImage} from 'react-icons/fa'


const EditEventPage = ({evt}) => {
  // Destructuring
  const {grid, form} = styles
  const {name, performers, address, venue, date, time, description, id, image} = evt

  // Router
  const router = useRouter()

  // instead of doing a useState on every input
  // the values object will hold all the input names and the state of each
  const [values, setValues] = useState({
    name: name,
    performers: performers,
    venue: venue,
    address: address,
    date: date,
    time: time,
    description: description
  })

  // Image State
  const [imagePreview, setImagePreview] = useState(image ? image.formats.thumbnail.url : null)


  // Modal
  const [showModal, setShowModal] = useState(false)




  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    const hasEmptyFields = Object.values(values).some((element) => element === "")
    
    if(hasEmptyFields) {
      toast.error("Please fill all fields!")
      
    } 

    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type' : "application/json",
      },
      body: JSON.stringify(values),
    })

    if(!res.ok) {
      toast.error("Something went wrong!")
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
    
  }
  
  // Handle Input Change
  const handleInputChange = (e) => {
    // destructuring
    const {name, value} = e.target
    
    
    // spread accross the current values and set name to value
    // we wrote [name] and not name because name is a variable and in objects we write variables like this [name]
    
    // if we write name then the value of the input name is the only one that's gonna change in the values object even if we change venue or description or time
    
    // if we change venue or performers with "SALMA EL BARMAKI"
    // the value of the name key in values object is gonna change because we wrote name and not [name]
    
    // setValues({...values, name : value})
    
    // values : {    
      // name: "SALMA EL BARMAKI",
      // performers: "",
      // venue: "",
      // address: "",
      // date: "",
      // time: "",
      // description: "",
      // }
      
      // SO WE NEED TO WRITE [name]
      setValues({...values, [name] : value})
      
    }
    
    return (
      <Layout title="DJ Events - Add an Event">
      <Link href="/events">
        <a>{'<'} Go BACK</a>
        </Link>
      <h1>Edit Event</h1>

      <ToastContainer />


      <form onSubmit={handleSubmit} className={form}>
        <div className={grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" value={values.name} name="name"
            //  onChange={(e) => setValues(e.target.value)}  
             onChange={handleInputChange}  
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" id="performers" value={values.performers} name="performers"
            //  onChange={(e) => setValues(e.target.value)}  
             onChange={handleInputChange}  
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" value={values.venue} name="venue"
            //  onChange={(e) => setValues(e.target.value)}  
             onChange={handleInputChange}  
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={values.address} name="address"
            //  onChange={(e) => setValues(e.target.value)}  
             onChange={handleInputChange}  
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={moment(values.date).format('yyyy-MM-DD')} name="date"
            //  onChange={(e) => setValues(e.target.value)}  
             onChange={handleInputChange}  
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" id="time" value={values.time} name="time"
            //  onChange={(e) => setValues(e.target.value)}  
             onChange={handleInputChange}  
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type='text' name="description" id="description" cols="30" rows="10" value={values.description} onChange={handleInputChange}></textarea>
        </div>

        <input type="submit" className='btn' value="Update Event" />

      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image 
          src={imagePreview}
          height={100}
          width={170}
          alt=""
        />)
        :
        (<div><p>No image uploaded</p></div>)
      }

      <div>
        <button className="btn-secondary" onClick={()=> setShowModal(true)}> 
          <p>
          <FaImage/>&nbsp; Set Image
          </p>
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        IMAGE UPLOAD
      </Modal>
      
    </Layout>
  )
}

export default EditEventPage


export const getServerSideProps = async ({params:{id}}) => {
  const res = await fetch (`${API_URL}/events/${id}`)
  const evt = await res.json()

  console.log(evt)

  return {
    props: {evt}
  }
}

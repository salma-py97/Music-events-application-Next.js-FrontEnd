import {useState} from 'react'
import {API_URL} from '@/config/index'

import styles from '@/styles/AddForm.module.css'


const ImageUpload = ({id, imageUploaded}) => {
  const {form, file} = styles

  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)

    formData.append('ref', 'events')
    formData.append('refId', id)
    formData.append('field', 'image')


    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      imageUploaded()
    }
  }
  const handleFileChange = (e) => {
    // console.log(e.target.files[0])
    // >>> File
        //   lastModified: 1624838947609
        //   lastModifiedDate: Mon Jun 28 2021 01:09:07 GMT+0100 (UTC+01:00) {}
        //   name: "event2.jpg"
        //   size: 385085
        //   type: "image/jpeg"
        //   webkitRelativePath: ""
        //   __proto__: File
    setImage(e.target.files[0])
  }

  return (
    <div className={form}>
      <h1>Upload Event Image</h1>

      <form onSubmit={handleSubmit}>
        <div className={file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <br /><br />
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  )
}

export default ImageUpload

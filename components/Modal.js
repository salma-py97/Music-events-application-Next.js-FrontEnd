// ressource: https://devrecipes.net/modal-component-with-next-js/
// Create _document.js file in page first



import styles from '@/styles/Modal.module.css'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {FaTimes} from 'react-icons/fa'


const Modal = ({show, onClose, children, title}) => {
  const {overlay, modal, header, body} = styles
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {setIsBrowser(true)}, [])

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className={overlay}>
      <div className={modal}>
        <div className={header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && (
          <div>{title}</div>
        )}
        <div className={body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
  } else {
    return null
  }

}

export default Modal

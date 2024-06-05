import React, { useEffect, useRef } from 'react'

const FormModal = ({openModal, CloseModal}) => {
    const ref = useRef()

useEffect(()=>{
    if(openModal){
     ref.current?.showModal()
    }else{
    ref.current?.close()
    }
},[openModal])

  return (
    <dialog 
    ref={ref}
    onCancel={CloseModal}>

    </dialog>
  )
}

export default FormModal

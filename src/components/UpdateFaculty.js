import React, { useState } from 'react'
import { getFirestore, doc, updateDoc} from 'firebase/firestore'
import {app} from "../Firebase"
import {useLocation, useNavigate} from "react-router-dom";

const UpdateFaculty = () => {
  const location = useLocation()
  const [name, setName] = useState(location.state.facultyName)
  const [phone,setPhone] = useState(location.state.phoneNumber)
  const navigate = useNavigate();

  const submitHandler= async (e)=>{
    e.preventDefault();
    const db = getFirestore(app)
    const docRef = doc(db, 'faculty', location.state.id)
    try {
      await updateDoc(docRef, {facultyName: name, phoneNumber: phone})
      navigate('/dashboard/facultyList')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Update Faculty</h1>
      <form onSubmit={submitHandler}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='full name' />
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='phone number' />
        <button type='submit'>Update</button> 
      </form>
    </div>
  )
}

export default UpdateFaculty

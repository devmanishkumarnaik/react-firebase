import React, { useState } from 'react'
import {collection, addDoc, getFirestore} from 'firebase/firestore'
import {app} from "../Firebase"
import {useNavigate} from "react-router-dom";

const AddFaculty = () => {
  const [name, setName] = useState('')
  const [phone,setPhone] = useState('')
  const navigate = useNavigate();

  const submitHandler= async (e)=>{
    e.preventDefault();
    const db = getFirestore(app)
    const docRef = await addDoc(collection(db, 'faculty'), {
      facultyName: name,
      phoneNumber: phone
    }).then(res=>{
      navigate('/dashboard/facultyList')
    })
    .catch(err=>{
      console.log(err)
      console.log(docRef, docRef.id)
    })   
  }
  return (
    <div>
      <h1>Add Faculty</h1>
      <form onSubmit={submitHandler}>
        <input onChange={(e)=>setName(e.target.value)} placeholder='full name' />
        <input onChange={(e)=>setPhone(e.target.value)} placeholder='phone number' />
        <button type='submit'>Submit</button> 
      </form>
    </div>
  )
}

export default AddFaculty

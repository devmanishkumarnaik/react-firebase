import React, { useState } from 'react'
import {getDatabase, ref, update} from "firebase/database";
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import {app} from "../Firebase"
import {useNavigate, useLocation} from "react-router-dom";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [rollno, setRollno] = useState(location.state[0]);
  const [name, setName] = useState(location.state[1].StudentName);
  const [phone, setPhone] = useState(location.state[1].PhoneNumber);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event)=>{
    const file = event.target.files[0]
    setSelectedFile(file)
}

  const submitHandler = async (event)=>{
    event.preventDefault();
    if(selectedFile){
      const db=getDatabase(app)
    const storage = getStorage(app)

    const myRef = storageRef(storage, `images/${location.state[0]}`)
    await uploadBytes(myRef, selectedFile)

    const myImageUrl = await getDownloadURL(myRef)

    const studentRef = ref(db, 'student/'+location.state[0])
    update(studentRef, {StudentName: name, PhoneNumber: phone, imageUrl: myImageUrl})
    .then(res=>{
        navigate('/studentList')
    })
    .catch(err=>{
        console.log(err)
    })
    }
    else{
    const db=getDatabase(app)

    const studentRef = ref(db, 'student/'+location.state[0])
    update(studentRef, {StudentName: name, PhoneNumber: phone})
    .then(res=>{
        navigate('/dashboard/studentList')
    })
    .catch(err=>{
        console.log(err)
    })
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
         <input disabled value={rollno} onChange={(e)=>setRollno(e.target.value)} type='text' placeholder='roll no' />
         <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='student name' />
         <input value={phone} onChange={(e)=>setPhone(e.target.value)} type='text' placeholder='phone number' />
         <input onChange={handleFileChange} type='file' />
         <button type='submit'>Update</button>
        </form>  
    </div>
  )
}

export default UpdateStudent

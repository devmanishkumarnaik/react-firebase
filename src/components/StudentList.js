import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import {getStorage, ref as storageRef, deleteObject} from 'firebase/storage'
import { app } from '../Firebase'
import { useNavigate } from 'react-router-dom'

const StudentList = () => {
  const [studentData, setStudentData] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    const db = getDatabase(app)
    const studentRef = ref(db, 'student')
    onValue(studentRef, (snapshot)=>{
      const data = snapshot.val()
      setStudentData(data)
    })
  }, [])

  const deleteData = (key)=>{
    const db = getDatabase(app)
    const storage = getStorage(app)

    const studentRef = ref(db, 'student/'+key)
    const myRef = storageRef(storage, 'images/'+key)
    deleteObject(myRef)
    .then(res=>{
      remove(studentRef)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Student List</h1>
      {studentData && (
        <div>
          {Object.entries(studentData).map(([key, value])=>{
            return(
              <div key={key}>
                <img style={{width: '20%'}} src={value.imageUrl} alt='studentImage'/>
                <p>{value.StudentName} {value.PhoneNumber}</p>
                <button onClick={()=>{deleteData(key)}} style={{
                  color: "red"
                }}>Delete</button>
                <button onClick={()=>{navigate('/updateStudent', {state:[key, value]})}} style={{
                  color: "green"
                }}>Update</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StudentList

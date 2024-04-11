import React, { useState } from 'react'
import { uid } from 'uid'
import './App.css'
import { app } from '../firebase'
import { getDatabase, ref, set, push, get, update } from 'firebase/database'

function App() {

  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")


  // *****************************INPUT DATA***************************************
  const saveInput = async () => {
    const db = getDatabase(app)
    const id = uid();
    // console.log("users/"+id)
    // console.log(input1)
    // console.log(input2)
    const newDocRef = ref(db, `users`);
    set(push(newDocRef), {
      "name": input1,
      "email": input2,
      "array": [input1, input2],
    })
      .then(() => {
        alert("Data saved successfully")
        setInput1("")
        setInput2("")
      })
      .catch((err) => alert("error: " + err))

  }


  // *****************************READ DATA***************************************
  const [data, setData] = useState([])
  
  const readData = async () => {
    const db = getDatabase(app)
    const dbRef = ref(db, "users");
    
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
      const userr = snapshot.val();
      const temporary = Object.keys(userr).map(user => {
        return {
          ...userr[user],
          id: user,
        }
      })
      const userrr = Object.values(temporary)
      // const userData = userrr.map(user => ({
        //   id: Object.keys(user)[0],
        //   ...user[Object.keys(user)[0]]
        // }));
        setData(userrr)
    } else {
      alert("error fetching data from database")
    }
  }
  
  
  // *****************************UPDATE DATA***************************************
  const [updateName, setUpdateName] = useState("")
  const [updateId, setUpdateId] = useState("")

  const updateData = () => {
    const db = getDatabase(app)
    const dbRef = ref(db, `users/${updateId}`)
    update(dbRef, {
      "name": updateName,
    })
     .then(() => {
        alert("Data updated successfully")
        setUpdateName("")
        setUpdateId("")
      })
     .catch((err) => alert("error: " + err))

  }

  return (
    <>
      <div className="container">
        <section className='insert'>
          <h1>INSERT</h1>
          <input type="text" placeholder='name' value={input1} onChange={(e) => { setInput1(e.target.value) }} id="" />
          <input type="email" placeholder='email' value={input2} onChange={(e) => { setInput2(e.target.value) }} id="" />
          <button onClick={saveInput}>INSERT</button>
        </section>


        <section className='read'>
          <h1>READ</h1>
          <button onClick={readData} >Get Data</button>
          <ul>
            {data.map((list) => {
              return (
                <li>
                  <p>Name: {list.id}</p>
                  {/* {console.log(data)} */}
                  <p>Email: {list.name}</p>
                  <p>Email: {list.email}</p>
                </li>
              )
            })}
          </ul>
        </section>


        <section className='update'>
          <h1>UPDATE</h1>
          <input type="text" value={updateId} placeholder="enter id" onChange={(e) => { setUpdateId(e.target.value) }} id="" />
          <input type="text" value={updateName} placeholder="enter name"  onChange={(e) => { setUpdateName(e.target.value) }}  id="" />
          <button onClick={updateData}>UPDATE</button>
        </section>


        <section className='delete'>
          <h1>DELETE</h1>
        </section>
      </div>
    </>
  )
}

export default App

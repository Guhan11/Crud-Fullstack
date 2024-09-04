import React, { useEffect, useState } from 'react'
import './Table.css'
import axios from 'axios'

const Table = () => {
  const [users, setUsers] = useState([])
  const [filterUsers, setFilterUsers] = useState([])
  const [isModedlOpen, setIsModelOpen] = useState(false)
  const [isModedlUpdateOpen, setIsModelUpdateOpen] = useState(false)
  const [updateUserId, setUpdateUserId] = useState(null)
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    city: '',
  })

  useEffect(() => {
    getAllUsers()
  }, []) // Empty dependency array

  const getAllUsers = async () => {
    await axios.get(`http://localhost:8080/api/getAllUsers`).then((res) => {
      setUsers(res.data)
      setFilterUsers(res.data)
      //   setDeleteId(res.data.id)
    })
  }

  //Search Function
  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase()
    const filteredUsers = users.filter(
      (users) =>
        (typeof users.name === 'string' &&
          users.name.toLowerCase().includes(searchText)) ||
        (typeof users.city === 'string' &&
          users.city.toLowerCase().includes(searchText))
    )
    setFilterUsers(filteredUsers)
  }

  //Delete Function
  const handleDelete = async (id) => {
    const isconfirmed = window.confirm(
      'Are you sure you want to delete this User'
    )

    if (isconfirmed) {
      console.log('id', id)
      await axios
        .delete(`http://localhost:8080/api/deleteUsers/${id}`)
        .then((res) => {
          getAllUsers()
        })
    }
  }

  //Add User
  const handleSave = async (e) => {
    await axios.post(`http://localhost:8080/api/createUsers`, userData)

    setIsModelOpen(false)
    getAllUsers()
  }
  //Update User
  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:8080/api/updateUsers/${id}`,userData)
    setIsModelUpdateOpen(false)
    getAllUsers()
  }

  //getUserById
  const handleGetById = async (id) => {
    await axios
      .get(`http://localhost:8080/api/getUsersById/${id}`).then((res)=>{
        setUserData(res.data)
        setUpdateUserId(id)
        setIsModelUpdateOpen(true)
      })}
     
       
      

  //close model
  const closeModel = (e) => {
    e.preventDefault() // Prevent default action
    setIsModelOpen(false) // Close the modal
    setIsModelUpdateOpen(false)
    getAllUsers()
  }

  //Add new Btn new record
  const handleAddRecord = (e) => {
    e.preventDefault()
    //Empty the array
    setUserData({
      name: '',
      age: '',
      city: '',
    })
    setIsModelOpen(true)
  }

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container">
        <h3>EMPLOYEE DETAILS</h3>
        <div className="input-search">
          <input
            type="search"
            placeholder="Search Text Here"
            onChange={handleSearchChange}
          />
          <button onClick={handleAddRecord}>Add Record</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <td>S.No</td>
              <td>Name</td>
              <td>Age</td>
              <td>City</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filterUsers) &&
              filterUsers.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button onClick={() => handleGetById(user.id)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        {isModedlOpen && (
          <div className="model">
            <div className="model-content">
                
              <span className="close" onClick={closeModel}>
                &times;
              </span>
              <h2>Add New Record</h2>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleData}
                ></input>
              </div>
              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  onChange={handleData}
                ></input>
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleData}
                ></input>
              </div>
              <button className="add-btn" onClick={handleSave}>
                Add User
              </button>
            </div>
          </div>
        )}

        {isModedlUpdateOpen && (
          <div className="model">
            <div className="model-content">
              <span className="close" onClick={closeModel}>
                &times;
              </span>
              <h2>Add New Record</h2>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name}
                  onChange={handleData}
                ></input>
              </div>
              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={userData.age}
                  onChange={handleData}
                ></input>
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={userData.city}
                  onChange={handleData}
                ></input>
              </div>
              <button className="add-btn" onClick={()=>handleUpdate(updateUserId)}>
                Update User
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Table

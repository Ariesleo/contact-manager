import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/getToken'

export const NewContact = () => {
  const navigate = useNavigate()

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()

  const headerData = getToken()

  useEffect(() => {
    if (!headerData.Authorization) {
      navigate('/')
    }
  }, [])

  const addContact = async () => {
    const contact = {
      name,
      phoneNumber: phone,
      address,
    }
    try {
      await axios.post(`http://localhost:8000/contacts`, contact, {
        headers: headerData,
      })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div class="container" style={{ width: '40%' }}>
      <form onSubmit={addContact}>
        <h1 class="nav justify-content-center">Add New Contact</h1>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">
            Phone Number
          </label>
          <input
            type="text"
            class="form-control"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
            }}
          />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

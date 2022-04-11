import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/getToken'

export const NewContact = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [work, setWork] = useState('')
  const [home, setHome] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')

  const headerData = getToken()

  useEffect(() => {
    if (!headerData.Authorization) {
      navigate('/')
    }
  })

  const addContact = async (e) => {
    e.preventDefault()
    const contact = {
      name,
      phone: {
        work,
        home,
        mobile,
      },
      address,
      email,
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
            Name*
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
          <label class="form-label">Phone Number</label>
          <div class="mb-3" style={{ width: '60%', marginLeft: '10%' }}>
            <label for="work" class="for-label">
              Work
            </label>
            <input
              type="text"
              class="form-control"
              id="work"
              value={work}
              onChange={(e) => {
                setWork(e.target.value)
              }}
            />
            {/* HOME */}
            <label for="home" class="for-label">
              Home
            </label>
            <input
              type="text"
              class="form-control"
              id="home"
              value={home}
              onChange={(e) => {
                setHome(e.target.value)
              }}
            />
            {/* Mobile */}
            <label for="mobile" class="for-label">
              Mobile*
            </label>
            <input
              type="text"
              class="form-control"
              id="mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value)
              }}
            />
          </div>
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
        <div class="mb-3">
          <label for="email" class="form-label">
            Email*
          </label>
          <input
            type="text"
            class="form-control"
            id="address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
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

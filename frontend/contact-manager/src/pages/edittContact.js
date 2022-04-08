import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getToken } from '../utils/getToken'

export const EditContact = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [name, setName] = useState(location.state.name)
  const [work, setWork] = useState(location.state.phone.work)
  const [home, setHome] = useState(location.state.phone.home)
  const [mobile, setMobile] = useState(location.state.phone.mobile)
  const [address, setAddress] = useState(location.state.address)
  const [email, setEmail] = useState(location.state.email)

  const headerData = getToken()

  useEffect(() => {
    if (!headerData.Authorization) {
      navigate('/')
    }
  }, [])

  const editContactById = async (e) => {
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
      const id = location.state.id
      await axios.put(`http://localhost:8000/contacts/${id}`, contact, {
        headers: headerData,
      })
      navigate('/')
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    <div class="container" style={{ width: '40%' }}>
      <form onSubmit={editContactById}>
        <h1 class="nav justify-content-center">Edit Contact</h1>
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

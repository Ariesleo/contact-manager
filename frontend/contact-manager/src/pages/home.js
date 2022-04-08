import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/getToken'

export const Home = () => {
  const navigate = useNavigate()
  const headerData = getToken()

  const [contact, setContact] = useState([])

  const updateFavourite = async (id) => {
    console.log('change favourite', id)
    try {
      await axios.patch(`http://localhost:8000/contacts/${id}`)
      document.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const contactsData = await axios.get(`http://localhost:8000/contacts`, {
        headers: headerData,
      })
      setContact(contactsData.data)
    } catch (e) {
      if (e.response.status === 401) {
        navigate('/signIn')
      }
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const routeContact = () => {
    navigate('/newcontact')
  }

  // deleting the contact
  const deleteContact = async (id) => {
    console.log(headerData)
    console.log(id)
    try {
      await axios.delete(`http://localhost:8000/contacts/${id}`, {
        headers: headerData,
      })
      alert('contct deleted')
      document.location.reload(true)
    } catch (e) {
      console.log(e)
    }
  }
  // edit
  const editContact = (id, name, phone, address, email) => {
    navigate('/editcontact', {
      state: {
        id,
        name,
        phone,
        address,
        email,
      },
    })
  }
  return (
    <>
      <div class="container" style={{ marginTop: '1.5%' }}>
        <button
          type="button"
          class="btn btn-outline-primary"
          style={{ float: 'right' }}
          onClick={routeContact}
        >
          Add New Contact
        </button>
        <br />
        <br />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
              <th scope="col">Favourite</th>
            </tr>
          </thead>
          <tbody>
            {contact.map((data, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>
                    {data.name}
                    {data.favourite}
                  </td>
                  <td>
                    <b>Home:</b> {data.phone.home}
                    <br />
                    <b>Work:</b> {data.phone.work}
                    <br />
                    <b>Mobile:</b> {data.phone.mobile}
                  </td>
                  <td>{data.address}</td>
                  <td>{data.email}</td>
                  <td
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() =>
                        editContact(
                          data._id,
                          data.name,
                          data.phone,
                          data.address,
                          data.email
                        )
                      }
                    >
                      edit
                    </button>{' '}
                    <button
                      button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => deleteContact(data._id)}
                    >
                      delelte
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <input
                        type="checkbox"
                        checked={data.favourite}
                        onChange={(e) => {
                          e.preventDefault()
                          updateFavourite(data._id)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/getToken'

export const Home = () => {
  const navigate = useNavigate()
  const headerData = getToken()

  const [contact, setContact] = useState([])

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
                  <td>{data.name}</td>
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
                    <button type="button" class="btn btn-primary">
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
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

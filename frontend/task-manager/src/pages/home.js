import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/getToken'

export const Home = () => {
  const navigate = useNavigate()

  const [contact, setContact] = useState([])

  const getData = async () => {
    const headerData = getToken()
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
  return (
    <>
      {/* {contact.map((elem, key) => {
            return (<h4 key={key}>{elem.name}</h4>)
        })} */}
      <div class="container" style={{ width: '80%', marginTop: '1.5%' }}>
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
              <th scope="col">PhoneNumber</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contact.map((data, key) => {
              return (
                <tr key={key}>
                  <th scope="row">
                    <i>{data._id}</i>
                  </th>
                  <td>{data.name}</td>
                  <td>{data.phoneNumber}</td>
                  <td>{data.address}</td>
                  <td>{data.email}</td>
                  <td
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <button type="button" class="btn btn-primary">
                      edit
                    </button>{' '}
                    <button button type="button" class="btn btn-danger">
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

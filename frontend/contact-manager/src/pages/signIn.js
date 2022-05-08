import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import Alert from '@mui/material/Alert'

export const SignIn = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState(null)

  const singInUser = async (e) => {
    e.preventDefault()
    const user = {
      email,
      password,
    }
    try {
      const loginUserData = await axios.post(
        `http://localhost:8000/signin`,
        user
      )
      const { token } = loginUserData.data
      localStorage.setItem('token', token)
      setLoginStatus(true)
      navigate('/')
    } catch (e) {
      if (e.response.status === 401) {
        setLoginStatus(false)
      }
      console.log(e)
    }
    // axios
    //   .post(`http://localhost:8000/signin`, user)
    //   .then((res) => {
    //     if (res.status === 200) {
    //   const { token } = res.data
    //   localStorage.setItem('token', token)
    //   alert('signIn sucessfully')
    //   navigate('/')
    //     }
    //   })
    //   .catch((e) => {
    //     if (e.response.status === 401) {
    //       alert('singIn failed')
    //     }
    //     console.log(e)
    //   })
  }

  return (
    <div class="container" style={{ width: '40%' }}>
      {loginStatus === false && (
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      )}
      <form onSubmit={singInUser}>
        <h1 className="nav justify-content-center">SignIn</h1>
        <div className="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <span>
            Don't have account? <Link to="/signup">SignUp</Link>
          </span>
        </div>
      </form>
    </div>
  )
}

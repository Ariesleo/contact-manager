import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const addUser = async (e) => {
    e.preventDefault()
    const user = {
      email,
      password,
    }
    try {
      await axios.post(`http://localhost:8000/signup`, user)
      alert(`user with the email: ${email} has been created`)
    } catch (e) {
      if (e.response.status === 400) {
        alert(`${email} has already been taken. Try another email address`)
      }
      console.log(e)
    }
  }

  return (
    <div class="container" style={{ width: '40%' }}>
      <form onSubmit={addUser}>
        <h1 class="nav justify-content-center">SignUp</h1>
        <div class="mb-3">
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
        <div class="mb-3">
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
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <span>
            Already have account? <Link to="/signin">SignIn</Link>
          </span>
        </div>
      </form>
    </div>
  )
}

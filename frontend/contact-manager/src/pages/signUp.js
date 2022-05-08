import * as React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import axios from 'axios'
import validator from 'validator'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'

import Contact from '../images/contact.png'

export const SignUp = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [emptyField, setEmptyField] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const focusField = () => {
    setEmptyField(false)
    setLoading(false)
  }

  const outFocusField = () => {
    if (validator.isEmail(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  const addUser = async (e) => {
    e.preventDefault()
    const user = {
      email,
      password,
    }
    if (!email || !password) {
      setEmptyField(true)
    } else {
      try {
        const signUpData = await axios.post(
          `http://localhost:8000/signup`,
          user
        )
        if (signUpData.status === 201) {
          navigate('/signin')
        }
      } catch (e) {
        if (e.response.status === 400) {
          setLoading(true)
        }
        console.log(e)
      }
    }
  }

  return (
    <div className="container" style={{ width: '30%', marginTop: '10%' }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '5%',
            }}
          >
            <Avatar
              alt="contact manager"
              src={Contact}
              sx={{ width: 60, height: 60, marginBottom: '5%' }}
            />
            <h3>SignUp</h3>
          </div>
          {emptyField && <Alert severity="error">Fields can't be empty</Alert>}

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '90%' },
            }}
            noValidate
            autoComplete="off"
          >
            {/* email */}
            {!emailError ? (
              <TextField
                id="standard-basic"
                label="Email*"
                variant="standard"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                onFocus={focusField}
                onBlur={outFocusField}
              />
            ) : (
              <TextField
                error
                id="standard-basic"
                label="Email*"
                variant="standard"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError(false)
                }}
                onFocus={focusField}
                onBlur={outFocusField}
                helperText="Invalid email"
              />
            )}
            {/* password */}
            <TextField
              id="standard-password-input"
              label="Password*"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              onFocus={focusField}
            />
          </Box>
        </CardContent>
        <CardActions>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LoadingButton
              size="small"
              onClick={addUser}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              SignUp
            </LoadingButton>
            <p style={{ marginTop: '2%' }}>
              Already have account? <Link to="/signin">SignIn</Link>
            </p>
          </div>
        </CardActions>
      </Card>
    </div>
    // <div class="container" style={{ width: '40%' }}>
    //   <form onSubmit={addUser}>
    //     <h1 class="nav justify-content-center">SignUp</h1>
    //     <div class="mb-3">
    //       <label for="exampleInputEmail1" class="form-label">
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         class="form-control"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //         value={email}
    //         onChange={(e) => {
    //           setEmail(e.target.value)
    //         }}
    //       />
    //     </div>
    //     <div class="mb-3">
    //       <label for="exampleInputPassword1" class="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         class="form-control"
    //         id="exampleInputPassword1"
    //         value={password}
    //         onChange={(e) => {
    //           setPassword(e.target.value)
    //         }}
    //       />
    //     </div>
    //     <div
    //       style={{
    //         display: 'flex',
    //         justifyContent: 'space-between',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <button type="submit" class="btn btn-primary">
    //         Submit
    //       </button>
    //       <span>
    //         Already have account? <Link to="/signin">SignIn</Link>
    //       </span>
    //     </div>
    //   </form>
    // </div>
  )
}

import * as React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import axios from 'axios'

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

export const SignIn = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [emptyField, setEmptyField] = useState(false)
  const [matchCred, setMatchCred] = useState(false)

  const singInUser = async () => {
    const user = {
      email,
      password,
    }
    if (!email || !password) {
      setEmptyField(true)
    } else {
      try {
        const loginUserData = await axios.post(
          `http://localhost:8000/signin`,
          user
        )
        const { token } = loginUserData.data
        localStorage.setItem('token', token)
        navigate('/')
      } catch (e) {
        if (e.response.status === 401) {
          setMatchCred(true)
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
            <h3>SignIn</h3>
          </div>
          {emptyField && <Alert severity="error">Fields can't be empty</Alert>}
          {matchCred && (
            <Alert severity="error">Credential did not match</Alert>
          )}

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '90%' },
            }}
            noValidate
            autoComplete="off"
          >
            {/* email */}
            <TextField
              id="standard-basic"
              label="Email*"
              variant="standard"
              value={email}
              onChange={(e) => {
                setEmptyField(false)
                setMatchCred(false)
                setLoading(false)
                setEmail(e.target.value)
              }}
            />
            {/* password */}
            <TextField
              id="standard-password-input"
              label="Password*"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => {
                setEmptyField(false)
                setMatchCred(false)
                setLoading(false)
                setPassword(e.target.value)
              }}
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
              onClick={singInUser}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              Submit
            </LoadingButton>
            <p style={{ marginTop: '2%' }}>
              Don't have account? <Link to="/signup">SignUp</Link>
            </p>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

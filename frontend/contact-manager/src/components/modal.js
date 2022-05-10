import React, { useEffect, useState } from 'react'

import validator from 'validator'
import { getToken } from '../utils/getToken'
import axios from 'axios'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import AccountCircle from '@mui/icons-material/AccountCircle'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
import MapRoundedIcon from '@mui/icons-material/MapRounded'
import BackupRoundedIcon from '@mui/icons-material/BackupRounded'
import Alert from '@mui/material/Alert'

const AddEditContactModal = ({
  openModal,
  setOpenModal,
  newContact,
  setNewContact,
  sendEditData,
}) => {
  const [name, setName] = useState(!newContact ? sendEditData.name : '')
  const [work, setWork] = useState(!newContact ? sendEditData.phone.work : '')
  const [home, setHome] = useState(!newContact ? sendEditData.phone.home : '')
  const [mobile, setMobile] = useState(
    !newContact ? sendEditData.phone.mobile : ''
  )
  const [address, setAddress] = useState(
    !newContact ? sendEditData.address : ''
  )
  const [email, setEmail] = useState(!newContact ? sendEditData.email : '')
  const [editId, setEditId] = useState(sendEditData.id)

  const [emailError, setEmailError] = useState(false)
  const [emptyField, setEmptyField] = useState(false)

  // get token here
  const headerData = getToken()

  // belwo to close the modal
  const handleClose = () => {
    setOpenModal(false)
    setNewContact(false)
  }

  const focusField = () => {
    setEmptyField(false)
  }

  const outFocusField = () => {
    if (validator.isEmail(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  // add new contact
  const addNewContact = async () => {
    if (!name || !mobile || !email) {
      setEmptyField(true)
    } else {
      const addnewcontactdata = {
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
        await axios.post(`http://localhost:8000/contacts`, addnewcontactdata, {
          headers: headerData,
        })
        // navigate('/')
      } catch (e) {
        console.log(e)
      }
    }
  }

  // edit contact data
  const editContact = async () => {
    console.log('edit contact')
    if (!name || !mobile || !email) {
      setEmptyField(true)
    } else {
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
        const id = editId
        await axios.put(`http://localhost:8000/contacts/${id}`, contact, {
          headers: headerData,
        })
        // navigate('/')
      } catch (e) {
        console.log({ e })
      }
    }
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {newContact ? 'Add Contact' : 'Edit Contact'}
          </Typography>

          {emptyField && (
            <Alert severity="error">Required fields can't be empty</Alert>
          )}

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* name */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Name*"
                variant="standard"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                onFocus={focusField}
              />
            </Box>

            {/* phone number */}
            <div style={{ marginLeft: '5%' }}>
              <Typography
                sx={{ marginTop: '5%', paddingBottom: '-5%', fontSize: '20px' }}
              >
                Phone Number
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <WorkRoundedIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input"
                  label="Work"
                  variant="standard"
                  value={work}
                  onChange={(e) => {
                    setWork(e.target.value)
                  }}
                  onFocus={focusField}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <HomeRoundedIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input-with-sx"
                  label="Home"
                  variant="standard"
                  value={home}
                  onChange={(e) => {
                    setHome(e.target.value)
                  }}
                  onFocus={focusField}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PhoneIphoneRoundedIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input-with-sx"
                  label="Mobile*"
                  variant="standard"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value)
                  }}
                  onFocus={focusField}
                />
              </Box>
            </div>

            {/* address */}
            <div>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <MapRoundedIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input-with-sx"
                  label="Address"
                  variant="standard"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                  onFocus={focusField}
                />
              </Box>
            </div>

            {/* email */}
            <div>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <MailRoundedIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
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
              </Box>
            </div>

            {/* upload file */}
            {!newContact && (
              <Box sx={{ mt: 3 }}>
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button variant="outlined" component="span">
                    Upload
                  </Button>
                </label>
              </Box>
            )}
            {/* submit form */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Button
                variant="contained"
                endIcon={<BackupRoundedIcon />}
                onClick={newContact ? addNewContact : editContact}
              >
                SUBMIT
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default AddEditContactModal

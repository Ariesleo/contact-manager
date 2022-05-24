import React from 'react'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddEditContactModal from '../components/addEditContact'

import {
  deleteContact,
  getAllContacts,
  updateFavourite,
} from '../services/api.services'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import MapRoundedIcon from '@mui/icons-material/MapRounded'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddIcCallIcon from '@mui/icons-material/AddIcCall'

export const Home = () => {
  const navigate = useNavigate()

  const [contact, setContact] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [newContact, setNewContact] = useState(false)
  const [sendEditData, setSendEditData] = useState({})

  // console.log(getAllContacts())
  // updating the favourite data
  const updateFavouriteOnClick = (id) => {
    try {
      updateFavourite(id)
      document.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  // fetching all contacts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = () => {
    getAllContacts()
      .then((data) => {
        setContact(data.data)
      })
      .catch((e) => {
        if (e.response.status === 401) {
          navigate('/signIn')
        }
        console.log(e)
      })
  }

  useEffect(() => {
    getData()
  }, [contact, getData])

  // deleting the contact
  const deleteContactOnClick = (id) => {
    try {
      deleteContact(id)
      alert('contct deleted')
      document.location.reload(true)
    } catch (e) {
      console.log(e)
    }
  }
  // send the relevent data for editing
  const editContact = (id, name, phone, address, email) => {
    setOpenModal(true)
    const editData = {
      id,
      name,
      phone,
      address,
      email,
    }
    setSendEditData(editData)
  }
  return (
    <>
      <div className="container" style={{ marginTop: '1.5%' }}>
        <Box>
          <Card
            elevation={2}
            sx={{
              padding: '1.5%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" component="div">
              Contact List
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcCallIcon />}
              onClick={() => {
                setOpenModal(true)
                setNewContact(true)
              }}
            >
              Add New Contact
            </Button>
          </Card>
        </Box>
        {/* card for each contact */}
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {contact.map((data, key) => {
            return (
              <Card
                key={key}
                elevation={24}
                sx={{
                  maxWidth: 300,
                  marginLeft: '20px',
                  paddingX: '4.5%',
                  paddingY: '2%',
                  marginY: '2%',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {data.image !== '' ? (
                      <Avatar
                        alt="Contact Image"
                        src={`https://contact-manager-back.herokuapp.com/contacts/${data._id}/image`}
                        sx={{ width: 56, height: 56 }}
                      />
                    ) : (
                      <Avatar
                        sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
                      >
                        {data.name.slice(0, 2).toUpperCase()}
                      </Avatar>
                    )}
                    <Typography variant="h6" component="div">
                      {data.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {data.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" component="div">
                      Phone Number
                    </Typography>
                    {/* home */}
                    <Box sx={{ display: 'flex' }}>
                      <HomeRoundedIcon sx={{ color: 'action.active', mr: 1 }} />
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {data.phone.home ? data.phone.home : 'N/A'}
                      </Typography>
                    </Box>
                    {/* work */}
                    <Box sx={{ display: 'flex' }}>
                      <WorkRoundedIcon sx={{ color: 'action.active', mr: 1 }} />
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {data.phone.work ? data.phone.work : 'N/A'}
                      </Typography>
                    </Box>
                    {/* mobile */}
                    <Box sx={{ display: 'flex' }}>
                      <PhoneIphoneRoundedIcon
                        sx={{ color: 'action.active', mr: 1 }}
                      />
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {data.phone.mobile}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    {/* address */}
                    <Typography variant="h6" component="div">
                      Address
                    </Typography>
                    <Box sx={{ mb: 1.5, display: 'flex' }}>
                      <MapRoundedIcon sx={{ color: 'action.active', mr: 1 }} />
                      <Typography
                        sx={{ fontSize: '14px' }}
                        color="text.secondary"
                      >
                        {data.address}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    marginTop: '-7%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteContactOnClick(data._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
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
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Box
                    onClick={() => {
                      updateFavouriteOnClick(data._id)
                    }}
                  >
                    {data.favourite ? (
                      <IconButton aria-label="favClick">
                        <FavoriteIcon />
                      </IconButton>
                    ) : (
                      <IconButton aria-label="fav">
                        <FavoriteBorderIcon />
                      </IconButton>
                    )}
                  </Box>
                </CardActions>
              </Card>
            )
          })}
        </Box>
        {/* below add-edit modal */}
        {openModal && (
          <AddEditContactModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            newContact={newContact}
            setNewContact={setNewContact}
            sendEditData={sendEditData}
          />
        )}
      </div>
    </>
  )
}

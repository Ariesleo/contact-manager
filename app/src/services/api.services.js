import axios from 'axios'
import { getToken } from '../utils/getToken'

const headerData = getToken()

const baseURL = process.env.REACT_APP_URI

export const updateFavourite = async (id) => {
  return await axios.patch(`${baseURL}/contacts/${id}`)
}

export const getAllContacts = async (id) => {
  return await axios.get(`${baseURL}/contacts`, { headers: headerData })
}

export const deleteContact = async (id) => {
  return await axios.delete(`${baseURL}/contacts/${id}`, {
    headers: headerData,
  })
}

export const addNewContact = async (newData) => {
  return await axios.post(`${baseURL}/contacts`, newData, {
    headers: headerData,
  })
}

export const editContact = async (id, data) => {
  return await axios.put(`${baseURL}/contacts/${id}`, data, {
    headers: headerData,
  })
}

export const uploadAvatar = async (id, data) => {
  return await axios.post(`${baseURL}/contacts/${id}/upload`, data, {
    headers: headerData,
  })
}

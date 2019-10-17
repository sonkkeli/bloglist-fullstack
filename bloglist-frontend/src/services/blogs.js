import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const getOne = (id) => {
  const req = axios.get(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const createComment = async (blogId, newObject) => {
  const res = await axios.post(`${baseUrl}/${blogId}/comments`, newObject)
  return res.data
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, getOne, create, update, remove, setToken, createComment }
const blogs = [
  {
    title: "testi",
    author: "sonkkeli",
    url: "www.google.fi",
    likes: 4,
    user: {
      username: "sonkkeli",
      name: "sonja",
      id: "1"
    },
    id: "2"
  },
  {
    title: "Hyvää huumoria",
    author: "pieruperse",
    url: "www.instagram.com/pieruperse",
    likes: 3,
    user: {
      username: "sonkkeli",
      name: "sonja",
      id: "1"
    },
    id: "3"
  }
]

let token = null

const setToken = newToken => {
  token = `bearer 6468g4e68gd46g8rth4sr6t8hsr31hrsj8sr6t8j`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }
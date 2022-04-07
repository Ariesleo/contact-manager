export const getToken = () => {
  try {
    const tokenString = localStorage.getItem('token')
    const header = {
      Authorization: tokenString,
    }
    return header
  } catch (e) {
    console.log(e)
  }
}

import axios from 'axios'
import config from '../../../config.json'

const baseUrl = config.bookitApiBaseUrl

// eslint-disable-next-line import/prefer-default-export
const createBooking = (formData, token) => new Promise((resolve, reject) => {
  if (!token) {
    const error = new Error('createBooking() needs a jwt to identify the user')
    reject(error)
  }

  if (!formData) {
    const error = new Error('createBooking() needs booking data')
    reject(error)
  }

  const {
    start,
    bookingDuration,
    selectedBookableId,
  } = formData

  if (!selectedBookableId) {
    const error = new Error('Please select something to book.')
    reject(error)
  }

  const end = start.plus(bookingDuration)
  const formattedStartForAPI = `${start.toFormat('yyyy-MM-dd')}T${start.toFormat('TT')}`
  const formattedEndForAPI = `${end.toFormat('yyyy-MM-dd')}T${end.toFormat('TT')}`
  const data = {
    bookableId: selectedBookableId,
    start: formattedStartForAPI,
    end: formattedEndForAPI,
    subject: 'Booked by Bookit Mobile',
  }
  return axios({
    method: 'post',
    url: `${baseUrl}booking`,
    data,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      const newBooking = response.data
      resolve(newBooking)
    })
    .catch(() => {
      // TODO: If server passed error message, we could expose that to the user.
      const error = new Error('Something went wrong when trying to create the booking.')
      reject(error)
    })
})

export default createBooking

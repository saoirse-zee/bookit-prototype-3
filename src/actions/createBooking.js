import { BOOKING_SUCCESS, BOOKING_FAIL } from './types'
import api from '../api'
import { showModal } from '../actions'
import { fetchBookings } from './bookings'
import { handleError } from '../utils'

export const createBooking = (booking, token) => dispatch => api.createBooking(booking, token)
  .then((newBooking) => {
    dispatch(bookingSuccess(newBooking))
    dispatch(fetchBookings(token))
    dispatch(showModal({
      modalType: BOOKING_SUCCESS, // Borrowing the action type for the modal, haha!
    }))
  })
  .catch(error => handleError(dispatch, error))

export const bookingSuccess = json => ({
  type: BOOKING_SUCCESS,
  newBooking: json,
})

export const bookingFail = reason => ({
  type: BOOKING_FAIL,
  reason,
})

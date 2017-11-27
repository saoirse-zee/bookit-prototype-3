import { BOOKING_SUCCESS, BOOKING_FAIL } from './types'
import { postBooking } from '../api'
import { showModal } from './modal'
import { fetchBookings } from './bookings'

export const createBooking = booking => dispatch => postBooking(booking)
  .then((newBooking) => {
    dispatch(bookingSuccess(newBooking))
    dispatch(fetchBookings())
    dispatch(showModal({
      modalType: BOOKING_SUCCESS, // Borrowing the action type for the modal, haha!
    }))
  })
  .catch((error) => {
    dispatch(bookingFail(error.message))
    dispatch(showModal({
      modalType: BOOKING_FAIL,
    }))
  })

export const bookingSuccess = json => ({
  type: BOOKING_SUCCESS,
  newBooking: json,
})

export const bookingFail = reason => ({
  type: BOOKING_FAIL,
  reason,
})
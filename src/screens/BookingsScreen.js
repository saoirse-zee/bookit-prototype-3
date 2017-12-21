import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DateTime } from 'luxon'
import BookingItem from '../components/BookingItem'
import LoginWarning from '../components/LoginWarning'
import BookingScreenMessage from '../components/BookingScreenMessage'
import { fetchBookings } from '../actions'
import {
  getBookableNameFromId,
  getBookableLocationIdFromId,
  getLocationNameFromLocationId,
  getLocationFromLocationId,
  userHasLoggedIn,
  sortBookings,
} from '../utils'

class BookingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Bookings',
  }

  componentWillMount() {
    const { dispatch, userExists, token } = this.props
    if (userExists) {
      dispatch(fetchBookings(token))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    if (userHasLoggedIn(this.props, nextProps)) {
      dispatch(fetchBookings(nextProps.token))
    }
  }

  render() {
    const {
      userExists,
      bookings,
      bookables,
      locations,
    } = this.props

    // "Protect" this screen, naively.
    if (!userExists) {
      return (
        <LoginWarning currentScreen="Bookings" />
      )
    }

    return (
      <View style={styles.container}>
        <BookingScreenMessage />

        <View style={styles.bookings} accessibilityLabel="List Of Bookings">
          { bookings.map((booking) => {
            // bookables is only populated after the user has been to the Home screen,
            // and only then with the bookables for `location`
            // This works, for now, but need a more robust scheme.
            const bookableName =
              getBookableNameFromId(booking.bookableId, bookables)
            const bookableLocationId =
              getBookableLocationIdFromId(booking.bookableId, bookables)
            const bookableLocationName =
              getLocationNameFromLocationId(bookableLocationId, locations)
            const bookableLocation =
              getLocationFromLocationId(bookableLocationId, locations)
            return (
              <BookingItem
                key={`booking-${booking.id}`}
                booking={booking}
                bookableName={bookableName}
                bookableLocationName={bookableLocationName}
                location={bookableLocation}
                onPressItem={(id) => {
                  // eslint-disable-next-line
                  console.log(id)
                }}
              />
            )
          }) }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    selectedLocation, bookings, bookablesByLocation, locations,
  } = state

  // Bookables
  const { items: bookables } = bookablesByLocation[selectedLocation.id] || { items: [] }

  const now = DateTime.local()
  const upcomingBookings =
    bookings.items
      .sort(sortBookings)
      .filter(booking => DateTime.fromISO(booking.end) > now)

  return {
    bookings: upcomingBookings,
    bookables,
    locations: locations.items,
    userExists: !!((state.token)), // Minimum criteria for existence
    token: state.token,
  }
}

export default connect(mapStateToProps)(BookingsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookings: {
    paddingLeft: 30,
  },
})

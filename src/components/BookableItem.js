import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import colors from '../../constants/Colors'

const BookableItem = ({ room, onPressItem, selected }) => (
  <TouchableHighlight
    onPress={() => {
      if (room.available) {
        onPressItem(room.id)
      }
    }}
    underlayColor="#ddd"
  >
    <View style={[
      styles.room,
      room.id === selected ? styles.selected : styles.notSelected,
    ]}
    >
      <Text style={[
        styles.roomName,
        room.available ? null : styles.unavailable,
      ]}
      >{room.name}
      </Text>
    </View>
  </TouchableHighlight>
)

export default BookableItem

const styles = StyleSheet.create({
  room: {
    marginBottom: 15,
    borderLeftWidth: 3,
    paddingLeft: 5,
  },
  roomName: {
    fontSize: 18,
  },
  unavailable: {
    color: '#cccccc',
  },
  bookedBy: {
    fontSize: 10,
  },
  notSelected: {
    borderLeftColor: '#eee',
  },
  selected: {
    borderLeftColor: colors.tintColor,
  },
})

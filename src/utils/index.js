export const getBookableNameFromId =
  (bookableId, bookablesArray) => bookablesArray.reduce((result, current) => (
    bookableId === current.id ? current.name : result), '')

export const getBookableLocationIdFromId =
  (bookableId, bookablesArray) => bookablesArray.reduce((result, current) => (
    bookableId === current.id ? current.locationId : result), '')

export const getLocationNameFromLocationId =
  (locationId, locationArray) => locationArray.reduce((result, current) => (
    locationId === current.id ? current.name : result), '')

export const getLocationFromLocationId =
  (locationId, locationArray) => locationArray.reduce((result, current) => (
    locationId === current.id ? current : result), '')
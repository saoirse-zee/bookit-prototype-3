import React from 'react'
import { Button, View } from 'react-native'
import { connect } from 'react-redux'
import { AuthSession, FileSystem } from 'expo'
import config from '../../config.json'
import { getMSAuthUrl } from '../utils'
import { accessTokenFileUri } from '../../constants/FileSystem'
import { setToken, hideModal } from '../actions'

class Login extends React.Component {
  handleMSLoginPress = async () => {
    const { msAuthUrlOptions, authRedirectUrl } = config
    const authUrl = getMSAuthUrl(msAuthUrlOptions, authRedirectUrl)
    const result = await AuthSession.startAsync({ authUrl })

    if (result.type !== 'success') {
      throw new Error('Failed to auth with Microsoft')
    }

    const accessToken = result.params.access_token

    FileSystem.writeAsStringAsync(accessTokenFileUri, accessToken)
      .then(() => {
        this.props.setMSAccessToken(accessToken)
      })
  }

  render() {
    const { fakeLogin } = this.props
    return (
      <View>
        <Button title="Log in with Microsoft" onPress={this.handleMSLoginPress} />
        <Button title="Log in as a hero" onPress={fakeLogin} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setMSAccessToken: (token) => {
    dispatch(setToken(token))
    dispatch(hideModal())
  },
  fakeLogin: () => {
    dispatch(setToken('Calamity.Jane.will.ride.again'))
    dispatch(hideModal())
  },
})

export default connect(null, mapDispatchToProps)(Login)
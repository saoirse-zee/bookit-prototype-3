const config = {
  bookitApiBaseUrl: 'https://your-api.com/v1/',
  msAuthUrlOptions: {
    clientId: '12345',
    scope: '<define what user info you want from MS>',
    responseType: 'token',
    nonce: '12345',
    responseMode: 'fragment',
    state: '12345',
    prompt: 'login',
    loginHint: 'email%40email',
  },
  authRedirectUrl: 'exp://auth.expo.io/<@your-org>/<your-app>',
}

export default config
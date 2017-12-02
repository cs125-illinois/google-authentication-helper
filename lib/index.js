module.exports = (function () {
  let config = {
    clientId: undefined
  }
  let state = {
    googleUser: undefined,
    googleYolo: undefined,
    listeners: {
      'login': [],
      'manual': []
    }
  }
  let api = {}

  let initialize = new Promise((resolve, reject) => {
    window.onGoogleYoloLoad = googleYolo => {
      state.googleYolo = googleYolo
      resolve()
    }
  })

  let login = () => {
    state.listeners['login'].forEach(callback => {
      try {
        callback(state.googleUser)
      } catch (err) { }
    })
  }
  let manual = error => {
    state.listeners['manual'].forEach(callback => {
      try {
        callback(error)
      } catch (err) { }
    })
  }

  api.config = clientId => {
    config.clientId = clientId
    return api
  }
  api.login = callback => {
    if (state.googleUser) {
      callback(state.googleUser)
    }
    state.listeners['login'].push(callback)
    return api
  }
  api.manual = callback => {
    state.listeners['manual'].push(callback)
    return api
  }
  api.start = () => {
    if (!config.clientId) {
      throw new Error('must configure a clientID before starting authentication')
    }
    return initialize.then(() => {
      state.googleYolo.retrieve({
        supportedAuthMethods: [
          'https://accounts.google.com'
        ],
        supportedIdTokenProviders: [{
          uri: 'https://accounts.google.com',
          clientId: config.clientId
        }]
      }).then(credential => {
        if (!state.googleUser) {
          state.googleUser = {
            email: credential.id,
            name: credential.displayName,
            image: credential.profilePicture,
            token: credential.idToken
          }
          login()
        }
      }).catch(error => { // eslint-disable-line
        state.googleYolo.hint({
          supportedAuthMethods: [
            'https://accounts.google.com'
          ],
          supportedIdTokenProviders: [{
            uri: 'https://accounts.google.com',
            clientId: config.clientId
          }]
        }).then(credential => {
          if (!state.googleUser) {
            state.googleUser = {
              email: credential.id,
              name: credential.displayName,
              image: credential.profilePicture,
              token: credential.idToken
            }
            login()
          }
        }).catch(error => {
          manual(error)
        })
      })
    })
  }

  window.onSignIn = newUser => {
    if (!state.googleUser) {
      let profile = newUser.getBasicProfile()
      state.googleUser = {
        email: profile.getEmail(),
        name: profile.getName(),
        image: profile.getImageUrl(),
        token: newUser.getAuthResponse().id_token
      }
      login()
    }
  }

  return api
})()

// vim: ts=2:sw=2:et:ft=javascript

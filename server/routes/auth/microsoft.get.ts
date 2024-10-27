export default oauthMicrosoftEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        microsoft: user.email,
      },
    })

    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
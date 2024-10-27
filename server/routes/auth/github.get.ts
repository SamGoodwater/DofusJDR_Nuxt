export default oauthGitHubEventHandler({
    config: {
      emailRequired: true
    },
    async onSuccess(event, { user, tokens }) {
        await setUserSession(event, {
            user: {
              id: user.id!,
              email: user.email,
              name: user.login,
              avatarUrl: user.avatar_url
            }
        })
        return sendRedirect(event, '/')
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
      console.error('GitHub OAuth error:', error)
      return sendRedirect(event, '/')
    },
  })
  
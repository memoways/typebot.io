function login(action, authEndpoint, clientId) {
  if (action != "redirect") return

  const redirectUri = window.location.href

  const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "openid profile email",
      state: btoa(redirectUri)
    }
  ).toString()

  const url = new URL(`${authEndpoint}?${params}`);
  window.location = url
}

login(ACTION, AUTH_ENDPOINT, CLIENT_ID)

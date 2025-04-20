import https from 'https'

export default function ({ $axios, redirect, $sentry, $auth, isDev }) {
  if (isDev) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    })
    $axios.defaults.httpsAgent = httpsAgent
  }

  $axios.onResponse(response => {
    const { data, config } = response
    let user = null
    if ($auth && $auth.isLoggedIn) {
      user = $auth.user
    }
    if (data && data.status === 400) {
      $sentry.captureException(new Error(data.message), scope => {
        scope.clear();
        scope.setTag("category", "api");
        scope.setTag("api", config.url);
        scope.setTag("status", data.status);
        if (user) {
          scope.setUser({
            id: user.id,
            email: user.email
          });
        }
        return scope;
      })
    }
  })
  $axios.onError(error => {
    $sentry.captureException(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
  $axios.onResponseError(error => {
    $sentry.captureException(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}

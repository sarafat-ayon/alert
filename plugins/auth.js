export default function ({ $auth, redirect, route }) {
  if (!$auth.loggedIn) {
    // eslint-disable-next-line no-useless-return
    return
  }
}

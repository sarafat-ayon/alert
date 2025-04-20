export default function ({ $auth, redirect, route }) {
  if ($auth.user && ($auth.user.paymentStatus === 'paid' || $auth.user.paymentStatus === 'ordered')) {
    return redirect('/home')
  }
}
export default function ({ $auth, redirect, route }) {
    if ($auth.user && $auth.user.paymentStatus === '' && $auth.user.isOwner === true) {
        return redirect('/payment')
    }
    if ($auth.user && ($auth.user.paymentStatus === 'paid' || $auth.user.paymentStatus === 'ordered') && route.path === '/payment') {
        return redirect('/home')
    }
}
const forgotPassword = (request, response) => {
    const formatted = {
        success: true,
        message: 'We have send the code to you email address!',
    }
    response.send(formatted)
}

const verifyForgotPasswordOtp = (request, response) => {
    const formatted = {
        success: true,
        message: 'Successfully OTP verified',
    }
    response.send(formatted)
}

const passwordReset = (request, response) => {
    const formatted = {
        success: true,
        message: 'Successfully password changed',
    }
    response.send(formatted)
}

module.exports = {
    forgotPassword,
    verifyForgotPasswordOtp,
    passwordReset,
}

import {
    EMAIL_VERIFY,
    RESEND_EMAIL,
    forgotPassword,
    PHONE_VERIFY,
    RESEND_PHONE,
} from '~/constants/urls'

export const emailVerifyOtpMixing = {
    data() {
        return {
            reSendProcess: false,
        }
    },
    methods: {
        verifyEmailOtp(data, location = null) {
            try {
                this.reSendProcess = true
                this.$axios.$post(EMAIL_VERIFY, data)
                    .then(res => {
                        this.$toast.clear()
                        if (res.success) {
                            this.$toast.success(res.message, {
                                className: ['toasted-bg-archive'],
                            })
                            if (location) {
                                this.$emit('verified', { status: res.success, type: 'email' })
                            } else {
                                this.close()
                            }
                            this.$store.commit('confirm/SET_PASSWORD_VALIDITY', false)
                            this.$emit('isValidPassword')
                            this.close()
                        } else {
                            this.$toast.error(res.message, {
                                className: ['toasted-bg-alert'],
                            })
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error)
            }
        },
        verifyForgetPasswordEmailOtp(data, location = null) {
            try {
                this.reSendProcess = true
                this.$axios.$post(EMAIL_VERIFY, data)
                    .then(res => {
                        this.$toast.clear()
                        if (res.success) {
                            this.$toast.success(res.message, {
                                className: ['toasted-bg-archive'],
                            })
                            if (location) {
                                this.$emit('verified', { status: res.success, type: 'email' })
                            } else {
                                this.showEmailVerifyModal(false)
                                setTimeout(() => {
                                    this.showPasswordField = true
                                    this.$v.$reset()
                                }, 700)
                            }
                            this.$store.commit('confirm/SET_PASSWORD_VALIDITY', false)
                            this.$emit('isValidPassword')
                            this.close()
                        } else {
                            this.$toast.error(res.message, {
                                className: ['toasted-bg-alert'],
                            })
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error)
            } finally {
                this.reSendProcess = false
            }
        },
        resendEmailVerifyCode(data, location = null) {
            try {
                this.reSendProcess = true
                this.sendCodeProcess = true
                this.$axios.$post(location ? RESEND_EMAIL : forgotPassword, data)
                    .then(res => {
                        this.$toast.clear()
                        if (res.success) {
                            this.$toast.success(res.message, {
                                className: ['toasted-bg-archive'],
                            })
                            if (location === null) {
                                this.hideEmailField = true
                                this.hidePasswordModal = false
                                setTimeout(() => {
                                    this.showEmailVerifyModal(true)
                                }, 700)
                                this.sendCodeProcess = false
                                this.reSendProcess = false
                            }
                        } else {
                            this.$toast.error(res.message, {
                                className: ['toasted-bg-alert'],
                            })
                            this.sendCodeProcess = false
                            this.reSendProcess = false
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error)
            }
        },
        resendPasswordConfirmEmailVerifyCode(data, location = null) {
            try {
                this.reSendProcess = true
                this.sendCodeProcess = true
                this.$axios.$post(location ? RESEND_EMAIL : forgotPassword, data)
                    .then(res => {
                        this.$toast.clear()
                        if (res.success) {
                            this.$toast.success(res.message, {
                                className: ['toasted-bg-archive'],
                            })
                            if (location === null) {
                                this.hideEmailField = true
                                this.hidePasswordModal = false
                                setTimeout(() => {
                                    this.showPasswordConfirmEmailVerifyModal(true)
                                }, 700)
                                this.sendCodeProcess = false
                            }
                        } else {
                            this.$toast.error(res.message, {
                                className: ['toasted-bg-alert'],
                            })
                            this.sendCodeProcess = false
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error)
            } finally {
                this.reSendProcess = false
            }
        }
    }
}

export const phoneVerifyOtpMixing = {
    data() {
        return {
            resendProcess: false,
        }
    },
    methods: {
        verifyPhoneOtp(data, location = null) {
            try {
                this.resendProcess = true
                this.$axios.$post(PHONE_VERIFY, data)
                    .then(res => {
                        this.$toast.clear()
                        if (res.success) {
                            this.$toast.success(res.message, {
                                className: ['toasted-bg-archive'],
                            })
                            if (location) {
                                this.$emit('verified', { status: res.success, type: 'phone' })
                                this.$auth.setUserToken(res.data.access, res.data.refresh)
                                this.enablePayment()
                                this.storeUserStorage()
                            } else {
                                this.activeComponent = 'VerificationMessage'
                                this.$emit('newPhone', this.phone)
                            }
                        } else {
                            this.$toast.error(res.message, {
                                className: ['toasted-bg-alert'],
                            })
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error)
            }
        },
        resendPhoneVerifyCode(data, location = null) {
            try {
                this.resendProcess = true
                this.$axios.$post(RESEND_PHONE, data)
                    .then(res => {
                        this.$toast.clear()
                        if (res.success) {
                            this.$toast.success(res.message, {
                                className: ['toasted-bg-archive'],
                            })
                        } else {
                            this.$toast.error(res.message, {
                                className: ['toasted-bg-alert'],
                            })
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error)
                this.resendProcess = false
            }
        }
    }
}
import countryAlphanumeric from './countryFirstTwoCharacter'
import { CHECK_EMAIL } from '~/constants/urls'

export const validationMessages = {
  required: () => 'The field is required',
  email: () => 'The value should be valid email',
  notGmail: () => {
    return 'The value is not gmail'
  },
  checkEmail: () => {
    return 'This email is already taken'
  },

  checkBusinessType: () => {
    return 'The field is required'
  },

  checkUserName: () => {
    return 'This username is already taken'
  },
  containsValidPassword: () => {
    return 'Need Uppercase, Lowercase letter, Number and Special Character'
  },

  minLength: ({ $params }) =>
    `Must be at least ${$params.minLength.min} characters`,

  maxLength: ({ $params }) => `Maximum character is ${$params.maxLength.max} `,

  minMobileLength: ({ $params }) =>
    `Must be at least ${$params.minMobileLength.min} digits`,

  maxMobileLength: ({ $params }) => `Maximum digits is ${$params.maxMobileLength.max} `,

  countryFirstTwoCharacter: () => {
    return 'Please use the first two characters!'
  },
  numeric: () => 'Must be numeric character',
  numberWithPercentage: () => {
    return 'Enter a valid target value'
  }
}

export function numberWithPercentage(value) {
  const containsNumber = /[0-9]/.test(value)
  const containsSpecial = /[%]/.test(value)
  return (
    containsNumber && containsSpecial
  )
}

export function containsValidPassword(value) {
  const containsUppercase = /[A-Z]/.test(value)
  const containsLowercase = /[a-z]/.test(value)
  const containsNumber = /[0-9]/.test(value)
  const containsSpecial = /[_#?!@$%^&*-]/.test(value)
  return (
    containsUppercase && containsLowercase && containsNumber && containsSpecial
  )
}

export function notGmail(value = '') {
  return value.includes('gmail')
}

export function checkBusinessType(value) {
  if (value === 'Select') {
    return false
  } else return true
}

export function checkEmail(value) {
  const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (value === '') return true
  if (!validEmail.test(String(value).toLowerCase())) return true

  return new Promise((resolve, reject) => {
    this.$axios
      .$post(CHECK_EMAIL, { email: value })
      .then((res) => resolve(res.success))
  })
}

export function checkUserName(value) {
  if (value === '') return true

  return new Promise((resolve, reject) => {
    this.$axios
      .$post('users/check-username', { userName: value })
      .then((res) => resolve(!res))
  })
}

export function countryFirstTwoCharacter(params) {
  return countryAlphanumeric.countryFirstTwoCharacter.includes(
    params.toUpperCase()
  )
}

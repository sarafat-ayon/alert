import Vue from 'vue'
import { formatDistanceToNowStrict } from 'date-fns'
Vue.filter('daysDiff', function (startDate, endDate, daysToAddOrRemove = 0) {
  const oneDay = 24 * 60 * 60 * 1000
  const startDateObject = new Date(startDate)
  const endDateObject = new Date(endDate)

  return (
    Math.round(
      Math.abs((startDateObject.getTime() - endDateObject.getTime()) / oneDay)
    ) + daysToAddOrRemove || 1
  )
})

Vue.filter('timeChange', function (startDate) {
  return 'ok'
})

Vue.filter('strLimit', (value, length) => {
  return value.length > length ? value.substring(0, length) + '...' : value
})

Vue.filter('diffForHumans', (value) => {
  const diff = formatDistanceToNowStrict(new Date(value))
  const diffArray = diff.split(' ')
  const singleC = diffArray[1]
  return `${diffArray[0]} ${singleC}`
})

Vue.filter('diffForHumansMinSec', (value) => {
  const diff = formatDistanceToNowStrict(new Date(value))
  const diffArray = diff.split(' ')
  const singleC = diffArray[1]
  if (singleC === 'minutes' | singleC === 'minute') {
    return `${diffArray[0]} min`
  }
  if (singleC === 'seconds' | singleC === 'second') {
    return `${diffArray[0]} sec`
  }
  return `${diffArray[0]} ${singleC}`
})

Vue.filter('diffForHumansShortFlag', (value) => {
  const diff = formatDistanceToNowStrict(new Date(value))
  const diffArray = diff.split(' ')
  const singleC = diffArray[1].split('')
  const singleB = singleC[0]
  return `${diffArray[0]}${singleB}`
})

Vue.filter('atSignUsername', (value) => {
  const user = value.split('')[0]
  if (user === '@') {
    return value
  } else if (value.includes('@')) {
    return value
  } else {
    return '@' + value
  }
})

Vue.filter('diffForHumansMessageFeed', (value) => {
  const diff = formatDistanceToNowStrict(new Date(value))
  const diffArray = diff.split(' ')
  const singleC = diffArray[1]
  if (singleC === 'years' | singleC === 'year') {
    return `${diffArray[0]}y`
  }
  if (singleC === 'months' | singleC === 'month') {
    return `${diffArray[0]}mon`
  }
  if (singleC === 'days' | singleC === 'day') {
    return `${diffArray[0]}d`
  }
  if (singleC === 'hours' | singleC === 'hour') {
    return `${diffArray[0]}h`
  }
  if (singleC === 'minutes' | singleC === 'minute') {
    return `${diffArray[0]}m`
  }
  if (singleC === 'seconds' | singleC === 'second') {
    return `${diffArray[0]}s`
  }
  return `${diffArray[0]} ${singleC}`
})

Vue.directive('see-more', {
  bind(el, binding, vnode, oldVnode) {
    const right = !!(binding.modifiers && binding.modifiers.right)
    const limit = binding.value || 100
    const original = el.innerHTML
    const totalTextLength = el.innerText.trim().length

    if (totalTextLength > limit) {
      const summary = original.slice(0, limit)
      const expandLink = document.createElement('a')
      const collapseLink = document.createElement('a')

      expandLink.classList.add(
        'text-ash-landing',
        'cursor-pointer',
        'self-center',
      )
      collapseLink.classList.add(
        'text-ash-landing',
        'cursor-pointer',
        'self-center',
      )
      if (right) {
        expandLink.classList.add('text-right')
        collapseLink.classList.add('text-right')
      } else {
        expandLink.classList.add('float-right')
        collapseLink.classList.add('float-right')
      }

      expandLink.innerHTML = '...see more'
      collapseLink.innerHTML = 'less more'

      const expandNode = (e) => {
        e.stopPropagation()
        el.innerHTML = `${original} `
        el.appendChild(collapseLink)
      }

      const collapseNode = () => {
        el.innerHTML = `${summary}`
        el.appendChild(expandLink)
      }

      expandLink.addEventListener('click', expandNode)
      collapseLink.addEventListener('click', collapseNode)
      collapseLink.addEventListener('click', (e) => {
        e.stopPropagation()
      })
      collapseNode()
    }
  },
})

Vue.directive('numericOnly', {
  bind(el) {
    el.addEventListener('keydown', () => {
      console.log('ok')

      const regex = /^[0-9]*$/
      if (!regex.test(el.value)) {
        el.value = ''
      }
      return false
    })
  },
})

Vue.directive('nameIndicator', {
  bind(el, binding) {
    binding.value.forEach(item => {
      const stringToGoIntoTheRegex = item
      const regexExp = new RegExp(stringToGoIntoTheRegex, "g");
      const text = el.innerHTML
      const solidText = text.replace(regexExp, function (string) {
        return createDom(binding, string)
      })
      el.innerHTML = solidText
    })
  }
})

function createDom(binding, string) {
  const createDynamicTag = document.createElement('span')
  createDynamicTag.style.color = '#0877e1'

  createDynamicTag.innerText = string
  return createDynamicTag.outerHTML
}
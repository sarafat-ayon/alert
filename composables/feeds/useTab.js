import { ref } from '@nuxtjs/composition-api'
// import { useAlert } from '~/stores/alert'

export function useTab(currentComp) {
  const offsetLeftPx = ref(0)
  const offsetTopPx = ref(0)
  const backgroundWidth = ref(100)
  const circleBackgroundColor = ref('bg-gray-900')
  const backgroundColor = ref('bg-gray-500')
  const textBackgroundColor = ref('text-gray-900')
  const activeComponent = ref(currentComp)
  const activeOldIndex = ref(0)
  const activeCurrentIndex = ref(0)
  // const store = useAlert()
  const tab = (activeLink) => {
    // setTimeout(() => {
    backgroundWidth.value = activeLink.scrollWidth
    const innerBackgroundColor = activeLink.dataset.themeBg
    const innerTextBackgroundColor = activeLink.dataset.themeText
    const innerCircleBackgroundColor = activeLink.dataset.themeCircle
    circleBackgroundColor.value = innerCircleBackgroundColor
    backgroundColor.value = innerBackgroundColor
    textBackgroundColor.value = innerTextBackgroundColor
    offsetLeftPx.value = activeLink.offsetLeft
    offsetTopPx.value = activeLink.offsetTop
    // }, 1000)
  }

  const animate = (element, event) => {
    const activeLink = event.target.closest(element)
    backgroundWidth.value = activeLink.scrollWidth
    const innerBackgroundColor = activeLink.dataset.themeBg
    const innerTextBackgroundColor = activeLink.dataset.themeText
    const innerCircleBackgroundColor = activeLink.dataset.themeCircle
    circleBackgroundColor.value = innerCircleBackgroundColor
    backgroundColor.value = innerBackgroundColor
    textBackgroundColor.value = innerTextBackgroundColor
    offsetLeftPx.value = activeLink.offsetLeft
    offsetTopPx.value = activeLink.offsetTop
  }

  const showTabMenu = (
    componentName,
    element1,
    element2,
    event,
    setOnStore
  ) => {
    const tabWrapper = event.target.closest(element1)
    const oldActiveTab = tabWrapper.querySelector(element2)
    if (componentName !== activeComponent.value) {
      activeOldIndex.value = oldActiveTab.dataset.index
      const innerActiveCurrentIndex = event.target.dataset.index

      setTimeout(() => {
        activeCurrentIndex.value = innerActiveCurrentIndex
        activeComponent.value = componentName
        // console.log('hello', setOnStore.args);
        // if (setOnStore) {
        //     store.setOnStore(
        //         activeComponent.value
        //     )
        // }
      }, 300)
    } else {
      activeOldIndex.value = oldActiveTab.dataset.index

      setTimeout(() => {
        activeCurrentIndex.value = 0
        activeComponent.value = componentName
        // if (setOnStore) {
        //     store.setOnStore(
        //         activeComponent.value
        //     )
        // }
      }, 300)
    }
  }

  return {
    tab,
    animate,
    showTabMenu,
    offsetLeftPx,
    activeComponent,
    backgroundWidth,
    offsetTopPx,
  }
}

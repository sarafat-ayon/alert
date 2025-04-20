import { ref, useStore } from '@nuxtjs/composition-api'

export function useLoadMore() {
  const disableLoadMoreProcess = ref(false)
  const store = useStore()
  const loadMore = async () => {
    if (store.state.home.loadMoreArticles) {
      disableLoadMoreProcess.value = true
      try {
        await store.dispatch('home/loadMoreArticles')
      } catch (error) {
        console.log(error)
      } finally {
        disableLoadMoreProcess.value = false
      }
    } else {
      store.dispatch('home/getAllSocialArticle', store.state.home.articles.id)
    }
  }

  const loadMorePlaylistItem = async () => {
    disableLoadMoreProcess.value = true
    try {
      await store.dispatch('home/loadMorePlaylistItems')
    } catch (error) {
      console.log(error)
    } finally {
      disableLoadMoreProcess.value = false
    }
  }

  return { loadMore, loadMorePlaylistItem, disableLoadMoreProcess }
}

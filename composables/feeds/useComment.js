import { useContext } from "@nuxtjs/composition-api"
import { FEED_COMMENTS } from '../../constants/urls'


export function useFeedComment() {
    const { $axios } = useContext()
    const loadComment = async ({ provider, id }) => {
        try {
            return await $axios.$post(FEED_COMMENTS, {
                provider,
                id
            })
        } catch (error) {
            console.log(error)
        }
    }

    return { loadComment }
}










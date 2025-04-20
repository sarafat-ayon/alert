import { useContext } from "@nuxtjs/composition-api"
import { YOUTUBE_TRANSCRIPT } from '../../constants/urls'


export function useYoutubeTranscript() {
    const { $axios } = useContext()
    const loadTranscript = async ({ provider, id }) => {
        try {
            return await $axios.$post(YOUTUBE_TRANSCRIPT, {
                provider,
                id
            })
        } catch (error) {
            console.log(error)
        }
    }

    return { loadTranscript }
}
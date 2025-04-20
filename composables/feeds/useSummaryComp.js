import { useAlert } from '~/stores/alert'

export function useSummaryComp() {
    const store = useAlert()
    
    const setSummaryComp = (element) => {
        
        
            store.setSummaryComponent({
                summaryComp: element,
                previousSummaryComp: store.summaryComp,
            })
        
    }

    return { setSummaryComp }
}
import { useEffect, useRef } from "react"
import { 
    getPlansFromServer, 
    savePlansToLocalStorage, 
    syncUnsyncedPlansOnLoad 
} from '../Handlers/PlansHandlers.jsx'

function usePageLifecycleHandlers(setPlans, setIsLoading, unsavedChanges, courseMap) {
    const courseMapRef = useRef(courseMap)
    const unsavedChangesRef = useRef(unsavedChanges)

    async function handleLoad() {
        try {
            await syncUnsyncedPlansOnLoad()
            const plans = await getPlansFromServer()
            setPlans(plans)
        } catch (error) {
            console.error("Erro no processo de carregamento:", error)
        } finally {
            setIsLoading(false)
            window.removeEventListener("load", handleLoad)
        }
    }      

    function handleBeforeUnload(event) {
        if (unsavedChangesRef.current) {
            event.preventDefault()
            savePlansToLocalStorage(courseMapRef.current)
        }
    }

    window.addEventListener("load", handleLoad) 

    useEffect(() => {
        courseMapRef.current = courseMap
    }, [courseMap])

    useEffect(() => {
        unsavedChangesRef.current = unsavedChanges
    }, [unsavedChanges])

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload) 

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [handleBeforeUnload])
}

export default usePageLifecycleHandlers

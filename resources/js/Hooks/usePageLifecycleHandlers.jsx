import { useEffect, useRef } from "react"
import { 
    getPlansFromServer, 
    savePlansToLocalStorage, 
    syncUnsyncedPlansOnLoad 
} from '../Handlers/PlansHandlers.jsx'

function usePageLifecycleHandlers(setPlans, setIsLoading, unsavedChanges, courseMap) {
    const courseMapRef = useRef(courseMap)
    const unsavedChangesRef = useRef(unsavedChanges)

    useEffect(() => {
        courseMapRef.current = courseMap
    }, [courseMap])

    useEffect(() => {
        unsavedChangesRef.current = unsavedChanges
    }, [unsavedChanges])

    async function handleLoad() {
        try {
          await syncUnsyncedPlansOnLoad()
          const plans = await getPlansFromServer()
          setPlans(plans)
        } catch (error) {
          console.error("Erro no processo de carregamento:", error)
        } finally {
          setIsLoading(false)
        }
    }      

    function handleBeforeUnload() {
        if (unsavedChangesRef.current) {
            savePlansToLocalStorage(courseMapRef.current)
        }
    }

    window.addEventListener("load", handleLoad)
    window.addEventListener("beforeunload", handleBeforeUnload)
}

export default usePageLifecycleHandlers

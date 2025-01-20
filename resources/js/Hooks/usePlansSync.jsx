import { useEffect, useRef } from "react"
import { 
    getPlansFromServer, 
    syncPlansWithServer 
} from '../Handlers/PlansHandlers.jsx'

function usePlansSync(courseMap, setCourseMap, setPlans, setUnsavedChanges) {
  const courseMapRef = useRef(courseMap)

  useEffect(() => {
    courseMapRef.current = courseMap
  }, [courseMap])

  useEffect(() => {
    const intervalId = setInterval(async () => {
        try {
            syncPlansWithServer(courseMapRef.current, setCourseMap)
            const plans = await getPlansFromServer()
            setPlans(plans)
            setUnsavedChanges(false)
        } catch (error) {
            console.error("Erro no processo de carregamento:", error)
    }}, 10000)

    return () => clearInterval(intervalId)
  }, [courseMap])
}

export default usePlansSync
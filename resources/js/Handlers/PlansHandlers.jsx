import axios from 'axios'

/**
 * Save unsynced plans to local storage for later synchronization.
 * 
 * @param {Map} unsyncedData - Map containing unsynced data.
 */
function persistPlansToLocalStorage(unsyncedData) {
  const payload = JSON.stringify(
    Array.from(unsyncedData).map(([subjectId, subjectDetails]) => ({
      id: subjectDetails.plan,
      subject_id: subjectId,
      semester: subjectDetails.semester,
    }))
  )
  
  localStorage.setItem('unsyncedPlans', payload)
}

/**
 * Fetch plans from the server.
 * 
 * @returns {Promise<Array>} The list of plans fetched from the server.
 * @throws {Error} Throws an error if fetching fails.
 */
async function fetchPlansFromServer() {
  try {
    const response = await fetch("/api/plans/index")
    const data = await response.json()
    return data.plans
  } catch (error) {
    throw error
  }
}

/**
 * Synchronize plans with the server.
 * 
 * @param {Map} data - Map containing the current state of plans.
 * @param {Function} updateData - Function to update the state of plans data.
 * @param {Function} setSyncErrorFlag - Function to set the sync error flag.
 */
async function syncPlansWithServer(data, updateData, setSyncErrorFlag) {
  try {
    const payload = JSON.stringify(
      Array.from(data).map(([subjectId, subjectDetails]) => ({
        id: subjectDetails.plan,
        subject_id: subjectId,
        semester: subjectDetails.semester,
      }))
    )
    
    const response = await axios.post('/api/plans/sync', payload)

    if (response.status === 200) {
      const { changedPlans } = response.data

      updateData((previousData) => {
        const updatedData = new Map(previousData)

        changedPlans.forEach(({ id, subject_id, action }) => {
          switch (action) {
            case 'created':
            case 'updated':
              updatedData.set(subject_id, {
                ...updatedData.get(subject_id),
                plan: id,
              })
              break

            case 'deleted':
              updatedData.set(subject_id, {
                ...updatedData.get(subject_id),
                plan: null,
              })
              break

            default:
              console.warn("Unrecognized action:", action)
          }
        })

        return updatedData
      })

      console.log("Synchronization successful!")
      setSyncErrorFlag(false)
    } else {
      console.error("Synchronization error:", response.data)
      setSyncErrorFlag(true)
    }
  } catch (error) {
    console.error("Communication error with the server:", error)
    setSyncErrorFlag(true)
  }
}

/**
 * Synchronize unsynced plans from local storage.
 */
async function syncPendingPlans() {
  const unsyncedPlans = localStorage.getItem('unsyncedPlans')

  if (unsyncedPlans) {
    try {
      const response = await axios.post('api/plans/sync', unsyncedPlans)
      if (response.status === 200) 
        localStorage.removeItem('unsyncedPlans')
    } catch (error) {
      console.error("Error synchronizing unsynced plans:", error)
    }
  }
}

export {fetchPlansFromServer, persistPlansToLocalStorage, syncPlansWithServer, syncPendingPlans}
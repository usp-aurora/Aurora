import axios from 'axios'

/**
 * Retrieves stored plans from local storage
 * 
 * @returns {Array | null} Plans grouped by semester.
 */
function fetchGuestPlans() {
  const storedPlans = localStorage.getItem('guestPlans');
  localStorage.removeItem('guestPlans');
  return storedPlans ? JSON.parse(storedPlans) : null;
}

/**
 * Saves relevant data for guest users, ensuring it includes up to the last non-empty semester
 * 
 * @param {Array} guestPlans - Plans grouped by semester.
 */
function saveGuestPlans(guestPlans) {
  const lastSemester =  guestPlans.findLastIndex((sem) => sem.subjects.length > 0) + 1;
  localStorage.setItem('guestPlans', JSON.stringify(guestPlans.slice(0, lastSemester)));
}
    
/**
 * Save unsynced plans to local storage for later synchronization.
 * 
 * @param {Map} unsyncedData - Map containing unsynced data.
 */
function saveUserPlans(unsyncedData) {
  const payload = JSON.stringify(
    Array.from(unsyncedData)
    .filter(([code, subject]) => subject.unsaved) // Filters only unsaved subjects
    .map(([subjectCode, subjectDetails]) => ({
      id: subjectDetails.plan,
      subject_code: subjectCode,
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
async function fetchUserPlans() {
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
 */
async function syncPlansWithServer(data, updateData) {
  try {
    const payload = JSON.stringify(
      Array.from(data)
      .filter(([code, subject]) => subject.unsaved) // Filters only unsaved subjects
      .map(([subjectCode, subjectDetails]) => ({
        id: subjectDetails.plan,
        subject_code: subjectCode,
        semester: subjectDetails.semester,
      }))
    )
    
    const response = await axios.post('/api/plans/sync', payload)

    if (response.status === 200) {
      const { changedPlans } = response.data

      updateData((previousData) => {
        const updatedData = new Map(previousData)

        changedPlans.forEach(({ id, subject_code, action }) => {
          switch (action) {
            case 'created':
            case 'updated':
              updatedData.set(subject_code, {
                ...updatedData.get(subject_code),
                plan: id,
                unsaved: false,
              })
              break

            case 'deleted':
              updatedData.set(subject_code, {
                ...updatedData.get(subject_code),
                unsaved: false,
                plan: null,
              })
              break

            default:
              console.warn("Unrecognized action:", action)
          }
        })
        return updatedData
      })
    } else {
      console.error("Synchronization error:", response.data)
    }
  } catch (error) {
    console.error("Communication error with the server:", error)
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

export { fetchGuestPlans, fetchUserPlans, saveGuestPlans, saveUserPlans, syncPlansWithServer, syncPendingPlans };
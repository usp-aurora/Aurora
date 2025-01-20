import axios from 'axios'

function savePlansToLocalStorage(updatedData) {
  const payload = JSON.stringify(
    Array.from(updatedData).map(([key, val]) => ({
      id: val.plan,
      subject_id: key,
      semester: val.semester,
    }))
  )
  
  localStorage.setItem('unsyncedPlans', payload)
}

async function getPlansFromServer() {
  try {
    const response = await fetch("/api/plans/index")
    const data = await response.json()
    return data.plans
  } catch (error) {
    throw error
  }
}

async function syncPlansWithServer(updatedData, setData) {
  try {
    const payload = JSON.stringify(
      Array.from(updatedData).map(([key, val]) => ({
        id: val.plan,
        subject_id: key,
        semester: val.semester,
      }))
    )
    
    const response = await axios.post('/api/plans/sync', payload)

    if (response.status === 200) {
      if (response.data.deletedCourses.length > 0)
        setData((prev) => {
          const data = new Map(prev)
          response.data.deletedCourses.forEach((id) => data.set(id, {
              ...data.get(id),
              plan: null, 
            }))
          return data
        })
      console.log("Sincronização concluída com sucesso!")
    } else {
      console.error("Erro ao sincronizar:", response.data)
    }
  } catch (error) {
    console.error("Erro na comunicação com o servidor:", error)
  }
}

async function syncUnsyncedPlansOnLoad() {
  const unsyncedPlans = localStorage.getItem('unsyncedPlans')
    if (unsyncedPlans) {
      const response = await axios.post('api/plans/sync', unsyncedPlans)

      if (response.status === 200) {
        localStorage.removeItem('unsyncedPlans')
      } else {
        console.error('Erro ao sincronizar planos:', response.data)
    }
  }
}

export {getPlansFromServer, savePlansToLocalStorage, syncPlansWithServer, syncUnsyncedPlansOnLoad}
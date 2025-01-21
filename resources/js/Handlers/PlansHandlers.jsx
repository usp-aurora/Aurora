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

async function syncPlansWithServer(updatedData, setData, failedToSave) {
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
      const { changedPlans } = response.data

      setData((prev) => {
        const data = new Map(prev)

        changedPlans.forEach(({ id, subject_id, action }) => {
          switch (action) {
            case 'created':
            case 'updated':
              data.set(subject_id, {
                ...data.get(subject_id),
                plan: id,
              })
              break

            case 'deleted':
              data.set(subject_id, {
                ...data.get(subject_id),
                plan: null,
              })
              break

            default:
              console.error("Ação não reconhecida:", action)
              break
          }
        })
        return data
      })
      console.log("Sincronização concluída com sucesso!")
      failedToSave(false)
    } else {
      console.error("Erro ao sincronizar:", response.data)
      failedToSave(true)
    }
  } catch (error) {
    console.error("Erro na comunicação com o servidor:", error)
    failedToSave(true)
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
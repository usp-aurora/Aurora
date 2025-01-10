import axios from 'axios';


export const loadPlans = async () => {
  const unsyncedPlans = localStorage.getItem('unsyncedPlans');
    if (unsyncedPlans) {
      const response = await axios.post('api/plans/sync', unsyncedPlans);

      if (response.status === 200) {
        localStorage.removeItem('unsyncedPlans');
      } else {
        console.error('Erro ao sincronizar planos:', response.data);
    }
  }
}

export const storePlans = (updatedData) => {
  const payload = JSON.stringify( Array.from(updatedData).map(([key, val]) => {
    return {
      id: val.plan_id,
      subject_id: key,
      semester: val.semester,
    };
  })
  );
  localStorage.setItem('unsyncedPlans', payload);
}

export const syncPlans = async (updatedData, setData) => {
  try {
    const payload = JSON.stringify(
      Array.from(updatedData).map(([key, val]) => {
        return {
          id: val.plan_id,
          subject_id: key,
          semester: val.semester,
        };
      })
    );
    
    const response = await axios.post('/api/plans/sync', payload);

    if (response.status === 200) {
      console.log("Sincronização concluída com sucesso!");
    } else {
      console.error("Erro ao sincronizar:", response.data);
    }
  } catch (error) {
    console.error("Erro na comunicação com o servidor:", error);
  }
};

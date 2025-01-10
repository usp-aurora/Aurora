import axios from 'axios';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

export const fetchPlans = async (setData, isFetching) => {
  try {
    const response = await fetch("/api/plans/index"); // Endpoint para buscar os planos
    const data = await response.json();
    setData(data.plans);
  } catch (error) {
    console.error("Erro ao carregar planos:", error);
  } finally {
    isFetching(false);
  }
};

export const syncPlans = async (updatedData) => {
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

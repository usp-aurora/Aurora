import axios from 'axios';

export const createPlan = async (newPlan, setPlans) => {
  try {
    const response = await axios.post('/plans/store', newPlan);
    setPlans((prevPlans) => [...prevPlans, response.data]);
  } catch (error) {
    console.error('Erro ao criar o plano:', error);
  }
};

export const updatePlan = async (id, updatedData) => {
  try {
    await axios.post(`/plans/update/${id}`, updatedData);
  } catch (error) {
    console.error('Erro ao atualizar o plano:', error);
  }
};

export const deletePlan = async (id) => {
  try {
    await axios.delete(`/plans/delete/${id}`);
  } catch (error) {
    console.error('Erro ao deletar o plano:', error);
  }
};

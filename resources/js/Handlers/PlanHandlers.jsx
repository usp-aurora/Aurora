import axios from 'axios';

const createPlan = async (newPlan, setPlans) => {
  try {
    const response = await axios.post('/plans/store', newPlan);
    // setPlans((prevPlans) => [...prevPlans, response.data]);
  } catch (error) {
    console.error('Erro ao criar o plano:', error);
  }
};

const updatePlan = async (id, updatedData) => {
  try {
    await axios.post(`/plans/update/${id}`, updatedData);
  } catch (error) {
    console.error('Erro ao atualizar o plano:', error);
  }
};

const deletePlan = async (id) => {
  try {
    await axios.delete(`/plans/delete/${id}`);
  } catch (error) {
    console.error('Erro ao deletar o plano:', error);
  }
};

export const syncPlans = async (updatedData, setData) => {
  console.log("Iniciando sincronização...");
  
  try {
    updatedData.forEach((subject, key) => {
      if (subject.plan_id && subject.semester) {
        return updatePlan(subject.plan_id, {
          subject_id: subject.id,
          semester: subject.semester,
        });
      } else if (subject.semester) {
        return createPlan({ 
          subject_id: subject.id, 
          semester: subject.semester
        }, setData);
      } else if (subject.plan_id) {
        return deletePlan(subject.plan_id);
      }
  
      return null; 
    });
    console.log("Sincronização concluída!");
  } catch (error) {
    console.error("Erro ao sincronizar:", error);
  }
};
import { getJournals } from "../store/journals";
import { getQuestions } from "../store/questions";
import { getResources } from "../store/resources";
import { getTasks } from "../store/tasks";


const loadState = async (dispatch) => {
  await dispatch(getResources());
  await dispatch(getTasks());
  await dispatch(getQuestions());
  await dispatch(getJournals());
};


export default loadState;

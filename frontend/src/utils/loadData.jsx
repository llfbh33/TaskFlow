import { getQuestions } from "../store/questions";
import { getResources } from "../store/resources";
import { getTasks } from "../store/tasks";


const loadState = async (dispatch) => {
  await dispatch(getResources());
  await dispatch(getTasks());
  await dispatch(getQuestions());
};


export default loadState;

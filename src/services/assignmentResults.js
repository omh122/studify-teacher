import { axiosConfig } from '../config/axiosConfig';
import config from '../config/env';
const baseUrl = config.endpoints.assignmentResults;


const getAssignmentResults = async () => {
  try {
    const res = await axiosConfig({
      method: 'get',
      url: `${baseUrl}/`,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export default {
  getAssignmentResults,
};
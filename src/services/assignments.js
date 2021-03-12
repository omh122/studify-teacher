import { axiosConfig } from '../config/axiosConfig';
import config from '../config/env';
const baseUrl = config.endpoints.assignments;


const getAssignments = async () => {
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


const addAssignment = async (newAssignment) => {
  try {
    const res = await axiosConfig({
      method: 'post',
      url: `${baseUrl}/`,
      data: newAssignment,
      headers: {
        'Content-type': 'application/json'
      },
    });
    return res;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const updateAssignment = async (id, newAssignment) => {
  try {
    const res = await axiosConfig({
      method: 'patch',
      url: `${baseUrl}/${id}/`,
      data: newAssignment,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

const deleteAssignment = async (id) => {
  try {
    const res = await axiosConfig({
      method: 'delete',
      url: `${baseUrl}/${id}/`,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export default {
  getAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
};
import { axiosConfig } from '../config/axiosConfig';
import config from '../config/env';
const baseUrl = config.endpoints.students;

const getStudents = async () => {
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

const addStudent = async (newStudent) => {
  try {
    const res = await axiosConfig({
      method: 'post',
      url: `${baseUrl}/`,
      data: newStudent,
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

const updateStudent = async (id, newStudent) => {
  try {
    const res = await axiosConfig({
      method: 'patch',
      url: `${baseUrl}/${id}/`,
      data: newStudent,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

const deleteStudent = async (id) => {
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
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,

};
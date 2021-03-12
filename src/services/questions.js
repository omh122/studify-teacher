import { axiosConfig } from '../config/axiosConfig';
import config from '../config/env';
const baseUrl = config.endpoints.questions;


const getQuestions = async () => {
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

const addQuestion = async (newQn) => {
  try {
    const res = await axiosConfig({
      method: 'post',
      url: `${baseUrl}/`,
      data: newQn,
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

const updateQuestion = async (id, newQn) => {
  try {
    const res = await axiosConfig({
      method: 'patch',
      url: `${baseUrl}/${id}/`,
      data: newQn,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

const deleteQuestion = async (id) => {
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
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,

};
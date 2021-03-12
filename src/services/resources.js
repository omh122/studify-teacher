import { axiosConfig } from '../config/axiosConfig';
import config from '../config/env';
const baseUrl = config.endpoints.resources;


const getResources = async () => {
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

const addResource = async (newResource) => {
  try {
    const res = await axiosConfig({
      method: 'post',
      url: `${baseUrl}/`,
      data: newResource,
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

const updateResource = async (id, newResource) => {
  try {
    const res = await axiosConfig({
      method: 'patch',
      url: `${baseUrl}/${id}/`,
      data: newResource,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

const deleteResource = async (id) => {
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
  getResources,
  addResource,
  updateResource,
  deleteResource,

};
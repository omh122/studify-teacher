import { axiosConfig } from '../config/axiosConfig';
import config from '../config/env';
const baseUrl = config.endpoints.assignments;

/**
 * @param {string} _id - id of the workshop the user signed up for
 */

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


/**
 * @param {string} _id - id of the post to be deleted
 * @return {object} The deleted post object
 */
const addAssignment = async () => {
  const { data } = await axiosConfig({
    method: 'post',
    url: baseUrl,
  });
  return data;
};

export default {
  addAssignment,
  getAssignments,
};
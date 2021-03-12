import { axiosConfig } from '../config/axiosConfig';
import config from '../config/env';
const baseUrl = config.endpoints.teachers;


const login = async (loginDetails) => {
    try {
        const res = await axiosConfig({
            method: 'post',
            url: `${baseUrl}/login`,
            data: loginDetails,
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


export default {
    login
};
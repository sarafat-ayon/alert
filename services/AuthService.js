import axios from './Axios';
import { error, success } from "./ResponseHandler";

const RESPONSE_TYPE = { responseType: 'text' };
const { REACT_APP_BASE_API_URL } = process.env;
const LOGIN_URL = REACT_APP_BASE_API_URL + "/api/base/Login";

class AuthService {
    async login(user) {
        try {            
            const response = await axios.post(LOGIN_URL, user, RESPONSE_TYPE);

            return success(response);
        } catch (e) {
            return error(e);
        }
    }

    async register(user) {
        try {            
            const response = await axios.post(LOGIN_URL, user, RESPONSE_TYPE);

            if (!response.Successful) {
                return error(response);
            }

            return success(response);
        } catch (e) {
            return error(e);
        }
    }

    async forgot(user) {
        try {            
            const response = await axios.post(LOGIN_URL, user, RESPONSE_TYPE);

            return success(response);
        } catch (e) {
            return error(e);
        }
    }

    async updateUser(payload = {}) {
        try {            
            const response = await axios.post(LOGIN_URL, payload, RESPONSE_TYPE);

            return success(response);
        } catch (e) {
            return error(e);
        }
    }    
}

export default new AuthService();

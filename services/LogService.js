import axios from "./Axios";
import { error } from "./ResponseHandler";

const RESPONSE_TYPE = { responseType: 'text' };
const { REACT_APP_BASE_API_URL } = process.env;
const ERROR_LOG_URL = REACT_APP_BASE_API_URL + "/api/base/ErrorLog";

class LogService {
    async log(errorMessage, info) {
        try {
            const payload = {
                Source: "Patient Portal (WEB)",
                StackTrace: info,
                Message: errorMessage,
            }

            await axios.post(ERROR_LOG_URL, payload, RESPONSE_TYPE);

        } catch (e) {
            console.log(e);
            return error(e);
        }
    }
}

export default new LogService();

import {API_SRV_ORIGIN} from '../constants/envConfig';
import axios from 'axios';
import Auth from '../modules/Auth';
import intl from '../utils/intl';

module.exports = (formData) => {
    const config = {
        onUploadProgress: function(progressEvent) {
            const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            console.log(percentCompleted + '%');
        },
        headers: {'Authorization': `bearer ${Auth.getToken()}`}
    };

    return axios.post(`${API_SRV_ORIGIN}/api/upload`, formData, config)    
    .catch(function (err) {
        //console.log(axiosErr.response.status);
        alert(intl.UPLOAD_FAILED);
        throw err;
    });
};
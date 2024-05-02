import axios from "axios"
import { API_NOTIFICATION_MSGS, SERVICE_URLS } from "../constants/config.js"
import { getAccessTokens, getType } from "../utils/common-utils.js"

const API_URL = "https://blogspark-backend.vercel.app"
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use({
    // set global loader here
    function(response){
        return processResponse(response);
    },
    // stop gloabal loader here
    function(error){
        return Promise.reject(processError(error))
    }
})

const processResponse = (response) => {
    if(response && response.status === 200){
        return {isSuccess : true, data : response.data}
    } else{
        return{
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if(error.response){
        console.log("ERROR IN RESPONSE", error.toJSON());
        return {
            isFailure: true,
            msg: API_NOTIFICATION_MSGS.responseFailure,
            code: error.response.status
        }
    } else if(error.request){
        console.log("ERROR IN REQUEST", error.toJSON());
        return {
            isFailure: true,
            msg: API_NOTIFICATION_MSGS.requestFailure,
            code: ""
        }

    } else{
        console.log("ERROR IN RESPONSE", error.toJSON());
        return {
            isFailure: true,
            msg: API_NOTIFICATION_MSGS.networkError,
            code: ""
        }
    }
}

const API = {}

for (const [key, value] of  Object.entries(SERVICE_URLS)) {
    API[key] = (body,showUploadProgress, showDownloadProgress) => 
    axiosInstance({
        method: value.method,
        url: value.url,
        data: value.method === 'DELETE' ? {} : body,
        responseType: value.responseType,
        headers: {
            authorization: getAccessTokens()
        },
        TYPE: getType(value, body),
        onUploadProgress: function(progressEvent) {
            if (showUploadProgress) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                showUploadProgress(percentCompleted);
            }
        },
        onDownloadProgress: function(progressEvent) {
            if (showDownloadProgress) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                showDownloadProgress(percentCompleted);
            }
        }
    })
}
export {API}
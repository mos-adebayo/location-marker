import axios from "axios";
import moment from "moment/moment";
import {appConstants} from "../_constant";

export const appHelpers = {
    mapConfig : () => {
      return {
          source: appConstants.TOM_TOM_MAP_SOURCE,
          key: appConstants.TOM_TOM_KEY,
          basePath: '/sdk',
          zoom: appConstants.MAP_ZOOM_LEVEL
      }
    },
    mapSearchBoxConfig : () => {
      return {
          location: false,
          language: 'pl-PL',
          view: 'IN',
          position: appConstants.TOM_TOM_SEARCH_BOX_POSITION,
          serviceOptions: {unwrapBbox: true}
      }
    },
    formatDate: (d, format) => {
        return moment(d).format(format || "MMM DD, YYYY");
    },
    interpretError : error => {
        let errorMessage;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if(error.response.status === 500){
                errorMessage = "Oops, something went wrong";
            }else if(error.response.status === 404){
                errorMessage = "Resource not found";
            }else{
                errorMessage = "Oops, unable to process request"
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            errorMessage = 'Connection refused';
        } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
        }
        return errorMessage;
    },

    getRequest: function (url) {
        let reqHeader = { "Content-Type": "application/json" };
        let config = { headers: reqHeader };
        return axios
            .get(url, config)
            .then(function (res) {
                return {status: appConstants.REQUEST_SUCCESS, data: res.data}
            })
            .catch( (error) =>  {
                const errorMessage = this.interpretError(error);
                return { status: appConstants.REQUEST_ERROR, error: errorMessage}
            });
    },
    postRequest: function (url, payload) {
        let reqHeader = { "Content-Type": "application/json" };

        let config = { headers: reqHeader };

        return axios.post(url, payload, config)
            .then(res => {
                return {status: appConstants.REQUEST_SUCCESS, data: res.data}
            }).catch((error) => {
                const errorMessage = this.interpretError(error);
                return {status: appConstants.REQUEST_ERROR, error: errorMessage}
            });
    },
    putRequest: function (url, payload) {
        let reqHeader = { "Content-Type": "application/json" };

        let config = { headers: reqHeader };

        return axios.put(url, payload, config)
            .then(res => {
                return {status: appConstants.REQUEST_SUCCESS, data: res.data}
            }).catch((error) => {
                const errorMessage = this.interpretError(error);
                return {status: appConstants.REQUEST_ERROR, error: errorMessage}
            });
    },
    deleteRequest: function (url) {
        let reqHeader = { "Content-Type": "application/json" };

        let config = { headers: reqHeader };

        return axios.delete(url, config)
            .then(res => {
                return {status: appConstants.REQUEST_SUCCESS, data: res.data}
            }).catch((error) => {
                const errorMessage = this.interpretError(error);
                return {status: appConstants.REQUEST_ERROR, error: errorMessage}
            });
    },
  interpretErrorResponse(error) {
    let errorMessage = "";
    if(error.response){
        errorMessage = error.response.data
            ? error.response.data
            : "Unable to handle request";
    }else if(error.request){
        errorMessage = "Currently, unable to handle request!"
    }else{
        errorMessage = "Something went wrong!"
    }
    if (typeof errorMessage === "string") {
      return errorMessage;
    }
    else if (Array.isArray(errorMessage)) {
      return errorMessage.join(',');
    } else {
      return "Something went wrong!";
    }
  }
};

import axios from "axios";
import moment from "moment/moment";

export const appHelpers = {
    formatDate: d => {
        return (d) ? moment((d).split('T')[0]).format('MMM DD, YYYY') : '';
    },

    getRequest: function (url, header) {
        let reqHeader = { "Content-Type": "application/json" };

        let config = { headers: reqHeader };
        // console.log(config);
        return axios
            .get(url, config)
            .then(function (res) {
                return res.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    return error.response.data;
                    // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.request};
                    return error.request;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.message};
                    return error.message;
                }
            });
    },
    postRequest: function (url, payload) {
        let reqHeader = { "Content-Type": "application/json" };

        let config = { headers: reqHeader };

        return axios.post(url, payload, config)
            .then(res => {
                return res.data;
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    return error.response.data;
                    // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.request};
                    return error.request;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.message};
                    return error.message;
                }
            });
    },
    putRequest: function (url, payload) {
        let reqHeader = { "Content-Type": "application/json" };

        let config = { headers: reqHeader };

        return axios.put(url, payload, config)
            .then(res => {
                return res.data;
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    return error.response.data;
                    // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.request};
                    return error.request;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.message};
                    return error.message;
                }
            });
    },
    deleteRequest: function (url) {
        let reqHeader = { "Content-Type": "application/json" };

        let config = { headers: reqHeader };

        return axios.delete(url, config)
            .then(res => {
                return res.data;
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    return error.response.data;
                    // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.request};
                    return error.request;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.message};
                    return error.message;
                }
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

    /*if (error.response === undefined) {
      errorMessage = "Please check your internet connectivity!";
    } else {
      errorMessage = error.response.data
        ? error.response.data
        : "Unable to handle request";
    }*/
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

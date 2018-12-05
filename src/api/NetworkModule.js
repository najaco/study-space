/**
 * @author Stephen Davis
 *
 * @description api module for making http requests
 */
class NetworkModule {

    /**
     * @description makes an http GET request to the url and passes the
     * returned JSON to the callback function
     * @param url - the url the http GET request is being made to
     * @param callback - function that takes 1 parameter [responseJson]
     * which is the JSON returned by the http request
     * @returns {Promise<any | never>} - promise from fetch function
     */
    static httpGet(url, callback) {
        return fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => callback(responseJson))
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * @description make an http POST request to the url and passes the
     * returned JSON to the callback function
     * @param url - the url the http POST request is being made to
     * @param body - the object being stringified and sent in the
     * request as the body parameter
     * @param callback - function that takes 1 parameter [responseJson]
     * which is the JSON returned by the http request
     * @returns {Promise<any | never>} - promise from fetch function
     */
    static httpPost(url, body, callback) {
        return fetch(url, {method: "POST", body: JSON.stringify(body)})
            .then(response => response.json())
            .then(responseJson => callback(responseJson))
            .catch(error => {
                console.log(error);
            })
    }

}

/**
 * @type {string} url to server
 */
export const SERVER_URL = "https://2vdx6dl0a1.execute-api.us-east-1.amazonaws.com/prod/";

// make api public
export default NetworkModule;
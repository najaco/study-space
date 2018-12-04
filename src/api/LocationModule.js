/**
 *
 * @author Stephen Davis
 *
 * @description api module for managing locations on the client
 * including listing all locations, adding and deleting a review
 *
 */
class LocationModule {

    /**
     * @description returns the instance being used. If no instance
     * has been created then this method will create one. This method
     * should not be called outside of this class. Please use getInstance()
     *
     * @returns {LocationModule|*} the current instance being used
     */
    constructor() {
        // enforce singleton class
        if (!LocationModule.instance) {
            // initialize class level fields
            this.location_names = [];           // list (string)
            this.current_location = undefined;  // object
            LocationModule.instance = this;
        }
        return LocationModule.instance;
    }

    /**
     * @description returns the instance being used. If no instance
     * has been created then this method will create one
     *
     * @returns {LocationModule|*} the current instance being used
     */
    static getInstance() {
        // enforce singleton class
        if (!LocationModule.instance) {
            LocationModule.instance = new LocationModule();
        }
        return LocationModule.instance;
    }

    /**
     * @description loads an array of locations names' into this
     * module for read-only purposes
     *
     * @param data - an array of strings representing the names of
     * the locations stored in the database
     */
    loadLocations(data) {
        // reset current location names
        this.location_names = [];
        // load
        for (let i = 0; i < data.length; i++) {
            this.location_names.push(data[i]);
        }
    }

    /**
     * @description loads the json object into this module for read and
     * write purposes
     *
     * @param data - the json object loaded from the database
     */
    loadCurrentLocation(data) {
        this.current_location = data;
    }

    /**
     * @description returns a list of the locations by name
     *
     * @returns {Array} of location names
     */
    listLocations() {
        return this.location_names;
    }

    /**
     * @returns {Location} object of the current location
     */
    currentLocation() {
        return this.current_location;
    }

    /**
     * @returns {string} url http request to server for getting
     * a list of locations from the database
     */
    getListOfLocationsURL() {
        return SERVER_URL + "locations?command=list";
    }

    /**
     * @returns {string} url http request to server for getting
     * the data about a specific location from the database
     */
    getLocationDataURL(location_name) {
        return SERVER_URL + "locations?command=get&shortName=" + location_name;
    }

    /**
     * @returns {string} url http request to server for getting
     * the comments for a specific location from the database
     */
    getLocationCommentsURL(location_name) {
        return SERVER_URL + 'reviews?command=get&shortLocation=' + location_name;
    }

    /**
     * @returns {string} url http request to server for posting
     * a review for at the current location
     */
    getPostReviewToLocationURL() {
        return SERVER_URL + "locations?command=review";
    }

}

/**
 * @type {string} url to server
 */
const SERVER_URL = "https://2vdx6dl0a1.execute-api.us-east-1.amazonaws.com/prod/";

// public class
export default LocationModule;
/**
 * @author Stephen Davis
 *
 * @description api module for managing reviews on the client
 * including building, sorting and searching
 *
 */
class ReviewModule {

    /**
     * @description returns the instance being used. If no instance
     * has been created then this method will create one. This method
     * should not be called outside of this class. Please use getInstance()
     *
     * @returns {ReviewModule|*} the current instance being used
     */
    constructor() {
        // enforce singleton class
        if (!ReviewModule.instance) {
            // initialize class level fields
            this.reviews = []; // list (review object)
            ReviewModule.instance = this;
        }
        return ReviewModule.instance;
    }

    /**
     * @description returns the instance being used. If no instance
     * has been created then this method will create one
     *
     * @returns {ReviewModule|*} the current instance being used
     */
    static getInstance() {
        // enforce singleton class
        if (!ReviewModule.instance) {
            ReviewModule.instance = new ReviewModule();
        }
        return ReviewModule.instance;
    }

    /**
     * @description loads an array of reviews into the client
     * from the server for read-only purposes
     *
     * @param data - an array of review objects
     */
    loadReviews(data) {
        // reset current reviews
        this.reviews = [];
        // load reviews into the client
        for (let i = 0; i < data.length; i++) {
            this.reviews.push(data[i]);
        }
    }

    /**
     * @description returns of all the reviews that are currently
     * loaded into the client
     *
     * @returns {Array} of review objects
     */
    listReviews() {
        return this.reviews;
    }

    /**
     * @description takes all the reviews currently loaded into
     * the client and averages their ratings and returns the result
     * @returns {number} - the average rating of all the reviews
     * currently loaded into the client
     */
    averageRating() {
        let rating = 0;
        for (let i = 0; i < this.reviews.length; i++) {
            let review = this.reviews[i];
            rating += review.rating;
        }
        rating /= this.reviews.length;
        return rating;
    }

    /**
     * @description sorts the reviews stored on the client based on
     * the filter passed. This is an in-place sort and only updates
     * the values on the module level, listReviews will still have
     * to be called to get the updated values
     *
     * @param filter - an enum defined under ReviewFilter which
     * determines how the reviews will be sorted
     */
    sort(filter) {
        for (let i = 0; i < this.reviews.length - 1; i++) {
            for (let j = i + 1; j < this.reviews.length; j++) {
                switch (filter) {
                    case ReviewFilters.RATING: {
                        /* TODO: check that the review object uses rating as a variable */
                        if (this.reviews[i].rating < this.reviews[j].rating) {
                            this._swap(this.reviews, i, j);
                        }
                        break;
                    }
                    case ReviewFilters.TIME_STAMP: {
                        /* TODO: check that the review object uses timestamp as a variable */
                        /* TODO: look for a way to convert and compare 2 timestamp strings */
                        if (this.reviews[i].timestamp < this.reviews[j].timestamp) {
                            this._swap(this.reviews, i, j);
                        }
                        break;
                    }
                }
            }
        }
    }

    /**
     * @description returns a new review object with the given parameters
     * @param rating - the rating of the review
     * @param title - 255 character title of the review
     * @param description - 255 description of the review
     * @param timestamp - time review was submitted on the client
     * @param location - full name of the location
     * @param username - the username of the user submitting the review
     * @returns {Readonly<{ID: number, rating: *, header: *, body: *, timestamp: *, Location: *, Username: *}>}
     */
    buildReview(rating, title, description, timestamp, location, username) {
        return Object.freeze(
            {
                "ID": 0,
                "rating": rating,
                "header": title,
                "body": description,
                "timestamp": timestamp,
                "Location": location,
                "Username": username,
            }
        );
    }


    /**
     * @description swaps two elements in an array
     * @param array - the array the swap is being performed on
     * @param i - the first index being swapped
     * @param j - the second index being swapped
     * @private this method is private
     */
    _swap(array, i, j) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

}

// public class
export default ReviewModule;

// sorting enums
export let ReviewFilters = Object.freeze({"RATING": 0, "TIME_STAMP": 1});
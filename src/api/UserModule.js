import {SERVER_URL} from "./NetworkModule";

class UserModule {

    constructor() {
        if (!UserModule.instance) {
            // set class variables here
            this.current_user = null;
            UserModule.instance = this;
        }
        return UserModule.instance;
    }

    static getInstance() {
        if (!UserModule.instance) {
            UserModule.instance = new UserModule();
        }
        return UserModule.instance;
    }

    loadCurrentUser(user_data) {
        this.current_user = user_data;
    }

    getCurrentUser() {
        return this.current_user;
    }

    getGetUserURL(username) {
        return SERVER_URL + "users?command=get&username=" + username;
    }

    getAddUserURL(username, password, email, image_path) {
        return SERVER_URL + "users?command=add&username=" + username + "&password=" + password + "&email=" + email + "&picpath=" + image_path;
    }
}

export default UserModule;
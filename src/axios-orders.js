import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-burger-builder-aea0f-default-rtdb.firebaseio.com/'
});

export default instance;
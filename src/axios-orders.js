import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-app-in-react.firebaseio.com/'
});

export default instance;
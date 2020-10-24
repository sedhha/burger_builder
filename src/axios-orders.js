import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-a4ccc.firebaseio.com/'
});

export default instance;
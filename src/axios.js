import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://food-creator-app.firebaseio.com/'
});

export default axiosInstance;
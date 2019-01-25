import axios from 'axios';
import {baseURL} from '../Constants';


export const userLogin = (email, password) => {
	axios.post(baseURL + '/login/', {email, password})
		.then((response) => {return response;});
};
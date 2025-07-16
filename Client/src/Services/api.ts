import axios from 'axios';

const api = axios.create({
    baseURL : process.env.NODE_ENV=='production'?"":"http://localhost:5000/",
    headers : {
        'Content-Type' : 'application/json'
    }
});

export const login=( email:string, password:string ) =>api.post('/api/user/login',{email,password});
export const signup=(name : string,email:string,password:string)=>api.post('/api/user/signup',{name,email,password});
export const verify=(token : string)=>api.get('/api/user/verify',{headers:{authorization : token}});
export const getProfile = (token : string)=>api.get('/api/content/profile',{headers:{authorization:token}})

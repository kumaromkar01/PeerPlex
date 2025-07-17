import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.URL??"http://localhost:5000/",
    headers : {
        'Content-Type' : 'application/json'
    }
});

export const login=( email:string, password:string ) =>api.post('/api/user/login',{email,password});
export const signup=(name : string,email:string,password:string)=>api.post('/api/user/signup',{name,email,password});
export const verify=(token : string)=>api.get('/api/user/verify',{headers:{authorization : token}});
export const getProfile = (token : string)=>api.get('/api/content/profile',{headers:{authorization:token}})
export const getBooks = (page:Number,limit : Number)=> api.get(`/api/book/all?page=${page}&limit=${limit}`);
export const getUploads = (token : string)=> api.get('/api/book/myuploads',{headers : {authorization:token}});
export const getInsight = ()=>api.get('/api/insight/values');
import axios from 'axios';

const storedProfile = localStorage.getItem("profile");
const profile = storedProfile ? JSON.parse(storedProfile) : null;
const api = axios.create({
    baseURL: "https://interviewrating-2.onrender.com",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': profile ? `Bearer ${profile.token}` : ''
    }
});

api.interceptors.request.use((req)=>{
    if(profile){
        req.headers.Authorization = `Bearer ${profile.token}`;
    }
    return req;
});

export const fetchRatings = async (userId) => api.get(`${"/ratings"}/${userId}`);
export const createRating = async (rating) => api.post("/ratings", rating);
export const editRating = async (id, rating) => api.patch(`${"/ratings"}/${id}`, rating);
export const deleteRating = async (id) => api.delete(`${"/ratings"}/${id}`);

export const login = async (formValues) => api.post("/user/login", formValues);
export const signup = async (formValues) => api.post("/user/signup", formValues);



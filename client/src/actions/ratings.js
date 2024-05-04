import * as api from "../api";
import {FETCH_ALL_RATINGS, CREATE_RATING, EDIT_RATING, DELETE_RATING} from "../constants/actionTypes";
 
export const getRatings = (userId) => async (dispatch) =>{
    try{
        const {data} = await api.fetchRatings(userId);
        console.log("fronteak",data);
        
        dispatch({type: FETCH_ALL_RATINGS, payload: data});
    } catch(error){
        console.log(error.message)
    }
};

export const createRating = (rating) => async (dispatch) =>{
    try{
        const {data} = await api.createRating(rating);
        dispatch({type: CREATE_RATING, payload: data});
    } catch(error){
        console.log(error.message);
    }
};

export const editRating = (id, rating) => async (dispatch) => {
    try{
        const {data} = await api.editRating(id, rating);
        dispatch({type: EDIT_RATING, payload: data});
    } catch(error){
        console.log(error.message);
    }
};

export const deleteRating = (id) => async(dispatch) => {
    try{
        await api.deleteRating(id);
        dispatch({type: DELETE_RATING, payload: id});
    } catch(error){
        console.log(error.message);
    }
};

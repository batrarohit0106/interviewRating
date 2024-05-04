import { FETCH_ALL_RATINGS, CREATE_RATING, EDIT_RATING, DELETE_RATING } from "../constants/actionTypes";

const ratingReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_ALL_RATINGS:
            console.log("Hello",action.payload);
            return action.payload;
        case CREATE_RATING:
            return [...state, action.payload];
        case EDIT_RATING:
            return state.map(rating => rating.id === action.payload.id ? action.payload : rating);
        case DELETE_RATING:
            return state.filter(rating => rating.id !== action.payload);
        default:
            return state;
    }
}

export default ratingReducer
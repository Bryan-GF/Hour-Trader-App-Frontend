import { TOGGLE_LOGIN_STATUS } from '../actions'

const initialState = {
    user: {},
    loggedIn: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        default: 
            return state;

        case TOGGLE_LOGIN_STATUS: 
            return {...state, loggedIn: !state.loggedIn}
    }

}
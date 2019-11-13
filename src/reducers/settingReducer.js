import * as actionTypes from '../actions/types';


const settingReducer = (state = {}, action) => {

    switch (action.type) {


        case actionTypes.DISABLE_BALANCE_ON_ADD:
            return {
                ...state,
                disableBalanceOnAdd: action.payload

            }
        case actionTypes.DISABLE_BALANCE_ON_EDIT:
            return {
                ...state,
                disableBalanceOnEdit: action.payload

            }
        case actionTypes.DISABLE_REGISTRATION:
            return {
                ...state,
                disableRegistration: action.payload

            }
        default:
            return state;

    }


}

export default settingReducer



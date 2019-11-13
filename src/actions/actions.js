import * as actionTypes from './types';


export const disableBalanceOnEdit = () => {

    //extracting settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //changing the settings 
    settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

    //set back to localstorage
    localStorage.setItem('settings', JSON.stringify(settings));


    return {
        type: actionTypes.DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    }
}


export const disableBalanceOnAdd = () => {

    //extracting settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //changing the settings 
    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

    //set back to localstorage
    localStorage.setItem('settings', JSON.stringify(settings))

    return {
        type: actionTypes.DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd
    }
}


export const disableRegistration = () => {

    //extracting settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //changing the settings 
    settings.disableRegistration = !settings.disableRegistration;

    //set back to localstorage
    localStorage.setItem('settings', JSON.stringify(settings));


    return {
        type: actionTypes.DISABLE_REGISTRATION,
        payload: settings.disableRegistration
    }
}
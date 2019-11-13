import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import settingReducer from '../../reducers/settingReducer';
const fbConfig = {
    apiKey: "AIzaSyAF1y2w0TfsohEPDhWqxT4WQSvhq--hPWI",
    authDomain: "clients-pannel.firebaseapp.com",
    databaseURL: "https://clients-pannel.firebaseio.com",
    projectId: "clients-pannel",
    storageBucket: "clients-pannel.appspot.com",
    messagingSenderId: "748888394514",
    appId: "1:748888394514:web:1a1af530b598fce07341cb",
    measurementId: "G-Q8JFHZ7PL0"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    settings: settingReducer
})


// Create store with reducers and initial state
if (!localStorage.getItem('settings')) {

    const settings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        disableRegistration: false
    }

    console.log("ashaiushoa");
    localStorage.setItem('settings', JSON.stringify(settings));
}



const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }

const store = createStore(rootReducer, initialState, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}



export default store;

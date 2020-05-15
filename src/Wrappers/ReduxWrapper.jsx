
/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {createStore} from 'redux'
import {Provider} from "react-redux";


function storeReducer(state = {
    schedule: [],
    gallery: [],
    countryHosts: [],
    contacts: [],
}, action) {

    let newState = {
        schedule: state.schedule,
        gallery: state.gallery,
        countryHosts: state.countryHosts,
        contacts: state.contacts,
    }

    switch (action.type) {
        case "SET_SCHEDULE":
            newState.schedule = action.schedule;
            return newState;

        case "SET_GALLERY":
            newState.gallery = action.gallery;
            return newState;

        case "SET_CONTACT_US":
            newState.countryHosts = action.countryHosts;
            newState.contacts = action.contacts;
            return newState;

        default:
            return newState;
    }
}

// noinspection JSCheckFunctionSignatures
let store = createStore(storeReducer);


// TODO: Initial Load for schedule, gallery, countryHosts and contacts in here
//       On pages: Show loader when the respective array is empty


export const ReduxWrapper = (props) => {

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};


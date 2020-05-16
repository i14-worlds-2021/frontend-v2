
/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {createStore} from 'redux'
import {Provider} from "react-redux";
import axios from "axios";
import {CMS_URL} from "../constants";

let initialObject = {
    loading: true,
    data: [],
}

function storeReducer(state = {
    articles: initialObject,
    albums: initialObject,
    scheduleDays: initialObject,
    contacts: initialObject,
    countryHosts: initialObject
}, action) {

    let newState = {
        articles: state.articles,
        albums: state.albums,
        scheduleDays: state.scheduleDays,
        contacts: state.contacts,
        countryHosts: state.countryHosts,
    }

    let updateObject = {
        loading: false,
        data: action.data
    };

    switch (action.type) {
        case "SET_ARTICLES":
            newState.articles = updateObject;
            break;

        case "SET_ALBUMS":
            newState.albums = updateObject;
            break;

        case "SET_SCHEDULE_DAYS":
            newState.scheduleDays = updateObject;
            break;

        case "SET_CONTACTS":
            newState.contacts = updateObject;
            break;

        case "SET_COUNTRY_HOSTS":
            newState.countryHosts = updateObject;
            break;

        default:
            break;
    }

    return newState;
}

// noinspection JSCheckFunctionSignatures
let store = createStore(storeReducer);


const resources = [
    {url: "blog-posts", reduxAction: "SET_ARTICLES"},
    {url: "schedule-days", reduxAction: "SET_SCHEDULE_DAYS"},
    {url: "contacts", reduxAction: "SET_CONTACTS"},
    {url: "country-hosts", reduxAction: "SET_COUNTRY_HOSTS"},
];

resources.forEach(resource => {
    axios.get(CMS_URL + resource.url).then(response => {
        // The results arrive very fast (which is nice) However:
        // Then the loading animation is only visible for a very
        // brief moment and the result looks laggy because of the
        // fast transitions (page load -> loading animation -> data)
        setTimeout(() => {
            store.dispatch({type: resource.reduxAction, data: response.data});
        }, 1000);
    })
})


export const ReduxWrapper = (props) => {

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};


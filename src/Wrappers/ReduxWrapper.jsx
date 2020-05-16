
/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {createStore} from 'redux'
import {Provider} from "react-redux";
import axios from "axios";
import {CMS_URL} from "../constants";


function storeReducer(state = {
    articles: {
        loading: true,
        data: [],
    },
    albums: {
        loading: true,
        data: [],
    },
    scheduleDays: {
        loading: true,
        data: [],
    },
    contacts: {
        loading: true,
        data: [],
    },
    countryHosts: {
        loading: true,
        data: [],
    }
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


// TODO: Initial Load for schedule, gallery, countryHosts and contacts in here
//       On pages: Show loader when state.loading is true

const resources = [
    {url: "contacts", reduxAction: "SET_CONTACTS"},
    {url: "country-hosts", reduxAction: "SET_COUNTRY_HOSTS"},
];

resources.forEach(resource => {
    axios.get(CMS_URL + resource.url).then(response => {
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



/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {createStore} from 'redux'
import {Provider} from "react-redux";
import axios from "axios";
import {CMS_URL} from "../constants";

let initialResourceObject = {
    loading: true,
    data: [],
}

let initialSliderObject = {
    open: false,
    images: [],
    index: 0
}

function storeReducer(state = {
    articles: initialResourceObject,
    albums: initialResourceObject,
    scheduleDays: initialResourceObject,
    contacts: initialResourceObject,
    countryHosts: initialResourceObject,
    imageSlider: initialSliderObject
}, action) {

    let newState = {
        articles: state.articles,
        albums: state.albums,
        scheduleDays: state.scheduleDays,
        contacts: state.contacts,
        countryHosts: state.countryHosts,
        imageSlider: state.imageSlider
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

        case "OPEN_IMAGE_SLIDER":
            newState.imageSlider = {
                open: true,
                images: action.images,
                index: action.index
            };
            break;

        case "SET_IMAGE_SLIDER_INDEX":
            newState.imageSlider = {
                open: newState.imageSlider.open,
                images: newState.imageSlider.images,
                index: action.index
            };
            break;

        case "CLOSE_IMAGE_SLIDER":
            newState.imageSlider = {
                open: false,
                images: newState.imageSlider.images,
                index: newState.imageSlider.index
            };
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


const ReduxWrapper = (props) => {

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};

export default ReduxWrapper;

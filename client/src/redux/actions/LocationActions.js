import {
    CREATE_LOCATION_COMPLETE,
    CREATE_NEW_LOCATION, CREATING_LOCATION,
    DEFAULT_URL,
    DELETE_LOCATION,
    GET_ALL_LOCATIONS,
    GET_LOCATION, JOINED_CLEAN_SITE, JOINING_CLEAN_SITE, LOADING_FORM, RESET_UI_STATE, STOP_LOADING_FORM,
    UPDATE_LOCATION
} from "../types";
import axios from "axios";


export function getAllLocations() {
    return function (dispatch) {
        axios
            .get(`${DEFAULT_URL}/get_all_locations`)
            .then((res) => {
                dispatch({
                    type: GET_ALL_LOCATIONS,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function getLocation(locationId) {
    return function (dispatch) {
        dispatch({type: LOADING_FORM});
        axios
            .get(`${DEFAULT_URL}/get_location/${locationId}`)
            .then((res) => {
                dispatch({
                    type: GET_LOCATION,
                    payload: res.data
                });
                dispatch({type: STOP_LOADING_FORM});
            });
    }
}

export function updateLocation(locationData) {
    return function (dispatch) {
        axios
            .put(`${DEFAULT_URL}/update_location`, locationData)
            .then((res) => {
                dispatch({
                    type: UPDATE_LOCATION,
                    payload: res.data.updateData
                });
            });
    }
}

export function deleteLocation(locationId) {
    return function (dispatch) {
        axios
            .delete(`${DEFAULT_URL}/delete_location/${locationId}`)
            .then((res) => {
                dispatch({
                    type: DELETE_LOCATION,
                    payload: res.data
                })
            });
    };
}

export function createNewLocation(location) {
    return function (dispatch) {
        dispatch({type: CREATING_LOCATION});
        axios
            .post(`${DEFAULT_URL}/create_location`, location)
            .then((res) => {
                dispatch({
                    type: CREATE_NEW_LOCATION,
                    payload: res.data
                });
                dispatch({type: CREATE_LOCATION_COMPLETE});
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE})
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function joinLocation(info) {
    return function (dispatch) {
        dispatch({type: JOINING_CLEAN_SITE});
        axios.post(`${DEFAULT_URL}/join_clean_site`, info)
            .then((res) => {
                console.log(res.data);
                dispatch({type: JOINED_CLEAN_SITE})
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE})
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

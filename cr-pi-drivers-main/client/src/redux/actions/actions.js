import { GET_DRIVERS, GET_TEAMS, GET_DRIVER_ID, PAGINATION, SEARCH_DRIVER, FILTER_TEAM, REFRESH, FILTER_ORDER, FILTER_ORIGIN, CLEAN_DETAIL } from "./actions-types";
import axios from "axios";

const URL_DRIVERS = "http://localhost:3001/drivers";
const URL_TEAMS = "http://localhost:3001/teams";

export const getDrivers = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios(URL_DRIVERS);
            return dispatch({
                type:GET_DRIVERS,
                payload:data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const getTeams = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios(URL_TEAMS);
            return dispatch({
                type:GET_TEAMS,
                payload:data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const getDriverById = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL_DRIVERS}/${id}`)
            return dispatch({
                type: GET_DRIVER_ID, 
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const changePage = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PAGINATION,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const SearchDriver = (name) => {
    return async (dispatch) => {
        try {
            const {data} = await axios(`${URL_DRIVERS}?name=${name}`);
            return dispatch({
                type:SEARCH_DRIVER,
                payload:data
            });
        } catch (error) {
            alert(error.response.data.error);
        }
    }
}

export const filterTeam = (team) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type:FILTER_TEAM,
                payload:team
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterOrder = (order) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type:FILTER_ORDER,
                payload:order
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterOrigin = (origin) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type:FILTER_ORIGIN,
                payload: origin
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const refresh = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type:REFRESH
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const createDriver = (form) => {
    return async () => {
        try {
            await axios.post(URL_DRIVERS,form)
        } catch (error) {
            console.log(error);
        }
    }
}

export const cleanDriverDetail = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type:CLEAN_DETAIL
            })
        } catch (error) {
            console.log(error);
        }
    }
}
import { FILTER_TEAM, GET_DRIVERS, GET_DRIVER_ID, GET_TEAMS, PAGINATION, REFRESH, SEARCH_DRIVER } from "../actions/actions-types";


const initialState = {
    drivers: [],
    driversBackUp:[],
    driversFiltered: [],
    driverDetail:{},
    teams: [],
    currentPage:0
}

const reducer = (state = initialState, action) => {
    const items_Page = 9;
    switch(action.type){
        case GET_DRIVERS:
            return {
                ...state,
                drivers: [...action.payload].splice(0,items_Page),
                driversBackUp: action.payload 
            }
        case GET_TEAMS:
            return {
                ...state,
                teams:action.payload
            }
        case GET_DRIVER_ID:
            return {
                ...state,
                driverDetail:action.payload     
            }
        case PAGINATION:
        
            const next_page = state.currentPage+1;
            const prev_page = state.currentPage-1;
            const firstIndex = action.payload==="next"
            ? next_page*items_Page: prev_page*items_Page
            
            if(action.payload === "next" && firstIndex>= state.driversBackUp.length) return state
            if(action.payload === "prev" && prev_page < 0) return state

            return {
                ...state,
                drivers: [...state.driversBackUp].splice(firstIndex,items_Page),
                currentPage:action.payload === "next" ? next_page : prev_page
            }
            case SEARCH_DRIVER:
            return {
                ...state,
                drivers: [...action.payload].splice(0,items_Page),
                driversBackUp: action.payload
            }
        case FILTER_TEAM:
            return {
                ...state,
                drivers: [...state.driversBackUp].filter(driver => driver.Teams?.includes(action.payload)).splice(0,items_Page),
            }
        case REFRESH:
            return {
                ...state,
                drivers: [...state.driversBackUp].splice(0,items_Page)
            }

        default:
            return {...state}
    }
}

export default reducer;

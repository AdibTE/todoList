import { SET_LOADING, GET_ITEMS, CHECK_ITEM, ADD_ITEM, DELETE_ITEM, FILTER_ITEM, UPDATE_ITEM, EDIT_ITEM } from '../actions/types';

const initialState = {
    items: null,
    loading: false,
    filter: null,
    filterName: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case CHECK_ITEM:
            return {
                ...state,
                items: state.items.map(
                    item => item.id === action.payload ? { ...item, isDone: !item.isDone } : item
                ),
                filter: state.filterName !== null ? state.filter.filter((item) => item.id !== action.payload) : null,
                loading: false
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
                filter: state.filterName !== null ? state.filter.filter((item) => item.id !== action.payload) : null,
                loading: false
            }
        case EDIT_ITEM:
            return {
                ...state,
                items: state.items.map(
                    item => item.id === action.id ? { ...item, text: action.text } : item
                ),
                filter: state.filterName !== null && state.filter.map(
                    item => item.id === action.id ? { ...item, text: action.text } : item
                ),
                loading: false
            }
        case FILTER_ITEM:
        case UPDATE_ITEM:
            return {
                ...state,
                filter: action.payload !== null ? state.items.filter((item) => item.isDone === action.payload) : null,
                filterName: action.payload,
                loading: false
            }
        default:
            return state
    }
}
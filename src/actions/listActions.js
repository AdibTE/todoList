import { SET_LOADING, GET_ITEMS, CHECK_ITEM, ADD_ITEM, DELETE_ITEM, FILTER_ITEM, UPDATE_ITEM, EDIT_ITEM } from './types';
import { v4 } from 'uuid';
import Cookies from 'js-cookie'

// Get all Items
export const getItems = () => async dispatch => {
    try {
        setLoading();
        const data = [];
        let cookies = Cookies.getJSON('', { domain: '/' });
        Object.keys(cookies).forEach(function (key) {
            data.push(cookies[key]);
        })
        dispatch({
            type: GET_ITEMS,
            payload: data
        })
    } catch (err) {
        console.log(err.response.data)
    }
}

// Check the specefic item
export const checkItem = (id) => async dispatch => {
    try {
        setLoading();
        let data = Cookies.getJSON(`todoCookie-${id}`);
        data.isDone = !data.isDone;
        Cookies.set(`todoCookie-${id}`, data, { expires: 7 })
        dispatch({
            type: CHECK_ITEM,
            payload: id,
        })
    } catch (err) {
        console.log(err.response.data)
    }
}

// add new item
export const addItem = (data) => async dispatch => {
    try {
        setLoading();
        let item = { text: data, isDone: false, id: v4() }
        Cookies.set(`todoCookie-${item.id}`, item, { expires: 7 })
        dispatch({
            type: ADD_ITEM,
            payload: item
        })
    } catch (err) {
        console.log(err.response.data)
    }
}

// delete selected item
export const deleteItem = (id) => async dispatch => {
    try {
        setLoading();
        Cookies.remove(`todoCookie-${id}`);
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    } catch (err) {
        console.log(err.response.data)
    }
}

// edit items
export const editItem = (id, text) => async dispatch => {
    try {
        setLoading();
        let data = Cookies.getJSON(`todoCookie-${id}`);
        data.text = text;
        Cookies.set(`todoCookie-${id}`, data, { expires: 7 })
        dispatch({
            type: EDIT_ITEM,
            id,
            text
        })
    } catch (err) {
        console.log(err.response.data)
    }
}

// filter items
export const filterItem = (filter) => {
    setLoading();
    return {
        type: FILTER_ITEM,
        payload: filter
    }
}

// update items
export const updateItem = (data) => {
    setLoading();
    return {
        type: UPDATE_ITEM,
        payload: data
    }
}

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}
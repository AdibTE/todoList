import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItem, updateItem } from '../actions/listActions';
import PropTypes from 'prop-types'

const NewTodo = ({ addItem, updateItem, filterName }) => {
    const [inputText, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        inputText !== "" && addItem(inputText);

        (filterName === true || filterName === false) && updateItem(false);

        setText('');
    }
    return (
        <form onSubmit={onSubmit} className="NewTodo">
            <input type="text" value={inputText} onChange={(e) => { setText(e.target.value) }} />
            <button>Submit</button>
        </form>
    )
}

NewTodo.prototype = {
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    filterName: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    filterName: state.list.filterName
})
export default connect(mapStateToProps, { addItem, updateItem })(NewTodo);